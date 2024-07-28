import { fetchMetaData } from '@/api/contents';
import { getBlogPosts } from '@/lib/mdx';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto my-6 w-full max-w-3xl rounded-lg bg-white p-5 shadow-lg dark:bg-gray-900 dark:text-white sm:my-12 sm:p-10">
			{children}
		</div>
	);
};

export default ContentsDetailLayout;

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
	const metaData = await fetchMetaData(slug);
	const { created_at, description, tag, thumbnail, title } = metaData;

	return {
		title: `${title} | ${tag.name} `,
		description: description,
		openGraph: {
			title: `${title} | ${tag.name} `,
			description: description,
			publishedTime: created_at,
			images: [
				{
					url: thumbnail,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${title} | ${tag.name} `,
			description: description,
			images: [thumbnail],
		},
	};
}

export async function generateStaticParams() {
	return getBlogPosts().map(post => post.slug);
}

// export const dynamic = 'error';
// export const dynamicParams = false;
// export const revalidate = false;
