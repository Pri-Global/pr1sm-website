import { useEffect, useState } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'

function scrambleText(target, progress) {
  const chars = target.split('')
  const letterIndices = chars.reduce((acc, char, i) => {
    if (/[A-Za-z0-9]/.test(char)) acc.push(i)
    return acc
  }, [])

  const resolvedCount = Math.floor(progress * letterIndices.length)
  const resolved = new Set(letterIndices.slice(0, resolvedCount))

  return chars
    .map((char, i) => {
      if (!/[A-Za-z0-9]/.test(char)) return char
      if (resolved.has(i)) return char
      return CHARSET[Math.floor(Math.random() * CHARSET.length)]
    })
    .join('')
}

function ScrambleLine({ text, className, duration = 750, reducedMotion }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text)
      return undefined
    }

    const start = performance.now()
    let frameId = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(scrambleText(text, progress))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [text, duration, reducedMotion])

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  )
}

export default function MorphingText({
  words,
  phrases,
  interval = 4000,
  className = 'text-gradient',
  accentClassName = 'text-gradient-animated',
  block = false,
  scrambleDuration = 750,
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

  const current = items[index] ?? items[0]
  if (!current) return null

  if (phrases) {
    return (
      <span className="relative block min-h-[2.15em] sm:min-h-[2.1em]">
        <ScrambleLine
          text={current.line1}
          className="block text-white"
          duration={scrambleDuration}
          reducedMotion={reducedMotion}
        />
        <ScrambleLine
          text={current.line2}
          className={`block mt-1 ${accentClassName}`}
          duration={scrambleDuration}
          reducedMotion={reducedMotion}
        />
      </span>
    )
  }

  return (
    <ScrambleLine
      text={current.line1}
      className={block ? `block ${className}` : `inline-block ${className}`}
      duration={scrambleDuration}
      reducedMotion={reducedMotion}
    />
  )
}
