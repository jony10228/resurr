import { motion } from 'framer-motion'
import { Megaphone, Video, Funnel, BarChart3 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

const services = [
  {
    num: '01',
    icon: Megaphone,
    title: 'Meta Ads Management',
    body: 'Full-service Facebook & Instagram campaigns — strategy to optimization. We handle ad accounts, audiences, pixels, budgets, and scaling.',
    tags: ['Audience Research', 'Creative Strategy', 'Budget Optimization', 'A/B Testing', 'Pixel Setup'],
  },
  {
    num: '02',
    icon: Video,
    title: 'UGC Creative System',
    body: 'Owner-faced creative content. We provide scripting, direction, editing, and production. You record. We turn it into ads that don\'t feel like ads.',
    tags: ['Script Writing', 'Video Direction', 'Post-Production', 'Thumbnail Design', 'Hook Testing'],
  },
  {
    num: '03',
    icon: Funnel,
    title: 'Funnel + Lead Capture',
    body: 'Conversion-focused landing pages, lead forms, and follow-up sequences. Because an ad is only as good as where it lands.',
    tags: ['Landing Pages', 'Lead Forms', 'Follow-up Sequences', 'CRM Integration'],
  },
  {
    num: '04',
    icon: BarChart3,
    title: 'Weekly Optimization + Reporting',
    body: 'Performance reviews every 7 days. We cut losers, scale winners, and send you a clear report — no agency jargon, no fluff.',
    tags: ['Weekly Reports', 'Performance Reviews', 'ROI Tracking', 'Transparent Dashboard'],
  },
]

export function WhatWeDeliver() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>What we deliver</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Four weapons. One mission.
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
          {services.map(({ num, icon: Icon, title, body, tags }) => (
            <motion.div
              key={num}
              variants={fadeUp}
              className="relative group bg-[#0F1117] border border-[#1E2235] rounded-2xl transition-all duration-300"
              style={{ padding: 36, minHeight: 260 }}
              whileHover={{
                y: -3,
                borderColor: 'rgba(59,130,246,0.4)',
                boxShadow: '0 20px 40px rgba(59,130,246,0.08)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative number */}
              <span
                className="absolute top-4 right-6 font-mono font-bold select-none leading-none pointer-events-none"
                style={{ fontSize: 80, color: 'rgba(59,130,246,0.06)' }}
                aria-hidden="true"
              >
                {num}
              </span>

              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: 'rgba(59,130,246,0.10)' }}
              >
                <Icon size={20} color="#3B82F6" aria-hidden="true" />
              </div>

              <h3 className="font-sans font-semibold text-xl text-white mt-4 mb-3">{title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{body}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full border"
                    style={{
                      background: '#141720',
                      color: '#64748b',
                      borderColor: '#1e2235',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
