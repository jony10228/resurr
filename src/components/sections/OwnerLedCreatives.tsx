import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PenLine, Clapperboard, Share2 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/GradientText'

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


function AnimatedPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden:  { opacity: 0, y: 32, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      className="flex justify-center"
    >
      <div
        style={{
          width: 220,
          height: 420,
          borderRadius: 38,
          border: '2px solid #1e2235',
          background: '#0d0f14',
          boxShadow: '0 0 60px rgba(59,130,246,0.08), 0 24px 64px rgba(0,0,0,0.6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 56,
            height: 6,
            borderRadius: 999,
            background: '#0A0B0F',
            zIndex: 10,
          }}
        />

        {/* Video real */}
        <video
          src="/videos/ugc-ad.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />

        {/* Gradient overlay — hace legible la barra de progreso */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: 20,
            right: 20,
            height: 3,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.15)',
            overflow: 'hidden',
            zIndex: 3,
          }}
        >
          <motion.div
            style={{
              height: '100%',
              borderRadius: 999,
              background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
            }}
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function OwnerLedCreatives() {
  return (
    <section className="relative py-32 overflow-hidden bg-transparent">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 600px 400px at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
              Business owners record the raw material. We do direction, scripting, editing, and distribution. The result: 100% organic views and high Click-Through-Rate UGC ads that outperform studio content.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="font-mono text-[clamp(2rem,5vw,4rem)] font-bold text-[#3B82F6] mt-6 glow-text">
              15M+
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-[#475569]">organic views</p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedPhone />

          <div className="flex flex-col gap-6">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <AnimatedSection key={title} delay={0.1 + i * 0.15}>
                <div className="flex gap-5 p-6 bg-[#141720] border border-[#1E2235] rounded-2xl hover:border-[#3B82F6]/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#3B82F6]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-[#F8FAFC] mb-1">{title}</p>
                    <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{body}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
