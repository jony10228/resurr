import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

const faqs = [
  {
    question: 'How fast can I see results?',
    answer: 'Most clients see measurable activity — leads, calls, form fills — within the first 2 weeks of launch. Meaningful ROI typically becomes clear within 30–60 days, depending on your offer, market, and budget.',
  },
  {
    question: 'What budget should I start with?',
    answer: 'We recommend a minimum ad spend of $1,500–$2,000/month to generate enough data to optimize and scale. Below that, the learning phase takes too long and results are inconsistent.',
  },
  {
    question: 'Why use owner-led creatives?',
    answer: "Because they convert. When a business owner speaks directly to camera about their service, it builds trust in a way no actor or stock footage can. Our data across hundreds of campaigns shows owner-led UGC consistently outperforms polished studio ads.",
  },
  {
    question: 'Do you require a contract?',
    answer: "We work month-to-month after an initial onboarding period. We don't believe in locking clients in — we believe in earning your business every month through results.",
  },
  {
    question: 'What do you need from me?',
    answer: 'Primarily: short videos of you or your team, recorded on your phone. We provide the full script and direction. Beyond that, access to your ad account and a 30-minute onboarding call.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-32 overflow-hidden bg-[#0d0f14]">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <AnimatedSection delay={0}>
            <Badge>Frequently asked questions</Badge>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-[#F8FAFC] mt-4">
              Got questions?
            </h2>
          </AnimatedSection>
        </div>

        <div className="max-w-2xl mx-auto">
          {faqs.map(({ question, answer }, i) => {
            const isOpen = openIndex === i

            return (
              <AnimatedSection key={question} delay={0.05 * i}>
                <div className="border-b border-[#1e2235]">
                  <button
                    className="w-full flex justify-between items-center py-6 text-left cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                  >
                    <span
                      className="font-sans font-medium text-base pr-6 transition-colors duration-200"
                      style={{ color: isOpen ? '#3B82F6' : '#F8FAFC' }}
                    >
                      {question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      className="shrink-0"
                      style={{ color: '#3B82F6' }}
                      aria-hidden="true"
                    >
                      <Plus size={20} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 font-sans text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

      </div>
    </section>
  )
}
