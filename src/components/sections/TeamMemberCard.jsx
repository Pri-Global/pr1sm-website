import { StaggerContainer, StaggerItem } from '../animations/StaggerGroup'

const accentBars = [
  'from-blue to-purple',
  'from-purple to-gold',
  'from-gold to-teal',
  'from-teal to-blue',
]

const CARD_HEIGHT = 'h-[260px] sm:h-[280px]'

export default function TeamMemberCard({ person, index = 0 }) {
  const accent = accentBars[index % accentBars.length]

  return (
    <article
      className={`group relative ${CARD_HEIGHT} w-full overflow-hidden rounded-xl border border-white/[0.08] bg-navy3/40 hover:border-blue/35 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(65,105,225,0.12)]`}
    >
      <div className="relative h-full w-full overflow-hidden">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-purple/20 flex items-center justify-center">
            <span className="font-heading font-bold text-3xl text-white/30">
              {person.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#080e1e] via-[#080e1e]/55 to-[#080e1e]/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue/0 via-transparent to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4 min-h-[96px]">
          <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${accent} mb-2.5 transition-all duration-300 group-hover:w-12`} />
          <h3 className="font-heading font-bold text-white leading-tight text-sm md:text-base line-clamp-1">
            {person.name}
          </h3>
          <p className="text-blue-light text-xs font-medium mt-1 leading-snug line-clamp-2 min-h-[2.5rem]">
            {person.role}
          </p>

          <p className="hidden md:block text-white/55 text-xs leading-relaxed max-h-0 mt-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:mt-2 group-hover:opacity-100 transition-all duration-500 ease-out">
            {person.bio}
          </p>
        </div>
      </div>
    </article>
  )
}

export function TeamGrid({ people, variant = 'team', className = '' }) {
  const gridClass =
    variant === 'leadership'
      ? 'grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full max-w-[900px] mx-auto items-stretch'
      : 'grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full max-w-[900px] mx-auto items-stretch'

  return (
    <StaggerContainer className={`${gridClass} ${className}`}>
      {people.map((person, i) => (
        <StaggerItem key={person.name} className="min-h-0">
          <TeamMemberCard person={person} index={i} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
