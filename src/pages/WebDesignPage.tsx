import { Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WebDesignHero } from '@/components/webdesign/WebDesignHero'
import { WebDesignShowcase } from '@/components/webdesign/WebDesignShowcase'
import { WebDesignFeatures } from '@/components/webdesign/WebDesignFeatures'

function SectionLoader() {
  return <div className="h-32 animate-pulse bg-[#0F1117]" aria-hidden="true" />
}

export function WebDesignPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <WebDesignHero />
        <Suspense fallback={<SectionLoader />}>
          <WebDesignShowcase />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WebDesignFeatures />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
