import { useEffect, useState } from 'react'
import ParticleNetwork from './ParticleNetwork'
import MouseGlow from './MouseGlow'

function useHeavyEffectsEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 767px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!coarse && !narrow && !reduced)
  }, [])

  return enabled
}

export default function SiteBackground() {
  const heavyEffects = useHeavyEffectsEnabled()

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {heavyEffects ? (
        <>
          <ParticleNetwork />
          <MouseGlow />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(65,105,225,0.08),transparent_55%)]" />
      )}
    </div>
  )
}
