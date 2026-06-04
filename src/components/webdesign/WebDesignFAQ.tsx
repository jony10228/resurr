import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

const ITEMS = [
  {
    q: 'How long does a website take?',
    a: "Most projects are delivered in 2–4 weeks from kickoff. Complex custom builds may take 4–6 weeks. We'll give you a clear timeline before we start.",
  },
  {
    q: 'What does a website cost?',
    a: 'Our websites start at $3,000 for landing pages and go up to $10,000+ for full custom builds. The price depends on scope, pages, and complexity. We\'ll give you a fixed quote — no surprises.',
  },
  {
    q: 'Do you use WordPress?',
    a: "No. We build with React, TypeScript, and Tailwind CSS. This means faster load times, better SEO, smoother animations, and a site that doesn't need constant plugin updates or security patches.",
  },
  {
    q: 'What do I need to provide?',
    a: 'Your brand assets (logo, colors, fonts if you have them), content for each page (we can help write it), and access to your domain and hosting. We handle everything else.',
  },
  {
    q: 'Do you offer hosting?',
    a: 'We deploy on Vercel or Netlify — both are fast, reliable, and have generous free tiers. You own the hosting account. No monthly fees to us for keeping your site online.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'You get 30 days of free revisions after launch. After that, we offer affordable maintenance packages or you can hire any developer — the code is clean, documented, and yours.',
  },
]

export function WebDesignFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="wd-faq" className="relative py-32 overflow-hidden bg-[#0d0f14]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 500px 300px at 50% 100%, rgba(59,130,246,0.04), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <Badge>FAQ</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Common questions
            </h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <div style={{ borderTop: '1px solid #1e2235' }}>
            {ITEMS.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q} style={{ borderBottom: '1px solid #1e2235' }}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans font-medium text-base text-[#F8FAFC] group-hover:text-white transition-colors">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0"
                    >
                      <Plus size={18} color="#3B82F6" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-sans text-sm text-[#94A3B8] leading-relaxed pb-5 pr-8">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
