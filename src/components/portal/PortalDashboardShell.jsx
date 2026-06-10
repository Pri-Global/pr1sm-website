import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Logo from '../ui/Logo'
import AnimatedIcon from '../ui/AnimatedIcon'
import FloatingOrbs from '../animations/FloatingOrbs'

export default function PortalDashboardShell({
  title,
  subtitle,
  accent = 'blue',
  signOutTo,
  children,
}) {
  const accentBorder = accent === 'purple' ? 'border-purple/20' : 'border-blue/20'
  const accentBadge = accent === 'purple' ? 'badge-purple' : 'badge-blue'

  return (
    <section className="relative min-h-screen bg-[#080e1e] overflow-x-clip">
      <FloatingOrbs count={2} />

      <div className="relative z-10">
        <header className={`border-b ${accentBorder} bg-navy3/60 backdrop-blur-xl`}>
          <div className="container-wide flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4 px-4 sm:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <Logo variant="icon" size="sm" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-heading font-bold text-white text-base sm:text-lg">{title}</h1>
                  <span className={`badge ${accentBadge} !py-0.5 !text-[9px]`}>Live</span>
                </div>
                {subtitle && (
                  <p className="text-white/45 text-xs sm:text-sm truncate mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>

            <Link
              to={signOutTo}
              className="inline-flex items-center gap-2 self-start sm:self-auto text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <AnimatedIcon Icon={LogOut} size={14} />
              Sign out
            </Link>
          </div>
        </header>

        <div className="container-wide px-4 sm:px-6 py-6 sm:py-8 lg:py-10 overflow-x-clip">
          {children}
        </div>
      </div>
    </section>
  )
}
