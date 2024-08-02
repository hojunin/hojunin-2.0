import { ContentsTag } from '@/types/contents';
import { create } from 'zustand';

interface ContentsParamState {
	sort: 'newest' | 'oldest';
	currentTag: ContentsTag | null;
	page: number;
	setSort: (sort: 'newest' | 'oldest') => void;
	setCurrentTag: (tag: ContentsTag | null) => void;
	setPage: (page: number) => void;
}

const useContentsParamStore = create<ContentsParamState>(set => ({
	sort: 'newest',
	currentTag: null,
	page: 1,
	setSort: sort => set({ sort }),
	setCurrentTag: tag => {
		console.log('Setting current tag:', tag);
		set({ currentTag: tag });
	},
	setPage: page => set({ page }),
}));

export default useContentsParamStore;
