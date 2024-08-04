import { useQuery } from '@tanstack/react-query';
import { fetchAllTags } from '.';

export const FETCH_TAGS_KEY = 'tags';

const useFetchTags = () => {
	const { data, isLoading } = useQuery({
		queryKey: [FETCH_TAGS_KEY],
		queryFn: () => fetchAllTags(),
	});
	return { data, isLoading };
};

export default useFetchTags;
