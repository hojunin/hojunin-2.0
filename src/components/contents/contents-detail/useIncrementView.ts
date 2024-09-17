'use client';
import useUpdateViewCache from '@/components/contents/contents-detail/useUpdateViewCache';
import { localStorageUtil } from '@/lib/local-storage';
import { createClient } from '@/lib/supabase/client';
import dayjs from 'dayjs';
import { useEffect, cache } from 'react';

const useIncrementView = (slug: string) => {
	const updateViewCache = useUpdateViewCache();

	useEffect(() => {
		if (!slug) return;

		const incrementViewCount = async (slug: string) => {
			const lastViewDate = localStorageUtil.get<string>(`lastView_${slug}`);
			const today = dayjs().format('YYYY-MM-DD');

			if (lastViewDate !== today) {
				const supabase = createClient();
				try {
					const { data } = await supabase.rpc('increment_views', {
						target_slug: slug,
					});
					localStorageUtil.set(`lastView_${slug}`, today);
					return data;
				} catch (error) {
					console.error('Error incrementing view count:', error);
				}
			}
		};

		const cachedIncrementViewCount = cache(incrementViewCount);
		cachedIncrementViewCount(slug);
		updateViewCache(slug);
	}, [slug]);
};

export default useIncrementView;
