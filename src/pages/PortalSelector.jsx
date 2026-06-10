import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, ChevronRight, Users } from 'lucide-react'
import Logo from '../components/ui/Logo'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import FloatingOrbs from '../components/animations/FloatingOrbs'

const PORTALS = [
  {
    to: '/portal/client',
    title: 'Client Portal',
    description: 'AI dashboard, talent pipeline & project status',
    Icon: Briefcase,
    accent: 'blue',
    iconBg: 'bg-blue/15',
    iconColor: 'text-blue-light',
    border: 'border-blue/20 hover:border-blue/50',
    arrowColor: 'text-blue',
  },
  {
    to: '/portal/employee',
    title: 'Employee Portal',
    description: 'Internal tools, resources & team dashboard',
    Icon: Users,
    accent: 'purple',
    iconBg: 'bg-purple/15',
    iconColor: 'text-purple-light',
    border: 'border-purple/20 hover:border-purple/50',
    arrowColor: 'text-purple',
  },
]

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function PortalSelector() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-24 sm:py-28 bg-[#080e1e] overflow-x-clip">
      <FloatingOrbs count={2} />

      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        <Logo variant="icon" size="lg" className="mx-auto mb-8" />

        <motion.div {...cardMotion}>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">Welcome Back</h1>
          <p className="mt-2 text-white/50 text-sm sm:text-base">Choose your portal to continue</p>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {PORTALS.map((portal) => (
            <motion.button
              key={portal.to}
              type="button"
              onClick={() => navigate(portal.to)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`portal-card text-left rounded-2xl border p-6 transition-colors ${portal.border}`}
            >
              <span className={`inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4 ${portal.iconBg}`}>
                <AnimatedIcon Icon={portal.Icon} size={32} className={portal.iconColor} />
              </span>
              <h2 className="font-heading font-semibold text-white text-base">{portal.title}</h2>
              <p className="mt-1.5 text-white/50 text-xs leading-relaxed">{portal.description}</p>
              <AnimatedIcon Icon={ChevronRight} size={18} className={`${portal.arrowColor} mt-3`} />
            </motion.button>
          ))}
        </motion.div>

        <Link
          to="/"
          className="inline-block mt-10 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← Back to PR1SM.AI
        </Link>
      </div>
    </section>
  )
}
