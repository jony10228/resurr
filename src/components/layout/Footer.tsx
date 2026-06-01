import { ExternalLink, Share2, Globe } from 'lucide-react'

const services = ['Meta Ads Management', 'UGC Creative System', 'Funnel Setup', 'Reporting']
const company  = ['About', 'Results', 'FAQ', 'Contact']

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-[#1E2235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <p className="font-display italic text-xl text-[#F8FAFC] mb-3">
              Resurrect<span className="text-[#3B82F6]">.</span>Media
            </p>
            <p className="font-sans text-sm text-[#475569] leading-relaxed">
              Meta ads for local service businesses. Owner-led creatives that convert.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] mb-4">Services</p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="font-sans text-sm text-[#475569] hover:text-[#94A3B8] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {company.map((s) => (
                <li key={s}>
                  <a href="#" className="font-sans text-sm text-[#475569] hover:text-[#94A3B8] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] mb-4">Connect</p>
            <div className="flex flex-col gap-3 mb-6">
              <a href="#apply" className="font-sans text-sm text-[#475569] hover:text-[#94A3B8] transition-colors">Apply to work with us</a>
              <a href="#apply" className="font-sans text-sm text-[#475569] hover:text-[#94A3B8] transition-colors">Book a 15-min check</a>
            </div>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-[#475569] hover:text-[#3B82F6] transition-colors">
                <ExternalLink size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#475569] hover:text-[#3B82F6] transition-colors">
                <Share2 size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-[#475569] hover:text-[#3B82F6] transition-colors">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1E2235] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#475569]">
            © 2024 Resurrect Media. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
            <a href="#" className="font-mono text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
