import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'We learn your business, audience, and goals. What makes you different? What does your ideal customer look like? This shapes everything.',
  },
  {
    num: '02',
    title: 'Strategy',
    body: 'We map the site architecture, user flow, and conversion points. Every page has a purpose. Every section moves visitors toward action.',
  },
  {
    num: '03',
    title: 'Design',
    body: 'High-fidelity mockups with your brand identity. We design in the browser — you see exactly how it will look and feel on every device.',
  },
  {
    num: '04',
    title: 'Development',
    body: 'Clean React + TypeScript code. Framer Motion animations. Optimized for speed, SEO, and accessibility. No WordPress. No templates.',
  },
  {
    num: '05',
    title: 'Launch',
    body: 'We test everything, optimize performance, and go live. Then we monitor and make sure everything converts as planned.',
  },
]

export function WebDesignProcess() {
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 30%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="wd-process" className="relative py-32 overflow-hidden bg-[#0A0B0F]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 0%, rgba(59,130,246,0.05), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <AnimatedSection delay={0}>
            <Badge>Our Process</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              From concept to launch in 5 steps
            </h2>
          </AnimatedSection>
        </div>

        {/* Desktop timeline */}
        <div ref={timelineRef} className="relative hidden md:block">
          {/* Track */}
          <div
            style={{
              position: 'absolute',
              left: 23,
              top: 24,
              bottom: 0,
              width: 2,
              background: '#1e2235',
            }}
          />
          {/* Animated progress */}
          <motion.div
            style={{
              position: 'absolute',
              left: 23,
              top: 24,
              width: 2,
              height: '100%',
              background: 'linear-gradient(to bottom, #3B82F6, #60A5FA)',
              scaleY: lineScaleY,
              transformOrigin: 'top',
              boxShadow: '0 0 10px rgba(59,130,246,0.6)',
            }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="flex items-start gap-8 mb-10 last:mb-0"
              >
                {/* Step circle */}
                <div
                  className="flex-shrink-0 relative z-10"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 24px rgba(59,130,246,0.5)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'white',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="flex-1 transition-all duration-300 hover:border-[#3B82F6]/30"
                  style={{
                    background: '#0f1117',
                    border: '1px solid #1e2235',
                    borderRadius: 16,
                    padding: '20px 24px',
                    marginBottom: 4,
                  }}
                >
                  <h3 className="font-sans font-semibold text-lg text-[#F8FAFC] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile stack */}
        <motion.div
          className="md:hidden flex flex-col gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              style={{
                background: '#0f1117',
                border: '1px solid #1e2235',
                borderRadius: 16,
                padding: '20px 20px',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 16px rgba(59,130,246,0.4)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-base text-[#F8FAFC]">
                  {step.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
