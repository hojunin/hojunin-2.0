import React, { CSSProperties, ReactNode } from 'react';

interface FadeInProps {
  duration?: number;
  delay?: number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  duration = 300,
  delay = 0,
  children,
  style = {},
  className = '',
  ...delegated
}) => {
  const animationStyle: CSSProperties = {
    '--animation-duration': `${duration}ms`,
    '--animation-delay': `${delay}ms`,
    ...style,
  } as CSSProperties;

  return (
    <div
      {...delegated}
      className={`animate-fade-in ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default FadeIn;
