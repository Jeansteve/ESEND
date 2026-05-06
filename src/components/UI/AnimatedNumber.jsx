import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 0.5 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(1));
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const controls = animate(count, value, { 
        duration: 2, 
        ease: "circOut", 
        delay: delay,
        onComplete: () => setIsFinished(true)
      });
      return controls.stop;
    }
  }, [isInView, value, delay, count, hasStarted]);

  return (
    <motion.span
      ref={ref}
      animate={isFinished ? { 
        scale: [1, 1.25, 1],
        filter: ["blur(0px)", "blur(0px)", "blur(0px)"] 
      } : {}}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="inline-block"
    >
      {rounded}
    </motion.span>
  );
};

export default AnimatedNumber;
