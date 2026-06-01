import { Check, X, CheckCircle, XCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

const goodFit = [
  'You sell a local service and want to run or improve paid ads',
  "You're open to filming short owner-led clips (phone quality is fine)",
  "You're willing to test different offers and creatives",
  'You want measurable results within a few months',
  'You maintain a client retention rate above 60%',
]

const notFit = [
  'You want guaranteed results before spending anything',
  "You won't appear on video under any circumstances",
  "You can't commit to a process or a consistent ad spend",
  "You're looking for one-off work without accountability",
]

export function IsThisAFit() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <AnimatedSection delay={0}>
            <Badge>Fit check</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Is this a fit?
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Great Fit ── */}
          <AnimatedSection delay={0.1}>
            <div
              className="bg-[#0f1117] rounded-2xl p-8 h-full"
              style={{ border: '1px solid rgba(34,197,94,0.2)' }}
            >
              {/* Header badge */}
              <div
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 mb-6"
                style={{ background: 'rgba(34,197,94,0.10)' }}
              >
                <CheckCircle size={18} style={{ color: '#4ade80' }} aria-hidden="true" />
                <span className="font-sans font-semibold text-base" style={{ color: '#4ade80' }}>
                  Great Fit If…
                </span>
              </div>

              <ul className="flex flex-col" role="list">
                {goodFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-[#1e2235] last:border-0"
                  >
                    {/* Icon circle */}
                    <div
                      className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                      style={{ width: 24, height: 24, background: 'rgba(34,197,94,0.10)' }}
                      aria-hidden="true"
                    >
                      <Check size={12} style={{ color: '#22C55E' }} />
                    </div>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* ── Not a Fit ── */}
          <AnimatedSection delay={0.2}>
            <div
              className="bg-[#0f1117] rounded-2xl p-8 h-full"
              style={{ border: '1px solid rgba(239,68,68,0.2)' }}
            >
              {/* Header badge */}
              <div
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 mb-6"
                style={{ background: 'rgba(239,68,68,0.10)' }}
              >
                <XCircle size={18} style={{ color: '#f87171' }} aria-hidden="true" />
                <span className="font-sans font-semibold text-base" style={{ color: '#f87171' }}>
                  Not a Fit If…
                </span>
              </div>

              <ul className="flex flex-col" role="list">
                {notFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-[#1e2235] last:border-0"
                  >
                    {/* Icon circle */}
                    <div
                      className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                      style={{ width: 24, height: 24, background: 'rgba(239,68,68,0.10)' }}
                      aria-hidden="true"
                    >
                      <X size={12} style={{ color: '#EF4444' }} />
                    </div>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
