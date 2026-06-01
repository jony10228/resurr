import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MouseSpotlight } from '@/components/ui/MouseSpotlight'
import { HomePage } from '@/pages/HomePage'
import { WebDesignPage } from '@/pages/WebDesignPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0A0B0F] text-[#F8FAFC] overflow-x-hidden" style={{ zIndex: 10 }}>
        <MouseSpotlight />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/web-design" element={<WebDesignPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
