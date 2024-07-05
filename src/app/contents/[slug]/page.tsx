import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { getBlogPosts, getPostContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import ContentsDetailHeader from '@/components/contents/contents-detail/contents-detail-header';
import { Separator } from '@/components/ui/separator';
import ViewIncrementor from '@/components/contents/view-incrementor';

const ContentsPage = async ({
	params: { slug },
}: {
	params: {
		slug: string;
	};
}) => {
	const post = getPostContent(slug);

	if (!post) {
		notFound();
	}
	return (
		<article>
			<ContentsDetailHeader slug={slug} meta={JSON.parse(JSON.stringify(post.metadata))} />

			<Separator className="mb-6" />

			<ContentsDetail content={post.content} />

			<ViewIncrementor slug={slug} />
		</article>
	);
};

export default ContentsPage;

export async function generateStaticParams() {
	const allPosts = getBlogPosts();
	return allPosts.map(post => post.slug);
}

export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = false;
