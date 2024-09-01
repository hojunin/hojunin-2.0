import { createClient } from '@/lib/supabase/client';
import { Content, ContentsSortType } from '@/types/contents';

export const fetchMetaData = async (slug: string): Promise<Content> => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from('contents')
		.select('slug, title, status, thumbnail, description, created_at, tag(*), views(count)')
		.eq('slug', slug)
		.single<Content>();
	if (error) {
		throw error;
	}
	return data;
};

export const CONTENTS_DEFAULT_PAGE_COUNT = 10;

interface FetchContentListParams {
	page: number;
	tag?: number;
	sort: ContentsSortType;
}

export const fetchContents = async ({ page, tag, sort }: FetchContentListParams) => {
	const supabase = createClient();
	const from = (page - 1) * CONTENTS_DEFAULT_PAGE_COUNT;
	const to = from + CONTENTS_DEFAULT_PAGE_COUNT - 1;

	let query = supabase
		.from('contents')
		.select(
			`
			*,
			views (count),
			tag (id, name)
		`,
		)
		.range(from, to)
		.limit(CONTENTS_DEFAULT_PAGE_COUNT)
		.neq('status', 'draft')
		.returns<Content[]>();

	if (sort === 'oldest') {
		query = query.order('created_at', { ascending: true });
	} else if (sort === 'popular') {
		query = query.order('views(count)', { ascending: false });
	} else {
		query = query.order('created_at', { ascending: false });
	}

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

export const fetchRecommendedPost = async (tagId: number) => {
	const supabase = createClient();
	const { data } = await supabase
		.from('contents')
		.select('*, views (count)')
		.order('views(count)', { ascending: false })
		.limit(5)
		.eq('tag', tagId)
		.returns<Content[]>();

	return data;
};
