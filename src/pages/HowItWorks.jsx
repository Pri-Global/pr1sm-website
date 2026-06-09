import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { howItWorks } from '../data/pages'

export default function HowItWorks() {
  return (
    <>
      <PageHero title={howItWorks.heading} subtitle={howItWorks.subheading} />
      <section className="section-alt section-padding">
        <div className="container-wide max-w-3xl mx-auto space-y-8">
          {howItWorks.steps.map((step, i) => (
            <div key={step.num} className="flex gap-6">
              <div className={`w-12 h-12 rounded-xl font-heading font-bold flex items-center justify-center shrink-0 text-white ${
                ['btn-gradient', 'bg-purple/30 border border-purple/40', 'bg-gold/20 border border-gold/40 text-gold', 'bg-teal/20 border border-teal/40 text-teal-light', 'btn-gradient'][i]
              }`}>
                {step.num}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl">{step.title}</h3>
                <p className="mt-2 text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-elevated section-padding text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading font-bold text-3xl mb-10">{howItWorks.builtFor.heading}</h2>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {howItWorks.builtFor.items.map((item, i) => (
              <StaggerItem key={item}>
                <div className="feature-item !items-center text-sm text-white/75 h-full">
                  <span className={['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold', 'feature-dot-teal'][i % 4]} />
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BookCallCTA />
    </>
  )
}
