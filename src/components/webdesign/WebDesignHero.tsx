import { useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Zap, Clock, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'

const EASE = [0.16, 1, 0.3, 1] as const

const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ─── Metric card ─── */
interface MetricCardProps {
  value: string
  label: string
  icon: React.ReactNode
  iconColor: string
  delay: number
  floatDuration: number
  floatAmount: number
  style?: React.CSSProperties
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
}

function MetricCard({
  value, label, icon, iconColor, delay,
  floatDuration, floatAmount, style,
  parallaxX, parallaxY,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      style={{ position: 'absolute', zIndex: 20, willChange: 'transform', ...style }}
    >
      <motion.div
        animate={{ y: [0, -floatAmount, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <div
            style={{
              background: 'rgba(15,17,23,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 12,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 15px rgba(59,130,246,0.1)',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `${iconColor}1a`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: iconColor,
              }}
            >
              {icon}
            </div>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700, color: '#F8FAFC', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginTop: 3 }}>
                {label}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Monitor mockup ─── */
function MonitorMockup({
  rotateX, rotateY, cardParallaxX, cardParallaxY, mobile,
}: {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  cardParallaxX: MotionValue<number>
  cardParallaxY: MotionValue<number>
  mobile: boolean
}) {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>

      {/* Glow behind monitor — difuso */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 450,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.35), transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow behind monitor — intenso pequeño */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 250,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.5), transparent 60%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating layer */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* 3D tilt layer */}
        <motion.div
          style={mobile ? {} : {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
          >
            {/* Screen */}
            <div
              className="w-[300px] sm:w-[380px] lg:w-[480px]"
              style={{
                background: '#1a1a2e',
                borderRadius: '12px 12px 0 0',
                border: '2px solid #2a3147',
                borderBottom: 'none',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 80px rgba(59,130,246,0.25), 0 0 160px rgba(59,130,246,0.1), 0 60px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Browser bar */}
              <div
                style={{
                  height: 28,
                  background: '#141720',
                  borderBottom: '1px solid #1e2235',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', flexShrink: 0 }} />
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} />
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                <div
                  style={{
                    flex: 1,
                    height: 12,
                    background: '#0f1117',
                    border: '1px solid #1e2235',
                    borderRadius: 6,
                    marginLeft: 8,
                    maxWidth: '60%',
                  }}
                />
              </div>

              {/* Screenshot */}
              <img
                src="/imagenes/featured-project.png"
                alt="Premium web project by Resurrect Media"
                className="w-full object-cover object-top"
                style={{ maxHeight: 280, display: 'block' }}
                loading="eager"
                decoding="async"
              />

              {/* Screen reflection */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
                  pointerEvents: 'none',
                  borderRadius: 'inherit',
                }}
              />
            </div>

            {/* Base */}
            <div
              className="w-[300px] sm:w-[380px] lg:w-[480px]"
              style={{
                height: 20,
                background: 'linear-gradient(to bottom, #2a3147, #1e2235)',
                borderRadius: '0 0 12px 12px',
                border: '2px solid #2a3147',
                borderTop: 'none',
              }}
            />

            {/* Stand */}
            <div
              style={{
                width: 90,
                height: 12,
                background: '#1e2235',
                border: '2px solid #2a3147',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                margin: '0 auto',
              }}
            />

            {/* Metric cards — desktop/tablet only */}
            {!mobile && (
              <>
                <MetricCard
                  value="99"
                  label="Performance Score"
                  icon={<Zap size={14} />}
                  iconColor="#22C55E"
                  delay={1.0}
                  floatDuration={5}
                  floatAmount={8}
                  parallaxX={cardParallaxX}
                  parallaxY={cardParallaxY}
                  style={{ top: 40, left: -20 }}
                />
                <MetricCard
                  value="0.8s"
                  label="Load Time"
                  icon={<Clock size={14} />}
                  iconColor="#3B82F6"
                  delay={1.3}
                  floatDuration={7}
                  floatAmount={6}
                  parallaxX={cardParallaxX}
                  parallaxY={cardParallaxY}
                  style={{ top: '45%', right: -24, transform: 'translateY(-50%)' }}
                />
                <MetricCard
                  value="3x"
                  label="More Conversions"
                  icon={<TrendingUp size={14} />}
                  iconColor="#60A5FA"
                  delay={1.6}
                  floatDuration={6}
                  floatAmount={10}
                  parallaxX={cardParallaxX}
                  parallaxY={cardParallaxY}
                  style={{ bottom: 50, left: -10 }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Metric cards — mobile row */}
      {mobile && (
        <div style={{ display: 'flex', gap: 8, marginTop: 20, position: 'relative', zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { value: '99', label: 'Performance', icon: <Zap size={13} />, color: '#22C55E' },
            { value: '0.8s', label: 'Load Time', icon: <Clock size={13} />, color: '#3B82F6' },
            { value: '3x', label: 'Conversions', icon: <TrendingUp size={13} />, color: '#60A5FA' },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                background: 'rgba(15,17,23,0.92)',
                border: '1px solid #1e2235',
                borderRadius: 10,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${m.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                {m.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: '#F8FAFC' }}>{m.value}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Main hero ─── */
export function WebDesignHero() {
  const sectionRef   = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number | undefined>(undefined)
  const pendingRef   = useRef<{ x: number; y: number } | null>(null)
  const mobile       = isMobile()
  const reduced      = prefersReduced()

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const monitorX     = useTransform(springX, [-0.5, 0.5], [14, -14])
  const monitorY     = useTransform(springY, [-0.5, 0.5], [14, -14])
  const rotateX      = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY      = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const textX        = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const textY        = useTransform(springY, [-0.5, 0.5], [-5, 5])
  const cardParallaxX = useTransform(springX, [-0.5, 0.5], [-4, 4])
  const cardParallaxY = useTransform(springY, [-0.5, 0.5], [-4, 4])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (mobile || reduced) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    pendingRef.current = { x, y }

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = undefined
      const p = pendingRef.current
      if (!p) return
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${p.x - 200}px, ${p.y - 200}px)`
      }
      mouseX.set(p.x / rect.width - 0.5)
      mouseY.set(p.y / rect.height - 0.5)
      pendingRef.current = null
    })
  }, [mobile, reduced, mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden pt-16"
      style={{ minHeight: '100vh' }}
    >
      {/* NEW 1 — Aurora fuerte */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-40%',
          background: 'radial-gradient(ellipse 40% 50% at 25% 35%, rgba(59,130,246,0.45), transparent 60%), radial-gradient(ellipse 45% 55% at 75% 55%, rgba(99,179,237,0.35), transparent 60%)',
          filter: 'blur(30px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{ x: ['0%', '3%', '-2%', '0%'], y: ['0%', '-2%', '2%', '0%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* NEW 2 — Grid técnico animado */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 20%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 20%, transparent 75%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{ backgroundPosition: ['0px 0px', '48px 48px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* NEW 3 — Glow grande detrás del monitor */}
      <motion.div
        style={{
          position: 'absolute',
          top: '35%',
          right: '10%',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.50), transparent 65%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* CAPA 1 — Aurora */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: '-40%',
          zIndex: 0,
          background: [
            'radial-gradient(ellipse 35% 45% at 25% 35%, rgba(59,130,246,0.25), transparent 60%)',
            'radial-gradient(ellipse 40% 50% at 75% 55%, rgba(99,179,237,0.18), transparent 60%)',
            'radial-gradient(ellipse 30% 40% at 50% 50%, rgba(37,99,235,0.14), transparent 60%)',
          ].join(','),
          filter: 'blur(50px)',
        }}
        animate={reduced ? {} : { x: ['0%', '4%', '-3%', '0%'], y: ['0%', '-3%', '3%', '0%'], scale: [1, 1.08, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* CAPA 2 — Grid técnico */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 20%, transparent 75%)',
        }}
        animate={reduced ? {} : { backgroundPosition: ['0px 0px', '48px 48px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* CAPA 3 — Glow central */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '35%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18), transparent 65%)',
          filter: 'blur(80px)',
        }}
        animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mouse spotlight */}
      {!mobile && !reduced && (
        <div
          ref={spotlightRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 65%)',
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 1,
            willChange: 'transform',
            transform: 'translate(-600px, -600px)',
          }}
        />
      )}

      {/* 2-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ─── Left: copy ─── */}
          <motion.div style={!mobile && !reduced ? { x: textX, y: textY } : {}}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0 }}
            >
              <Badge>Web Design Studio</Badge>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-display leading-[1.05] tracking-[-0.03em] mt-8 mb-6 text-balance"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
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
                We build websites that turn
              </motion.span>
              <motion.span
                className="block text-[#F8FAFC]"
                variants={{
                  hidden:  { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.3 } },
                }}
              >
                visitors into
              </motion.span>
              <motion.span
                className="block"
                variants={{
                  hidden:  { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.45 } },
                }}
              >
                <GradientText>paying customers.</GradientText>
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="font-sans text-lg text-[#94A3B8] max-w-[440px] leading-relaxed mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            >
              Conversion-focused web experiences for businesses that want their site to generate revenue — not just look good.
            </motion.p>

            {/* Trust bar */}
            <motion.div
              className="flex flex-wrap gap-x-4 gap-y-1.5 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              {['Conversion-focused', 'Mobile-first', 'Lightning fast', 'SEO-ready'].map((item, i) => (
                <span key={item} className="font-mono text-xs text-[#475569]">
                  {i > 0 && <span className="mr-4 text-[#2a3147]">·</span>}
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
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
          </motion.div>

          {/* ─── Right: monitor ─── */}
          <motion.div
            style={!mobile && !reduced ? { x: monitorX, y: monitorY, willChange: 'transform' } : {}}
          >
            <MonitorMockup
              rotateX={rotateX}
              rotateY={rotateY}
              cardParallaxX={cardParallaxX}
              cardParallaxY={cardParallaxY}
              mobile={mobile}
            />
          </motion.div>

        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }} />
        <div style={{ height: 8, background: 'linear-gradient(180deg, rgba(59,130,246,0.08), transparent)' }} />
      </div>
    </section>
  )
}
