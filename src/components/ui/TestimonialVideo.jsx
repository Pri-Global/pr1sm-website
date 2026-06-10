import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import AnimatedIcon from './AnimatedIcon'

export default function TestimonialVideo({ src, name, className = '' }) {
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    setActive(true)
    video.muted = false
    video.loop = false
    video.controls = true
    video.play().catch(() => {
      /* playback blocked */
    })
  }

  const handleEnded = () => {
    const video = videoRef.current
    setActive(false)
    if (!video) return
    video.controls = false
    video.muted = true
    video.currentTime = 0
  }

  return (
    <div className={`aspect-video rounded-xl bg-navy overflow-hidden relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        muted
        controls={active}
        onEnded={handleEnded}
        aria-label={`${name} video`}
      />
      {!active && (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 z-10 flex items-center justify-center bg-navy/40 transition-all duration-300 hover:bg-navy/20 cursor-pointer"
          aria-label={`Play ${name} video with sound`}
        >
          <span className="w-14 h-14 rounded-full btn-gradient flex items-center justify-center shadow-glow-blue hover:scale-105 transition-transform">
            <AnimatedIcon Icon={Play} size={24} fill="white" className="text-white ml-0.5" />
          </span>
        </button>
      )}
    </div>
  )
}
