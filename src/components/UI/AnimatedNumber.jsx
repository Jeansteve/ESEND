import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5, triggerOnMount = false }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  


  useEffect(() => {
    // 1. Intersection Observer natif - Toujours actif pour le déclenchement au scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {

          setHasStarted(true);
        }
      },
      { threshold: 0.2 } // Un peu plus de marge pour être sûr qu'on le voit bien
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // 2. Safety Timer uniquement SI triggerOnMount est vrai (utile pour le Hero)
    let safety;
    if (triggerOnMount) {
      safety = setTimeout(() => {
        if (!hasStarted) {

          setHasStarted(true);
        }
      }, 1000);
    }

    return () => {
      observer.disconnect();
      if (safety) clearTimeout(safety);
    };
  }, [hasStarted, triggerOnMount]);

  useEffect(() => {
    if (hasStarted) {
      const startTime = Date.now();
      const duration = 2000; // 2 secondes
      const delayMs = delay * 1000;
      
      const runAnimation = () => {
        const timer = setInterval(() => {
          const now = Date.now();
          const elapsed = now - (startTime + delayMs);
          
          if (elapsed < 0) return; // Attente du delay

          const progress = Math.min(elapsed / duration, 1);
          // Easing: easeOutQuart
          const easedProgress = 1 - Math.pow(1 - progress, 4);
          
          const nextValue = easedProgress * value;
          setDisplayValue(nextValue);
          
          if (progress === 1) {
            clearInterval(timer);
            setIsFinished(true);

          }
        }, 16); // ~60 FPS
        
        return () => clearInterval(timer);
      };

      const timeout = setTimeout(runAnimation, delayMs);
      return () => clearTimeout(timeout);
    }
  }, [hasStarted, value, delay]);

  return (
    <div ref={containerRef} className="inline-block" style={{ minWidth: '3ch' }}>
      <motion.span
        animate={isFinished ? { 
          scale: [1, 1.25, 1],
        } : {}}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="inline-block whitespace-nowrap"
      >
        {displayValue.toFixed(1)}
      </motion.span>
    </div>
  );
};

export default AnimatedNumber;
