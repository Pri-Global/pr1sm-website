import { motion, useReducedMotion } from 'framer-motion'

const ORBS = [
  { color: '#4169E1', size: 500, top: '5%', left: '-8%', x: [0, 100, -50, 0], y: [0, -80, 40, 0], duration: 20 },
  { color: '#7B2FBE', size: 400, top: '30%', right: '-5%', x: [0, -80, 60, 0], y: [0, 50, -30, 0], duration: 25 },
  { color: '#D4AF37', size: 250, bottom: '10%', left: '35%', x: [0, 40, -60, 0], y: [0, -40, 30, 0], duration: 18 },
  { color: '#4169E1', size: 350, top: '55%', left: '60%', x: [0, -50, 70, 0], y: [0, 60, -50, 0], duration: 30 },
]

export default function FloatingOrbs({ count = 4, className = '' }) {
  const reducedMotion = useReducedMotion()
  const visible = ORBS.slice(0, count)

  if (reducedMotion) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`} aria-hidden="true">
      {visible.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: orb.color,
            filter: `blur(${80 + i * 10}px)`,
            opacity: 0.08 + i * 0.01,
          }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
