import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import Logo from '../ui/Logo'

const DEMO_PROMPTS = [
  'What were our top-selling products last quarter?',
  'Summarize our Q3 financial performance',
  'Which suppliers have delivery delays this month?',
  'Show me customer churn trends by region',
]

const DEMO_RESPONSES = {
  'What were our top-selling products last quarter?':
    'Based on your connected ERP data, your top 3 products last quarter were:\n\n1. **Enterprise Suite Pro** — $2.4M revenue (+18% QoQ)\n2. **Cloud Analytics Module** — $1.8M revenue (+24% QoQ)\n3. **Integration Platform** — $1.2M revenue (+9% QoQ)\n\nOverall product revenue grew 15% compared to Q2.',
  'Summarize our Q3 financial performance':
    'Q3 Financial Summary from your connected systems:\n\n• **Revenue:** $12.8M (+12% YoY)\n• **Gross Margin:** 68.2% (+2.1pp)\n• **Operating Expenses:** $4.2M (within budget)\n• **Net Income:** $3.1M (+19% YoY)\n\nKey driver: Enterprise segment growth offset retail softness.',
  'Which suppliers have delivery delays this month?':
    'Analyzing your supply chain data, 3 suppliers have active delays:\n\n1. **TechParts Inc.** — Avg. 4.2 days late (12 open POs)\n2. **Global Logistics Co.** — Avg. 2.8 days late (7 open POs)\n3. **Precision Components** — Avg. 1.5 days late (3 open POs)\n\nRecommended action: Escalate TechParts Inc. — impacts 2 production lines.',
  'Show me customer churn trends by region':
    'Customer churn analysis across regions (last 6 months):\n\n• **North America:** 3.2% (-0.8pp improvement)\n• **Europe:** 4.1% (stable)\n• **APAC:** 5.8% (+1.2pp — needs attention)\n\nAPAC churn correlates with delayed support response times. Suggested intervention: Regional support staffing increase.',
}

export default function ChatDemo({ compact = false }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm PR1SM.AI. Ask me anything about your business data — I'll analyze your connected systems and deliver instant insights.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    const prompt = text.trim()
    if (!prompt || typing) return

    setMessages((prev) => [...prev, { role: 'user', content: prompt }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response =
        DEMO_RESPONSES[prompt] ||
        "I've analyzed your connected data sources. Based on current enterprise metrics, your operations are performing within expected parameters. Would you like me to drill down into a specific area?"
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setTyping(false)
    }, 1200)
  }

  return (
    <div className={`bg-dark-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl ${compact ? '' : 'w-full'}`}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-navy/50">
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

      <div ref={chatContainerRef} className={`overflow-y-auto px-4 py-4 space-y-4 ${compact ? 'h-64' : 'h-80'}`}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-blue text-white'
                  : 'bg-white/5 text-white/80 border border-white/10'
              }`}
            >
              {msg.content.split('\n').map((line, j) => (
                <span key={j}>
                  {line.split(/\*\*(.*?)\*\*/).map((part, k) =>
                    k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                  )}
                  {j < msg.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 text-sm">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {!compact && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {DEMO_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pb-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask PR1SM.AI about your business..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue/50"
        />
        <button
          type="button"
          onClick={() => sendMessage(input)}
          disabled={typing}
          className="bg-blue hover:bg-[#3558C8] disabled:opacity-50 text-white rounded-lg px-4 py-2.5 transition-colors"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
