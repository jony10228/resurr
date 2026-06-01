import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/animations'

const projects = [
  {
    title: 'Landing Pages',
    description: 'High-converting single-page experiences built to turn ad traffic into booked appointments.',
    accent: '#3B82F6',
  },
  {
    title: 'Business Websites',
    description: 'Multi-page authority sites that build trust and generate inbound leads 24/7.',
    accent: '#60A5FA',
  },
  {
    title: 'Agency Websites',
    description: 'Bold, modern sites for creative teams that need to impress from the first scroll.',
    accent: '#93C5FD',
  },
  {
    title: 'Custom Web Experiences',
    description: 'Interactive, animated, one-of-a-kind builds for brands that refuse to blend in.',
    accent: '#3B82F6',
  },
]

function BrowserMockup({ accent }: { accent: string }) {
  return (
    <div
      className="rounded-t-xl overflow-hidden"
      style={{ background: '#141720', border: '1px solid #1e2235', borderBottom: 'none' }}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1e2235]">
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
        <div
          className="ml-3 flex-1 rounded"
          style={{ height: 6, background: '#1e2235' }}
        />
      </div>
      {/* Screen */}
      <div
        style={{
          height: 120,
          background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 50%, transparent 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div style={{ width: 80, height: 6, borderRadius: 3, background: accent }} />
          <div style={{ width: 56, height: 4, borderRadius: 3, background: '#1e2235' }} />
          <div style={{ width: 40, height: 4, borderRadius: 3, background: '#1e2235' }} />
        </div>
      </div>
    </div>
  )
}

export function WebDesignShowcase() {
  return (
    <section id="wd-showcase" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>What we build</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Websites engineered to perform
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
          {projects.map(({ title, description, accent }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group bg-[#0f1117] border border-[#1e2235] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(59,130,246,0.07)]"
              style={{ borderColor: undefined }}
              whileHover={{ borderColor: 'rgba(59,130,246,0.3)' }}
            >
              <BrowserMockup accent={accent} />
              <div className="p-6">
                <h3 className="font-sans font-semibold text-lg text-white mb-2">{title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
