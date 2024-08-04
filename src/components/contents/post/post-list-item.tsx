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
				<CardHeader>
					<div className="relative mb-3 w-full overflow-hidden rounded-lg pt-[56.25%]">
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
					<CardTitle className="line-clamp-2 text-base sm:text-xl">
						{postItem.title.length > 60 ? `${postItem.title.slice(0, 60)}...` : postItem.title}
					</CardTitle>
					{postItem.description && (
						<CardDescription>
							{postItem.description.length > 30
								? `${postItem.description.slice(0, 30)}...`
								: postItem.description}
						</CardDescription>
					)}
				</CardHeader>
				<CardFooter className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
					<PostListItemViewCount viewCount={postItem.views.count} />
					<Typography variant={'span'} typo={'mute'}>
						{dayjs(postItem.created_at).format('YYYY-MM-DD')}
					</Typography>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default PostListItem;
