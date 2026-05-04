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
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import LegalNotices from './pages/LegalNotices'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import { useTheme } from './hooks/useTheme'

function App() {
  useTheme(); // Gère le thème global (Admin vs Public)
  
  return (
    <HashRouter>
      <div className="min-h-screen text-[var(--text-main)] transition-colors duration-400">
        <Routes>
          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/:tab" element={<Dashboard />} />

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
                    <Route path="/journal" element={<BlogPage />} />
                    <Route path="/journal/:slug" element={<ArticlePage />} />
                    <Route path="/mentions-legales" element={<LegalNotices />} />
                    <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
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
