import {
  AlertTriangle,
  Brain,
  Building2,
  ClipboardList,
  Clock,
  Cpu,
  Crown,
  Database,
  DollarSign,
  FileText,
  Gauge,
  Heart,
  Kanban,
  Key,
  Layers,
  Lightbulb,
  Link2,
  Lock,
  MessageSquare,
  Mic,
  PiggyBank,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react'

export const iconMap = {
  AlertTriangle,
  Brain,
  Building2,
  ClipboardList,
  Clock,
  Cpu,
  Crown,
  Database,
  DollarSign,
  FileText,
  Gauge,
  Heart,
  Kanban,
  Key,
  Layers,
  Lightbulb,
  Link2,
  Lock,
  MessageSquare,
  Mic,
  PiggyBank,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
}

export const accentStyles = {
  blue: {
    border: '#4169e1',
    text: '#7ba7ff',
    iconBg: 'bg-blue/20',
    iconText: 'text-blue-light',
    gradient: 'linear-gradient(90deg, #4169e1, #7b2fbe)',
  },
  purple: {
    border: '#7b2fbe',
    text: '#c088f0',
    iconBg: 'bg-purple/20',
    iconText: 'text-purple-light',
    gradient: 'linear-gradient(90deg, #7b2fbe, #4169e1)',
  },
  gold: {
    border: '#d4af37',
    text: '#d4af37',
    iconBg: 'bg-gold/20',
    iconText: 'text-gold',
    gradient: 'linear-gradient(90deg, #d4af37, #7b2fbe)',
  },
  teal: {
    border: '#1d9e75',
    text: '#4dd4a8',
    iconBg: 'bg-teal/20',
    iconText: 'text-teal-light',
    gradient: 'linear-gradient(90deg, #1d9e75, #4169e1)',
  },
}

export const dotClasses = ['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold', 'feature-dot-teal']

export const iconBgClasses = [
  'bg-blue/20 text-blue-light',
  'bg-purple/20 text-purple-light',
  'bg-gold/20 text-gold',
  'bg-teal/20 text-teal-light',
]

export function getIcon(name) {
  return iconMap[name] || Sparkles
}
