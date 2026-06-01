import { useState, useEffect, useRef } from 'react'

export function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * (end - start) + start))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [triggered, end, start, duration])

  return { count, ref }
}
