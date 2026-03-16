import React from 'react'
import Header from './components/Layout/Header'
import Hero from './components/Sections/Hero'

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-esend-red selection:text-white">
      <Header />
      <main>
        <Hero />
        {/* Les autres sections seront ajoutées ici */}
      </main>
    </div>
  )
}

export default App
