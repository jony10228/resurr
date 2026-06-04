import { XCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { slideLeft, slideRight } from '@/lib/animations'

const TYPICAL = [
  'Use generic WordPress templates',
  'Deliver in 3–6 months',
  'Charge monthly maintenance fees',
  'No performance optimization',
  'Cookie-cutter designs that all look the same',
  'Disappear after launch',
]

const OURS = [
  'Custom React code — no templates, ever',
  'Delivered in 2–4 weeks',
  'One-time investment, you own everything',
  'Sub-2s load times, 90+ Lighthouse score',
  'Unique designs tailored to your brand',
  '30-day post-launch support included',
]

export function WebDesignWhyUs() {
  return (
    <section id="wd-why-us" className="relative py-32 overflow-hidden bg-[#0d0f14]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 700px 300px at 50% 50%, rgba(59,130,246,0.04), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>Why Us</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Not your typical web agency
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Typical Agencies */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl p-8"
            style={{
              background: '#0f1117',
              border: '1px solid rgba(239,68,68,0.15)',
            }}
          >
            <div className="mb-6">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(239,68,68,0.10)',
                  color: '#EF4444',
                }}
              >
                <XCircle size={14} />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Typical Agencies
                </span>
              </div>
            </div>

            <ul>
              {TYPICAL.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3"
                  style={{
                    borderBottom: i < TYPICAL.length - 1 ? '1px solid #1e2235' : 'none',
                  }}
                >
                  <XCircle
                    size={16}
                    color="#EF4444"
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <span className="font-sans text-sm text-[#CBD5E1]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl p-8"
            style={{
              background: '#0f1117',
              border: '1px solid rgba(34,197,94,0.15)',
            }}
          >
            <div className="mb-6">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(34,197,94,0.10)',
                  color: '#22C55E',
                }}
              >
                <CheckCircle size={14} />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Our Approach
                </span>
              </div>
            </div>

            <ul>
              {OURS.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3"
                  style={{
                    borderBottom: i < OURS.length - 1 ? '1px solid #1e2235' : 'none',
                  }}
                >
                  <CheckCircle
                    size={16}
                    color="#22C55E"
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <span className="font-sans text-sm text-[#CBD5E1]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
