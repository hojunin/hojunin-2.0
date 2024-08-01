import { useState, useEffect } from 'react';

const useDevice = () => {
	const [windowWidth, setWindowWidth] = useState<number>(
		typeof window !== 'undefined' ? window.innerWidth : 0,
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const isMobile = windowWidth < 768;
	const isTablet = windowWidth >= 768 && windowWidth < 1024;
	const isPc = windowWidth >= 1024;

	return {
		isMobile,
		isTablet,
		isPc,
		windowWidth,
	};
};

export default useDevice;
