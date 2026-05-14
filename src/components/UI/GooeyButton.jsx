import React from 'react';
import { motion } from 'framer-motion';
import './GooeyButton.css';

const GooeyButton = ({ children, onClick, className = "", ariaLabel = "" }) => {
  // Generate a unique ID for the SVG filter to avoid collisions when multiple buttons exist
  const filterId = "gooey-" + React.useId().replace(/:/g, "");

  return (
    <>
      {/* Hidden SVG Filter definition */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId} x="-50%" y="-200%" width="200%" height="500%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          </filter>
        </defs>
      </svg>

      <div className={`gooey-button-container ${className}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="gooey-button-wrapper relative group cursor-pointer"
          onClick={onClick}
        >
          {/* Layer 1: The Gooey Background (Filtered) */}
          <div 
            className="gooey-background-layer" 
            aria-hidden="true"
            style={{ 
              filter: `url('#${filterId}')`, 
              WebkitFilter: `url('#${filterId}')` 
            }}
          >
            <div className="gooey-base-shape"></div>
            <div className="gooey-bubbles">
              {[...Array(30)].map((_, i) => (
                <span key={i} className="gooey-bubble"></span>
              ))}
            </div>
          </div>

          {/* Layer 2: The Content (Clean & Sharp) */}
          <div className="gooey-content-layer px-8 py-3.5 flex items-center justify-center gap-4 relative z-20">
            <div className="gooey-text-wrapper font-black uppercase tracking-[0.15em] text-[11px] whitespace-nowrap">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GooeyButton;
