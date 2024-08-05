import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Content, ContentsSortType, ContentTag } from '@/types/contents';
import { FETCH_TAGS_KEY } from '@/api/tag/useFetchAllTags';

const useUpdateViewCache = () => {
	const queryClient = useQueryClient();

	const updateCache = useCallback(
		(slug: string) => {
			const tagsFromCache = queryClient.getQueryData<ContentTag[]>([FETCH_TAGS_KEY]) || [];

			// 태그 캐시가 없으면 업데이트 할 필요가 없음
			if (!tagsFromCache) {
				return;
			}
			const possibleTags = [0, ...tagsFromCache.map(tag => tag.id)];
			const possibleSorts: ContentsSortType[] = ['newest', 'oldest', 'popular'];

			possibleTags.forEach(tagId => {
				possibleSorts.forEach(sort => {
					const queryKey = ['contents', tagId, sort];

					queryClient.setQueryData<{
						pageParams: { tagId: number; sort: ContentsSortType };
						pages: Content[][];
					}>(queryKey, oldData => {
						if (!oldData) return oldData;

						return {
							...oldData,
							pages: oldData.pages.map(contentArray => {
								return contentArray.map(content => {
									if (content.slug === slug) {
										return {
											...content,
											views: {
												...content.views,
												count: content.views.count + 1,
											},
										};
									}
									return content;
								});
							}),
						};
					});
				});
			});
		},
		[queryClient],
	);

	return updateCache;
};

export default useUpdateViewCache;
