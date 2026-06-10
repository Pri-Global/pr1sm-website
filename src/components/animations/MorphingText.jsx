import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function MorphingText({
  words,
  interval = 3000,
  className = 'text-gradient',
  block = false,
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
    return <span className={`${block ? 'block' : 'inline-block'} ${className}`}>{words[0]}</span>
  }

  return (
    <span
      className={`relative ${block ? 'block min-h-[1.15em] sm:min-h-[1.1em]' : 'inline-block'}`}
      style={{ perspective: block ? '800px' : undefined }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={`${block ? 'block' : 'inline-block'} ${className}`}
          initial={{ opacity: 0, rotateX: block ? -75 : 0, y: block ? 0 : 12 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: block ? 75 : 0, y: block ? 0 : -12 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: block ? 'center top' : 'center bottom' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
