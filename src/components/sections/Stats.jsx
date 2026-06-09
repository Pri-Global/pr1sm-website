import { stats } from '../../data/stats'

export default function Stats() {
  return (
    <section className="bg-bg section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-extrabold text-4xl md:text-5xl text-navy tracking-tight">
                {stat.value}{stat.suffix}
              </div>
              <p className="mt-2 text-muted text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
