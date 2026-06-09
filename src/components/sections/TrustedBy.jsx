import SectionLabel from '../ui/SectionLabel'
import { trustedLogos } from '../../data/stats'

export default function TrustedBy() {
  return (
    <section className="bg-bg py-12 md:py-16 border-y border-border">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <SectionLabel>Trusted By Global Enterprises</SectionLabel>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-6">
          {trustedLogos.map((logo) => (
            <span
              key={logo}
              className="text-muted/50 font-heading font-bold text-sm md:text-base tracking-wide"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
