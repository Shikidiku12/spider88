import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedCountUp = ({ endValue, duration }) => {
  const [count, setCount] = useState(105401);

  const { number } = useSpring({
    from: { number: 105401 },
    to: { number: endValue },
    reset: true,
    config: { duration: duration },
    onRest: () => setCount(endValue),
  });

  useEffect(() => {
    setCount(endValue);
  }, [endValue]);

  return (
    <animated.span>
      {number.to((val) => Math.floor(val).toLocaleString())}
    </animated.span>
  );
};

export default AnimatedCountUp;
