import { useRef, useEffect, useCallback, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'

const EASE = [0.16, 1, 0.3, 1] as const

const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface MetricData {
  target: number
  decimals: number
  prefix?: string
  suffix?: string
  label: string
  barPercent: number
}

function MetricCard({ target, decimals, prefix = '', suffix = '', label, barPercent }: MetricData) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2200
    const start = performance.now()
    let raf: number

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, decimals])

  const display = decimals > 0 ? count.toFixed(decimals) : String(Math.round(count))

  return (
    <div ref={ref} className="bg-[#0f1117] border border-[#1e2235] rounded-xl p-5 text-center flex-1 min-w-[140px]">
      <span className="font-mono text-3xl font-bold text-[#3B82F6]">
        {prefix}{display}{suffix}
      </span>
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#475569] mt-2">{label}</p>
      <div className="mt-3.5 h-1 bg-[#1e2235] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${barPercent}%` } : { width: '0%' }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

const METRICS: MetricData[] = [
  { target: 15.0, decimals: 1, suffix: 'M+', label: 'Views on creatives', barPercent: 90 },
  { target: 8,    decimals: 0, prefix: '$',  label: 'Cost per lead',       barPercent: 65 },
  { target: 9,    decimals: 0, suffix: 'x',  label: 'ROAS delivered',      barPercent: 85 },
]

export function Hero() {
  const containerRef   = useRef<HTMLElement>(null)
  const spotlightRef   = useRef<HTMLDivElement>(null)
  const rafRef         = useRef<number | undefined>(undefined)
  const pendingRef     = useRef<{ x: number; y: number } | null>(null)
  const mobile         = isMobile()
  const reduced        = prefersReduced()

  /* ── Parallax values ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const contentX = useTransform(springX, [-0.5, 0.5], [8, -8])
  const contentY = useTransform(springY, [-0.5, 0.5], [8, -8])

  /* ── rAF-throttled mouse handler ── */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (mobile || reduced) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    pendingRef.current = { x, y }

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = undefined
      const p = pendingRef.current
      if (!p) return

      /* spotlight */
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${p.x - 200}px, ${p.y - 200}px)`
      }

      /* parallax (via motion values — no re-render) */
      const nx = p.x / rect.width - 0.5
      const ny = p.y / rect.height - 0.5
      mouseX.set(nx)
      mouseY.set(ny)

      pendingRef.current = null
    })
  }, [mobile, reduced, mouseX, mouseY])

  /* cleanup rAF on unmount */
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      style={{ background: '#0A0B0F' }}
    >
      {/* ── CAPA 1: grid técnico animado ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
        {...(!reduced && {
          animate: { backgroundPosition: ['0px 0px', '64px 64px'] },
          transition: { duration: 20, repeat: Infinity, ease: 'linear' },
        })}
      />

      {/* ── CAPA 2: glow ambiental ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 60%)',
            filter: 'blur(100px)',
            willChange: 'transform',
          }}
          {...(!reduced && {
            animate: { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] },
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          })}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '-5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,179,237,0.08), transparent 60%)',
            filter: 'blur(80px)',
          }}
          {...(!reduced && {
            animate: { opacity: [0.4, 0.7, 0.4] },
            transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          })}
        />
      </div>

      {/* ── CAPA 3: spotlight cursor (desktop only) ── */}
      {!mobile && (
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
            background: 'radial-gradient(circle, rgba(59,130,246,0.10), transparent 65%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            willChange: 'transform',
            transform: 'translate(-400px, -400px)', /* hidden until first mousemove */
          }}
        />
      )}

      {/* ── CAPA 4: contenido con parallax ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center"
        style={!mobile && !reduced ? { x: contentX, y: contentY } : {}}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0 }}
        >
          <Badge>Meta Ads Agency</Badge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-display text-[clamp(3rem,8vw,6rem)] leading-[1.0] tracking-[-0.03em] text-[#F8FAFC] mt-8 mb-6 text-balance"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.span
            className="block"
            variants={{
              hidden:  { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
            }}
          >
            Meta ads engineered for
          </motion.span>
          <motion.span
            className="block"
            variants={{
              hidden:  { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.3 } },
            }}
          >
            <GradientText>booked leads</GradientText>
            <span className="text-[#94A3B8]"> — not just leads.</span>
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-sans text-lg text-[#94A3B8] max-w-[520px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
        >
          We run Facebook & Instagram campaigns for local service businesses — powered by owner-led UGC creatives that don't look like ads.
        </motion.p>

        {/* Trust bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            { icon: CheckCircle, text: 'No long-term contracts' },
            { icon: CheckCircle, text: 'PROOF-BASED ONBOARDING' },
            { icon: CheckCircle, text: '100% done-for-you' },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5 font-mono text-xs text-[#475569]">
              <Icon size={12} className="text-[#3B82F6]" aria-hidden="true" />
              {text}
            </span>
          ))}
          <a href="#proof" className="font-mono text-xs text-[#3B82F6] hover:text-[#60A5FA] flex items-center gap-1 transition-colors">
            See open slots <ArrowRight size={12} />
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Apply to work with us
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a 15-min check
          </Button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-14 w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
        >
          {METRICS.map((m) => <MetricCard key={m.label} {...m} />)}
        </motion.div>

        {/* Web Design link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8"
        >
          <span className="font-mono text-xs text-[#475569]">
            Also building websites that convert?{' '}
          </span>
          <Link
            to="/web-design"
            className="font-mono text-xs text-[#3B82F6] hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1"
          >
            See Web Design Services <ArrowRight size={11} />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Borde inferior cinematográfico ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
          }}
        />
        <div
          style={{
            height: 8,
            background: 'linear-gradient(180deg, rgba(59,130,246,0.08), transparent)',
          }}
        />
      </div>
    </section>
  )
}
