import { useState, useEffect, useRef } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { label: 'Results',  href: '#proof' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process' },
  { label: 'FAQ',      href: '#faq' },
]

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function WebDesignBtn({
  compact = false,
  showTooltip = false,
  onClick,
}: {
  compact?: boolean
  showTooltip?: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const shineRef = useRef<HTMLSpanElement>(null)

  const onMouseEnter = () => {
    setHovered(true)
    if (shineRef.current) shineRef.current.style.animationDuration = '1.5s'
  }
  const onMouseLeave = () => {
    setHovered(false)
    if (shineRef.current) shineRef.current.style.animationDuration = '3s'
  }

  const glowShadow = hovered
    ? ['0 0 8px rgba(59,130,246,0.3)', '0 0 18px rgba(59,130,246,0.45)', '0 0 8px rgba(59,130,246,0.3)']
    : ['0 0 4px rgba(59,130,246,0.1)', '0 0 12px rgba(59,130,246,0.25)', '0 0 4px rgba(59,130,246,0.1)']

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <motion.div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        whileHover={prefersReduced ? {} : { y: -1 }}
        whileTap={{ scale: 0.97 }}
        animate={prefersReduced ? {} : { boxShadow: glowShadow }}
        transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
        style={{ borderRadius: compact ? 8 : 10, display: 'inline-flex' }}
      >
        <Link
          to="/web-design"
          onClick={onClick}
          aria-label="Web Design Services - Need a website that converts?"
          aria-describedby={showTooltip && hovered ? 'wd-tooltip' : undefined}
          className="inline-flex items-center font-sans font-semibold"
          style={{
            height:       compact ? 32 : 36,
            paddingLeft:  compact ? 10 : 16,
            paddingRight: compact ? 10 : 16,
            fontSize:     compact ? 11 : 13,
            borderRadius: compact ? 8 : 10,
            background: 'transparent',
            border: '1px solid rgba(59,130,246,0.35)',
            position: 'relative',
            overflow: 'hidden',
            color: hovered ? '#93C5FD' : '#F8FAFC',
            transition: 'color 0.2s',
            gap: compact ? 5 : 8,
            whiteSpace: 'nowrap',
          }}
        >
          {!prefersReduced && (
            <span
              ref={shineRef}
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                padding: '1px',
                background: 'radial-gradient(transparent, transparent, rgba(96,165,250,0.6), rgba(147,197,253,0.5), transparent, transparent)',
                backgroundSize: '300% 300%',
                animationName: 'shine',
                animationDuration: '3s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              } as React.CSSProperties}
            />
          )}
          <span className="relative z-10 flex items-center" style={{ gap: compact ? 5 : 8 }}>
            <Sparkles size={compact ? 12 : 14} aria-hidden="true" />
            {/* Desktop: full label / Mobile compact: short label */}
            {compact ? 'Web Design' : (
              <>
                <span className="hidden lg:inline">Web Design Services</span>
                <span className="lg:hidden">Web Design</span>
              </>
            )}
          </span>
        </Link>
      </motion.div>

      {/* Tooltip — desktop only */}
      {showTooltip && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              id="wd-tooltip"
              role="tooltip"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-none"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: 12,
                  height: 12,
                  background: '#0f1117',
                  borderLeft: '1px solid #1e2235',
                  borderTop: '1px solid #1e2235',
                }}
              />
              <div
                style={{
                  background: '#0f1117',
                  border: '1px solid #1e2235',
                  borderTop: '2px solid #3B82F6',
                  borderRadius: 12,
                  padding: '10px 12px',
                  maxWidth: 200,
                }}
              >
                <p className="font-sans font-semibold text-sm text-[#F8FAFC]">Need a website?</p>
                <p className="font-sans text-xs text-[#94A3B8] mt-0.5">Built to convert your ad traffic into sales.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl bg-[#0A0B0F]/80 border-b border-[#1E2235]/50' : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="font-display italic text-xl text-[#F8FAFC] flex items-center gap-1 shrink-0"
            aria-label="Resurrect Media home"
          >
            Resurrect<span className="text-[#3B82F6]">.</span>Media
          </Link>

          {/* Desktop nav links (lg+) */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-sans text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs (lg+) */}
          <div className="hidden lg:flex items-center gap-3">
            <div style={{ overflow: 'visible' }}>
              <WebDesignBtn showTooltip />
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply to work with us
            </Button>
          </div>

          {/* Mobile right side (< lg): compact buttons + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <WebDesignBtn compact />
            {/* Compact Apply button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-sans font-medium text-white shrink-0"
              style={{
                height: 32,
                paddingLeft: 12,
                paddingRight: 12,
                fontSize: 11,
                borderRadius: 8,
                background: '#3B82F6',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 20px rgba(59,130,246,0.2)',
              }}
            >
              Apply
            </motion.button>
            {/* Hamburger */}
            <button
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — nav links only */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-[#0F1117] border-l border-[#1E2235] z-50 flex flex-col p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <Link
                  to="/"
                  className="font-display italic text-lg text-[#F8FAFC]"
                  onClick={() => setMobileOpen(false)}
                >
                  Resurrect<span className="text-[#3B82F6]">.</span>Media
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#94A3B8] hover:text-[#F8FAFC]"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <ul className="flex flex-col gap-6" role="list">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-base text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
