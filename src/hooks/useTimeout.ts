import { useEffect, useRef } from 'react';

const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [delay]);

  return timeoutRef;
};

export default useTimeout;
