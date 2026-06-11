export const ALLOWED_EMAILS = [
  'hetvi@pr1sm.ai',
  'jashwanth@pr1sm.ai',
  'liezl.moss@pr1sm.ai',
  'harjoth.kaur@pr1sm.ai',
  'samantha@pr1sm.ai',
  'elther@pr1sm.ai',
  'ajay@pr1sm.ai',
  'contact@co-studio.at',
]

export const TEAM = [
  { email: 'ajay@pr1sm.ai', name: 'Ajay Patel', role: 'CEO, PR1SM.AI', initials: 'AP', color: '#4169E1' },
  { email: 'liezl.moss@pr1sm.ai', name: 'Liezl Moss', role: 'Managing Director', initials: 'LM', color: '#7B2FBE' },
  { email: 'jashwanth@pr1sm.ai', name: 'Jashwanth', role: 'Lead Engineer', initials: 'JY', color: '#1D9E75' },
  { email: 'hetvi@pr1sm.ai', name: 'Hetvi', role: 'Team Member', initials: 'H', color: '#D4AF37' },
  { email: 'harjoth.kaur@pr1sm.ai', name: 'Harjoth Kaur', role: 'Team Member', initials: 'HK', color: '#4169E1' },
  { email: 'samantha@pr1sm.ai', name: 'Samantha', role: 'Team Member', initials: 'S', color: '#7B2FBE' },
  { email: 'elther@pr1sm.ai', name: 'Elther', role: 'Team Member', initials: 'E', color: '#1D9E75' },
  { email: 'contact@co-studio.at', name: 'Corneliu', role: 'Web Developer', initials: 'C', color: '#D4AF37' },
]

export const RESOURCE_CATEGORIES = [
  {
    title: 'Company',
    resources: [
      { title: 'Brand Guidelines', icon: 'Palette', desc: 'PR1SM.AI colors, fonts & logo usage', href: '#' },
      { title: 'PR1SM.AI Pitch Deck', icon: 'FileText', desc: 'Latest presentation deck', href: '#' },
      { title: 'Onboarding Guide', icon: 'BookOpen', desc: 'New hire checklist & company handbook', href: '#' },
    ],
  },
  {
    title: 'Sales & CRM',
    resources: [
      { title: 'HubSpot CRM', icon: 'BarChart2', desc: 'Client contacts & deal pipeline', href: 'https://app.hubspot.com' },
      { title: 'Discovery Call Booking', icon: 'Calendar', desc: 'Book a client demo call', href: 'https://meetings.hubspot.com/priglobal/discovery' },
    ],
  },
  {
    title: 'Engineering',
    resources: [
      { title: 'Website Source Code', icon: 'GitFork', desc: 'GitHub repository — pr1sm.ai website', href: 'https://github.com/Pri-Global/pr1sm-website' },
      { title: 'Vercel Deployments', icon: 'Globe', desc: 'Live deployments & preview builds', href: 'https://vercel.com' },
      { title: 'Supabase Project', icon: 'Database', desc: 'Database, auth & storage', href: 'https://supabase.com/dashboard' },
    ],
  },
]

// Flat list kept for backwards-compatible imports
export const RESOURCES = RESOURCE_CATEGORIES.flatMap((c) => c.resources)

export const AI_TOOLS = [
  { title: 'PR1SM.AI', desc: 'Enterprise AI Platform', href: 'https://pr1sm-website.vercel.app', icon: 'Brain', badge: 'Live', color: 'purple' },
  { title: 'PRI Global', desc: 'Main company website', href: 'https://pri-global.vercel.app', icon: 'Globe', color: 'blue' },
  { title: 'HubSpot', desc: 'CRM & meetings', href: 'https://meetings.hubspot.com/priglobal/discovery', icon: 'BarChart2', color: 'gold' },
  { title: 'LinkedIn', desc: 'PR1SM.AI company page', href: 'https://linkedin.com/company/pr1sm-ai', icon: 'Link2', color: 'blue' },
  { title: 'GitHub', desc: 'Website source repository', href: 'https://github.com/Pri-Global/pr1sm-website', icon: 'GitFork', color: 'purple' },
  { title: 'ChatGPT', desc: 'General AI assistant', href: 'https://chat.openai.com', icon: 'MessageSquare', color: 'teal' },
  { title: 'Claude', desc: 'AI assistant for writing & code', href: 'https://claude.ai', icon: 'Sparkles', color: 'gold' },
  { title: 'Notion', desc: 'Docs, notes & wikis', href: 'https://notion.so', icon: 'FileText', color: 'blue' },
]

export const PROMPT_LIBRARY = [
  {
    title: 'Client follow-up email',
    prompt: 'Write a friendly follow-up email to a prospect after a discovery call, summarizing the key points discussed and proposing next steps.',
  },
  {
    title: 'LinkedIn post draft',
    prompt: 'Draft a LinkedIn post announcing a new feature on PR1SM.AI, written in a confident but approachable enterprise-tech tone.',
  },
  {
    title: 'Meeting notes summary',
    prompt: 'Summarize these raw meeting notes into a short list of decisions made and action items with owners.',
  },
  {
    title: 'Bug report cleanup',
    prompt: 'Rewrite this bug report into a clear, structured format with steps to reproduce, expected behavior, and actual behavior.',
  },
]

export const QUICK_LINKS = [
  { title: 'Team', desc: 'See who’s on the team', icon: 'Users', to: 'team', color: 'blue' },
  { title: 'AI & Tools', desc: 'Apps, prompts & shortcuts', icon: 'Sparkles', to: 'ai-tools', color: 'purple' },
  { title: 'Resources', desc: 'Docs, links & guidelines', icon: 'BookOpen', to: 'resources', color: 'teal' },
  { title: 'Announcements', desc: 'Latest company updates', icon: 'Bell', to: 'announcements', color: 'gold' },
]

export const ACTIVITY_FEED = [
  { id: 1, text: 'PR1SM.AI website redesign deployed to production', time: '2h ago', icon: 'Globe' },
  { id: 2, text: 'New employee portal sections added (Team, AI Tools, Resources)', time: '1d ago', icon: 'LayoutDashboard' },
  { id: 3, text: 'Hero section updated with new headline animation', time: '2d ago', icon: 'Sparkles' },
  { id: 4, text: 'Client portal demo dashboard published', time: '4d ago', icon: 'Briefcase' },
]
