import SectionLabel from './SectionLabel'

export default function SectionHeader({ label, title, subtitle, className = '', centered = false }) {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? 'text-center max-w-2xl mx-auto' : ''} ${className}`}>
      {label && <SectionLabel>{label}</SectionLabel>}
      {title && (
        <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mt-3 text-white/55 text-base md:text-lg leading-relaxed ${centered ? 'mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
