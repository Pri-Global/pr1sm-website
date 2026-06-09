import { Sparkles } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

const SAMPLE_PROMPTS = [
  'Top products last quarter?',
  'Q3 financial summary',
  'Supplier delays this month?',
]

export default function ChatPreview() {
  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-navy/80">
        <div className="w-8 h-8 rounded-lg bg-blue/20 flex items-center justify-center">
          <Sparkles size={16} className="text-blue" />
        </div>
        <div>
          <Logo variant="icon" size="sm" />
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Live Demo</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-white/50">Online</span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3 h-64">
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed bg-white/5 text-white/80 border border-white/10">
            Hello! I&apos;m PR1SM.AI. Ask me anything about your business data.
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-xl px-4 py-3 text-sm bg-blue text-white">
            What were our top-selling products last quarter?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed bg-white/5 text-white/80 border border-white/10">
            Your top 3 products: Enterprise Suite Pro ($2.4M), Cloud Analytics ($1.8M), Integration Platform ($1.2M).
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 flex flex-wrap gap-2">
        {SAMPLE_PROMPTS.map((prompt) => (
          <span
            key={prompt}
            className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
          >
            {prompt}
          </span>
        ))}
      </div>

      <div className="px-4 pb-4">
        <Button to="/platform#demo" variant="primary" className="w-full text-sm !py-2.5">
          Try Interactive Demo
        </Button>
      </div>
    </div>
  )
}
