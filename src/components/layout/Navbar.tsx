import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Results',  href: '#proof' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process' },
  { label: 'FAQ',      href: '#faq' },
]

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const glowAnim = prefersReduced
  ? {}
  : {
      animate: {
        boxShadow: [
          '0 0 0 0 rgba(59,130,246,0.4)',
          '0 0 24px 4px rgba(59,130,246,0.35)',
          '0 0 0 0 rgba(59,130,246,0.4)',
        ],
      },
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
    }

function WebDesignBtn({ fullWidth = false, onClick }: { fullWidth?: boolean; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      {...glowAnim}
      style={{ borderRadius: 10, display: 'inline-flex', width: fullWidth ? '100%' : undefined }}
    >
      <Link
        to="/web-design"
        onClick={onClick}
        className="inline-flex items-center gap-2 font-sans font-semibold text-[13px] text-white"
        style={{
          padding: '10px 20px',
          borderRadius: 10,
          background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
          width: fullWidth ? '100%' : undefined,
          justifyContent: fullWidth ? 'center' : undefined,
        }}
      >
        <Sparkles size={14} aria-hidden="true" />
        Web Design Services
      </Link>
    </motion.div>
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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="font-display italic text-xl text-[#F8FAFC] flex items-center gap-1" aria-label="Resurrect Media home">
            Resurrect<span className="text-[#3B82F6]">.</span>Media
          </Link>

          <ul className="hidden md:flex items-center gap-8" role="list">
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

          <div className="hidden md:flex items-center gap-3">
            <WebDesignBtn />
          </div>

          <button
            className="md:hidden text-[#94A3B8] hover:text-[#F8FAFC] transition-colors p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0F1117] border-l border-[#1E2235] z-50 flex flex-col p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <Link to="/" className="font-display italic text-lg text-[#F8FAFC]" onClick={() => setMobileOpen(false)}>
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

              <ul className="flex flex-col gap-6 mb-6" role="list">
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

              <div className="flex flex-col gap-3 mt-auto">
                <WebDesignBtn fullWidth onClick={() => setMobileOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
