import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CheckCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { cn } from '@/lib/utils'

/* ─── Schema ─── */
const schema = z.object({
  name:         z.string().min(2, 'Name is required'),
  businessName: z.string().min(2, 'Business name is required'),
  email:        z.string().email('Enter a valid email address'),
  projectType:  z.string().min(1, 'Please select a project type'),
  budgetRange:  z.string().min(1, 'Please select a budget range'),
  details:      z.string().optional(),
  websiteUrl:   z
    .string()
    .optional()
    .refine(
      (v) => !v || v === '' || /^https?:\/\/.+\..+/.test(v),
      { message: 'Enter a valid URL (https://...)' }
    ),
})
type FormData = z.infer<typeof schema>

/* ─── Shared styles ─── */
const inputCls = (hasError?: boolean) =>
  cn(
    'w-full bg-[#0A0B0F] border rounded-xl h-12 px-4 text-sm text-[#F8FAFC]',
    'placeholder:text-[#475569] outline-none transition-all duration-200',
    'focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/15',
    hasError ? 'border-[#EF4444]' : 'border-[#1e2235] hover:border-[#2A3147]'
  )

const labelCls =
  'block font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#475569] mb-1.5'

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-[11px] text-[#EF4444] mt-1.5"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/* ─── Left column bullets ─── */
const BULLETS = [
  'Free strategy consultation',
  'Delivered in 2–4 weeks',
  'You own 100% of the code',
]

/* ─── Component ─── */
export function WebDesignCTA() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
  }

  return (
    <section id="wd-contact" className="relative overflow-hidden bg-[#0d0f14]">
      {/* Top light line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 800px 600px at 30% 50%, rgba(59,130,246,0.06), transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ─── Left: copy ─── */}
          <div>
            <AnimatedSection delay={0}>
              <Badge>Start Your Project</Badge>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2
                className="font-display leading-[1.05] tracking-[-0.03em] text-[#F8FAFC] mt-6 mb-5 text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)' }}
              >
                Ready for a website<br />
                <GradientText>that actually converts?</GradientText>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-sans text-sm leading-relaxed text-[#94A3B8] mb-8 max-w-sm">
                Let's talk about your project. No pressure, no commitment — just a conversation
                about what's possible.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <ul className="flex flex-col gap-3.5 mb-10" role="list">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{
                        width: 22,
                        height: 22,
                        background: 'rgba(34,197,94,0.12)',
                        border: '1px solid rgba(34,197,94,0.25)',
                      }}
                      aria-hidden="true"
                    >
                      <Check size={12} style={{ color: '#22C55E' }} />
                    </div>
                    <span className="font-sans text-sm text-[#94A3B8]">{b}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    document.getElementById('wd-contact-form')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Book Your Strategy Call
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document.getElementById('wd-process')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  View Our Process
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* ─── Right: form card ─── */}
          <AnimatedSection delay={0.15}>
            <div
              id="wd-contact-form"
              className="bg-[#0f1117] border border-[#1e2235] rounded-2xl p-8"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className="flex items-center justify-center rounded-full mx-auto mb-5"
                      style={{
                        width: 64,
                        height: 64,
                        background: 'rgba(34,197,94,0.10)',
                        border: '1px solid rgba(34,197,94,0.2)',
                      }}
                    >
                      <CheckCircle size={28} style={{ color: '#22C55E' }} />
                    </div>
                    <h3 className="font-display text-2xl text-white mb-2">
                      Inquiry received!
                    </h3>
                    <p className="font-sans text-sm text-[#94A3B8]">
                      We'll reply within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Name + Business — 2 cols */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="wd-name" className={labelCls}>Your Name</label>
                        <input
                          id="wd-name"
                          {...register('name')}
                          placeholder="John Smith"
                          className={inputCls(!!errors.name)}
                        />
                        <FieldError message={errors.name?.message} />
                      </div>
                      <div>
                        <label htmlFor="wd-business" className={labelCls}>Business Name</label>
                        <input
                          id="wd-business"
                          {...register('businessName')}
                          placeholder="Smith Co."
                          className={inputCls(!!errors.businessName)}
                        />
                        <FieldError message={errors.businessName?.message} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="wd-email" className={labelCls}>Email</label>
                      <input
                        id="wd-email"
                        type="email"
                        {...register('email')}
                        placeholder="you@company.com"
                        className={inputCls(!!errors.email)}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>

                    {/* Project Type + Budget — 2 cols */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="wd-project-type" className={labelCls}>Project Type</label>
                        <select
                          id="wd-project-type"
                          {...register('projectType')}
                          className={cn(inputCls(!!errors.projectType), 'cursor-pointer')}
                          defaultValue=""
                        >
                          <option value="" disabled>Select type</option>
                          <option value="landing-page">Landing Page</option>
                          <option value="business-website">Business Website</option>
                          <option value="agency-website">Agency Website</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="custom-build">Custom Build</option>
                          <option value="other">Other</option>
                        </select>
                        <FieldError message={errors.projectType?.message} />
                      </div>
                      <div>
                        <label htmlFor="wd-budget" className={labelCls}>Budget Range</label>
                        <select
                          id="wd-budget"
                          {...register('budgetRange')}
                          className={cn(inputCls(!!errors.budgetRange), 'cursor-pointer')}
                          defaultValue=""
                        >
                          <option value="" disabled>Select budget</option>
                          <option value="3k-5k">$3,000 – $5,000</option>
                          <option value="5k-10k">$5,000 – $10,000</option>
                          <option value="10k+">$10,000+</option>
                        </select>
                        <FieldError message={errors.budgetRange?.message} />
                      </div>
                    </div>

                    {/* Website URL */}
                    <div>
                      <label htmlFor="wd-url" className={labelCls}>
                        Website URL{' '}
                        <span className="normal-case font-sans tracking-normal text-[#475569]">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="wd-url"
                        type="url"
                        {...register('websiteUrl')}
                        placeholder="Your current website (if any)"
                        className={inputCls(!!errors.websiteUrl)}
                      />
                      <FieldError message={errors.websiteUrl?.message} />
                    </div>

                    {/* Project Details */}
                    <div>
                      <label htmlFor="wd-details" className={labelCls}>
                        Project Details{' '}
                        <span className="normal-case font-sans tracking-normal text-[#475569]">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="wd-details"
                        {...register('details')}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={3}
                        className={cn(inputCls(), 'h-auto pt-3 resize-none')}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'w-full h-[52px] rounded-xl font-sans font-medium text-sm text-white',
                        'bg-[#3B82F6] hover:bg-[#60A5FA] transition-colors duration-200',
                        'flex items-center justify-center gap-2',
                        'disabled:opacity-60 disabled:cursor-not-allowed',
                        'shadow-[0_0_40px_rgba(59,130,246,0.15)]'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Project Inquiry'
                      )}
                    </button>

                    <p className="font-mono text-[10px] text-center text-[#475569] pt-1">
                      Free consultation · No commitment · Response within 24h
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
