import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const flipTransition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }

export default function MorphingText({
  words,
  phrases,
  interval = 3000,
  className = 'text-gradient',
  accentClassName = 'text-gradient-animated',
  block = false,
}) {
  const [index, setIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const items = phrases ?? words?.map((word) => ({ line1: word, line2: null })) ?? []

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion || items.length <= 1) return undefined

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [items.length, interval, reducedMotion])

  if (!items.length) return null

  const current = items[index] ?? items[0]

  if (reducedMotion) {
    if (phrases) {
      return (
        <span className="block">
          <span className="block text-white">{current.line1}</span>
          <span className={`block mt-1 ${accentClassName}`}>{current.line2}</span>
        </span>
      )
    }
    return <span className={`${block ? 'block' : 'inline-block'} ${className}`}>{current.line1}</span>
  }

  if (phrases) {
    return (
      <span
        className="relative block min-h-[2.15em] sm:min-h-[2.1em]"
        style={{ perspective: '800px' }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="block"
            initial={{ opacity: 0, rotateX: -75 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 75 }}
            transition={flipTransition}
            style={{ transformOrigin: 'center top' }}
          >
            <span className="block text-white">{current.line1}</span>
            <span className={`block mt-1 ${accentClassName}`}>{current.line2}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }

  return (
    <span
      className={`relative ${block ? 'block min-h-[1.15em] sm:min-h-[1.1em]' : 'inline-block'}`}
      style={{ perspective: block ? '800px' : undefined }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current.line1}
          className={`${block ? 'block' : 'inline-block'} ${className}`}
          initial={{ opacity: 0, rotateX: block ? -75 : 0, y: block ? 0 : 12 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: block ? 75 : 0, y: block ? 0 : -12 }}
          transition={flipTransition}
          style={{ transformOrigin: block ? 'center top' : 'center bottom' }}
        >
          {current.line1}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
