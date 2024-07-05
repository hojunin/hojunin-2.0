'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

const useIncrementView = (slug: string) => {
	const supabase = createClient();

	useEffect(() => {
		supabase.rpc('increment_views', {
			target_slug: slug,
		});
	}, []);
};

export default useIncrementView;
