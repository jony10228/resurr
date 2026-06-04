import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

const TESTIMONIALS = [
  {
    name: 'Martha',
    company: 'Hamptons Bay, New York',
    quote:
      'The website Resurrect Media built for us completely transformed our online presence. We went from a generic template to a conversion machine — leads increased by 40% in the first month alone.',
  },
  {
    name: 'KC Sony',
    company: 'Isla Tortoise, New York',
    quote:
      'Professional, fast, and the final product exceeded our expectations. Our site loads in under 2 seconds and looks better than competitors who paid 3x more.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
      ))}
    </div>
  )
}

export function WebDesignTestimonials() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#0A0B0F]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(59,130,246,0.04), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <AnimatedSection delay={0}>
            <Badge>What Clients Say</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Built for results. Backed by trust.
            </h2>
          </AnimatedSection>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TESTIMONIALS.map(({ name, company, quote }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="bg-[#0f1117] border border-[#1e2235] rounded-2xl p-7 transition-all duration-300 hover:border-[#3B82F6]/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.08)]"
            >
              <Stars />

              <p className="font-sans text-sm text-[#94A3B8] italic leading-relaxed mb-6">
                "{quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(59,130,246,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#3B82F6',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {name[0]}
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-white">{name}</p>
                  <p className="font-sans text-xs text-[#475569] mt-0.5">{company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
