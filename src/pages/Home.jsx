import React from 'react'
import Hero from '../components/Sections/Hero'
import PestSelector from '../components/Sections/PestSelector'
import PortfolioBento from '../components/Sections/PortfolioBento'
import About from '../components/Sections/About'
import Reviews from '../components/Sections/Reviews'
import FormWizard from '../components/FormWizard/FormWizard'
import KnowledgeHub from '../components/Sections/KnowledgeHub'

function Home() {
  return (
    <div className="transition-colors duration-400">
      <Hero />
      <PestSelector />
      <PortfolioBento />
      <About />
      <Reviews />
      <KnowledgeHub />
      <FormWizard />
    </div>
  )
}

export default Home
