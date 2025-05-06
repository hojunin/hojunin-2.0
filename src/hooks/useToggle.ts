import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
	const [value, setValue] = useState(initialValue);

	const toggle = useCallback(() => {
		setValue(v => !v);
	}, []);

	return [value, toggle];
};

export default useToggle;

/**
 * 1. 왜 useCallback을 쓰는걸까?
 * 2. toggle 함수가 argument를 받도록 바꿔도 되는가?
 */
