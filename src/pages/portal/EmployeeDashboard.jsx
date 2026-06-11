import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'
import {
  BarChart2,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  Check,
  CheckSquare,
  Clock,
  Code,
  Copy,
  Database,
  ExternalLink,
  FileText,
  GitFork,
  Globe,
  Link2,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Palette,
  Send,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from '../../components/ui/Logo'
import AnimatedIcon from '../../components/ui/AnimatedIcon'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import {
  ACTIVITY_FEED,
  AI_TOOLS,
  ALLOWED_EMAILS,
  PROMPT_LIBRARY,
  QUICK_LINKS,
  RESOURCE_CATEGORIES,
  TEAM,
} from '../../data/employeePortal'

const ICON_MAP = {
  Brain,
  Globe,
  BarChart2,
  Link2,
  Palette,
  Code,
  FileText,
  Calendar,
  GitFork,
  Database,
  MessageSquare,
  Sparkles,
  Users,
  BookOpen,
  Bell,
  LayoutDashboard,
  Briefcase,
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard, end: true, to: '' },
  { id: 'team', label: 'Team', Icon: Users, to: 'team' },
  { id: 'ai-tools', label: 'AI Tools', Icon: Sparkles, to: 'ai-tools' },
  { id: 'resources', label: 'Resources', Icon: BookOpen, to: 'resources' },
  { id: 'announcements', label: 'Announcements', Icon: Bell, to: 'announcements' },
]

const COLOR_CLASSES = {
  blue: { icon: 'text-blue-light', ring: 'hover:border-blue/30' },
  purple: { icon: 'text-purple-light', ring: 'hover:border-purple/30' },
  teal: { icon: 'text-teal-light', ring: 'hover:border-teal/30' },
  gold: { icon: 'text-gold-light', ring: 'hover:border-gold/30' },
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getInitials(name, email) {
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    return parts[0]?.[0]?.toUpperCase() || '?'
  }
  return email?.[0]?.toUpperCase() || '?'
}

