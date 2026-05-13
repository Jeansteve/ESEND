import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour la gestion du thème ESEND (Morning Mist / Frozen Night)
 * Supporte la différenciation contextuelle (Admin/Public) et la navigation SPA.
 * Specialist: developpeur-front-end
 */
export const useTheme = () => {
    // Calcul déterministe du thème (Verrouillage ESEND)
    // Public = Dark (Frozen Night) | Admin = Light (Morning Mist)
    const getTargetTheme = () => {
        const fullPath = window.location.href;
        const isAdmin = fullPath.includes('/admin');
        const target = isAdmin ? 'light' : 'dark';
        return target;
    };

    const [theme, setTheme] = useState(getTargetTheme());

    // Écouteur de changement de route pour appliquer le thème immédiatement lors de la navigation
    useEffect(() => {
        const handleLocationChange = () => {
            const newTheme = getTargetTheme();

            setTheme(newTheme);
        };

        window.addEventListener('popstate', handleLocationChange);
        window.addEventListener('hashchange', handleLocationChange);
        // On écoute aussi les changements via history.pushState (utilisé par React Router)
        const originalPushState = window.history.pushState;
        window.history.pushState = function() {
            originalPushState.apply(this, arguments);
            handleLocationChange();
        };

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('hashchange', handleLocationChange);
            window.history.pushState = originalPushState;
        };
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
        // Désactivé : Le thème est désormais imposé par section
    };

    return { theme, toggleTheme };
};
