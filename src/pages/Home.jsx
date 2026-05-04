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
      // On cherche la partie après le dernier # qui n'est pas suivie d'un slash
      const parts = hash.split('#');
      const targetId = parts.length > 1 ? parts.pop() : null;
      
      if (targetId && targetId !== '/' && !targetId.startsWith('/')) {
        // Petit délai pour laisser le temps au FormWizard de s'initialiser si besoin
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            const headerOffset = 120; // Un peu plus d'espace pour le header fixe
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 300); // 300ms est plus sûr pour les composants lourds comme le wizard
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
