import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

const testimonials = [
  {
    name: 'VC Epoxy',
    company: 'Islip Terrace, New York · Epoxy Flooring',
    quote: "Working with Resurrect Media has been a game changer for my business. They brought in 16 high-quality leads with just $350 in ad spend, and were incredibly responsive and dedicated throughout the entire process. I couldn't have asked for a better experience and will proudly be continuing working with them. Thanks so much for everything!",
  },
  {
    name: 'Nation Unity Builders',
    company: 'Hamptons Bay, New York · Construction & Contracting',
    quote: "We are happy and like the latest reels. Confirmed above. Thank you.",
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mt-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
      ))}
    </div>
  )
}

export function ClientFeedback() {
  return (
    <section className="relative py-32 overflow-hidden bg-transparent">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <AnimatedSection delay={0}>
            <Badge>Client feedback</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Results that speak for themselves
            </h2>
          </AnimatedSection>
        </div>

        {/* ── Testimonials grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map(({ name, quote }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="bg-[#0f1117] border border-[#1e2235] rounded-2xl p-7 transition-all duration-300 hover:border-[#3B82F6]/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.08)]"
              style={{ minHeight: 180 }}
            >
              <Stars />
              <p className="font-sans text-sm leading-relaxed mt-4 italic" style={{ color: '#94A3B8' }}>
                "{quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
