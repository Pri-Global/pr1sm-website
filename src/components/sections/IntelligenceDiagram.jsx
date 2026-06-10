import { useCallback, useEffect, useId, useRef, useState } from 'react'
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
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const inputItemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const outputItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

function buildCurve(start, end) {
  const cpX = start.x + (end.x - start.x) * 0.55
  const cpY = start.y
  const d = `M ${start.x} ${start.y} Q ${cpX} ${cpY} ${end.x} ${end.y}`
  return { d, dotPath: d }
}

function DiagramLines({
  containerRef,
  hubRef,
  inputRefs,
  outputRefs,
  animateLines,
  activeNode,
  filterId,
}) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState({ inputs: [], outputs: [] })
  const [inView, setInView] = useState(false)

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

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(container)

    const t1 = setTimeout(measure, 100)
    const t2 = setTimeout(measure, 500)

    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
      io.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [measure, containerRef])

  if (size.w === 0) return null

  const isInputActive = (i) => activeNode === `in-${i}`
  const isOutputActive = (i) => activeNode === `out-${i}`
  const hubActive = activeNode === 'hub'

  return (
    <svg
      className="absolute inset-0 hidden md:block pointer-events-none z-[1]"
      width={size.w}
      height={size.h}
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`${filterId}-in-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4169E1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7ba7ff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${filterId}-out-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c088f0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7B2FBE" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {paths.inputs.map(({ d }, i) => {
        const active = isInputActive(i) || hubActive
        return (
          <motion.path
            key={`in-${i}-${d.slice(0, 12)}`}
            d={d}
            fill="none"
            stroke={active ? `url(#${filterId}-in-grad)` : '#4169E1'}
            strokeOpacity={active ? 0.85 : 0.28}
            strokeWidth={active ? 2 : 1}
            strokeDasharray="4 4"
            animate={
              inView
                ? {
                    pathLength: 1,
                    opacity: 1,
                    strokeDashoffset: [0, -100],
                  }
                : { pathLength: 0, opacity: 0, strokeDashoffset: 0 }
            }
            transition={{
              pathLength: { duration: 1.1, delay: 0.2 + i * 0.08, ease: 'easeOut' },
              opacity: { duration: 1.1, delay: 0.2 + i * 0.08, ease: 'easeOut' },
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
          />
        )
      })}

      {paths.outputs.map(({ d }, i) => {
        const active = isOutputActive(i) || hubActive
        return (
          <motion.path
            key={`out-${i}-${d.slice(0, 12)}`}
            d={d}
            fill="none"
            stroke={active ? `url(#${filterId}-out-grad)` : '#7B2FBE'}
            strokeOpacity={active ? 0.85 : 0.28}
            strokeWidth={active ? 2 : 1}
            strokeDasharray="4 4"
            animate={
              inView
                ? {
                    pathLength: 1,
                    opacity: 1,
                    strokeDashoffset: [0, -100],
                  }
                : { pathLength: 0, opacity: 0, strokeDashoffset: 0 }
            }
            transition={{
              pathLength: { duration: 1.1, delay: 0.45 + i * 0.08, ease: 'easeOut' },
              opacity: { duration: 1.1, delay: 0.45 + i * 0.08, ease: 'easeOut' },
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear', delay: i * 0.2 },
            }}
          />
        )
      })}

      {animateLines && inView && paths.inputs.flatMap(({ dotPath }, i) => (
        [0, 0.33, 0.66].map((offset) => (
          <motion.circle
            key={`in-dot-${i}-${offset}`}
            r={activeNode && !isInputActive(i) && !hubActive ? 1.5 : 3}
            fill="#7ba7ff"
            filter={`url(#${filterId})`}
            style={{ offsetPath: `path('${dotPath}')`, offsetRotate: '0deg' }}
            animate={{ offsetDistance: [`${offset * 100}%`, `${(offset + 1) * 100}%`] }}
            transition={{
              duration: 1.8 + i * 0.15,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.25,
            }}
          />
        ))
      ))}

      {animateLines && inView && paths.outputs.flatMap(({ dotPath }, i) => (
        [0, 0.33, 0.66].map((offset) => (
          <motion.circle
            key={`out-dot-${i}-${offset}`}
            r={activeNode && !isOutputActive(i) && !hubActive ? 1.5 : 3}
            fill="#c088f0"
            filter={`url(#${filterId})`}
            style={{ offsetPath: `path('${dotPath}')`, offsetRotate: '0deg' }}
            animate={{ offsetDistance: [`${offset * 100}%`, `${(offset + 1) * 100}%`] }}
            transition={{
              duration: 1.8 + i * 0.15,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.4 + i * 0.3,
            }}
          />
        ))
      ))}
    </svg>
  )
}

function HubPulse({ reducedMotion }) {
  if (reducedMotion) return null
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-blue/30"
          animate={{ scale: [1, 1.55 + i * 0.15], opacity: [0.45, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.9,
          }}
        />
      ))}
    </>
  )
}

