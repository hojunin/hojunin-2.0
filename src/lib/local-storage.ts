type StorageValue = string | number | boolean | object | null;

export const localStorageUtil = {
	get: <T extends StorageValue>(key: string): T | null => {
		if (typeof window === 'undefined') return null;
		const item = localStorage.getItem(key);
		if (item === null) return null;
		try {
			return JSON.parse(item) as T;
		} catch {
			return item as T;
		}
	},

	set: <T extends StorageValue>(key: string, value: T): void => {
		if (typeof window === 'undefined') return;
		localStorage.setItem(key, JSON.stringify(value));
	},

	remove: (key: string): void => {
		if (typeof window === 'undefined') return;
		localStorage.removeItem(key);
	},
};
