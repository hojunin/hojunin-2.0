import Typography from '@/components/common/typography';
import BestContentsItem from '@/components/home/best-contents/best-contents-item';
import { createClient } from '@/lib/supabase/server';
import { Content } from '@/types/contents';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import React from 'react';

const getCachedBestContents = unstable_cache(
	async () => {
		const supabase = createClient();
		const { data, error } = (await supabase.rpc('best_contents')) as {
			data: Content[] | null;
			error: unknown;
		};
		if (error) throw error;
		return data;
	},
	['best-contents'],
	{ revalidate: 3600 },
);

const BestContents = async () => {
	const contents = await getCachedBestContents();

	return (
		<section className="my-6">
			<div className="mb-3 flex items-center justify-between">
				<Typography variant={'h2'} className="text-xl sm:text-2xl">
					베스트 컨텐츠
				</Typography>

				<Link href="/contents?sort=popular" className="text-sm text-muted-foreground sm:text-base">
					더 보러가기
				</Link>
			</div>

			<ul className="flex w-full items-center gap-x-3 overflow-x-auto pb-4 scrollbar-hide sm:gap-x-4">
				{contents?.map((content, index) => (
					<li key={content.id} className={`flex-shrink-0 ${index >= 2 ? 'w-1/2 sm:w-auto' : ''}`}>
						<BestContentsItem content={content} />
					</li>
				))}
			</ul>
		</section>
	);
};

export default BestContents;
