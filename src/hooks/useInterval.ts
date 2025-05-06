import { MutableRefObject, useEffect, useRef } from 'react';

const useInterval = (
	callback: () => void,
	delay: number | null,
): MutableRefObject<number | null> => {
	const intervalRef = useRef<number | null>(null);
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const tick = () => {
			savedCallback.current();
		};
		if (typeof delay === 'number') {
			intervalRef.current = window.setInterval(tick, delay);
			return () => {
				if (intervalRef.current !== null) {
					window.clearInterval(intervalRef.current);
				}
			};
		}
	}, [delay]);

	return intervalRef;
};

export default useInterval;
