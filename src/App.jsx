import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import PestPage from './pages/PestPage'
import DisinfectionPage from './pages/DisinfectionPage'
import CleaningPage from './pages/CleaningPage'
import PortfolioPage from './pages/PortfolioPage'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen text-[var(--text-main)] transition-colors duration-400">
        <Routes>
          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* --- PUBLIC ROUTES (with Header/Footer) --- */}
          <Route 
            path="/*" 
            element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services/:serviceId" element={<ServicePage />} />
                    <Route path="/services/nuisibles" element={<PestPage />} />
                    <Route path="/services/desinfection" element={<DisinfectionPage />} />
                    <Route path="/services/nettoyage" element={<CleaningPage />} />
                    <Route path="/realisations" element={<PortfolioPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
