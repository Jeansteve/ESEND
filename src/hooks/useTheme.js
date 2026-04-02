import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour la gestion du thème ESEND (Morning Mist / Frozen Night)
 * Supporte la différenciation contextuelle (Admin/Public) et la navigation SPA.
 * Specialist: developpeur-front-end
 */
export const useTheme = () => {
    // Calcul initial du thème par défaut
    const getContextTitle = () => window.location.hash.includes('/admin') ? 'light' : 'dark';

    // On initialise avec le thème stocké ou le défaut contextuel
    const [theme, setTheme] = useState(() => localStorage.getItem('esend_theme') || getContextTitle());

    // 1. Écouteur de changement de route (HashChange) pour la bascule automatique
    useEffect(() => {
        const handleHashChange = () => {
            const userPref = localStorage.getItem('esend_theme');
            // On ne change automatiquement QUE si l'utilisateur n'a pas mis de préférence manuelle
            if (!userPref) {
                const newDefault = getContextTitle();
                setTheme(newDefault);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // 2. Application du thème au DOM et persistence
    useEffect(() => {
        const root = window.document.documentElement;
        
        // Nettoyage des classes précédentes
        root.classList.remove('light', 'dark');
        
        // Application de la classe de thème
        root.classList.add(theme);
        
        // On ne persiste QUE si c'est important (la persistence est gérée manuellement lors du toggle)
        // Mais pour la cohérence, on garde le storage à jour
        if (localStorage.getItem('esend_theme')) {
            localStorage.setItem('esend_theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        // Ici on force la persistence car c'est un choix EXPLICITE de l'utilisateur
        localStorage.setItem('esend_theme', newTheme);
    };

    return { theme, toggleTheme };
};
