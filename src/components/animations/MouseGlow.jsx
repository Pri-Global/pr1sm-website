import { useEffect, useRef } from 'react'

const LERP = 0.07

export default function MouseGlow() {
  const mainRef = useRef(null)
  const secondaryRef = useRef(null)
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current

      current.x += (target.x - current.x) * LERP
      current.y += (target.y - current.y) * LERP

      const transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`

      if (mainRef.current) mainRef.current.style.transform = transform
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate3d(${current.x + 40}px, ${current.y - 30}px, 0) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={mainRef}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(65, 105, 225, 0.14) 0%, transparent 70%)',
        }}
      />
      <div
        ref={secondaryRef}
        className="absolute top-0 left-0 w-[320px] h-[320px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(123, 47, 190, 0.1) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
