import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Shield,
} from 'lucide-react'
import Logo from '../components/ui/Logo'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import FloatingOrbs from '../components/animations/FloatingOrbs'

const DEMO = {
  hiring: { email: 'hiring@company.com', password: 'Client2025!' },
  services: { email: 'services@pr1sm.ai', password: 'Services2025!' },
}

const cardEnter = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function ClientPortal() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('hiring')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  const fillDemo = () => {
    const creds = DEMO[tab]
    setEmail(creds.email)
    setPassword(creds.password)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1500))

    const creds = DEMO[tab]
    if (email === creds.email && password === creds.password) {
      setSuccess(true)
      return
    }

    setLoading(false)
    setError('Invalid credentials. Try the demo credentials below.')
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  useEffect(() => {
    if (!success) return undefined
    const timer = setTimeout(() => navigate('/portal/client/dashboard'), 2100)
    return () => clearTimeout(timer)
  }, [success, navigate])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-24 sm:py-28 bg-[#080e1e] overflow-x-clip">
      <FloatingOrbs count={2} />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Link
          to="/portal"
          className="inline-block mb-6 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← Portals
        </Link>

        <motion.div
          {...cardEnter}
          animate={shake ? { x: [0, -8, 8, -6, 6, -2, 2, 0], opacity: 1, y: 0, scale: 1 } : cardEnter.animate}
          transition={shake ? { duration: 0.5 } : cardEnter.transition}
          className="portal-login-card portal-login-card-blue rounded-[20px] border p-6 sm:p-10 backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <AnimatedIcon Icon={CheckCircle} size={48} className="text-blue mx-auto" />
                </motion.div>
                <h1 className="mt-4 font-heading font-bold text-2xl text-white">Welcome back!</h1>
                <p className="mt-2 text-white/50 text-sm">Redirecting to your dashboard...</p>
                <div className="mt-6 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue to-purple"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Logo variant="icon" size="default" className="mx-auto mb-4" />
                <div className="gradient-divider mb-6" />

                <h1 className="font-heading font-bold text-2xl text-white text-center">Client Portal</h1>
                <p className="mt-2 text-white/50 text-sm text-center leading-relaxed">
                  Access your AI dashboard, talent pipeline, and project status.
                </p>

                <div className="mt-6 bg-[#0a1020] border border-white/[0.06] rounded-xl p-1 grid grid-cols-2 gap-1">
                  {[
                    { id: 'hiring', label: 'Hiring Client' },
                    { id: 'services', label: 'Services / PR1SM.AI' },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setTab(id); setError('') }}
                      className={`rounded-lg px-2 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                        tab === id ? 'bg-blue text-white' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-red-300 text-sm">
                      <AnimatedIcon Icon={AlertCircle} size={16} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="client-email" className="sr-only">Email</label>
                    <input
                      id="client-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="portal-input w-full"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="client-password" className="sr-only">Password</label>
                    <input
                      id="client-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="portal-input w-full pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <AnimatedIcon Icon={showPassword ? EyeOff : Eye} size={18} />
                    </button>
                  </div>

                  <p className="text-right">
                    <span className="text-xs text-white/40 hover:text-blue-light cursor-pointer transition-colors">
                      Forgot password?
                    </span>
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="portal-submit-btn w-full flex items-center justify-center gap-2 disabled:opacity-80"
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <AnimatedIcon Icon={Loader2} size={18} className="animate-spin" />
                          Signing in...
                        </motion.span>
                      ) : (
                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Sign In →
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </form>

                <button
                  type="button"
                  onClick={fillDemo}
                  className="mt-4 w-full text-left rounded-lg border border-blue/15 bg-blue/[0.08] px-3.5 py-2.5 text-[11px] text-white/40 hover:border-blue/30 transition-colors"
                >
                  Demo: {DEMO[tab].email} / {DEMO[tab].password}
                </button>

                <div className="my-5 flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-xs text-white/30">or</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <button
                  type="button"
                  disabled
                  title="Contact your admin to enable SSO"
                  className="w-full flex items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/40 opacity-50 cursor-not-allowed"
                >
                  <AnimatedIcon Icon={Shield} size={16} />
                  Continue with SSO
                </button>

                <p className="mt-6 text-center text-xs text-white/30 hover:text-white/60">
                  <Link to="/contact">Need access? Request here →</Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
