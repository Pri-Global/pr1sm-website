import { motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo'

const overlayVariants = {
  initial: { scaleY: 0, transformOrigin: 'bottom' },
  enter: {
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    scaleY: 0,
    transformOrigin: 'top',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
  },
}

const logoVariants = {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.25, delay: 0.15 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export function PageTransitionOverlay({ show }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion || !show) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9990] bg-[#4169E1] flex items-center justify-center pointer-events-none"
      variants={overlayVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div variants={logoVariants}>
        <Logo variant="icon" size="nav" className="scale-150 brightness-0 invert" />
      </motion.div>
    </motion.div>
  )
}

export default function PageTransition({ children }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
