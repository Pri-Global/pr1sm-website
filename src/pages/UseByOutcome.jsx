import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import GradientOrb from '../components/animations/GradientOrb'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { useByOutcome } from '../data/useCases'
import { accentStyles, dotClasses, getIcon } from '../utils/pageIcons'

export default function UseByOutcome() {
  return (
    <>
      <PageHero eyebrow={useByOutcome.eyebrow} title={useByOutcome.heading} subtitle={useByOutcome.subheading} />

      <section className="relative section-default section-padding overflow-hidden">
        <GradientOrb color="purple" size={400} bottom="-80px" right="-60px" opacity={0.45} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Your Goals" title="Start with the outcome, not the technology" centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {useByOutcome.outcomes.map((outcome) => {
              const Icon = getIcon(outcome.icon)
              const accent = accentStyles[outcome.accent] || accentStyles.blue
              return (
                <div
                  key={outcome.title}
                  className="role-card"
                  style={{ '--role-accent': accent.gradient }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent.iconBg} ${accent.iconText}`}>
                      <AnimatedIcon Icon={Icon} size={20} />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-white">{outcome.title}</h3>
                      <p className="mt-1 text-white/55 text-sm leading-relaxed">{outcome.description}</p>
                    </div>
                  </div>
                  <StaggerContainer className="space-y-2">
                    {outcome.bullets.map((b, i) => (
                      <StaggerItem key={b}>
                        <li className="feature-item !p-2.5 text-sm text-white/75 list-none">
                          <span className={dotClasses[i % dotClasses.length]} />
                          {b}
                        </li>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <BookCallCTA heading={useByOutcome.cta.heading} subheading={useByOutcome.cta.subheading} />
    </>
  )
}
