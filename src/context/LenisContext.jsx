import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - (2 ** (-10 * t))),
      smoothWheel: true,
    })

    setLenis(instance)

    let rafId = null
    const raf = (time) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const value = useMemo(() => lenis, [lenis])

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  )
}
