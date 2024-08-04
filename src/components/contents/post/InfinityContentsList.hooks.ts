import useQueryParams from '@/hooks/useQueryParams';
import useContentsParamStore from '@/store/contents-param-store';
import useFetchAllTags from '@/api/tag/useFetchAllTags';
import { useEffect } from 'react';

export const useInitQueryString = () => {
	const { getQueryParam } = useQueryParams();
	const { setSort, setCurrentTag } = useContentsParamStore();
	const { data: tags } = useFetchAllTags();

	useEffect(() => {
		if (!tags) {
			return;
		}
		const sortParam = getQueryParam('sort');
		const tagParam = getQueryParam('tag');
		const tag = tags?.find(tag => tag.name === tagParam);

		if (sortParam) {
			setSort(sortParam as 'newest' | 'oldest');
		}

		if (tagParam && tag) {
			setCurrentTag(tag);
		}
	}, [tags]);
};
