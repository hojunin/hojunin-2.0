import { createClient } from '@/lib/supabase/client';
import { ContentTag, ContentWithTag } from '@/types/contents';

export const fetchMetaData = async (slug: string): Promise<ContentWithTag> => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from('contents')
		.select('slug, title, status, thumbnail, description, created_at, tag(*)')
		.eq('slug', slug)
		.single<ContentWithTag>();
	if (error) {
		throw error;
	}
	return data;
};

export const fetchTags = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from('contents_tag').select('*').returns<ContentTag[]>();
	if (error) {
		throw error;
	}
	return data;
};
