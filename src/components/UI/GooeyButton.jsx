import React from 'react';
import { motion } from 'framer-motion';
import './GooeyButton.css';

const GooeyButton = ({ children, onClick, className = "", ariaLabel = "" }) => {
  // Compute absolute URL for the filter to bypass HashRouter conflicts on iOS Safari
  const filterUrl = `url('${window.location.pathname}#global-gooey-filter')`;

  return (
    <>
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
              filter: filterUrl, 
              WebkitFilter: filterUrl 
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
