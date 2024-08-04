import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { getPostContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import ContentsDetailHeader from '@/components/contents/contents-detail/contents-detail-header';
import { Separator } from '@/components/ui/separator';
import ViewIncrementor from '@/components/contents/view-incrementor';
import { fetchMetaData } from '@/api/contents';
import { fetchAllTags } from '@/api/tag';

const ContentsPage = async ({
	params: { slug },
}: {
	params: {
		slug: string;
	};
}) => {
	const allTags = await fetchAllTags();
	const metaData = await fetchMetaData(slug);
	const post = getPostContent(slug);

	if (!post || !metaData || !allTags) {
		notFound();
	}

	return (
		<article>
			<ContentsDetailHeader tags={allTags} metaData={metaData} />

			<Separator className="mb-6" />

			<ContentsDetail content={post.content} />

			<ViewIncrementor slug={slug} />
		</article>
	);
};

export default ContentsPage;
