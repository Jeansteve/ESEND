import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour la gestion du thème ESEND (Morning Mist / Frozen Night)
 * Supporte la différenciation contextuelle (Admin/Public) et la navigation SPA.
 * Specialist: developpeur-front-end
 */
export const useTheme = () => {
    // Calcul déterministe du thème (Verrouillage ESEND)
    // Public = Dark (Frozen Night) | Admin = Light (Morning Mist)
    const getTargetTheme = () => window.location.hash.includes('/admin') ? 'light' : 'dark';

    const [theme, setTheme] = useState(getTargetTheme());

    // Écouteur de changement de route pour appliquer le thème immédiatement lors de la navigation
    useEffect(() => {
        const handleHashChange = () => {
            setTheme(getTargetTheme());
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Application physique du thème au document
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        
        // On nettoie le localStorage pour éviter les conflits avec d'anciennes préférences
        localStorage.removeItem('esend_theme');
    }, [theme]);

    const toggleTheme = () => {
        // Désactivé : Le thème est désormais imposé par section pour garantir l'identité visuelle
        console.log("Le changement de thème manuel est désactivé.");
    };

    return { theme, toggleTheme };
};
