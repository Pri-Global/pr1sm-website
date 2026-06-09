/**
 * Per-icon stroke draw order on hover (path indices = DOM order in Lucide SVG).
 */

export const ICON_DRAW_SEQUENCES = {
  Zap: { twoPhase: [0.52, 1], stagger: 0.22 },
  Wifi: { order: 'length-asc', stagger: 0.14 },
  Shield: { order: [0], stagger: 0 },
  Plug: { order: [1, 0, 2], stagger: 0.13 },
  Database: { order: [0, 1, 2], stagger: 0.13 },
  Users: { order: [3, 0, 2, 1], stagger: 0.11 },
  DollarSign: { order: [0, 1], stagger: 0.14 },
  Grid: { order: 'length-asc', stagger: 0.1 },
  FolderOpen: { order: [0, 1], stagger: 0.13 },
  MoreHorizontal: { order: 'length-asc', stagger: 0.12 },
  BarChart2: { order: [0, 1, 2, 3], stagger: 0.11 },
  BarChart3: { order: [0, 3, 2, 1], stagger: 0.11 },
  Lightbulb: { order: [0, 1], stagger: 0.14 },
  Bell: { order: [0, 1], stagger: 0.12 },
  FileText: { order: [0, 1, 2, 3, 4], stagger: 0.09 },
  ArrowRight: { order: [0, 1], stagger: 0.14 },
  Play: { order: [0, 1], stagger: 0.12 },
  Sparkles: { order: 'length-asc', stagger: 0.08 },
  Send: { order: [0, 1], stagger: 0.14 },
  Menu: { order: 'length-asc', stagger: 0.08 },
  X: { order: [0, 1], stagger: 0.1 },
  ChevronDown: { order: [0], stagger: 0 },
  Brain: { order: [0, 1, 2], stagger: 0.1 },
  Network: { order: 'length-asc', stagger: 0.1 },
  MessageSquare: { order: [0], stagger: 0 },
  Lock: { order: [0, 1], stagger: 0.14 },
  Target: { order: [0, 1, 2], stagger: 0.12 },
  Link2: { order: [0, 1], stagger: 0.13 },
  Landmark: { order: [0, 1, 2, 3], stagger: 0.1 },
  HeartPulse: { order: [0, 1, 2], stagger: 0.1 },
  Factory: { order: [0, 1, 2], stagger: 0.11 },
  ShoppingBag: { order: [0, 1, 2], stagger: 0.11 },
  Package: { order: [0, 1, 2], stagger: 0.11 },
  Building2: { order: [0, 1, 2], stagger: 0.11 },
  Construction: { order: 'length-asc', stagger: 0.1 },
  Manufacturing: { order: 'length-asc', stagger: 0.1 },
  RealEstate: { order: 'length-asc', stagger: 0.1 },
  FinancialServices: { order: 'length-asc', stagger: 0.09 },
  Healthcare: { order: 'length-asc', stagger: 0.1 },
  Government: { order: 'length-asc', stagger: 0.1 },
  AnyBusiness: { order: 'length-asc', stagger: 0.09 },
}

const DEFAULT_STAGGER = 0.1
const PATH_DURATION = 0.42

export function buildDrawPlan(iconName, elements) {
  const config = ICON_DRAW_SEQUENCES[iconName] ?? { order: 'length-asc', stagger: DEFAULT_STAGGER }

  if (config.twoPhase && elements.length > 0) {
    return {
      twoPhase: true,
      el: elements[0],
      phases: config.twoPhase,
      stagger: config.stagger ?? 0.2,
    }
  }

  let ordered = elements

  if (Array.isArray(config.order)) {
    ordered = config.order.map((i) => elements[i]).filter(Boolean)
  } else if (config.order === 'length-asc') {
    ordered = [...elements].sort((a, b) => a.getTotalLength() - b.getTotalLength())
  } else if (config.order === 'length-desc') {
    ordered = [...elements].sort((a, b) => b.getTotalLength() - a.getTotalLength())
  }

  const stagger = config.stagger ?? DEFAULT_STAGGER

  return ordered.map((el, i) => ({
    el,
    delay: i * stagger,
    duration: PATH_DURATION,
  }))
}

export function getIconName(Icon) {
  return Icon?.displayName || Icon?.name || ''
}
