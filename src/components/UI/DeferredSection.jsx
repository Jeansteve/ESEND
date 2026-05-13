import React from 'react';

/**
 * Performance-optimized wrapper using content-visibility: auto.
 * This defers the rendering of off-screen content, reducing main thread work during initial load.
 * Perfect for Lighthouse scores and mobile responsiveness.
 */
const DeferredSection = ({ children, id, className = "", estimatedHeight = "500px" }) => {
  return (
    <div 
      id={id}
      className={`${className} deferred-render`}
      style={{ 
        containIntrinsicSize: `auto ${estimatedHeight}` 
      }}
    >
      {children}
    </div>
  );
};

export default DeferredSection;
