import { fetchRecommendedPost } from '@/api/contents';
import { useQuery } from '@tanstack/react-query';

const RECOMMENDED_POSTS = 'recommended-posts';

const useFetchRecommendedPost = (tagId: number) => {
	const { data } = useQuery({
		queryKey: [RECOMMENDED_POSTS, tagId],
		queryFn: () => fetchRecommendedPost(tagId),
		staleTime: Infinity,
	});
	return { data };
};

export default useFetchRecommendedPost;
