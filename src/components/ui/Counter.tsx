import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 1.5, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        // Ease out quart
        const ease = 1 - Math.pow(1 - progress, 4);

        setCount(progress === 1 ? value : value * ease);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    } else {
      return () => {};
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(value % 1 === 0 ? 0 : 1)}
      {suffix}
    </span>
  );
};

export default Counter;
