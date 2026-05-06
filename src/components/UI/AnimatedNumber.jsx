import React, { useEffect, useState, useRef } from 'react';
import { motion, animate } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // 1. Intersection Observer pour le déclenchement au scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.01 } // Seuil minimal
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // 2. Filet de sécurité pour le Hero (déclenchement si déjà visible après 1s)
    const safetyTimer = setTimeout(() => {
      if (!hasStarted && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasStarted(true);
        }
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      const controls = animate(0, value, { 
        duration: 2, 
        ease: "circOut", 
        delay: delay,
        onUpdate: (latest) => setDisplayValue(latest),
        onComplete: () => setIsFinished(true)
      });
      return () => controls.stop();
    }
  }, [hasStarted, value, delay]);

  return (
    <div ref={containerRef} className="inline-block">
      <motion.span
        animate={isFinished ? { 
          scale: [1, 1.25, 1],
        } : {}}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="inline-block min-w-[1ch] whitespace-nowrap"
      >
        {displayValue.toFixed(1)}
      </motion.span>
    </div>
  );
};

export default AnimatedNumber;
