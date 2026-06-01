import { useEffect, useRef } from 'react'

export function MouseSpotlight() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate(${e.clientX - 175}px, ${e.clientY - 175}px)`
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        ref={blobRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(59,130,246,0.18) 0%, rgba(99,179,237,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
