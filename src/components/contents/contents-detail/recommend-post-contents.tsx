'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import useFetchRecommendedPost from './useFetchRecommendedPost';
import { ContentTag } from '@/types/contents';
import Typography from '@/components/common/typography';
import Link from 'next/link';

const Image = dynamic(() => import('next/image'), { ssr: false });

const RecommendedPostsContent = ({ tag }: { tag: ContentTag }) => {
	const { data: recommendedPosts } = useFetchRecommendedPost(tag.id);
	if (!recommendedPosts) {
		return null;
	}
	return (
		<div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900 dark:text-white sm:my-8 sm:p-6 md:p-8 lg:p-10">
			<Typography className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl" variant={'h2'}>
				추천하는{' '}
				<Link
					className="rounded-md text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
					href={`/contents?tag=${tag.name}`}
				>
					{tag.name}
				</Link>{' '}
				글
			</Typography>

			{recommendedPosts.map(post => (
				<Link
					href={`/contents/${post.slug}`}
					key={post.id}
					className="mb-2 flex items-center justify-between rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 md:p-2 lg:p-3"
				>
					<div className="flex min-w-0 flex-grow flex-col justify-center">
						<Typography
							variant={'h3'}
							className="mb-1 truncate text-sm sm:text-base md:text-lg lg:text-xl"
						>
							{post.title}
						</Typography>
						<Typography
							variant={'h4'}
							className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm md:text-base lg:text-lg"
						>
							{post.description}
						</Typography>
					</div>
					{post.thumbnail && (
						<div className="ml-3 flex h-[50px] w-[50px] flex-shrink-0 items-center sm:h-[70px] sm:w-[70px] md:h-[90px] md:w-[90px] lg:h-[110px] lg:w-[110px]">
							<Image
								src={post.thumbnail}
								alt={post.title ?? ''}
								width={110}
								height={110}
								className="rounded-md object-cover"
								objectFit="cover"
							/>
						</div>
					)}
				</Link>
			))}
		</div>
	);
};
export default RecommendedPostsContent;