function OverviewSection({ firstName, lastSeenLabel }) {
  return (
    <section className="scroll-mt-20 lg:scroll-mt-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-heading font-bold text-xl sm:text-2xl lg:text-[28px] text-white leading-tight">
          {getGreeting()}, {firstName}! 👋
        </h1>
        <p className="text-white/40 text-sm mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
        {[
          { label: 'Team Members', value: String(ALLOWED_EMAILS.length), sub: 'Active accounts', Icon: Users, color: 'text-blue-light' },
          {
            label: 'PR1SM.AI Status',
            value: '● Live',
            sub: 'pr1sm-website.vercel.app',
            Icon: Globe,
            color: 'text-green-400',
            onClick: () => window.open('https://pr1sm-website.vercel.app', '_blank', 'noopener,noreferrer'),
          },
          { label: 'Open Tasks', value: '–', sub: 'Coming soon', Icon: CheckSquare, color: 'text-gold-light', dim: true },
          { label: 'Last Login', value: lastSeenLabel, sub: 'Your last session', Icon: Clock, color: 'text-purple-light' },
        ].map((stat) => (
          <div
            key={stat.label}
            role={stat.onClick ? 'button' : undefined}
            tabIndex={stat.onClick ? 0 : undefined}
            onClick={stat.onClick}
            onKeyDown={stat.onClick ? (e) => e.key === 'Enter' && stat.onClick() : undefined}
            className={`rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] p-4 sm:p-5 min-w-0 ${
              stat.dim ? 'opacity-60' : ''
            } ${stat.onClick ? 'cursor-pointer hover:border-blue/30 transition-colors' : ''}`}
          >
            <AnimatedIcon Icon={stat.Icon} size={18} className={stat.color} />
            <p className="text-white/45 text-xs mt-3">{stat.label}</p>
            <p className="font-heading font-bold text-base sm:text-lg lg:text-xl text-white mt-1 break-words">{stat.value}</p>
            <p className="text-white/35 text-xs mt-0.5 truncate">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="font-heading font-semibold text-lg text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {QUICK_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon] || Sparkles
            const colors = COLOR_CLASSES[link.color] || COLOR_CLASSES.blue
            return (
              <Link
                key={link.title}
                to={link.to}
                className={`rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] p-4 sm:p-5 transition-colors ${colors.ring}`}
              >
                <AnimatedIcon Icon={Icon} size={20} className={colors.icon} />
                <p className="font-heading font-semibold text-sm text-white mt-3">{link.title}</p>
                <p className="text-white/40 text-xs mt-1">{link.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="font-heading font-semibold text-lg text-white mb-4">Recent Activity</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] divide-y divide-white/[0.04]">
          {ACTIVITY_FEED.map((item) => {
            const Icon = ICON_MAP[item.icon] || Sparkles
            return (
              <div key={item.id} className="flex items-start gap-3 p-3 sm:p-4">
                <span className="w-9 h-9 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                  <AnimatedIcon Icon={Icon} size={16} className="text-blue-light" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{item.text}</p>
                </div>
                <span className="text-white/30 text-[11px] shrink-0 mt-1.5">{item.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AnnouncementsSection({ announcements, onCreate, posting, postError }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('normal')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const ok = await onCreate({ title: title.trim(), content: content.trim(), priority })
    if (ok) {
      setTitle('')
      setContent('')
      setPriority('normal')
    }
  }

  return (
    <section className="scroll-mt-20 lg:scroll-mt-8">
      <div className="flex items-center gap-2 mb-4">
        <AnimatedIcon Icon={Bell} size={18} className="text-blue-light" />
        <h2 className="font-heading font-semibold text-lg text-white">Announcements</h2>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] p-4 mb-6 space-y-3">
        <p className="text-white/45 text-xs font-medium">Post a new announcement</p>
        {postError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-red-300 text-xs">
            {postError}
          </div>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="portal-input w-full !text-sm"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Details (optional)"
          rows={2}
          className="portal-input w-full !text-sm resize-none"
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-[#0a1020] border border-white/[0.06] rounded-lg p-1">
            {['normal', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                  priority === p ? 'bg-blue text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={posting || !title.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-xs font-medium text-white hover:bg-blue/90 transition-colors disabled:opacity-50"
          >
            <AnimatedIcon Icon={posting ? Loader2 : Send} size={14} className={posting ? 'animate-spin' : ''} />
            Post
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {announcements.length === 0 ? (
          <>
            <div className="rounded-xl border-l-[3px] border-blue bg-blue/[0.08] p-4">
              <p className="text-white font-medium text-sm">Welcome to PR1SM Employee Portal</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">
                This is your central hub for team resources, AI tools, and company updates.
              </p>
            </div>
            <div className="rounded-xl border-l-[3px] border-white/10 bg-white/[0.03] p-4">
              <p className="text-white font-medium text-sm">PR1SM.AI Website Launch</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">
                The new PR1SM.AI website is now live. Share it with your network!
              </p>
            </div>
          </>
        ) : (
          announcements.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl p-4 ${
                item.priority === 'high'
                  ? 'border-l-[3px] border-blue bg-blue/[0.08]'
                  : 'border-l-[3px] border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  {item.content && (
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{item.content}</p>
                  )}
                </div>
                {item.created_at && (
                  <span className="text-white/30 text-[10px] shrink-0">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="font-heading font-semibold text-sm text-white">{prompt.title}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-white/40 hover:text-blue-light transition-colors"
          aria-label="Copy prompt"
        >
          <AnimatedIcon Icon={copied ? Check : Copy} size={14} />
        </button>
      </div>
      <p className="text-white/45 text-xs mt-2 leading-relaxed">{prompt.prompt}</p>
    </div>
  )
}

function AiToolsSection() {
  return (
    <section className="scroll-mt-20 lg:scroll-mt-8">
      <div className="flex items-center gap-2 mb-4">
        <AnimatedIcon Icon={Sparkles} size={18} className="text-purple-light" />
        <h2 className="font-heading font-semibold text-lg text-white">AI & Tools</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AI_TOOLS.map((tool) => {
          const Icon = ICON_MAP[tool.icon] || Globe
          return (
            <a
              key={tool.title}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] p-4 hover:border-blue/30 transition-colors group min-w-0"
            >
              <AnimatedIcon Icon={Icon} size={20} className="text-purple-light" />
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <p className="font-heading font-semibold text-sm text-white group-hover:text-blue-light transition-colors">
                  {tool.title}
                </p>
                {tool.badge && (
                  <span className="badge-teal text-[9px] !py-0.5">{tool.badge}</span>
                )}
              </div>
              <p className="text-white/45 text-xs mt-1">{tool.desc}</p>
            </a>
          )
        })}
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="font-heading font-semibold text-lg text-white mb-1">Prompt Library</h2>
        <p className="text-white/40 text-xs mb-4">Ready-to-use prompts for common tasks — click to copy.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROMPT_LIBRARY.map((prompt) => (
            <PromptCard key={prompt.title} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection({ user }) {
  return (
    <section className="scroll-mt-20 lg:scroll-mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AnimatedIcon Icon={Users} size={18} className="text-blue-light" />
          <h2 className="font-heading font-semibold text-lg text-white">Team</h2>
        </div>
        <span className="badge-blue text-[10px]">{TEAM.length} members</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {TEAM.map((member) => {
          const isCurrentUser = user?.email?.toLowerCase() === member.email.toLowerCase()
          return (
            <div
              key={member.email}
              className={`rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] p-4 ${
                isCurrentUser ? 'ring-2 ring-blue/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${member.color}, #7B2FBE)` }}
                >
                  {member.initials}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-heading font-semibold text-sm text-white">{member.name}</p>
                    {isCurrentUser && <span className="badge-blue text-[9px] !py-0.5">You</span>}
                  </div>
                  <p className="text-white/50 text-xs mt-0.5">{member.role}</p>
                  <p className="text-white/30 text-[11px] mt-1 truncate">{member.email}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ResourcesSection() {
  return (
    <section className="scroll-mt-20 lg:scroll-mt-8">
      <div className="flex items-center gap-2 mb-4">
        <AnimatedIcon Icon={BookOpen} size={18} className="text-blue-light" />
        <h2 className="font-heading font-semibold text-lg text-white">Resources</h2>
      </div>
      <div className="space-y-6">
        {RESOURCE_CATEGORIES.map((category) => (
          <div key={category.title}>
            <p className="text-white/40 text-xs font-medium uppercase tracking-wide mb-2">{category.title}</p>
            <div className="rounded-2xl border border-white/[0.06] bg-[rgba(13,27,62,0.6)] divide-y divide-white/[0.04]">
              {category.resources.map((resource) => {
                const Icon = ICON_MAP[resource.icon] || FileText
                const isExternal = resource.href.startsWith('http')
                return (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-white/[0.03] transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                      <AnimatedIcon Icon={Icon} size={16} className="text-blue-light" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] font-medium">{resource.title}</p>
                      <p className="text-white/40 text-[11px] mt-0.5">{resource.desc}</p>
                    </div>
                    <AnimatedIcon Icon={ExternalLink} size={14} className="text-white/20 group-hover:text-white/40 shrink-0" />
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const { user, employee, signOut } = useAuth()
  const [announcements, setAnnouncements] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState('')

  const displayName = employee?.full_name || user?.email?.split('@')[0] || 'Team Member'
  const firstName = displayName.split(' ')[0]

  useEffect(() => {
    supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => setAnnouncements(data || []))
  }, [])

  useEffect(() => {
    if (!user?.id) return
    supabase
      .from('employees')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', user.id)
  }, [user?.id])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const lastSeen = employee && employee.last_seen
  const lastSeenLabel = useMemo(() => {
    if (!lastSeen) return 'Just now'
    return `${formatDistanceToNow(new Date(lastSeen), { addSuffix: false })} ago`
  }, [lastSeen])

  const handleSignOut = async () => {
    await signOut()
    navigate('/portal/employee', { replace: true })
  }

  const handleCreateAnnouncement = async ({ title, content, priority }) => {
    setPostError('')
    setPosting(true)
    const { data, error } = await supabase
      .from('announcements')
      .insert({ title, content: content || null, priority, created_by: user?.id })
      .select()
      .single()
    setPosting(false)

    if (error) {
      setPostError(error.message)
      return false
    }
    setAnnouncements((prev) => [data, ...prev])
    return true
  }

  const sidebarContent = (
    <>
      <div className="px-5 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Logo variant="icon" size="sm" />
          <span className="badge-purple text-[9px]">Employee Portal</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, Icon, to, end }) => (
          <NavLink
            key={id}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-blue/10 text-blue-light border-r-2 border-blue'
                : 'text-white/55 hover:text-white/80 hover:bg-white/[0.03]'
            }`}
          >
            <AnimatedIcon Icon={Icon} size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-purple flex items-center justify-center text-sm font-semibold text-white shrink-0">
            {getInitials(employee?.full_name, user?.email)}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{displayName}</p>
            <p className="text-[11px] text-white/40 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors"
        >
          <AnimatedIcon Icon={LogOut} size={14} />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#060b16] text-white flex overflow-x-clip">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-[#0a1020] border-r border-white/[0.06] fixed inset-y-0 left-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-60 flex flex-col bg-[#0a1020] border-r border-white/[0.06] z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
          aria-label="Close sidebar"
        >
          <AnimatedIcon Icon={X} size={20} />
        </button>
        {sidebarContent}
      </aside>

      <div className="flex-1 lg:ml-60 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0a1020]/95 backdrop-blur-xl border-b border-white/[0.06]">
          <button type="button" onClick={() => setSidebarOpen(true)} className="text-white/70" aria-label="Open menu">
            <AnimatedIcon Icon={Menu} size={22} />
          </button>
          <span className="font-heading font-semibold text-sm">Employee Portal</span>
          <button type="button" onClick={handleSignOut} className="text-white/40" aria-label="Sign out">
            <AnimatedIcon Icon={LogOut} size={18} />
          </button>
        </div>

        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
          <Routes>
            <Route index element={<OverviewSection firstName={firstName} lastSeenLabel={lastSeenLabel} />} />
            <Route path="team" element={<TeamSection user={user} />} />
            <Route path="ai-tools" element={<AiToolsSection />} />
            <Route path="resources" element={<ResourcesSection />} />
            <Route
              path="announcements"
              element={(
                <AnnouncementsSection
                  announcements={announcements}
                  onCreate={handleCreateAnnouncement}
                  posting={posting}
                  postError={postError}
                />
              )}
            />
          </Routes>

          <footer className="text-center text-white/20 text-[11px] py-8 mt-6">
            PR1SM.AI Employee Portal · A PRI Global Company
          </footer>
        </main>
      </div>
    </div>
  )
}
