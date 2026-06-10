import prismaHello from '../../assets/prisma-hello.png'
import prismaTagline from '../../assets/prisma-tagline.png'

const variants = {
  hello: {
    src: prismaHello,
    alt: 'Prisma — Hello! Ask anything, know everything.',
  },
  tagline: {
    src: prismaTagline,
    alt: 'Prisma — Ask anything. Know everything.',
  },
}

const sizes = {
  sm: 'h-32 sm:h-40 w-auto',
  md: 'h-44 sm:h-52 md:h-60 w-auto',
  lg: 'h-52 sm:h-64 md:h-72 lg:h-80 w-auto',
  xl: 'h-64 sm:h-72 md:h-80 lg:h-[28rem] w-auto',
}

export default function PrismaMascot({
  variant = 'hello',
  size = 'md',
  className = '',
  floating = false,
}) {
  const { src, alt } = variants[variant] || variants.hello

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={`block object-contain object-bottom select-none pointer-events-none ${sizes[size] || sizes.md} ${floating ? 'mascot-float' : ''} ${className}`}
    />
  )
}
