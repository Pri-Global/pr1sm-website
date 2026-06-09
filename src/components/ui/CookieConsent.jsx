import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'pr1sm-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-live="polite"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[100] sm:max-w-md"
        >
          <div className="nav-shell-glass rounded-2xl border border-white/[0.12] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            <p id="cookie-consent-title" className="font-heading font-semibold text-white text-sm mb-2">
              We use cookies
            </p>
            <p className="text-white/55 text-xs leading-relaxed mb-4">
              We use essential and analytics cookies to improve your experience on pr1sm.ai. By clicking
              &ldquo;Accept&rdquo;, you agree to our use of cookies. See our{' '}
              <Link to="/cookies" className="text-blue-light hover:text-white underline-offset-2 hover:underline">
                Cookie Policy
              </Link>{' '}
              for details.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={accept} className="btn-gradient text-sm !px-5 !py-2.5">
                Accept
              </button>
              <Link
                to="/cookies"
                onClick={accept}
                className="text-xs text-white/45 hover:text-white/70 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
