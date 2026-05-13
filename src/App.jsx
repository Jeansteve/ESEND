import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import { useTheme } from './hooks/useTheme'
import { SettingsProvider } from './context/SettingsContext'

// --- LAZY-LOADED ROUTES (Code Splitting) ---
// Public Pages
const ServicePage = lazy(() => import('./pages/ServicePage'))
const PestPage = lazy(() => import('./pages/PestPage'))
const DisinfectionPage = lazy(() => import('./pages/DisinfectionPage'))
const CleaningPage = lazy(() => import('./pages/CleaningPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const LegalNotices = lazy(() => import('./pages/LegalNotices'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))

// Admin Pages (heavy: recharts, react-quill, etc.)
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))

// Minimal loading fallback — non-blocking, visually subtle
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
    <div className="w-8 h-8 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
  </div>
)

function App() {
  useTheme(); // Gère le thème global (Admin vs Public)

  React.useEffect(() => {
    // Signaler que React est prêt pour masquer le placeholder LCP (Toutes pages)
    document.documentElement.classList.add('react-ready');
  }, []);
  
  return (
    <SettingsProvider>
      <BrowserRouter>
        <div className="min-h-screen text-[var(--text-main)] transition-colors duration-400">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </div>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
