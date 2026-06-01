import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-widest', className)}
      style={{
        background: 'rgba(59,130,246,0.10)',
        color: '#3B82F6',
        border: '1px solid rgba(59,130,246,0.20)',
      }}
    >
      <span
        className="badge-dot"
        style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}
