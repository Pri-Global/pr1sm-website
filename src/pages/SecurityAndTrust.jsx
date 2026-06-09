import PageHero from '../components/ui/PageHero'
import BookCallCTA from '../components/ui/BookCallCTA'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { security } from '../data/pages'

const dotClasses = ['feature-dot-blue', 'feature-dot-purple', 'feature-dot-gold', 'feature-dot-teal']

export default function SecurityAndTrust() {
  return (
    <>
      <PageHero title={security.heading} subtitle={security.subheading} />
      <section className="section-alt section-padding">
        <StaggerContainer className="container-wide grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {security.features.map((f, i) => (
            <StaggerItem key={f}>
              <div className="feature-item !items-center h-full">
                <span className={dotClasses[i % dotClasses.length]} />
                <span className="text-sm font-medium text-white/80">{f}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="section-elevated section-padding text-white">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl mb-6">{security.commitment.heading}</h2>
          <StaggerContainer className="space-y-3">
            {security.commitment.items.map((item, i) => (
              <StaggerItem key={item}>
                <li className="feature-item text-white/70 list-none">
                  <span className={dotClasses[i % dotClasses.length]} />
                  {item}
                </li>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-alt section-padding">
        <div className="container-wide">
          <h2 className="font-heading font-bold text-2xl text-center mb-10">Certifications & Compliance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {security.certifications.map((cert) => (
              <div key={cert.title} className="card text-center">
                <p className="font-heading font-bold text-xl text-gradient">{cert.title}</p>
                <p className="text-white/50 text-xs mt-1 uppercase tracking-wider">{cert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookCallCTA />
    </>
  )
}
