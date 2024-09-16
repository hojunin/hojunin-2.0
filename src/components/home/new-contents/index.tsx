import { Content } from '@/types/contents';
import Link from 'next/link';
import React from 'react';
import BestContentsItem from '../best-contents/best-contents-item';
import Typography from '@/components/common/typography';
import { unstable_cache } from 'next/cache';
import { createServerWithoutCookieClient } from '@/lib/supabase/serverWithoutCookie';

const getCachedContents = unstable_cache(
	async () => {
		const supabase = createServerWithoutCookieClient();
		const { data: contents } = await supabase
			.from('contents')
			.select('*')
			.order('created_at', { ascending: false })
			.eq('status', 'published')
			.limit(5)
			.returns<Content[]>();

		return contents;
	},
	['new-contents'],
	{ revalidate: 3600 },
);

const NewContents = async () => {
	const contents = await getCachedContents();

	return (
		<section className="my-6">
			<div className="mb-3 flex items-center justify-between">
				<Typography variant={'h2'} className="text-xl sm:text-2xl">
					최신 컨텐츠
				</Typography>

				<Link href="/contents?sort=newest" className="text-muted-foreground">
					더 보러가기
				</Link>
			</div>

			<ul className="flex w-full items-center gap-x-4 overflow-x-auto pb-4 scrollbar-hide">
				{contents?.map((content, index) => (
					<li key={content.id} className={`flex-shrink-0 ${index >= 2 ? 'w-1/2 sm:w-auto' : ''}`}>
						<BestContentsItem content={content} />
					</li>
				))}
			</ul>
		</section>
	);
};

export default NewContents;
