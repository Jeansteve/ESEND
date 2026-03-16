import React from 'react'
import Header from './components/Layout/Header'
import Hero from './components/Sections/Hero'
import PestSelector from './components/Sections/PestSelector'
import About from './components/Sections/About'
import Reviews from './components/Sections/Reviews'
import FormWizard from './components/FormWizard/FormWizard'
import KnowledgeHub from './components/Sections/KnowledgeHub'
import Footer from './components/Layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-esend-red selection:text-white">
      <Header />
      <main>
        <Hero />
        <PestSelector />
        <About />
        <Reviews />
        <KnowledgeHub />
        <FormWizard />
      </main>
      <Footer />
    </div>
  )
}

export default App
