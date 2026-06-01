import { motion } from 'framer-motion'
import {
  Palette, Smartphone, Zap, Search,
  Target, Sparkles, Layers, Code2,
} from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    body: 'No templates. Every pixel intentional.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimization',
    body: '60%+ of your traffic is mobile. We build for it first.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    body: 'Sub-2s load times. Google rewards speed. So do users.',
  },
  {
    icon: Search,
    title: 'SEO Ready',
    body: 'Built with structure search engines understand.',
  },
  {
    icon: Target,
    title: 'Conversion Focused',
    body: 'Every section designed to move visitors toward action.',
  },
  {
    icon: Sparkles,
    title: 'Premium Animations',
    body: 'Framer Motion interactions that feel alive.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    body: 'Built to grow with your business.',
  },
  {
    icon: Code2,
    title: 'Modern Tech Stack',
    body: 'React, TypeScript, Tailwind. Fast, reliable, future-proof.',
  },
]

export function WebDesignFeatures() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#0d0f14]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 700px 400px at 50% 100%, rgba(59,130,246,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>Why our sites win</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Built different from the ground up
            </h2>
          </AnimatedSection>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group bg-[#0f1117] border border-[#1e2235] rounded-2xl p-6 transition-all duration-300 hover:border-[#3B82F6]/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.07)]"
            >
              <div
                className="flex items-center justify-center rounded-xl mb-4"
                style={{ width: 44, height: 44, background: 'rgba(59,130,246,0.10)' }}
              >
                <Icon size={20} color="#3B82F6" aria-hidden="true" />
              </div>
              <h3 className="font-sans font-semibold text-base text-white mb-1">{title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
