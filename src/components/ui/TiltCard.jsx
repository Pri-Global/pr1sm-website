import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from 'framer-motion'

export default function TiltCard({ children, className = '', glow = true }) {
  const cardRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(cardRef.current, {
      rotateX: -y * 12,
      rotateY: x * 12,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    })

    if (glow) {
      cardRef.current.style.setProperty('--spot-x', `${(x + 0.5) * 100}%`)
      cardRef.current.style.setProperty('--spot-y', `${(y + 0.5) * 100}%`)
    }
  }, [reducedMotion, glow])

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }, [reducedMotion])

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
