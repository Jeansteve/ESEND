import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour la gestion du thème ESEND (Morning Mist / Frozen Night)
 * Specialist: developpeur-front-end
 */
export const useTheme = () => {
    // On initialise avec le thème stocké ou par défaut 'dark' (Frozen Night)
    const [theme, setTheme] = useState(localStorage.getItem('esend_theme') || 'dark');

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Nettoyage des classes précédentes
        root.classList.remove('light', 'dark');
        
        // Application de la classe de thème
        root.classList.add(theme);
        
        // Persistence
        localStorage.setItem('esend_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
};
