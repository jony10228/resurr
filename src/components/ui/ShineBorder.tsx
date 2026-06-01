import { cn } from '@/lib/utils'

interface ShineBorderProps {
  borderWidth?: number
  duration?: number
  color?: string | string[]
  className?: string
  children?: React.ReactNode
}

export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  color = '#3B82F6',
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${
            Array.isArray(color) ? color.join(',') : color
          }, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 'var(--border-width)',
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine',
        className
      )}
    >
      {children}
    </div>
  )
}
