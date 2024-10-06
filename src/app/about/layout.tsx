import React from 'react';

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto w-full max-w-3xl rounded-lg p-5 shadow-lg dark:text-white sm:p-10">
			{children}
		</div>
	);
};

export default AboutLayout;

export const dynamic = 'error';
export const revalidate = false;

export async function generateMetadata() {
	return {
		title: `About | HJINN`,
		description: '프론트엔드 개발자 인호준입니다',
		openGraph: {
			title: `About | HJINN`,
			description: '프론트엔드 개발자 인호준입니다',
			images: [
				{
					url: 'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `About | HJINN`,
			description: '프론트엔드 개발자 인호준입니다',
			images: [
				'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302',
			],
		},
		alternates: {
			canonical: `https://hojunin.com/about`,
		},
	};
}
