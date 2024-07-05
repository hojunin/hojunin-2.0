'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, cache } from 'react';

const useIncrementView = (slug: string) => {
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
	}, [slug]);
};

export default useIncrementView;
