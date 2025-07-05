import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { getPostContent, extractHeadings } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import ContentsDetailHeader from '@/components/contents/contents-detail/contents-detail-header';
import { Separator } from '@/components/ui/separator';
import ViewIncrementor from '@/components/contents/view-incrementor';
import { fetchMetaData } from '@/api/contents';
import { fetchAllTags } from '@/api/tag';
import RecommendedPostsContent from '@/components/contents/contents-detail/recommend-post-contents';
import TableOfContents from '@/components/contents/table-of-contents';

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

	// MDX 콘텐츠에서 heading 추출
	const headings = extractHeadings(post.content);

	return (
		<div className="mx-auto mb-4 w-full max-w-3xl space-y-6 sm:space-y-12">
			{/* Table of Contents */}
			<TableOfContents headings={headings} />
			
			<article className="overflow-x-auto whitespace-normal rounded-lg bg-white p-5 shadow-lg dark:bg-gray-900 dark:text-white sm:my-12 sm:p-10">
				<ContentsDetailHeader tags={allTags} metaData={metaData} />

				<Separator className="mb-6" />

				<ContentsDetail content={post.content} />

				<ViewIncrementor slug={slug} />
			</article>

			<RecommendedPostsContent tag={metaData.tag} />
		</div>
	);
};

export default ContentsPage;
