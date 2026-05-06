import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const AnimatedNumber = ({ value, delay = 1 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(1));
  const [isFinished, setIsFinished] = useState(false);
  
  useEffect(() => {
    const controls = animate(count, value, { 
      duration: 2, 
      ease: "circOut", 
      delay: delay,
      onComplete: () => setIsFinished(true)
    });
    return controls.stop;
  }, [value, delay, count]);

  return (
    <motion.span
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
