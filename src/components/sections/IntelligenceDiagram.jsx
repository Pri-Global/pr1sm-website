import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Database,
  Users,
  DollarSign,
  Grid,
  FolderOpen,
  MoreHorizontal,
  BarChart2,
  Lightbulb,
  Bell,
  Zap,
  FileText,
} from 'lucide-react'
import AnimatedIcon from '../ui/AnimatedIcon'
import { dataFlow } from '../../data/home'

const inputs = [
  { label: 'ERP Systems', icon: Database },
  { label: 'CRM', icon: Users },
  { label: 'Financials', icon: DollarSign },
  { label: 'Spreadsheets', icon: Grid },
  { label: 'Project Systems', icon: FolderOpen },
  { label: 'Other Sources', icon: MoreHorizontal },
]

const outputs = [
  { label: 'Dashboards & Reports', icon: BarChart2 },
  { label: 'AI Insights & Answers', icon: Lightbulb },
  { label: 'Alerts & Notifications', icon: Bell },
  { label: 'Automated Workflows', icon: Zap },
  { label: 'Custom Reports', icon: FileText },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const inputItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const outputItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function buildCurve(start, end) {
  const cpX = start.x + (end.x - start.x) * 0.55
  const cpY = start.y
  const d = `M ${start.x} ${start.y} Q ${cpX} ${cpY} ${end.x} ${end.y}`
  return { d, dotPath: d }
}

function DiagramLines({ containerRef, hubRef, inputRefs, outputRefs, animateLines }) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState({ inputs: [], outputs: [] })

  const measure = useCallback(() => {
    const container = containerRef.current
    const hub = hubRef.current
    if (!container || !hub) return

    const cRect = container.getBoundingClientRect()
    if (cRect.width === 0) return

    setSize({ w: cRect.width, h: cRect.height })

    const hubRect = hub.getBoundingClientRect()
    const hubCenter = {
      x: hubRect.left + hubRect.width / 2 - cRect.left,
      y: hubRect.top + hubRect.height / 2 - cRect.top,
    }

    const inputPaths = inputRefs.current
      .filter(Boolean)
      .map((el) => {
        const r = el.getBoundingClientRect()
        const start = {
          x: r.right - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        }
        return buildCurve(start, hubCenter)
      })

    const outputPaths = outputRefs.current
      .filter(Boolean)
      .map((el) => {
        const r = el.getBoundingClientRect()
        const end = {
          x: r.left - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        }
        return buildCurve(hubCenter, end)
      })

    setPaths({ inputs: inputPaths, outputs: outputPaths })
  }, [containerRef, hubRef, inputRefs, outputRefs])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure, { passive: true })
    const container = containerRef.current
    if (!container) return undefined

    const ro = new ResizeObserver(measure)
    ro.observe(container)

    const t1 = setTimeout(measure, 100)
    const t2 = setTimeout(measure, 500)

    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [measure, containerRef])

  if (size.w === 0) return null

  return (
    <svg
      className="absolute inset-0 hidden lg:block pointer-events-none z-[1]"
      width={size.w}
      height={size.h}
      aria-hidden="true"
    >
      <defs>
        <filter id="diagram-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.inputs.map(({ d }) => (
        <path
          key={`in-${d}`}
          d={d}
          fill="none"
          stroke="#4169E1"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
      ))}

      {paths.outputs.map(({ d }) => (
        <path
          key={`out-${d}`}
          d={d}
          fill="none"
          stroke="#7B2FBE"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
      ))}

      {animateLines && paths.inputs.map(({ dotPath }, i) => (
        <motion.circle
          key={`in-dot-${i}`}
          r={2.5}
          fill="#7ba7ff"
          filter="url(#diagram-glow)"
          style={{ offsetPath: `path('${dotPath}')`, offsetRotate: '0deg' }}
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.3,
          }}
        />
      ))}

      {animateLines && paths.outputs.map(({ dotPath }, i) => (
        <motion.circle
          key={`out-dot-${i}`}
          r={2.5}
          fill="#c088f0"
          filter="url(#diagram-glow)"
          style={{ offsetPath: `path('${dotPath}')`, offsetRotate: '0deg' }}
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.5 + i * 0.35,
          }}
        />
      ))}
    </svg>
  )
}

export default function IntelligenceDiagram() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef(null)
  const hubRef = useRef(null)
  const inputRefs = useRef([])
  const outputRefs = useRef([])

  return (
    <div className="relative flex flex-col items-center w-full max-w-lg mx-auto lg:max-w-none">
      <div
        ref={containerRef}
        className="relative grid grid-cols-3 gap-2 lg:gap-3 items-center w-full min-h-[280px] lg:min-h-[320px]"
      >
        <DiagramLines
          containerRef={containerRef}
          hubRef={hubRef}
          inputRefs={inputRefs}
          outputRefs={outputRefs}
          animateLines={!reducedMotion}
        />

        {/* Inputs */}
        <motion.div
          className="relative z-[2] flex flex-col gap-1.5 lg:gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onAnimationComplete={() => {
            window.dispatchEvent(new Event('resize'))
          }}
        >
          {inputs.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              ref={(el) => { inputRefs.current[i] = el }}
              variants={inputItemVariants}
              className="group flex items-center gap-2 bg-navy3/80 border border-white/10 hover:border-blue/40 rounded-xl px-2.5 py-1.5 lg:px-3 lg:py-2.5 transition-colors cursor-default"
            >
              <AnimatedIcon Icon={Icon} size={13} className="text-blue" />
              <span className="text-white/70 text-[10px] lg:text-xs font-body leading-tight">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hub */}
        <div className="relative z-[2] flex flex-col items-center justify-center gap-2 lg:gap-3 self-center">
          <motion.div
            className="relative flex items-center justify-center"
            animate={reducedMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute w-24 h-24 lg:w-32 lg:h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(65,105,225,0.12), transparent 70%)',
                border: '1px solid rgba(65,105,225,0.25)',
              }}
            />
            <div
              ref={hubRef}
              className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex flex-col items-center justify-center z-10"
              style={{
                background: 'linear-gradient(135deg, #0d1b3e, #1a2f6e)',
                border: '1px solid rgba(65,105,225,0.5)',
                boxShadow: '0 0 30px rgba(65,105,225,0.3), inset 0 0 15px rgba(65,105,225,0.1)',
              }}
            >
              <span className="text-white text-[10px] lg:text-xs font-heading font-bold">PR1SM</span>
              <span className="text-white/40 text-[7px] lg:text-[8px] text-center leading-tight mt-0.5 font-body">
                Intelligence
                <br />
                Layer
              </span>
            </div>
          </motion.div>

          <div className="text-center">
            <p className="text-white text-[10px] lg:text-xs font-heading font-semibold">
              {dataFlow.tagline.line1}
            </p>
            <p className="text-[10px] lg:text-xs font-heading font-semibold text-gradient">
              {dataFlow.tagline.line2}
            </p>
          </div>
        </div>

        {/* Outputs */}
        <motion.div
          className="relative z-[2] flex flex-col gap-1.5 lg:gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onAnimationComplete={() => {
            window.dispatchEvent(new Event('resize'))
          }}
        >
          {outputs.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              ref={(el) => { outputRefs.current[i] = el }}
              variants={outputItemVariants}
              className="group flex items-center gap-2 bg-navy3/80 border border-white/10 hover:border-purple/40 rounded-xl px-2.5 py-1.5 lg:px-3 lg:py-2.5 transition-colors cursor-default"
            >
              <AnimatedIcon Icon={Icon} size={13} className="text-purple" />
              <span className="text-white/70 text-[10px] lg:text-xs font-body leading-tight">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