export default function IntelligenceDiagram({ layout = 'wide' }) {
  const reducedMotion = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const filterId = `diagram-glow-${uid}`
  const containerRef = useRef(null)
  const hubRef = useRef(null)
  const inputRefs = useRef([])
  const outputRefs = useRef([])
  const [activeNode, setActiveNode] = useState(null)

  const isWide = layout === 'wide'

  return (
    <div
      className={`relative flex flex-col items-center w-full mx-auto ${
        isWide ? 'max-w-none' : 'max-w-lg lg:max-w-none'
      }`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,520px)] h-[280px] md:h-[360px] rounded-full bg-[radial-gradient(circle,rgba(65,105,225,0.08),transparent_70%)] pointer-events-none" />
      <div
        ref={containerRef}
        className={`relative grid grid-cols-3 items-center w-full diagram-grid ${
          isWide
            ? 'gap-3 md:gap-5 xl:gap-10 2xl:gap-14 min-h-[300px] md:min-h-[360px] xl:min-h-[420px]'
            : 'gap-2 lg:gap-3 min-h-[280px] lg:min-h-[320px]'
        }`}
      >
        <DiagramLines
          containerRef={containerRef}
          hubRef={hubRef}
          inputRefs={inputRefs}
          outputRefs={outputRefs}
          animateLines={!reducedMotion}
          activeNode={activeNode}
          filterId={filterId}
        />

        <motion.div
          className="relative z-[2] flex flex-col gap-2 md:gap-2.5 xl:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          onAnimationComplete={() => window.dispatchEvent(new Event('resize'))}
        >
          {inputs.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              ref={(el) => { inputRefs.current[i] = el }}
              variants={inputItemVariants}
              onMouseEnter={() => setActiveNode(`in-${i}`)}
              onMouseLeave={() => setActiveNode(null)}
              onFocus={() => setActiveNode(`in-${i}`)}
              onBlur={() => setActiveNode(null)}
              tabIndex={0}
              className={`diagram-node diagram-node-input group flex items-center gap-2.5 rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 xl:px-4 xl:py-3 transition-all duration-300 cursor-default outline-none ${
                activeNode === `in-${i}` ? 'diagram-node-active-blue' : ''
              }`}
              whileHover={{ scale: 1.03, y: -2 }}
            >
              <span className="diagram-node-icon">
                <AnimatedIcon Icon={Icon} size={14} className="text-blue md:w-4 md:h-4" />
              </span>
              <span className="text-white/75 text-[11px] md:text-xs xl:text-sm font-body leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative z-[2] flex flex-col items-center justify-center gap-2 md:gap-3 xl:gap-4 self-center px-1">
          <motion.div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setActiveNode('hub')}
            onMouseLeave={() => setActiveNode(null)}
            animate={reducedMotion ? undefined : { scale: activeNode === 'hub' ? 1.06 : [1, 1.04, 1] }}
            transition={
              activeNode === 'hub'
                ? { duration: 0.25 }
                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <div className="absolute w-28 h-28 md:w-36 md:h-36 xl:w-44 xl:h-44 rounded-full diagram-hub-glow" />
            {!reducedMotion && (
              <>
                <div className="diagram-hub-orbit" aria-hidden="true" />
                <div className="diagram-hub-orbit diagram-hub-orbit-2" aria-hidden="true" />
              </>
            )}
            <HubPulse reducedMotion={reducedMotion} />
            <div
              ref={hubRef}
              className={`relative w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full flex flex-col items-center justify-center z-10 diagram-hub-core ${
                activeNode === 'hub' ? 'diagram-hub-core-active' : ''
              }`}
            >
              <span className="text-white text-[10px] md:text-xs xl:text-sm font-heading font-bold">PR1SM</span>
              <span className="text-white/45 text-[7px] md:text-[8px] xl:text-[9px] text-center leading-tight mt-0.5 font-body">
                Intelligence
                <br />
                Layer
              </span>
            </div>
          </motion.div>

          <div className="text-center px-1">
            <p className="text-white text-[10px] md:text-xs xl:text-sm font-heading font-semibold">
              {dataFlow.tagline.line1}
            </p>
            <p className="text-[10px] md:text-xs xl:text-sm font-heading font-semibold text-gradient">
              {dataFlow.tagline.line2}
            </p>
          </div>
        </div>

        <motion.div
          className="relative z-[2] flex flex-col gap-2 md:gap-2.5 xl:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          onAnimationComplete={() => window.dispatchEvent(new Event('resize'))}
        >
          {outputs.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              ref={(el) => { outputRefs.current[i] = el }}
              variants={outputItemVariants}
              onMouseEnter={() => setActiveNode(`out-${i}`)}
              onMouseLeave={() => setActiveNode(null)}
              onFocus={() => setActiveNode(`out-${i}`)}
              onBlur={() => setActiveNode(null)}
              tabIndex={0}
              className={`diagram-node diagram-node-output group flex items-center gap-2.5 rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 xl:px-4 xl:py-3 transition-all duration-300 cursor-default outline-none ${
                activeNode === `out-${i}` ? 'diagram-node-active-purple' : ''
              }`}
              whileHover={{ scale: 1.03, y: -2 }}
            >
              <span className="diagram-node-icon">
                <AnimatedIcon Icon={Icon} size={14} className="text-purple md:w-4 md:h-4" />
              </span>
              <span className="text-white/75 text-[11px] md:text-xs xl:text-sm font-body leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
