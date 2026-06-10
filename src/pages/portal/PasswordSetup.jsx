import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Check, CheckCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import AnimatedIcon from '../../components/ui/AnimatedIcon'
import FloatingOrbs from '../../components/animations/FloatingOrbs'
import { useAuth } from '../../contexts/AuthContext'

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '' }
  if (password.length < 8) return { level: 1, label: 'Weak' }

  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const hasUpper = /[A-Z]/.test(password)

  if (password.length >= 8 && hasNumber && hasSpecial && hasUpper) {
    return { level: 4, label: 'Strong' }
  }
  if (password.length >= 8 && (hasNumber || hasSpecial)) {
    return { level: 3, label: 'Good' }
  }
  return { level: 2, label: 'Fair' }
}

const STRENGTH_COLORS = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']

const cardEnter = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function PasswordSetup() {
  const navigate = useNavigate()
  const { updatePassword, updateProfile } = useAuth()
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const strength = useMemo(() => getPasswordStrength(password), [password])
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      setLoading(true)
      if (fullName.trim()) {
        await updateProfile({ full_name: fullName.trim() })
      }
      await updatePassword(password)
      navigate('/portal/employee/dashboard', { replace: true })
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#080e1e] overflow-x-clip">
      <FloatingOrbs count={2} />

      <motion.div
        {...cardEnter}
        className="relative z-10 w-full max-w-md portal-login-card portal-login-card-purple rounded-[20px] border p-6 sm:p-10 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="flex justify-center"
        >
          <AnimatedIcon Icon={CheckCircle} size={48} className="text-green-400" />
        </motion.div>

        <h1 className="mt-4 font-heading font-bold text-2xl text-white text-center">Welcome to PR1SM!</h1>
        <p className="mt-2 text-white/50 text-sm text-center">Set up your password to get started.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-red-300 text-sm">
              <AnimatedIcon Icon={AlertCircle} size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="full-name" className="sr-only">Full name</label>
            <input
              id="full-name"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="portal-input portal-input-purple w-full"
            />
          </div>

          <div>
            <label htmlFor="new-password" className="sr-only">New password</label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
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
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        bar <= strength.level ? STRENGTH_COLORS[strength.level] : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/40 mt-1">{strength.label}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <label htmlFor="confirm-password" className="sr-only">Confirm password</label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="portal-input portal-input-purple w-full pr-11"
            />
            <AnimatePresence>
              {passwordsMatch && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
                >
                  <AnimatedIcon Icon={Check} size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={loading}
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
                  Setting up...
                </motion.span>
              ) : (
                <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Set Password & Enter Portal →
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
    </section>
  )
}
