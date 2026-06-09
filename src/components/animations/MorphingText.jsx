import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function MorphingText({
  words,
  interval = 2500,
  className = 'text-gradient',
}) {
  const [index, setIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval, reducedMotion])

  if (reducedMotion) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={`inline-block ${className}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
