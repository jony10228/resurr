import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

interface CardProps {
  dotColor: string
  label: string
  labelColor: string
  img: string
  imgAlt: string
  borderAccent?: string
  scale?: number
  offsetTop?: string
}

function ImageCard({
  dotColor, label, labelColor, img, imgAlt,
  borderAccent = 'border-[#1E2235]',
  scale = 1,
  offsetTop = '',
}: CardProps) {
  return (
    <div
      className={`relative bg-[#141720] border ${borderAccent} rounded-2xl overflow-hidden ${offsetTop}`}
      style={{
        scale,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1E2235]">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
        <span
          className="font-mono text-xs uppercase tracking-wider"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>

      {/* Image */}
      <img
        src={img}
        alt={imgAlt}
        loading="lazy"
        decoding="async"
        className="w-full object-contain"
      />
    </div>
  )
}

export function ProofTracking() {
  return (
    <section id="proof" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>Proof & Tracking</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4 mb-4 text-balance">
              Real data. Real campaigns. Real results.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-sans text-[#94A3B8] max-w-xl mx-auto">
              We have data from our campaigns in our agency platform. We can break case studies — this isn't theoretical performance.
            </p>
          </AnimatedSection>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeUp}>
            <ImageCard
              dotColor="#22C55E"
              label="Ads Manager"
              labelColor="#94A3B8"
              img="/imagenes/ads-manager.png.jpg"
              imgAlt="Facebook Ads Manager showing active leads campaign results"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="md:-mt-5">
            <ImageCard
              dotColor="#3B82F6"
              label="Video Performance"
              labelColor="#3B82F6"
              img="/imagenes/views.png.jpg"
              imgAlt="Video performance dashboard showing organic views"
              borderAccent="border-[#3B82F6]/30"
              scale={1.03}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <ImageCard
              dotColor="#94A3B8"
              label="Engagement"
              labelColor="#94A3B8"
              img="/imagenes/interactions.png.jpg"
              imgAlt="Engagement dashboard showing organic interactions"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
