import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useIsDesktop from '../../hooks/useIsDesktop'

function isInteractiveTarget(target) {
  return !!target?.closest('a, button, [role="button"], [data-cursor], input, textarea, select, label, summary')
}

function isTextInput(target) {
  return !!target?.closest(
    'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea',
  )
}

export default function CustomCursor() {
  const isDesktop = useIsDesktop(1024)
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!isDesktop) {
      setEnabled(false)
      return undefined
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!reduced && !coarse)

    return undefined
  }, [isDesktop])

  useEffect(() => {
    if (!enabled) return undefined

    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return undefined

    document.documentElement.classList.add('custom-cursor')

    gsap.set(dotEl, { x: -100, y: -100, force3D: true })
    gsap.set(ringEl, { x: -100, y: -100, force3D: true, scale: 1 })

    const moveDotX = gsap.quickTo(dotEl, 'x', { duration: 0.1, ease: 'power3.out' })
    const moveDotY = gsap.quickTo(dotEl, 'y', { duration: 0.1, ease: 'power3.out' })
    const moveRingX = gsap.quickTo(ringEl, 'x', { duration: 0.15, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ringEl, 'y', { duration: 0.15, ease: 'power3.out' })

    const onMove = (e) => {
      moveDotX(e.clientX - 3)
      moveDotY(e.clientY - 3)
      moveRingX(e.clientX - 16)
      moveRingY(e.clientY - 16)
    }

    const onEnter = (e) => {
      const isCard = !!e.target?.closest('.card, .card-dark, .card-glow, .use-case-card, .role-card, .tilt-card')
      gsap.to(ringEl, {
        scale: isCard ? 1.8 : 1.6,
        borderColor: 'rgba(65, 105, 225, 0.6)',
        backgroundColor: 'rgba(65, 105, 225, 0.12)',
        duration: 0.3,
        ease: 'power2.out',
      })
      if (isCard && label.current) {
        gsap.to(label.current, { opacity: 1, duration: 0.2 })
      }
    }

    const onLeave = () => {
      gsap.to(ringEl, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      })
      if (label.current) {
        gsap.to(label.current, { opacity: 0, duration: 0.2 })
      }
    }

    const onOver = (e) => {
      if (isTextInput(e.target)) {
        gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.15 })
        return
      }
      gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.15 })
      if (isInteractiveTarget(e.target)) onEnter(e)
      else onLeave()
    }

    const selector = 'a, button, [data-cursor], .card, .card-dark, .card-glow, .use-case-card, .role-card, .tilt-card'
    const bound = new WeakSet()

    const bindInteractives = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (bound.has(el)) return
        bound.add(el)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    bindInteractives()
    const observer = new MutationObserver(bindInteractives)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.querySelectorAll(selector).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      gsap.killTweensOf([dotEl, ringEl, label.current])
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[99999] pointer-events-none mix-blend-difference will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full z-[99998] pointer-events-none mix-blend-difference flex items-center justify-center will-change-transform"
        aria-hidden="true"
      >
        <span ref={label} className="text-[8px] uppercase tracking-widest text-white/90 opacity-0 font-medium">
          View
        </span>
      </div>
    </>
  )
}
