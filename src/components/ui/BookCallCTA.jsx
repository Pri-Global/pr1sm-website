import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import Button from './Button'
import SectionLabel from './SectionLabel'
import AnimatedIcon from './AnimatedIcon'
import FloatingOrbs from '../animations/FloatingOrbs'
import { SectionReveal, SplitHeadline } from '../animations/SectionReveal'
import { BOOK_CALL_URL } from '../../data/navigation'

const DEFAULT_HEADING = 'Ready to see PR1SM in action?'
const DEFAULT_SUBHEADING =
  'Book a personalized walkthrough with our team — see how AI turns your scattered data into instant answers.'

const TRUST_PILLS = ['29+ Years Enterprise', 'SOC 2 Compliant', '2–4 Week Setup']

export default function BookCallCTA({ heading, subheading, className = '' }) {
  const title = heading || DEFAULT_HEADING
  const text = subheading || DEFAULT_SUBHEADING
  const titleLines = title.split('. ').map((part, i, arr) => (
    i < arr.length - 1 ? `${part}.` : part
  ))

  return (
    <section className={`relative section-padding section-default overflow-x-clip ${className}`}>
      <FloatingOrbs count={3} />
      <div className="absolute inset-0 pointer-events-none cta-bg-animated" aria-hidden="true">
        <div className="absolute inset-0 bg-[#080e1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.15),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(123,47,190,0.1),transparent_60%)]" />
      </div>

      <SectionReveal type="scale" className="container-wide relative z-10">
        <div className="cta-panel cta-panel-cinematic relative glow-blue">
          <div className="cta-panel-grid absolute inset-0 opacity-[0.35]" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-6 sm:gap-8 lg:gap-14 items-center p-5 sm:p-8 md:p-12 lg:p-14">
            <div>
              <SectionLabel>Next Step</SectionLabel>
              <SplitHeadline
                lines={titleLines.length > 1 ? titleLines : [title]}
                className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-gradient-animated leading-[1.15]"
              />
              <p className="mt-3 sm:mt-4 text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">{text}</p>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                {TRUST_PILLS.map((pill) => (
                  <span key={pill} className="badge-blue !text-[9px] sm:!text-[9px] !tracking-[0.1em]">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="rounded-xl border border-white/[0.08] bg-navy/50 p-4 sm:p-5 md:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center shrink-0">
                    <AnimatedIcon Icon={Calendar} size={18} className="text-white" />
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-white text-sm">15-minute call</p>
                    <p className="text-white/45 text-xs">No commitment required</p>
                  </div>
                </div>
                <Button href={BOOK_CALL_URL} variant="primary" className="btn-shine w-full !justify-center !px-10 !py-4 !text-lg glow-blue">
                  Book a Call <AnimatedIcon Icon={ArrowRight} size={18} />
                </Button>
                <Button to="/our-platform" variant="ghost" className="btn-glass w-full !justify-center mt-3">
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
      </SectionReveal>
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
