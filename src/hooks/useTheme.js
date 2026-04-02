import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour la gestion du thème ESEND (Morning Mist / Frozen Night)
 * Specialist: developpeur-front-end
 */
export const useTheme = () => {
    // Détection du thème par défaut selon le contexte (Public vs Admin)
    // On utilise le hash car ESEND utilise un HashRouter
    const isLoginPage = window.location.hash.includes('/admin');
    const defaultTheme = isLoginPage ? 'light' : 'dark';

    // On initialise avec le thème stocké ou le défaut contextuel
    const [theme, setTheme] = useState(localStorage.getItem('esend_theme') || defaultTheme);

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
