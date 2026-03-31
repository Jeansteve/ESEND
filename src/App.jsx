import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import PestPage from './pages/PestPage'
import PortfolioPage from './pages/PortfolioPage'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 selection:bg-red-600 selection:text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/services/nuisibles" element={<PestPage />} />
            <Route path="/realisations" element={<PortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
