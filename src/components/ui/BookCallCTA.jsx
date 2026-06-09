import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import Button from './Button'
import SectionLabel from './SectionLabel'
import AnimatedIcon from './AnimatedIcon'
import GradientOrb from '../animations/GradientOrb'

const DEFAULT_HEADING = 'Ready to see PR1SM in action?'
const DEFAULT_SUBHEADING =
  'Book a personalized walkthrough with our team — see how AI turns your scattered data into instant answers.'

const TRUST_PILLS = ['29+ Years Enterprise', 'SOC 2 Compliant', '2–4 Week Setup']

export default function BookCallCTA({ heading, subheading, className = '' }) {
  const title = heading || DEFAULT_HEADING
  const text = subheading || DEFAULT_SUBHEADING

  return (
    <section className={`relative section-padding section-default overflow-hidden ${className}`}>
      <GradientOrb color="blue" size={480} top="-120px" right="-100px" opacity={0.55} />
      <GradientOrb color="purple" size={360} bottom="-80px" left="-60px" opacity={0.45} />
      <GradientOrb color="gold" size={220} top="40%" left="45%" opacity={0.25} />

      <div className="container-wide relative z-10">
        <div className="cta-panel">
          <div className="cta-panel-grid absolute inset-0 opacity-[0.35]" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center p-8 md:p-12 lg:p-14">
            <div>
              <SectionLabel>Next Step</SectionLabel>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-white leading-[1.1]">
                {title}
              </h2>
              <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed max-w-xl">{text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST_PILLS.map((pill) => (
                  <span key={pill} className="badge-blue !text-[9px] !tracking-[0.1em]">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-white/[0.08] bg-navy/50 p-5 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center shrink-0">
                    <AnimatedIcon Icon={Calendar} size={18} className="text-white" />
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-white text-sm">30-minute demo</p>
                    <p className="text-white/45 text-xs">No commitment required</p>
                  </div>
                </div>
                <Button to="/request" variant="primary" className="w-full !justify-center">
                  Book a Call <AnimatedIcon Icon={ArrowRight} size={18} />
                </Button>
                <Button to="/our-platform" variant="ghost" className="w-full !justify-center mt-3">
                  Explore Platform
                </Button>
              </div>
              <p className="flex items-center justify-center gap-2 text-white/35 text-xs">
                <AnimatedIcon Icon={Sparkles} size={14} className="text-gold" />
                Trusted by enterprise teams worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PriGlobalLink() {
  return (
    <a
      href="https://priglobal.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-light hover:text-white transition-colors text-sm"
    >
      PRI Global
    </a>
  )
}
