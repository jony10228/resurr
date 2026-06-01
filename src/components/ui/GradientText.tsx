import { cn } from '@/lib/utils'

export function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      'bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent',
      className
    )}>
      {children}
    </span>
  )
}
