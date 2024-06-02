'use client';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { useSpring, animated } from '@react-spring/web';

export default function Box() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    immediate: prefersReducedMotion,
  });

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs,
      }}
    />
  );
}
