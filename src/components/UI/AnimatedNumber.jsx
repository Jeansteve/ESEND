import React, { useEffect, useState, useRef } from 'react';
import { motion, animate } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    console.log("DEBUG: AnimatedNumber mounted with value:", value, "delay:", delay);
    
    const timeout = setTimeout(() => {
      console.log("DEBUG: Starting animation for value:", value);
      const controls = animate(0, value, { 
        duration: 2, 
        ease: "circOut", 
        onUpdate: (latest) => {
          // console.log("DEBUG: Animation update:", latest);
          setDisplayValue(latest);
        },
        onComplete: () => {
          console.log("DEBUG: Animation complete");
          setIsFinished(true);
        }
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <motion.span
      ref={ref}
      animate={isFinished ? { 
        scale: [1, 1.25, 1],
      } : {}}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="inline-block min-w-[1ch]"
    >
      {displayValue.toFixed(1)}
    </motion.span>
  );
};

export default AnimatedNumber;
