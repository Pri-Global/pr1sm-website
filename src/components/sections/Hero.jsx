import { ArrowRight, Play } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Button from '../ui/Button'

export default function Hero({
  eyebrow,
  title,
  subtitle,
  dark = true,
  primaryCta,
  secondaryCta,
  children,
}) {
  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden ${
        dark ? 'bg-navy text-white' : 'bg-bg text-text'
      }`}
    >
      {dark && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-blue/15 via-navy to-purple/10" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue/5 rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple/5 rounded-full" />
        </div>
      )}

      <div className="relative container-wide section-padding pt-32 pb-20 w-full">
        <div className="max-w-4xl">
          {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] whitespace-pre-line">
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mt-6 text-lg md:text-xl leading-relaxed max-w-2xl ${
                dark ? 'text-white/70' : 'text-muted'
              }`}
            >
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Button to={primaryCta.to} href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                  <ArrowRight size={18} />
                </Button>
              )}
              {secondaryCta && (
                <Button to={secondaryCta.to} href={secondaryCta.href} variant={dark ? 'ghost' : 'secondary'}>
                  {secondaryCta.icon === 'play' && <Play size={18} />}
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  )
}
