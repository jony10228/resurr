import { motion } from 'framer-motion'
import { Hammer, Wind, Droplets, Leaf, Bug, HardHat, Home, Zap, Paintbrush, Square } from 'lucide-react'

const industries = [
  { label: 'Roofing',           icon: <Home size={14} /> },
  { label: 'HVAC',              icon: <Wind size={14} /> },
  { label: 'Plumbing',          icon: <Droplets size={14} /> },
  { label: 'Landscaping',       icon: <Leaf size={14} /> },
  { label: 'Pest Control',      icon: <Bug size={14} /> },
  { label: 'General Contracting', icon: <HardHat size={14} /> },
  { label: 'Remodeling',        icon: <Hammer size={14} /> },
  { label: 'Electrical',        icon: <Zap size={14} /> },
  { label: 'Painting',          icon: <Paintbrush size={14} /> },
  { label: 'Window & Door',     icon: <Square size={14} /> },
]

const doubled = [...industries, ...industries]

export function LogoBar() {
  return (
    <section className="relative py-16 border-y border-[#1E2235] overflow-hidden bg-transparent">
      <p className="font-mono text-xs uppercase tracking-widest text-[#475569] text-center mb-8">
        Trusted by local service businesses across the US
      </p>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-10 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((industry, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-[#475569] whitespace-nowrap font-mono text-sm uppercase tracking-widest"
            >
              <span className="text-[#3B82F6]" aria-hidden="true">{industry.icon}</span>
              {industry.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
