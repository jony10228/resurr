import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'

const EASE = [0.16, 1, 0.3, 1] as const

const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

function FakeCard({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex-1 rounded-lg border"
      style={{ height: 40, background: '#141720' }}
      animate={{ borderColor: ['#1e2235', 'rgba(59,130,246,0.4)', '#1e2235'] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

function LaptopMockup() {
  const mobile = isMobile()

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
      animate={mobile ? {} : { y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow under laptop */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 220,
          height: 40,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.35), transparent 70%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Screen */}
        <div
          style={{
            width: 320,
            background: '#141720',
            borderRadius: '12px 12px 0 0',
            border: '2px solid #2a3147',
            borderBottom: 'none',
            padding: 10,
            boxShadow:
              '0 0 80px rgba(59,130,246,0.25), 0 0 160px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            position: 'relative',
          }}
        >
          {/* Screen inner */}
          <div
            style={{
              background: '#0f1117',
              borderRadius: 8,
              height: 200,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: 'absolute',
                top: 4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 48,
                height: 5,
                background: '#0A0B0F',
                borderRadius: 999,
                zIndex: 10,
              }}
            />

            {/* Fake navbar */}
            <div
              style={{
                height: 24,
                background: '#141720',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                gap: 6,
                borderBottom: '1px solid #1e2235',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              <div style={{ flex: 1, height: 4, background: '#1e2235', borderRadius: 3, marginLeft: 8 }} />
            </div>

            {/* Fake hero area */}
            <div style={{ padding: 14 }}>
              <motion.div
                style={{
                  height: 10,
                  width: '75%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                  marginBottom: 8,
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div style={{ height: 8, width: '50%', background: '#1e2235', borderRadius: 999, marginBottom: 12 }} />
              <div style={{ height: 16, width: 80, background: '#3B82F6', borderRadius: 6 }} />
            </div>

            {/* Fake cards */}
            <div style={{ display: 'flex', gap: 8, padding: '0 14px', marginTop: 4 }}>
              <FakeCard delay={0} />
              <FakeCard delay={0.5} />
              <FakeCard delay={1} />
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div
          style={{
            width: 320,
            height: 16,
            background: 'linear-gradient(to bottom, #1e2235, #141720)',
            borderRadius: '0 0 6px 6px',
            border: '2px solid #2a3147',
            borderTop: 'none',
          }}
        />

        {/* Stand */}
        <div
          style={{
            width: 70,
            height: 10,
            background: '#141720',
            border: '2px solid #2a3147',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
          }}
        />
      </div>
    </motion.div>
  )
}

export function WebDesignHero() {
  return (
    <section
      className="relative overflow-hidden pt-16"
      style={{ background: '#0A0B0F', minHeight: '100vh' }}
    >
      {/* Grid layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 75%)',
        }}
        animate={{ backgroundPosition: ['0px 0px', '64px 64px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Ambient glow — shifted right to illuminate laptop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '60%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,179,237,0.06), transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* 2-column content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div className="pb-24 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Badge>Web Design Studio</Badge>
            </motion.div>

            <motion.h1
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] tracking-[-0.03em] mt-8 mb-6 text-balance"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            >
              <motion.span
                className="block text-[#F8FAFC]"
                variants={{
                  hidden:  { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
                }}
              >
                Not just beautiful websites.
              </motion.span>
              <motion.span
                className="block"
                variants={{
                  hidden:  { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.3 } },
                }}
              >
                <GradientText>Revenue-generating assets.</GradientText>
              </motion.span>
            </motion.h1>

            <motion.p
              className="font-sans text-lg text-[#94A3B8] max-w-[480px] leading-relaxed mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            >
              We build conversion-focused web experiences for businesses that want their site to generate clients — not just look good.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-x-5 gap-y-1.5 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {['Conversion-focused', 'Mobile-first', 'Lightning fast', 'SEO-ready'].map((item) => (
                <span key={item} className="font-mono text-xs text-[#475569]">{item}</span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('wd-contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('wd-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Right — laptop mockup */}
          <motion.div
            className="flex items-end justify-center pb-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          >
            <LaptopMockup />
          </motion.div>

        </div>
      </div>

      {/* Cinematic bottom border */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }} />
        <div style={{ height: 8, background: 'linear-gradient(180deg, rgba(59,130,246,0.08), transparent)' }} />
      </div>
    </section>
  )
}
