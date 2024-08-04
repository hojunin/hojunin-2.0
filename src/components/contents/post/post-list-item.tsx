'use client';
import React from 'react';
import Image from 'next/image';
import { ContentsStatus, PostListItemInterface } from '@/types/contents';
import PostListItemViewCount from '@/components/contents/post/post-list-item-view-count';
import Typography from '@/components/common/typography';
import dayjs from 'dayjs';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const DRAFT_THUMBNAIL =
	'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302';
interface Props {
	postItem: PostListItemInterface;
}

const PostListItem = ({ postItem }: Props) => {
	if (!postItem) {
		return null;
	}
	return (
		<Link href={`/contents/${postItem.slug}`}>
			<Card className="group flex h-full cursor-pointer flex-col justify-between hover:border-gray-600">
				<CardHeader className="p-2 sm:p-6">
					<div className="relative mb-2 w-full overflow-hidden rounded-lg pt-[56.25%] sm:mb-3">
						<Image
							src={
								postItem.status === ContentsStatus.RESERVED
									? DRAFT_THUMBNAIL
									: (postItem.thumbnail ?? DRAFT_THUMBNAIL)
							}
							alt={`${postItem.title} 대표 이미지`}
							className="absolute left-0 top-0 h-full w-full object-cover transition-all group-hover:scale-105"
							layout="fill"
							objectFit="cover"
							objectPosition="center"
						/>
					</div>
					<CardTitle className="line-clamp-2 text-sm sm:text-base md:text-xl">
						{postItem.title.length > 40 ? `${postItem.title.slice(0, 40)}...` : postItem.title}
					</CardTitle>
					{postItem.description && (
						<CardDescription className="text-xs sm:text-sm">
							{postItem.description.length > 20
								? `${postItem.description.slice(0, 20)}...`
								: postItem.description}
						</CardDescription>
					)}
				</CardHeader>
				<CardFooter className="flex flex-col items-start justify-between p-2 sm:flex-row sm:items-center sm:p-6">
					<PostListItemViewCount viewCount={postItem.views.count} />
					<Typography variant={'span'} typo={'mute'} className="text-xs sm:text-sm">
						{dayjs(postItem.created_at).format('YYYY-MM-DD')}
					</Typography>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default PostListItem;
