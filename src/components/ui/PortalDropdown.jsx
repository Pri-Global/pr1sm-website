import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, ChevronRight, User, Users } from 'lucide-react'
import AnimatedIcon from './AnimatedIcon'

const PORTAL_OPTIONS = [
  {
    to: '/portal/client',
    title: 'Client Portal',
    subtitle: 'Talent pipeline & AI dashboard',
    Icon: Briefcase,
    iconClass: 'bg-blue/15 text-blue-light',
  },
  {
    to: '/portal/employee',
    title: 'Employee Portal',
    subtitle: 'Internal team access',
    Icon: Users,
    iconClass: 'bg-purple/15 text-purple-light',
  },
]

export default function PortalDropdown({ onNavigate, className = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }

    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClick)
    }
  }, [open, close])

  const handleNavigate = () => {
    close()
    onNavigate?.()
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open portal menu"
        className="portal-user-btn w-9 h-9 rounded-full border border-white/[0.12] bg-white/[0.05] flex items-center justify-center text-white/70 hover:border-blue/50 hover:bg-blue/10 transition-colors"
      >
        <AnimatedIcon Icon={User} size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="portal-dropdown absolute right-0 top-full mt-2 min-w-[260px] p-2 z-50"
          >
            <p className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
              Sign in to your portal
            </p>

            <div className="h-px my-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            {PORTAL_OPTIONS.map(({ to, title, subtitle, Icon, iconClass }) => (
              <Link
                key={to}
                to={to}
                role="menuitem"
                onClick={handleNavigate}
                className="portal-dropdown-item flex items-center gap-3 rounded-[10px] p-3 transition-colors group"
              >
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
                  <AnimatedIcon Icon={Icon} size={18} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-white">{title}</span>
                  <span className="block text-xs text-white/45 mt-0.5">{subtitle}</span>
                </span>
                <AnimatedIcon Icon={ChevronRight} size={16} className="text-white/25 group-hover:text-blue-light shrink-0" />
              </Link>
            ))}

            <div className="h-px my-2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            <Link
              to="/contact"
              onClick={handleNavigate}
              className="block px-3 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              New to PR1SM? Request Access →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
