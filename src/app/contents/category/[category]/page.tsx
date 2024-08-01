import Typography from '@/components/common/typography';
import PostList from '@/components/contents/post/post-list';
import { createClient } from '@/lib/supabase/server';
import React from 'react';

const ContentsByCategory = async ({ params: { category } }: { params: { category: string } }) => {
	const supabase = createClient();
	const { data: tag } = await supabase
		.from('contents_tag')
		.select('*')
		.eq('path', `/${category}`)
		.single();

	return (
		<main>
			<Typography variant={'h1'} className="my-9">
				{tag?.name}
			</Typography>

			<PostList tag={tag} />
		</main>
	);
};

export default ContentsByCategory;
