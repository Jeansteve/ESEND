import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

/**
 * Bouton Switcher Jour/Nuit Premium (ESEND)
 * Style : Glassmorphism, Transitions Spring
 */
const ThemeToggle = ({ variant = 'default' }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={toggleTheme}
            className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 border border-[var(--border-subtle)] shadow-lg ${
                theme === 'dark' 
                ? 'bg-slate-900/40 hover:bg-slate-800/60 text-amber-400 backdrop-blur-md' 
                : 'bg-white/80 border-[var(--border-subtle)] text-amber-500 shadow-slate-200/20 hover:bg-white backdrop-blur-md'
            }`}
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <Moon className="w-4 h-4 md:w-5 md:h-5 " />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <Sun className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;
