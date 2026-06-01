import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const schema = z.object({
  name:          z.string().min(2, 'Name is required'),
  businessName:  z.string().min(2, 'Business name is required'),
  phone:         z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required'),
  website:       z.string().url('Enter a valid URL').optional().or(z.literal('')),
  message:       z.string().optional(),
})
type FormData = z.infer<typeof schema>

const inputCls = (hasError?: boolean) =>
  cn(
    'w-full bg-[#0A0B0F] border rounded-xl h-12 px-4 text-sm text-[#F8FAFC]',
    'placeholder:text-[#475569] outline-none transition-all duration-200',
    'focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/15',
    hasError ? 'border-[#EF4444]' : 'border-[#1e2235] hover:border-[#2A3147]'
  )

const labelCls = 'block font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#475569] mb-1.5'

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

const bullets = [
  'No long-term contracts',
  '100% done-for-you',
  'Limited spots available',
]

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
  }

  return (
    <section id="apply" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 800px 600px at 25% 50%, rgba(59,130,246,0.06) 0%, transparent 65%)' }}
      />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Columna izquierda */}
          <div>
            <Badge>Apply now</Badge>

            <h2
              className="font-display mt-5 mb-5 text-white leading-[1.08] tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
            >
              Want more booked estimates from Meta ads?
            </h2>

            <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
              We take on a limited number of clients at a time. If you're a local service business ready to invest in paid social, let's find out if we're a fit.
            </p>

            <ul className="flex flex-col gap-3.5 mb-10" role="list">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{ width: 22, height: 22, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}
                    aria-hidden="true"
                  >
                    <Check size={12} style={{ color: '#22C55E' }} />
                  </div>
                  <span className="font-sans text-sm" style={{ color: '#94A3B8' }}>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply to work with us
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a 15-min check
              </Button>
            </div>
          </div>

          {/* Columna derecha */}
          <div
            id="apply-form"
            className="bg-[#0f1117] border border-[#1e2235] rounded-2xl p-8"
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
                    style={{ width: 64, height: 64, background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.2)' }}
                  >
                    <CheckCircle size={28} style={{ color: '#22C55E' }} />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">Application received!</h3>
                  <p className="font-sans text-sm" style={{ color: '#94A3B8' }}>
                    We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                  {/* Name + Business — 2 cols */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelCls}>Your name</label>
                      <input id="name" {...register('name')} placeholder="John Smith" className={inputCls(!!errors.name)} />
                      <FieldError message={errors.name?.message} />
                    </div>
                    <div>
                      <label htmlFor="businessName" className={labelCls}>Business name</label>
                      <input id="businessName" {...register('businessName')} placeholder="Smith Roofing" className={inputCls(!!errors.businessName)} />
                      <FieldError message={errors.businessName?.message} />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelCls}>Phone number</label>
                    <input id="phone" type="tel" {...register('phone')} placeholder="+1 (555) 000-0000" className={inputCls(!!errors.phone)} />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className={labelCls}>
                      Website <span className="normal-case font-sans tracking-normal" style={{ color: '#475569' }}>(optional)</span>
                    </label>
                    <input id="website" type="url" {...register('website')} placeholder="https://yourwebsite.com" className={inputCls(!!errors.website)} />
                    <FieldError message={errors.website?.message} />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelCls}>
                      Anything else? <span className="normal-case font-sans tracking-normal" style={{ color: '#475569' }}>(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell us about your business or current situation..."
                      rows={3}
                      className={cn(inputCls(), 'h-auto pt-3 resize-none')}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Apply to work with us
                  </Button>

                  <p className="font-mono text-[10px] text-center pt-1" style={{ color: '#475569' }}>
                    No long-term contracts · 100% done-for-you · Limited spots
                  </p>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
