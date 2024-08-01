import { createClient } from '@/lib/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ValueOf } from '../../../types/common';
import { ContentsStatus } from '../../../types/contents';

const PAGE_COUNT = 5;

interface FetchContentListParams {
	page: number;
	status: ValueOf<typeof ContentsStatus>;
	tag: number;
}

export const fetchContents = async ({ page, status, tag }: FetchContentListParams) => {
	const supabase = createClient();
	const from = (page - 1) * PAGE_COUNT;
	const to = from + PAGE_COUNT - 1;

	let query = supabase
		.from('contents')
		.select('*')
		.range(from, to)
		.limit(PAGE_COUNT)
		.order('created_at', { ascending: false });

	if (tag) {
		query = query.eq('tag', tag);
	}
	if (status) {
		query = query.eq('status', status);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching contents:', error);
		return [];
	}

	return data;
};

const useInfiniteFetchContentQuery = (status: ValueOf<typeof ContentsStatus>, tag: number) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
		useInfiniteQuery({
			queryKey: ['contents', status, tag],
			queryFn: ({ pageParam = 1 }) =>
				fetchContents({
					page: pageParam,
					status,
					tag,
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
