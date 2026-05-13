import React from 'react';
import { motion } from 'framer-motion';
import './GooeyButton.css';

const GooeyButton = ({ children, onClick, className = "", ariaLabel = "" }) => {
  return (
    <>
      {/* Hidden SVG Filter definition */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', top: '-1000px', left: '-1000px' }}>
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="highContrastGraphic" />
            <feComposite in="SourceGraphic" in2="highContrastGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className={`gooey-button-container ${className}`}>
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="gooey-button px-8 py-3.5 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] flex items-center gap-4 group cursor-pointer border border-red-500/20 whitespace-nowrap shadow-2xl"
          aria-label={ariaLabel}
        >
          {children}
          
          <span className="gooey-bubbles">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="gooey-bubble"></span>
            ))}
          </span>
        </motion.button>
      </div>
    </>
  );
};

export default GooeyButton;
