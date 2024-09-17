import Head from 'next/head';
import React from 'react';

const ContentsPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<div className="container">{children}</div>
		</>
	);
};

export default ContentsPageLayout;

export async function generateMetadata() {
	return {
		title: `컨텐츠 | HJINN`,
		description: '블로그, 기술 블로그, 기술 정보를 제공하는 컨텐츠 페이지입니다.',
		openGraph: {
			title: `컨텐츠 | HJINN`,
			description: '블로그, 기술 블로그, 기술 정보를 제공하는 컨텐츠 페이지입니다.',
			images: [
				{
					url: 'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `컨텐츠 | HJINN`,
			description: '블로그, 기술 블로그, 기술 정보를 제공하는 컨텐츠 페이지입니다.',
			images: [
				'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302',
			],
		},
		alternates: {
			canonical: `https://hojunin.com/contents`,
		},
	};
}
