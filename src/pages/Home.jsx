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
      // En HashRouter, le hash peut être #/ ou #/#section ou #/path#section
      // On cherche la partie après le dernier # qui est une ancre de section
      const parts = hash.split('#');
      // La dernière partie est l'ID si elle ne contient pas de slash (ex: devis-title)
      const targetId = parts.length > 1 ? parts[parts.length - 1] : null;
      
      if (targetId && targetId !== '/' && !targetId.includes('/')) {
        // Délai pour laisser le temps au FormWizard de s'initialiser
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            const headerOffset = 100; // Offset ajusté pour le header fixe
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 500); // 500ms est plus robuste pour les transitions de page
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
