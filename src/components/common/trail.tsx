'use client';
import { useTrail, animated } from '@react-spring/web';
import { Children } from 'react';

type Props = {
  open: boolean;
  children: React.ReactNode[];
};

const Trail: React.FC<Props> = ({ open, children }) => {
  const items = Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map((style, index) => (
        <animated.div
          key={index}
          className="relative w-full tracking-tight will-change-transform will-change-opacity overflow-hidden"
          style={style}
        >
          <animated.div>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
};

export default Trail;
