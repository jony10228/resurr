import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, ...props }: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center font-sans font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B0F] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer overflow-hidden'

  const variants = {
    primary:   'bg-[#3B82F6] text-white hover:bg-[#60A5FA] shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] active:scale-[0.98]',
    secondary: 'bg-[#141720] text-[#F8FAFC] border border-[#1E2235] hover:border-[#3B82F6] hover:bg-[#0F1117]',
    ghost:     'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141720]',
    outline:   'border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10',
  }

  const sizes = {
    sm: 'h-9  px-4  text-sm  rounded-lg  gap-1.5',
    md: 'h-11 px-6  text-sm  rounded-xl  gap-2',
    lg: 'h-13 px-8  text-base rounded-xl gap-2.5',
  }

  return (
    <motion.button
      whileHover={{ scale: variant === 'primary' ? 1.02 : 1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {variant === 'primary' && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            padding: '1.5px',
            background: 'radial-gradient(circle, #93C5FD, #60A5FA, transparent, transparent)',
            backgroundSize: '300% 300%',
            animation: 'shine 6s linear infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          } as React.CSSProperties}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : children}
      </span>
    </motion.button>
  )
}
