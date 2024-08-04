import { useInfiniteQuery } from '@tanstack/react-query';
import useContentsParamStore from '@/store/contents-param-store';
import { CONTENTS_DEFAULT_PAGE_COUNT, fetchContents } from '@/api/contents';

const useInfiniteFetchContentQuery = () => {
	const { sort, currentTag } = useContentsParamStore();
	console.log('🚀 ~ useInfiniteFetchContentQuery ~ sort, currentTag:', sort, currentTag);
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
				if (lastPage.length < CONTENTS_DEFAULT_PAGE_COUNT) {
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
