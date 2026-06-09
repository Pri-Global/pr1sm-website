import {
  Zap, Brain, Network, Sparkles, Shield, Lock, Target, Link2,
  Database, MessageSquare, BarChart3, Plug, Landmark, HeartPulse,
  Factory, ShoppingBag, Package, Building2,
} from 'lucide-react'
import AnimatedIcon from '../components/ui/AnimatedIcon'

const iconMap = {
  Zap, Brain, Network, Sparkles, Shield, Database, MessageSquare,
  BarChart3, Plug, Landmark, HeartPulse, Factory, ShoppingBag,
  Package, Building2, Lock, Target, Link2,
}

export function getIcon(name, props = {}) {
  const Icon = iconMap[name]
  return Icon ? <AnimatedIcon Icon={Icon} {...props} /> : null
}

export { iconMap }
