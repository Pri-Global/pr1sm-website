import { useEffect, useRef, useState } from 'react'

const LERP = 0.18
const SIZE = 26

function PrismShape({ scale = 1, glowing = false }) {
  return (
    <svg
      width={SIZE * scale}
      height={SIZE * 1.15 * scale}
      viewBox="0 0 26 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        filter: glowing
          ? 'drop-shadow(0 0 8px rgba(65,105,225,0.9)) drop-shadow(0 0 14px rgba(123,47,190,0.5))'
          : 'drop-shadow(0 0 4px rgba(65,105,225,0.55))',
        transition: 'filter 0.2s ease, width 0.2s ease, height 0.2s ease',
      }}
    >
      <defs>
        <linearGradient id="prism-face-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#2d4db8" />
        </linearGradient>
        <linearGradient id="prism-face-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B2FBE" />
          <stop offset="100%" stopColor="#5a2290" />
        </linearGradient>
        <linearGradient id="prism-face-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7ba7ff" />
          <stop offset="50%" stopColor="#c088f0" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      {/* Left face */}
      <path d="M13 3 L3 9.5 V20.5 L13 27 Z" fill="url(#prism-face-left)" />
      {/* Right face */}
      <path d="M13 3 L23 9.5 V20.5 L13 27 Z" fill="url(#prism-face-right)" />
      {/* Top cap */}
      <path d="M13 3 L23 9.5 L13 12.5 L3 9.5 Z" fill="url(#prism-face-top)" />
      {/* Edge highlights */}
      <path
        d="M13 3 L3 9.5 M13 3 L23 9.5 M13 3 V12.5 M3 9.5 L13 12.5 L23 9.5 M3 9.5 V20.5 L13 27 M23 9.5 V20.5 L13 27 M13 12.5 V27"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* Light refraction line */}
      <path
        d="M8 14 L13 17 L18 14"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function isInteractiveTarget(target) {
  return !!target?.closest(
    'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"]), .cursor-pointer',
  )
}

function isTextInput(target) {
  return !!target?.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea')
}

export default function PrismCursor() {
  const cursorRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const angleRef = useRef(0)
  const prevRef = useRef({ x: -100, y: -100 })

  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = 'ontouchstart' in window

    if (coarse || touch || reduced) return

    setActive(true)
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setTyping(isTextInput(e.target))
      setHovering(isInteractiveTarget(e.target) && !isTextInput(e.target))
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onOver = (e) => {
      setTyping(isTextInput(e.target))
      setHovering(isInteractiveTarget(e.target) && !isTextInput(e.target))
    }

    const tick = () => {
      const target = targetRef.current
      const current = currentRef.current
      const el = cursorRef.current

      current.x += (target.x - current.x) * LERP
      current.y += (target.y - current.y) * LERP

      const dx = current.x - prevRef.current.x
      const dy = current.y - prevRef.current.y
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI) * 0.08
      }
      prevRef.current = { x: current.x, y: current.y }

      if (el) {
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${angleRef.current}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!active) return null

  const scale = hovering ? 1.35 : 1

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      style={{
        opacity: visible && !typing ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {hovering && (
          <div
            className="absolute rounded-full border border-blue/40 prism-cursor-ring pointer-events-none"
            style={{ width: 44, height: 44 }}
          />
        )}
        <PrismShape scale={scale} glowing={hovering} />
      </div>
    </div>
  )
}
