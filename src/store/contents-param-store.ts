import { ContentTag } from '@/types/contents';
import { create } from 'zustand';

interface ContentsParamState {
	sort: 'newest' | 'oldest';
	currentTag: ContentTag | null;
	page: number;
	setSort: (sort: 'newest' | 'oldest') => void;
	setCurrentTag: (tag: ContentTag | null) => void;
	setPage: (page: number) => void;
}

const useContentsParamStore = create<ContentsParamState>(set => ({
	sort: 'newest',
	currentTag: null,
	page: 1,
	setSort: sort => set({ sort }),
	setCurrentTag: tag => {
		set({ currentTag: tag });
	},
	setPage: page => set({ page }),
}));

export default useContentsParamStore;
