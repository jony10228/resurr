import { lazy, Suspense } from 'react'
import { MouseSpotlight } from '@/components/ui/MouseSpotlight'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { LogoBar } from '@/components/sections/LogoBar'

const ProofTracking    = lazy(() => import('@/components/sections/ProofTracking').then(m => ({ default: m.ProofTracking })))
const OwnerLedCreatives = lazy(() => import('@/components/sections/OwnerLedCreatives').then(m => ({ default: m.OwnerLedCreatives })))
const WhatWeDeliver    = lazy(() => import('@/components/sections/WhatWeDeliver').then(m => ({ default: m.WhatWeDeliver })))
const HowItWorks       = lazy(() => import('@/components/sections/HowItWorks').then(m => ({ default: m.HowItWorks })))
const IsThisAFit       = lazy(() => import('@/components/sections/IsThisAFit').then(m => ({ default: m.IsThisAFit })))
const ClientFeedback   = lazy(() => import('@/components/sections/ClientFeedback').then(m => ({ default: m.ClientFeedback })))
const FAQ              = lazy(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })))
const FinalCTA         = lazy(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })))

function SectionLoader() {
  return <div className="h-32 animate-pulse bg-[#0F1117]" aria-hidden="true" />
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0B0F] text-[#F8FAFC] overflow-x-hidden" style={{ zIndex: 10 }}>
      <MouseSpotlight />
      <Navbar />
      <main id="main-content">
        <Hero />
        <LogoBar />
        <Suspense fallback={<SectionLoader />}>
          <ProofTracking />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <OwnerLedCreatives />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WhatWeDeliver />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <IsThisAFit />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ClientFeedback />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FinalCTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
