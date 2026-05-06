import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  
  // LOG DE CERTIFICATION DE VERSION
  useEffect(() => {
    console.log("🚀 [SCORE-SYSTEM] AnimatedNumber V3.0 Loaded - Target:", value);
  }, [value]);

  useEffect(() => {
    // 1. Intersection Observer natif
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          console.log("🚀 [SCORE-SYSTEM] Element in view, starting timer...");
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // 2. Safety Timer pour le Hero
    const safety = setTimeout(() => {
      if (!hasStarted) {
        console.log("🚀 [SCORE-SYSTEM] Safety timer triggered.");
        setHasStarted(true);
      }
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [hasStarted]);

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
            console.log("🚀 [SCORE-SYSTEM] Animation complete at", nextValue);
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
