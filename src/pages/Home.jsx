import React, { useEffect } from 'react'
import Hero from '../components/Sections/Hero'
import PestSelector from '../components/Sections/PestSelector'
import PortfolioBento from '../components/Sections/PortfolioBento'
import About from '../components/Sections/About'
import Reviews from '../components/Sections/Reviews'
import FormWizard from '../components/FormWizard/FormWizard'
import KnowledgeHub from '../components/Sections/KnowledgeHub'
import TrustBanner from '../components/Sections/TrustBanner'
import SectionSeparator from '../components/Layout/SectionSeparator'

function Home() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      // En HashRouter, le hash peut ressembler à #/ ou #/#section
      // On cherche la partie après le dernier #
      const targetId = hash.split('#').pop();
      
      if (targetId && targetId !== '/' && !targetId.startsWith('/')) {
        const target = document.getElementById(targetId);
        if (target) {
          setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  return (
    <div className="transition-colors duration-400">
      <Hero />
      <PestSelector />
      <PortfolioBento />
      <About />
      <SectionSeparator text="Témoignages Clients" />
      <Reviews />
      <KnowledgeHub />
      <TrustBanner />
      <FormWizard />
    </div>
  )
}

export default Home
