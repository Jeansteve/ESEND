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

import SEO from '../components/UI/SEO'
import DeferredSection from '../components/UI/DeferredSection'
import { useSettings } from '../context/SettingsContext'

function Home() {
  const { settings } = useSettings();

  useEffect(() => {
    // Gestion propre du scroll vers les ancres avec BrowserRouter
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ESEND Nuisibles",
      "image": "https://esendnuisibles.fr/images/logo-esend.webp",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": settings.company_city || "Menton",
        "addressRegion": "Alpes-Maritimes",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.7745,
        "longitude": 7.4975
      },
      "url": "https://esendnuisibles.fr",
      "telephone": settings.company_phone || "+33600000000",
      "priceRange": "$$",
      "areaServed": ["Menton", "Monaco", "Roquebrune-Cap-Martin", "Nice", "Antibes", "Cannes"],
      "description": "Expert en éradication de nuisibles, dératisation, désinsectisation et désinfection sur la Côte d'Azur."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://esendnuisibles.fr/"
        }
      ]
    }
  ];

  return (
    <div className="transition-colors duration-400">
      <SEO 
        title="Expert Éradication Nuisibles & Désinfection (06)" 
        description="ESEND intervient à Menton, Monaco et Nice pour la dératisation, désinsectisation (punaises de lit) et désinfection. Devis offert sous 2h."
        schema={homeSchema}
      />
      <Hero />
      
      <DeferredSection estimatedHeight="600px">
        <PestSelector />
      </DeferredSection>
      
      <DeferredSection estimatedHeight="800px">
        <PortfolioBento />
      </DeferredSection>
      
      <DeferredSection estimatedHeight="500px">
        <About />
      </DeferredSection>
      
      <SectionSeparator text="Témoignages Clients" />
      
      <DeferredSection estimatedHeight="400px">
        <Reviews />
      </DeferredSection>
      
      <DeferredSection estimatedHeight="600px">
        <KnowledgeHub />
      </DeferredSection>
      
      <TrustBanner />
      
      <DeferredSection id="devis" estimatedHeight="800px">
        <FormWizard />
      </DeferredSection>
    </div>
  )
}

export default Home
