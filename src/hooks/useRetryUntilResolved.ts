import useInterval from '@/hooks/useInterval';
import { useState } from 'react';

const useRetryUntilResolved = (callback: () => any, interval = 100) => {
	const [hasResolved, setHasResolved] = useState(false);

	const checkIsResolved = () => {
		const result = callback();
		if (result) {
			setHasResolved(true);
		}
	};

	useInterval(checkIsResolved, hasResolved ? null : interval);

	return hasResolved;
};
export default useRetryUntilResolved;
