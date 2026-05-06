import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
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
        onComplete: () => setIsFinished(true)
      });
      return controls.stop;
    }
  }, [isInView, value, delay, hasStarted]);

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
