import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { useCaseCategories } from '../data/useCases'

const dotClasses = ['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold', 'feature-dot-teal']

export default function UseCases() {
  return (
    <>
      <PageHero
        title="Use Cases"
        subtitle="Real problems. Practical solutions. Measurable outcomes."
      />
      <section className="section-alt section-padding space-y-16">
        <div className="container-wide space-y-16">
          {useCaseCategories.map((cat) => (
            <div key={cat.id}>
              <div className="mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl">{cat.title}</h2>
                <p className="text-blue-light mt-1">{cat.tagline}</p>
              </div>
              <div className="grid lg:grid-cols-3 gap-6">
                {cat.useCases.map((uc) => (
                  <div key={uc.title} className="card">
                    <h3 className="font-heading font-semibold text-lg">{uc.title}</h3>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-white">Problem</p>
                        <p className="text-white/50 mt-1">{uc.problem}</p>
                      </div>
                      <div>
                        <p className="font-medium text-white">Solution</p>
                        <StaggerContainer className="mt-1 space-y-2">
                          {uc.solution.map((s, si) => (
                            <StaggerItem key={s}>
                              <li className="feature-item !p-2 text-white/50 text-sm list-none">
                                <span className={dotClasses[si % dotClasses.length]} />
                                {s}
                              </li>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                      <div>
                        <p className="font-medium text-white">Outcomes</p>
                        <StaggerContainer className="mt-1 space-y-2">
                          {uc.outcomes.map((o, oi) => (
                            <StaggerItem key={o}>
                              <li className="feature-item !p-2 text-blue-light text-sm list-none">
                                <span className={dotClasses[(oi + 1) % dotClasses.length]} />
                                {o}
                              </li>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <BookCallCTA />
    </>
  )
}
