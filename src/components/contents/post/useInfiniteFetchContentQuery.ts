import { createClient } from '@/lib/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import useContentsParamStore from '@/store/contents-param-store';

const PAGE_COUNT = 5;

interface FetchContentListParams {
	page: number;
	tag?: number;
	sort: 'newest' | 'oldest';
}

export const fetchContents = async ({ page, tag, sort }: FetchContentListParams) => {
	const supabase = createClient();
	const from = (page - 1) * PAGE_COUNT;
	const to = from + PAGE_COUNT - 1;

	let query = supabase
		.from('contents')
		.select('*, views(count)')
		.range(from, to)
		.limit(PAGE_COUNT)
		.order('created_at', { ascending: sort === 'newest' });

	if (tag) {
		query = query.eq('tag', tag);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching contents:', error);
		return [];
	}

	return data;
};

const useInfiniteFetchContentQuery = () => {
	const { sort, currentTag } = useContentsParamStore();
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
		useInfiniteQuery({
			queryKey: ['contents', currentTag?.id ?? '0', sort],
			queryFn: ({ pageParam = 1 }) =>
				fetchContents({
					page: pageParam,
					tag: currentTag?.id,
					sort,
				}),
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.length < PAGE_COUNT) {
					return undefined;
				}
				return allPages.length + 1;
			},
		});

	const contents = data?.pages.flatMap(page => page) || [];

	return {
		contents,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	};
};

export default useInfiniteFetchContentQuery;
