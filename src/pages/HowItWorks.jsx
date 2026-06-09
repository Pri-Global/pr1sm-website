import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import GradientOrb from '../components/animations/GradientOrb'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { howItWorks } from '../data/pages'
import { getIcon, dotClasses } from '../utils/pageIcons'

const stepStyles = [
  'btn-gradient',
  'bg-purple/25 border border-purple/40',
  'bg-gold/15 border border-gold/35 text-gold',
  'bg-teal/15 border border-teal/35 text-teal-light',
  'btn-gradient',
]

export default function HowItWorks() {
  return (
    <>
      <PageHero eyebrow={howItWorks.eyebrow} title={howItWorks.heading} subtitle={howItWorks.subheading} />

      <section className="relative section-alt section-padding overflow-hidden">
        <GradientOrb color="blue" size={420} top="-100px" left="-80px" opacity={0.45} />
        <div className="relative z-10 container-wide max-w-3xl mx-auto">
          <SectionHeader label="5 Steps" title="From raw data to real decisions" centered />
          <div className="page-timeline space-y-8 sm:space-y-10">
            {howItWorks.steps.map((step, i) => {
              const Icon = getIcon(step.icon)
              return (
                <div key={step.num} className="relative flex gap-4 sm:gap-6 pl-1 sm:pl-2">
                  <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-heading font-bold flex items-center justify-center shrink-0 text-white ${stepStyles[i]}`}>
                    <AnimatedIcon Icon={Icon} size={20} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-medium">Step {step.num}</p>
                    <h3 className="font-heading font-semibold text-xl md:text-2xl text-white mt-1">{step.title}</h3>
                    <p className="mt-2 text-white/55 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-elevated section-padding text-white overflow-hidden">
        <GradientOrb color="purple" size={380} bottom="-60px" right="-80px" opacity={0.45} />
        <div className="relative z-10 container-wide">
          <SectionHeader
            label={howItWorks.builtFor.label}
            title={howItWorks.builtFor.heading}
            centered
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {howItWorks.builtFor.items.map((item, i) => (
              <StaggerItem key={item}>
                <div className="feature-item !items-center text-sm text-white/80 h-full min-h-[72px]">
                  <span className={dotClasses[i % dotClasses.length]} />
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BookCallCTA heading={howItWorks.cta.heading} subheading={howItWorks.cta.subheading} />
    </>
  )
}
