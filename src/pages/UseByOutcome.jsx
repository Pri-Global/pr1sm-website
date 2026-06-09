import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { useByOutcome } from '../data/useCases'

const dotClasses = ['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold', 'feature-dot-teal']

export default function UseByOutcome() {
  return (
    <>
      <PageHero title={useByOutcome.heading} subtitle={useByOutcome.subheading} />
      <section className="section-alt section-padding">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useByOutcome.outcomes.map((outcome) => (
            <div key={outcome.title} className="card">
              <h3 className="font-heading font-semibold text-xl">{outcome.title}</h3>
              <p className="mt-2 text-white/50 text-sm">{outcome.description}</p>
              <StaggerContainer className="mt-4 space-y-2">
                {outcome.bullets.map((b, i) => (
                  <StaggerItem key={b}>
                    <li className="feature-item !p-2 text-sm text-white/70 list-none">
                      <span className={dotClasses[i % dotClasses.length]} />
                      {b}
                    </li>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      </section>
      <BookCallCTA heading={useByOutcome.cta.heading} subheading={useByOutcome.cta.subheading} />
    </>
  )
}
