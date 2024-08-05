import React from 'react';
import HomeCarousel from './carousel';
import { createClient } from '@/lib/supabase/server';
import dayjs from 'dayjs';

const HomeRollingCarousel = async () => {
	const supabase = createClient();
	const { data: banners, error } = await supabase
		.from('home_rolling_banner')
		.select('*')
		.eq('status', 'active')
		.lte('impression_started', dayjs().format('YYYY-MM-DD HH:mm:ss'))
		.gte('impression_ended', dayjs().format('YYYY-MM-DD HH:mm:ss'));

	if (!banners || error) return null;

	return <HomeCarousel banners={banners} />;
};

export default HomeRollingCarousel;
