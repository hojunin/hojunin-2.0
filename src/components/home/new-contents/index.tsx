import { createClient } from '@/lib/supabase/server';
import { Content } from '@/types/contents';
import Link from 'next/link';
import React from 'react';
import BestContentsItem from '../best-contents/best-contents-item';
import Typography from '@/components/common/typography';

const NewContents = async () => {
	const supabase = createClient();
	const { data: contents, error } = (await supabase
		.from('contents')
		.select('*')
		.limit(5)
		.order('created_at', { ascending: false })) as { data: Content[] | null; error: any };

	if (error) {
		return null;
	}

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

			<ul className="scrollbar-hide flex w-full items-center gap-x-4 overflow-x-auto pb-4">
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
