import { fetchMetaData } from '@/api/contents';
import { getBlogPosts } from '@/lib/mdx';
import React from 'react';

const ContentsDetailLayout = ({
	children,
}: {
	children: React.ReactNode;
	params: { slug: string };
}) => {
	return <div>{children}</div>;
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
		alternates: {
			canonical: `https://hojunin.com/contents/${slug}`,
		},
	};
}

export async function generateStaticParams() {
	return getBlogPosts().map(post => post.slug);
}

// Router Cache Policy Setting
export const dynamic = 'error'; // 동적으로 가져오는 경우 에러를 발생시킨다.
export const dynamicParams = true; // generateStaticParams로 생성되지 않은 파일을 방문했을 때 파일을 새로 생성한다.
export const revalidate = 3600 * 24; // 레이아웃과 페이지의 유효기간을 1시간(3600초)으로 설정한다.
