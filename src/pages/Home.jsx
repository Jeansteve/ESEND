import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

  const location = useLocation();

  useEffect(() => {
    // Gestion propre du scroll vers les ancres avec HashRouter/BrowserRouter
    const handleScroll = () => {
      const hash = location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        // On attend un peu que le DOM soit prêt, surtout avec les DeferredSections
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500); // 500ms pour laisser le temps aux DeferredSections de se stabiliser
      }
    };

    handleScroll();
  }, [location]);

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
      "description": "Expert multiservices à Menton et ses environs (Monaco, Nice) : dératisation, désinsectisation, désinfection et nettoyage professionnel. Devis gratuit et rapide."
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
        description="ESEND : Expert multiservices en dératisation, désinsectisation, désinfection et nettoyage à Menton et ses environs (Monaco, Nice). Devis gratuit et rapide."
        schema={homeSchema}
      />
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
