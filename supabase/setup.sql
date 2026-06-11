-- PR1SM Employee Portal — run once in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.employees (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'employee',
  department TEXT,
  avatar_url TEXT,
  first_login BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.employees;
CREATE POLICY "Users can view own profile"
  ON public.employees FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.employees;
CREATE POLICY "Users can update own profile"
  ON public.employees FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.employees;
CREATE POLICY "Users can insert own profile"
  ON public.employees FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.employees (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  priority TEXT DEFAULT 'normal',
  created_by UUID REFERENCES public.employees(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "All employees can view announcements" ON public.announcements;
CREATE POLICY "All employees can view announcements"
  ON public.announcements FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "All employees can post announcements" ON public.announcements;
CREATE POLICY "All employees can post announcements"
  ON public.announcements FOR INSERT
  TO authenticated WITH CHECK (true);

INSERT INTO public.announcements (title, content, priority)
SELECT * FROM (VALUES
  ('Welcome to PR1SM Employee Portal', 'This is your central hub for team resources, AI tools, and company updates.', 'high'),
  ('PR1SM.AI Website Launch', 'The new PR1SM.AI website is now live. Share it with your network!', 'normal')
) AS v(title, content, priority)
WHERE NOT EXISTS (SELECT 1 FROM public.announcements LIMIT 1);

-- Backfill employee rows for users created before this script
INSERT INTO public.employees (id, email, full_name, first_login)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  true
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.employees e WHERE e.id = u.id);
