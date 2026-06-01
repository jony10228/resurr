import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUp } from '@/lib/animations'

const steps = [
  {
    num: '1',
    title: 'Fit Check + Offer Positioning',
    body: 'We review your business and market to see if we\'re the right fit. If yes, we map your offer, pricing, and positioning before a single ad runs.',
  },
  {
    num: '2',
    title: 'Tracking + Funnel Setup',
    body: 'We\'re talking pixel, CRM, call tracking, lead forms, and landing pages — everything needed to track cost-per-lead accurately from day one.',
  },
  {
    num: '3',
    title: 'Launch + Creative Testing',
    body: 'Multiple ad variations go live. We test hooks, formats, and audiences simultaneously so we find winners fast — typically within the first 2 weeks.',
  },
  {
    num: '4',
    title: 'Optimize Meeting + Scale',
    body: 'Weekly review of what\'s working. We cut waste, increase budget on winners, and scale what converts. You stay in the loop, we handle the execution.',
  },
]

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 0.75', 'center center'] })
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="process" className="relative py-32 overflow-hidden bg-[#0d0f14]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 700px 300px at 50% 100%, rgba(59,130,246,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>How it works</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              From zero to booked estimates in 4 steps
            </h2>
          </AnimatedSection>
        </div>

        {/* Steps grid */}
        <motion.div
          ref={lineRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Animated connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-[#1e2235] z-0 pointer-events-none">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#3B82F6]/50"
              style={{ width: lineWidth }}
            />
          </div>

          {steps.map(({ num, title, body }, i) => (
            <motion.div key={num} variants={fadeUp} className="relative z-10">
              {/* Dashed connector — desktop, between cards (not after last) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-1/2 right-0 border-t border-dashed border-[#1e2235] pointer-events-none"
                  style={{ zIndex: -1 }}
                  aria-hidden="true"
                />
              )}

              <div
                className="bg-[#0f1117] border border-[#1e2235] rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:border-[#3B82F6]/30 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(59,130,246,0.07)]"
                style={{ minHeight: 200 }}
              >
                {/* Step number — filled blue circle */}
                <div
                  className="flex items-center justify-center rounded-full font-mono font-bold text-lg text-white shrink-0 self-start"
                  style={{
                    width: 48,
                    height: 48,
                    background: '#3B82F6',
                    boxShadow: '0 0 16px rgba(59,130,246,0.35)',
                  }}
                  aria-label={`Step ${num}`}
                >
                  {num}
                </div>

                <p className="font-sans font-semibold text-white text-base mt-5 mb-3 leading-snug">{title}</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply to work with us
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a 15-min check
            </Button>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
