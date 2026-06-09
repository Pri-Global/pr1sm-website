import ParticleNetwork from './ParticleNetwork'
import MouseGlow from './MouseGlow'

export default function SiteBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <ParticleNetwork />
      <MouseGlow />
    </div>
  )
}
