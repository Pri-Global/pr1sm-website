import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function parseStatValue(value) {
  const match = String(value).match(/^([\d.]+)(.*)$/)
  if (!match) return { isText: true, text: value }
  return {
    end: parseFloat(match[1]),
    suffix: match[2] || '',
    decimals: match[1].includes('.') ? match[1].split('.')[1].length : 0,
  }
}

function formatCount(current, decimals, suffix) {
  const n = decimals > 0 ? current.toFixed(decimals) : String(Math.round(current))
  return `${n}${suffix}`
}

function useCountUp(end, decimals, suffix, active) {
  const [display, setDisplay] = useState(formatCount(0, decimals, suffix))
  const [done, setDone] = useState(false)
  const [flickering, setFlickering] = useState(false)

  useEffect(() => {
    if (!active) return undefined

    setDone(false)
    setFlickering(true)
    setDisplay(formatCount(0, decimals, suffix))

    let flickerCount = 0
    const flickerInterval = setInterval(() => {
      const random = Math.random() * end * 1.2
      setDisplay(formatCount(random, decimals, suffix))
      flickerCount += 1
      if (flickerCount >= 6) {
        clearInterval(flickerInterval)
        setFlickering(false)
      }
    }, 30)

    const startDelay = setTimeout(() => {
      const duration = 2200
      const startTime = performance.now()
      let rafId = null

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        const current = end * eased
        setDisplay(formatCount(current, decimals, suffix))

        if (progress < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          setDisplay(formatCount(end, decimals, suffix))
          setDone(true)
        }
      }

      rafId = requestAnimationFrame(tick)
    }, 220)

    return () => {
      clearInterval(flickerInterval)
      clearTimeout(startDelay)
    }
  }, [active, end, decimals, suffix])

  return { display, done, flickering }
}

export default function AnimatedStat({ value, index = 0, isText = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [pulse, setPulse] = useState(false)
  const parsed = isText ? { isText: true, text: value } : parseStatValue(value)

  const { display: countDisplay, done } = useCountUp(
    parsed.isText ? 0 : parsed.end,
    parsed.isText ? 0 : parsed.decimals,
    parsed.isText ? '' : parsed.suffix,
    !parsed.isText && inView,
  )

  useEffect(() => {
    if (done) setPulse(true)
  }, [done])

  if (parsed.isText) {
    return (
      <motion.p
        ref={ref}
        className="stat-value"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      >
        {parsed.text || value}
      </motion.p>
    )
  }

  return (
    <motion.p
      ref={ref}
      className={`stat-value ${pulse ? 'stat-pulse' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
    >
      {countDisplay}
    </motion.p>
  )
}
