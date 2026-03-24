import React from 'react'
import Hero from '../components/Sections/Hero'
import PestSelector from '../components/Sections/PestSelector'
import DuoExpertise from '../components/Sections/DuoExpertise'
import PortfolioBento from '../components/Sections/PortfolioBento'
import About from '../components/Sections/About'
import Reviews from '../components/Sections/Reviews'
import FormWizard from '../components/FormWizard/FormWizard'
import KnowledgeHub from '../components/Sections/KnowledgeHub'

function Home() {
  return (
    <div className="bg-slate-950 overflow-x-hidden">
      <Hero />
      <PestSelector />
      <DuoExpertise />
      <PortfolioBento />
      <About />
      <Reviews />
      <KnowledgeHub />
      <FormWizard />
    </div>
  )
}

export default Home
