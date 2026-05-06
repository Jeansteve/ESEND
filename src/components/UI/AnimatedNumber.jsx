import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  
  // Utilisation d'un seuil de 0.2 pour déclencher l'animation quand l'élément est bien visible
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      
      const controls = animate(0, value, { 
        duration: 2, 
        ease: "circOut", 
        delay: delay,
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
        onComplete: () => {
          setIsFinished(true);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, delay, hasStarted]);

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
