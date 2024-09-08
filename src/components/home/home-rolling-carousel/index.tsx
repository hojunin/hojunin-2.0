import React, { cache } from 'react';
import HomeCarousel from './carousel';
import { createServerWithoutCookieClient } from '@/lib/supabase/serverWithoutCookie';
import dayjs from 'dayjs';
import { unstable_cache } from 'next/cache';
import { Database } from '../../../../database.types';

const getCachedBanners = unstable_cache(
	async () => {
		const supabase = createServerWithoutCookieClient();
		const { data: banners, error } = await supabase
			.from('home_rolling_banner')
			.select('*')
			.eq('status', 'active')
			.lte('impression_started', dayjs().format('YYYY-MM-DD HH:mm:ss'))
			.gte('impression_ended', dayjs().format('YYYY-MM-DD HH:mm:ss'))
			.returns<Database['public']['Tables']['home_rolling_banner']['Row'][]>();

		if (error) {
			console.error('Error fetching banners:', error);
			return null;
		}

		return banners;
	},
	['home-rolling-carousel'],
	{ revalidate: 3600 },
);

const HomeRollingCarousel = cache(async () => {
	const banners = await getCachedBanners();

	return <HomeCarousel banners={banners} />;
});

export default HomeRollingCarousel;
