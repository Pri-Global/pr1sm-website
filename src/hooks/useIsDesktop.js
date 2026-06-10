import { useEffect, useState } from 'react'

export default function useIsDesktop(minWidth = 1024) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= minWidth,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [minWidth])

  return isDesktop
}
