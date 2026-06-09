import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import BookCallCTA from '../components/ui/BookCallCTA'
import AnimatedIcon from '../components/ui/AnimatedIcon'
import GradientOrb from '../components/animations/GradientOrb'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerGroup'
import { useByRole } from '../data/useCases'
import { accentStyles, dotClasses, getIcon } from '../utils/pageIcons'

export default function UseByRole() {
  return (
    <>
      <PageHero eyebrow={useByRole.eyebrow} title={useByRole.heading} subtitle={useByRole.subheading} />

      <section className="relative section-alt section-padding overflow-hidden">
        <GradientOrb color="blue" size={420} top="-80px" left="-60px" opacity={0.45} />
        <div className="relative z-10 container-wide">
          <SectionHeader label="Your Role" title="AI that speaks your language" centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {useByRole.roles.map((role) => {
              const Icon = getIcon(role.icon)
              const accent = accentStyles[role.accent] || accentStyles.blue
              return (
                <div
                  key={role.title}
                  className="role-card"
                  style={{ '--role-accent': accent.gradient }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent.iconBg} ${accent.iconText}`}>
                      <AnimatedIcon Icon={Icon} size={20} />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-white">{role.title}</h3>
                      <p className="mt-1 text-white/55 text-sm leading-relaxed">{role.description}</p>
                    </div>
                  </div>
                  <StaggerContainer className="space-y-2">
                    {role.bullets.map((b, i) => (
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

      <BookCallCTA heading={useByRole.cta.heading} subheading={useByRole.cta.subheading} />
    </>
  )
}
