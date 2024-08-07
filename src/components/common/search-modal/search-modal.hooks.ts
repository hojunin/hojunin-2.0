import { useQuery } from '@tanstack/react-query';
import { createClient } from '../../../lib/supabase/client';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from '@/lib/utils';

const FRONT_MATTERS_QUERY_KEY = 'front-matters';

export const useFetchFrontMatters = () => {
	return useQuery({
		queryKey: [FRONT_MATTERS_QUERY_KEY],
		queryFn: () => fetchFrontMatters(),
		staleTime: 60 * 60 * 24 * 30,
	});
};

const fetchFrontMatters = async () => {
	const supabase = createClient();
	const { data } = await supabase
		.from('contents')
		.select('title, slug')
		.returns<{ title: string; slug: string }[]>();
	return data;
};

export const useSearchModalState = () => {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(open => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return {
		open,
		setOpen,
	};
};

export const useSearchPosts = () => {
	const [suggestions, setSuggestions] = useState<Array<{ title: string; slug: string }>>([]);
	const { data: frontMatters } = useFetchFrontMatters();

	const searchPosts = useCallback(
		(searchTerm: string) => {
			if (!searchTerm) return [];
			if (!frontMatters) return [];
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			return frontMatters.filter(post => post.title.toLowerCase()?.includes(lowercasedSearchTerm));
		},
		[frontMatters],
	);
	const debouncedSearch = useCallback(
		debounce((value: string) => {
			const results = searchPosts(value);
			setSuggestions(results);
		}, 200),
		[frontMatters, searchPosts],
	);

	return {
		suggestions,
		setSuggestions,
		searchPosts,
		debouncedSearch,
	};
};
