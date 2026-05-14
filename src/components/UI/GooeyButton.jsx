import React from 'react';
import { motion } from 'framer-motion';
import './GooeyButton.css';

const BUBBLE_DATA = [
  { cx: '8%', dy: -114, dur: 3.02, delay: 0.2 }, { cx: '15%', dy: -82, dur: 3.04, delay: 0.4 },
  { cx: '22%', dy: -127, dur: 3.06, delay: 0.6 }, { cx: '29%', dy: -95, dur: 3.08, delay: 0.8 },
  { cx: '36%', dy: -108, dur: 3.10, delay: 1.0 }, { cx: '43%', dy: -66, dur: 3.12, delay: 1.2 },
  { cx: '50%', dy: -119, dur: 3.14, delay: 1.4 }, { cx: '57%', dy: -88, dur: 3.16, delay: 1.6 },
  { cx: '64%', dy: -102, dur: 3.18, delay: 1.8 }, { cx: '71%', dy: -75, dur: 3.20, delay: 2.0 },
  { cx: '78%', dy: -110, dur: 3.22, delay: 2.2 }, { cx: '85%', dy: -92, dur: 3.24, delay: 2.4 },
  { cx: '92%', dy: -120, dur: 3.26, delay: 2.6 }, { cx: '11%', dy: -85, dur: 3.28, delay: 2.8 },
  { cx: '18%', dy: -105, dur: 3.30, delay: 3.0 }, { cx: '25%', dy: -70, dur: 3.32, delay: 3.2 },
  { cx: '32%', dy: -115, dur: 3.34, delay: 3.4 }, { cx: '39%', dy: -80, dur: 3.36, delay: 3.6 },
  { cx: '46%', dy: -125, dur: 3.38, delay: 3.8 }, { cx: '53%', dy: -90, dur: 3.40, delay: 4.0 },
  { cx: '60%', dy: -112, dur: 3.42, delay: 4.2 }, { cx: '67%', dy: -84, dur: 3.44, delay: 4.4 },
  { cx: '74%', dy: -122, dur: 3.46, delay: 4.6 }, { cx: '81%', dy: -96, dur: 3.48, delay: 4.8 },
  { cx: '88%', dy: -106, dur: 3.50, delay: 5.0 }, { cx: '14%', dy: -72, dur: 3.52, delay: 5.2 },
  { cx: '35%', dy: -118, dur: 3.54, delay: 5.4 }, { cx: '56%', dy: -86, dur: 3.56, delay: 5.6 },
  { cx: '77%', dy: -128, dur: 3.58, delay: 5.8 }, { cx: '90%', dy: -98, dur: 3.60, delay: 6.0 }
];

const GooeyButton = ({ children, onClick, className = "", ariaLabel = "" }) => {
  const filterId = React.useId().replace(/:/g, "");

  return (
    <div className={`gooey-button-container ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="gooey-button-wrapper relative group cursor-pointer"
        onClick={onClick}
      >
        {/* Layer 1: Pure SVG Gooey Background (Bulletproof on iOS) */}
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
          <svg 
            width="100%" 
            height="100%" 
            style={{ overflow: 'visible' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id={`gooey-svg-filter-${filterId}`} x="-50%" y="-200%" width="200%" height="500%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              </filter>
            </defs>
            <g filter={`url(#gooey-svg-filter-${filterId})`} fill="#dc2626">
              {/* The main button body */}
              <rect x="0" y="0" width="100%" height="100%" rx="16" />
              
              {/* The animated bubbles */}
              {BUBBLE_DATA.map((b, i) => (
                <circle 
                  key={i} 
                  cx={b.cx} 
                  cy="12" 
                  r="12.5" 
                  className="svg-bubble" 
                  style={{
                    '--dy': `${b.dy}px`,
                    animation: `svg-bubble-rise ${b.dur}s infinite ${b.delay}s linear`
                  }}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Layer 2: The Content (Clean & Sharp) */}
        <div className="gooey-content-layer px-8 py-3.5 flex items-center justify-center gap-4 relative z-20">
          <div className="gooey-text-wrapper font-black uppercase tracking-[0.15em] text-[11px] whitespace-nowrap">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GooeyButton;
