'use client';
import useUpdateViewCache from '@/components/contents/contents-detail/useUpdateViewCache';
import { createClient } from '@/lib/supabase/client';
import { useEffect, cache } from 'react';

const useIncrementView = (slug: string) => {
	const updateViewCache = useUpdateViewCache();

	useEffect(() => {
		if (!slug) return;
		const incrementViewCount = async (slug: string) => {
			const supabase = createClient();
			try {
				const { data } = await supabase.rpc('increment_views', {
					target_slug: slug,
				});
				return data;
			} catch (error) {}
		};
		const cachedIncrementViewCount = cache(incrementViewCount);
		cachedIncrementViewCount(slug);
		updateViewCache(slug);
	}, [slug]);
};

export default useIncrementView;
