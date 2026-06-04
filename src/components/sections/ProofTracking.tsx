import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

/* ─── Count-up hook ─── */
function useCountUp(target: number, decimals = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : '0')

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) =>
        setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()),
    })
    return controls.stop
  }, [isInView, target, count, decimals])

  return { ref, display }
}

/* ─── Single stat ─── */
function Stat({
  target,
  decimals = 0,
  prefix = '',
  label,
  last = false,
}: {
  target: number
  decimals?: number
  prefix?: string
  label: string
  last?: boolean
}) {
  const { ref, display } = useCountUp(target, decimals)

  return (
    <div
      ref={ref}
      style={last ? {} : { borderBottom: '1px solid #1e2235', paddingBottom: 24, marginBottom: 24 }}
    >
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(2.5rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#3B82F6',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {prefix}{display}
      </div>
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#475569',
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  )
}

/* ─── Main section ─── */
export function ProofTracking() {
  return (
    <section id="proof" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — centrado */}
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

        {/* 2-column layout — desktop */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-2 gap-10 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* LEFT — Metrics stack */}
          <motion.div variants={fadeUp}>
            <Stat target={20}   label="Leads Generated" />
            <Stat target={8.08} decimals={2} prefix="$" label="Cost Per Lead" />
            <Stat target={161}  prefix="$" label="Total Ad Spend" last />
          </motion.div>

          {/* RIGHT — Ads Manager card */}
          <motion.div variants={fadeUp} className="relative mx-auto" style={{ maxWidth: 380 }}>
            {/* Glow behind */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.20), transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                background: '#141720',
                border: '1px solid #1e2235',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(59,130,246,0.12), 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 16px',
                  borderBottom: '1px solid #1E2235',
                }}
              >
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#94A3B8',
                  }}
                >
                  Ads Manager
                </span>
              </div>
              <img
                src="/imagenes/ads-manager.png.jpg"
                alt="Facebook Ads Manager showing active leads campaign results"
                loading="lazy"
                decoding="async"
                className="w-full object-contain"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile layout */}
        <motion.div
          className="lg:hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Metrics — horizontal row */}
          <motion.div
            variants={fadeUp}
            className="flex items-start justify-center gap-6 mb-10"
          >
            {[
              { target: 20, prefix: '', decimals: 0, label: 'Leads' },
              { target: 8.08, prefix: '$', decimals: 2, label: 'Cost/Lead' },
              { target: 161, prefix: '$', decimals: 0, label: 'Ad Spend' },
            ].map((m, i, arr) => (
              <div key={m.label} className="flex items-start gap-6">
                <MobileStat {...m} />
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 40, background: '#1e2235', flexShrink: 0, marginTop: 6 }} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Card */}
          <motion.div variants={fadeUp} className="relative mx-auto" style={{ maxWidth: 300 }}>
            <div
              style={{
                background: '#141720',
                border: '1px solid #1e2235',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(59,130,246,0.12), 0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 14px',
                  borderBottom: '1px solid #1E2235',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94A3B8' }}>
                  Ads Manager
                </span>
              </div>
              <img
                src="/imagenes/ads-manager.png.jpg"
                alt="Facebook Ads Manager showing active leads campaign results"
                loading="lazy"
                decoding="async"
                className="w-full object-contain"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── Mobile stat (inline, no separators managed externally) ─── */
function MobileStat({ target, decimals = 0, prefix = '', label }: {
  target: number
  decimals?: number
  prefix?: string
  label: string
}) {
  const { ref, display } = useCountUp(target, decimals)
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.75rem', fontWeight: 700, color: '#3B82F6', lineHeight: 1 }}>
        {prefix}{display}
      </span>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginTop: 4 }}>
        {label}
      </span>
    </div>
  )
}
