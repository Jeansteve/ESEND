import React from 'react'
import Header from './components/Layout/Header'
import Hero from './components/Sections/Hero'
import PestSelector from './components/Sections/PestSelector'
import About from './components/Sections/About'
import Reviews from './components/Sections/Reviews'

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-esend-red selection:text-white">
      <Header />
      <main>
        <Hero />
        <PestSelector />
        <About />
        <Reviews />
        {/* Prochaine étape : FormWizard et Conseils */}
      </main>
    </div>
  )
}

export default App
