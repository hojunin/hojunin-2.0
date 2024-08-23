// store.ts
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

interface StoreState {
	slug: string;
	title: string;
	setSlug: (slug: string) => void;
	setTitle: (title: string) => void;
}

const useWriteAdminStore = create<StoreState>(set => ({
	slug: '',
	title: '',
	setSlug: slug => set(() => ({ slug })),
	setTitle: title => set(() => ({ title })),
}));

const useShallowWriteAdminStore = (selector: (state: StoreState) => any) =>
	useWriteAdminStore(selector, shallow);

export default useShallowWriteAdminStore;
