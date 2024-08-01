import { fetchTags } from '@/api/contents';
import { useQuery } from '@tanstack/react-query';

const useFetchTags = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['tags'],
		queryFn: () => fetchTags(),
	});
	return { data, isLoading };
};

export default useFetchTags;
