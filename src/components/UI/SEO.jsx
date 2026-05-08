import { useEffect } from 'react';

/**
 * Composant SEO Dynamique
 * @param {string} title - Titre de la page (Google limite à ~60 char)
 * @param {string} description - Description (Google limite à ~155 char)
 * @param {string} type - Type de page (website, article)
 * @param {object} schema - Données structurées optionnelles (JSON-LD)
 */
const SEO = ({ title, description, type = 'website', schema }) => {
  useEffect(() => {
    // 1. Mise à jour du Titre
    const fullTitle = title ? `${title} | ESEND Nuisibles` : 'ESEND - Expert Éradication Nuisibles & Désinfection';
    document.title = fullTitle;

    // 2. Mise à jour des Meta Tags
    const updateMeta = (name, content, property = false) => {
      if (!content) return;
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    updateMeta('description', description);
    updateMeta('title', fullTitle);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type, true);
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);

    // 3. Gestion du Schéma JSON-LD
    let scriptTag = document.getElementById('json-ld-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [title, description, type, schema]);

  return null; // Composant invisible
};

export default SEO;
