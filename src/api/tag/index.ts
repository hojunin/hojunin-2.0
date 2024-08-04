import { createClient } from '@/lib/supabase/client';
import { ContentTag } from '@/types/contents';

export const fetchTag = async (slug: string) => {
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
export const fetchAllTags = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from('contents_tag').select('*').returns<ContentTag[]>();
	if (error) {
		throw error;
	}
	return data;
};
