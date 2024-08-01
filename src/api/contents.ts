import { createClient } from '@/lib/supabase/client';
import { PostMetaData } from '@/types/contents';

export const fetchMetaData = async (slug: string): Promise<PostMetaData> => {
	const supabase = createClient();
	try {
		const { data, error } = await supabase
			.from('contents')
			.select('slug, title, status, thumbnail,description, created_at, tag(*)')
			.eq('slug', slug)
			.single();
		if (error) {
			throw error;
		}
		return data;
	} catch (error) {
		throw error;
	}
};

export const fetchTags = async () => {
	const supabase = createClient();
	try {
		const { data, error } = await supabase.from('contents_tag').select('*');
		if (error) {
			throw error;
		}
		return data;
	} catch (error) {
		throw error;
	}
};
