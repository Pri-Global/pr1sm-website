import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function MorphingText({
  words,
  phrases,
  interval = 4000,
  className = 'text-gradient',
  accentClassName = 'text-gradient-animated',
  block = false,
}) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const items = phrases ?? words?.map((word) => ({ line1: word, line2: null })) ?? []

  useEffect(() => {
    if (reducedMotion || items.length <= 1) return undefined

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [items.length, interval, reducedMotion])

  const current = items[index] ?? items[0]
  if (!current) return null

  if (phrases) {
    return (
      <span className="relative block min-h-[2.3em] sm:min-h-[2.2em] md:min-h-[2.1em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="block"
          >
            <span className="block text-white">{current.line1}</span>
            <span className={`block mt-1 ${accentClassName}`}>{current.line2}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }

  return (
    <span className={block ? `block ${className}` : `inline-block ${className}`}>
      {current.line1}
    </span>
  )
}
