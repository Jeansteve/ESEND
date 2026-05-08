/**
 * ESEND - Utilitaires de Sécurité Frontend
 * @description Fonctions de nettoyage pour prévenir les failles XSS.
 */

export const sanitizeHTML = (html = '') => {
  if (!html) return '';
  
  return html
    // 1. Supprimer les balises script
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
    // 2. Supprimer les iframes
    .replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim, "")
    // 3. Supprimer les attributs d'événement (onmouseover, onclick, etc.)
    .replace(/on\w+="[^"]*"/gim, "")
    .replace(/on\w+='[^']*'/gim, "")
    // 4. Supprimer les tags d'illustration internes (spécifique ESEND)
    .replace(/\[ILLUSTRATION\s*:.*?\]/gi, '')
    .trim();
};
