import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import GradientOrb from '../components/animations/GradientOrb'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { security } from '../data/pages'
import { getIcon, dotClasses, iconBgClasses } from '../utils/pageIcons'

export default function SecurityAndTrust() {
  return (
    <>
      <PageHero eyebrow={security.eyebrow} title={security.heading} subtitle={security.subheading} />

      <section className="relative section-alt section-padding overflow-hidden">
        <GradientOrb color="teal" size={380} top="-60px" right="-80px" opacity={0.4} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Enterprise Security" title="Built for the most demanding environments" centered />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {security.features.map((f, i) => {
              const Icon = getIcon(f.icon)
              return (
                <StaggerItem key={f.text}>
                  <div className="feature-item !items-center h-full min-h-[80px]">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBgClasses[i % iconBgClasses.length]}`}>
                      <AnimatedIcon Icon={Icon} size={16} />
                    </span>
                    <span className="text-sm font-medium text-white/85">{f.text}</span>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="relative section-elevated section-padding text-white overflow-hidden">
        <GradientOrb color="blue" size={340} bottom="-80px" left="-60px" opacity={0.35} />
        <div className="relative z-10 container-wide max-w-3xl mx-auto">
          <SectionHeader
            label={security.commitment.label}
            title={security.commitment.heading}
          />
          <StaggerContainer className="space-y-3">
            {security.commitment.items.map((item, i) => (
              <StaggerItem key={item}>
                <li className="feature-item text-white/75 list-none !py-4">
                  <span className={dotClasses[i % dotClasses.length]} />
                  {item}
                </li>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="gradient-divider" />

      <section className="section-default section-padding">
        <div className="container-wide">
          <SectionHeader label="Compliance" title="Certifications & standards" centered />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {security.certifications.map((cert, i) => (
              <div key={cert.title} className="card text-center group">
                <div className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${iconBgClasses[i % iconBgClasses.length]}`}>
                  <span className="font-heading font-bold text-xs">{cert.title.slice(0, 3)}</span>
                </div>
                <p className="font-heading font-bold text-xl text-gradient">{cert.title}</p>
                <p className="text-white/45 text-xs mt-1 uppercase tracking-wider">{cert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookCallCTA heading={security.cta.heading} subheading={security.cta.subheading} />
    </>
  )
}
