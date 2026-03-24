import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import Footer from './components/Layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
