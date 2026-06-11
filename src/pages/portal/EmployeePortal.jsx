import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Logo from '../../components/ui/Logo'
import AnimatedIcon from '../../components/ui/AnimatedIcon'
import FloatingOrbs from '../../components/animations/FloatingOrbs'
import { useAuth } from '../../contexts/AuthContext'
import { ALLOWED_EMAILS } from '../../data/employeePortal'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'

const cardEnter = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function EmployeePortal() {
  const navigate = useNavigate()
  const { signIn, user, employee, loading: authLoading, profileError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailBlurred, setEmailBlurred] = useState(false)
  const [shake, setShake] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const normalizedEmail = email.trim().toLowerCase()
  const isUnauthorizedEmail = emailBlurred && normalizedEmail && !ALLOWED_EMAILS.includes(normalizedEmail)

  useEffect(() => {
    if (authLoading) return
    if (user && employee && !employee.first_login) {
      navigate('/portal/employee/dashboard', { replace: true })
    }
    if (user && employee) {
      setLoading(false)
    }
  }, [user, employee, authLoading, navigate])

  useEffect(() => {
    if (profileError && user) {
      setError(profileError)
      setLoading(false)
    }
  }, [profileError, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
      setError('This email address is not authorized for portal access.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (!isSupabaseConfigured) {
      setError('Portal authentication is not configured yet. Contact IT.')
      return
    }

    try {
      setLoading(true)
      await signIn(normalizedEmail, password)
    } catch (err) {
      const message = err?.message || ''
      if (message.includes('Invalid login credentials')) {
        setError('Incorrect password. Please try again.')
      } else if (message.includes('Email not confirmed')) {
        setError('Please check your email and confirm your account first.')
      } else if (/invalid api key/i.test(message)) {
        setError(
          'Supabase API key rejected. In Vercel, set VITE_SUPABASE_ANON_KEY to the legacy anon key (starts with eyJ…) from Supabase → Settings → API, then redeploy.',
        )
      } else {
        setError(message || 'Something went wrong. Please try again.')
      }
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setError('')

    if (!normalizedEmail || !ALLOWED_EMAILS.includes(normalizedEmail)) {
      setError('Enter your work email above first, then click "Forgot password?".')
      setEmailBlurred(true)
      return
    }

    if (!isSupabaseConfigured) {
      setError('Portal authentication is not configured yet. Contact IT.')
      return
    }

    try {
      setResetLoading(true)
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/portal/employee/setup`,
      })
      if (resetError) throw resetError
      setResetSent(true)
    } catch (err) {
      setError(err?.message || 'Could not send reset email. Please try again.')
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 sm:py-24 md:py-28 bg-[#080e1e] overflow-x-clip">
      <FloatingOrbs count={2} />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← PR1SM.AI
        </Link>

        <motion.div
          {...cardEnter}
          animate={shake ? { x: [0, -8, 8, -6, 6, -2, 2, 0], opacity: 1, y: 0, scale: 1 } : cardEnter.animate}
          transition={shake ? { duration: 0.5 } : cardEnter.transition}
          className="portal-login-card portal-login-card-purple rounded-[20px] border p-6 sm:p-10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Logo variant="icon" size="default" />
            <span className="badge-purple text-[10px]">Employee Portal</span>
          </div>
          <div className="gradient-divider mb-6" />

          <h1 className="font-heading font-bold text-2xl text-white text-center">Employee Portal</h1>
          <p className="mt-2 text-white/50 text-sm text-center leading-relaxed">
            Internal tools, team resources, and HR dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-red-300 text-sm">
                <AnimatedIcon Icon={AlertCircle} size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {resetSent && (
              <div className="rounded-lg border border-purple/20 bg-purple/10 px-3.5 py-2.5 text-purple-light text-sm">
                Password reset link sent to {normalizedEmail}. Check your inbox.
              </div>
            )}

            <div>
              <label htmlFor="employee-email" className="sr-only">Email</label>
              <input
                id="employee-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailBlurred(true)}
                placeholder="Email address"
                className="portal-input portal-input-purple w-full"
              />
              {isUnauthorizedEmail && (
                <p className="mt-1.5 text-xs text-amber-300/80">This email is not authorized</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="employee-password" className="sr-only">Password</label>
              <input
                id="employee-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="portal-input portal-input-purple w-full pr-11"
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
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-xs text-white/40 hover:text-purple-light transition-colors disabled:opacity-60"
              >
                {resetLoading ? 'Sending…' : 'Forgot password?'}
              </button>
            </p>

            <button
              type="submit"
              disabled={loading || authLoading}
              className="portal-submit-btn portal-submit-btn-purple w-full flex items-center justify-center gap-2 disabled:opacity-80"
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

          <p className="mt-6 text-center text-xs text-white/30">
            Having trouble?{' '}
            <a href="mailto:ajay@pr1sm.ai" className="hover:text-white/60 transition-colors">
              Contact IT → ajay@pr1sm.ai
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
