import React from 'react'
import Hero from '../components/Sections/Hero'
import PestSelector from '../components/Sections/PestSelector'
import About from '../components/Sections/About'
import Reviews from '../components/Sections/Reviews'
import FormWizard from '../components/FormWizard/FormWizard'
import KnowledgeHub from '../components/Sections/KnowledgeHub'

function Home() {
  return (
    <>
      <Hero />
      <PestSelector />
      <About />
      <Reviews />
      <KnowledgeHub />
      <FormWizard />
    </>
  )
}

export default Home
