import { motion } from 'framer-motion'
import { PenLine, Clapperboard, Share2 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/GradientText'
import { staggerContainer, fadeUp } from '@/lib/animations'

const pillars = [
  {
    icon: PenLine,
    title: 'Authenticity drives clicks.',
    body: 'No stock photos or actors. Real faces, real services, real results.',
  },
  {
    icon: Clapperboard,
    title: 'We script and direct.',
    body: 'You just record on your phone. We handle direction, scripting, and everything else.',
  },
  {
    icon: Share2,
    title: 'We edit and distribute.',
    body: 'You get ads that feel native to the feed — because they are.',
  },
]

export function OwnerLedCreatives() {
  return (
    <section className="relative py-32 overflow-hidden bg-transparent">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <AnimatedSection delay={0}>
          <Badge>Owner-Led Creatives</Badge>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4 mb-4 max-w-2xl mx-auto text-balance">
            Owner-led creatives that{' '}
            <GradientText>don't look like ads.</GradientText>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="font-sans text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Business owners record the raw material. We do direction, scripting, editing, and
            distribution. The result: 100% organic views and high CTR UGC ads that outperform
            studio content.
          </p>
        </AnimatedSection>

        <div className="mb-14" />

        {/* Pillar cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {pillars.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0f1117] border border-[#1e2235] rounded-2xl p-6 hover:border-[#3B82F6]/30 transition-colors duration-300"
            >
              <div className="flex justify-center">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: 44, height: 44, background: 'rgba(59,130,246,0.10)' }}
                >
                  <Icon size={20} className="text-[#3B82F6]" aria-hidden="true" />
                </div>
              </div>
              <p className="font-sans font-semibold text-[#F8FAFC] text-center mt-4">{title}</p>
              <p className="font-sans text-sm text-[#94A3B8] text-center mt-2 leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
