import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchTags = async (slug: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from('contents')
		.select('*, tag(*)')
		.eq('slug', slug)
		.single();

	return {
		data,
		error,
	};
};

const useFetchTags = (slug: string) => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['TAGS', slug],
		queryFn: ({ queryKey }) => fetchTags(queryKey[1]),
	});

	return {
		data,
		error,
		isLoading,
	};
};

export default useFetchTags;
