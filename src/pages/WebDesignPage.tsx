import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export function WebDesignPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-[#475569] text-sm">Web Design — coming soon.</p>
      </main>
      <Footer />
    </>
  )
}
