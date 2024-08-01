import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
}

const useIntersection = (
	options: UseIntersectionOptions = {},
): [React.RefObject<HTMLElement>, boolean] => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const elementRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
			observer.disconnect();
		};
	}, [options]);

	return [elementRef, isIntersecting];
};

export default useIntersection;
