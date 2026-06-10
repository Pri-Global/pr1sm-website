export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative text-white pt-28 sm:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-x-clip">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[280px] sm:h-[350px] hero-glow-main" />
        <div className="absolute top-8 left-4 sm:left-8 w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] hero-glow-secondary" />
      </div>
      <div className="relative z-10 container-wide section-padding !py-0">
        {eyebrow && (
          <p className="eyebrow-badge">
            <span className="eyebrow-dot" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">{subtitle}</p>
        )}
        {children}
      </div>
      <div className="gradient-divider absolute bottom-0 left-0 right-0 z-10" />
    </section>
  )
}
