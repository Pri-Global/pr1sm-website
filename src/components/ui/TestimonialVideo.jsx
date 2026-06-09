import { useRef, useState, useCallback } from 'react'
import { Play } from 'lucide-react'
import AnimatedIcon from './AnimatedIcon'

export default function TestimonialVideo({ src, name, className = '' }) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [previewing, setPreviewing] = useState(false)
  const [active, setActive] = useState(false)

  const handleMouseEnter = useCallback(async () => {
    if (active) return
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    video.muted = true
    video.loop = true
    video.controls = false
    try {
      await video.play()
      setPreviewing(true)
    } catch {
      /* autoplay blocked */
    }
  }, [active])

  const handleMouseLeave = useCallback(() => {
    if (active) return
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    video.loop = false
    setPreviewing(false)
  }, [active])

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    setActive(true)
    setPreviewing(false)
    video.loop = false
    video.muted = false
    video.controls = true
    video.play()
  }

  const handleEnded = () => {
    setActive(false)
    setPreviewing(false)
  }

  const showOverlay = !previewing && !active

  return (
    <div
      ref={wrapRef}
      className={`aspect-video rounded-xl bg-navy overflow-hidden relative group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        muted
        onEnded={handleEnded}
        aria-label={`${name} video`}
      />
      {showOverlay && (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-navy/40 transition-all duration-300 hover:bg-navy/20"
          aria-label={`Play ${name} video with sound`}
        >
          <span className="w-14 h-14 rounded-full btn-gradient flex items-center justify-center shadow-glow-blue group-hover:scale-105 transition-transform">
            <AnimatedIcon Icon={Play} size={24} fill="white" className="text-white ml-0.5" />
          </span>
        </button>
      )}
    </div>
  )
}
