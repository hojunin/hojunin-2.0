import Typography from '@/components/common/typography';
import BestContentsItem from '@/components/home/best-contents/best-contents-item';
import { createClient } from '@/lib/supabase/server';
import { Content } from '@/types/contents';
import Link from 'next/link';
import React from 'react';

const BestContents = async () => {
	const supabase = createClient();
	const { data: contents, error } = (await supabase.rpc('best_contents')) as {
		data: Content[] | null;
		error: unknown;
	};

	if (error) {
		return null;
	}

	return (
		<section className="my-6">
			<div className="mb-3 flex items-center justify-between">
				<Typography variant={'h2'}>베스트 컨텐츠</Typography>

				<Link href="/contents" className="text-muted-foreground">
					더 보러가기
				</Link>
			</div>

			<ul className="flex w-full items-center gap-x-4 overflow-x-auto pb-4">
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
