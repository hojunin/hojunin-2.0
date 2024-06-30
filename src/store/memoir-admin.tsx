// store.ts
import { getWeekOfYear } from '@/lib/date';
import { create } from 'zustand';

interface StoreState {
	currentYear: number;
	currentWeek: number;
	currentCategory: string;
	init: (year: number, Week: number, category: string) => void;
	setCurrentYear: (year: number) => void;
	setCurrentWeek: (Week: number) => void;
	setCurrentCategory: (category: string) => void;
}

const [initYear, initWeek] = getWeekOfYear();

const useMemoirAdminStore = create<StoreState>(set => ({
	currentYear: initYear,
	currentWeek: initWeek,
	currentCategory: '',
	init: (year, Week, category) =>
		set(() => ({
			currentYear: year,
			currentWeek: Week,
			currentCategory: category,
		})),
	setCurrentYear: year => set(() => ({ currentYear: year })),
	setCurrentWeek: Week => set(() => ({ currentWeek: Week })),
	setCurrentCategory: category => set(() => ({ currentCategory: category })),
}));

export default useMemoirAdminStore;
