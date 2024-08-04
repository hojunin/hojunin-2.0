import { createClient } from '@/lib/supabase/client';
import { ContentWithTag } from '@/types/contents';

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

export const CONTENTS_DEFAULT_PAGE_COUNT = 10;

interface FetchContentListParams {
	page: number;
	tag?: number;
	sort: 'newest' | 'oldest';
}

export const fetchContents = async ({ page, tag, sort }: FetchContentListParams) => {
	const supabase = createClient();
	const from = (page - 1) * CONTENTS_DEFAULT_PAGE_COUNT;
	const to = from + CONTENTS_DEFAULT_PAGE_COUNT - 1;

	let query = supabase
		.from('contents')
		.select('*, views(count)')
		.range(from, to)
		.limit(CONTENTS_DEFAULT_PAGE_COUNT)
		.order('created_at', { ascending: sort === 'oldest' });

	if (tag) {
		query = query.eq('tag', tag);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching contents:', error);
		return [];
	}

	return data;
};
