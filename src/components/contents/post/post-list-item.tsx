'use client';
import React from 'react';
import Image from 'next/image';
import { Content, ContentsStatus } from '@/types/contents';
import PostListItemViewCount from '@/components/contents/post/post-list-item-view-count';
import Typography from '@/components/common/typography';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getElapsedTime } from '@/lib/date';
import useAmplitude from '@/hooks/useAmplitude';
import useContentsParamStore from '@/store/contents-param-store';

const DRAFT_THUMBNAIL =
	'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302';
interface Props {
	postItem: Content;
}

const PostListItem = ({ postItem }: Props) => {
	const { trackAmplitudeEvent } = useAmplitude();
	const { sort, currentTag } = useContentsParamStore();

	const onClickPost = () => {
		trackAmplitudeEvent('click_post_item', {
			title: postItem?.title,
			sort,
			currentTag,
		});
	};

	if (!postItem) {
		return null;
	}
	return (
		<Link href={`/contents/${postItem.slug}`} onClick={onClickPost}>
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
						{postItem.title?.length > 40 ? `${postItem.title?.slice(0, 40)}...` : postItem.title}
					</CardTitle>
					{postItem.description && (
						<CardDescription className="text-xs sm:text-sm">
							{postItem.description.length > 20
								? `${postItem.description.slice(0, 20)}...`
								: postItem.description}
						</CardDescription>
					)}
				</CardHeader>
				<CardFooter className="flex items-start justify-between p-2 sm:items-center sm:p-6">
					<PostListItemViewCount viewCount={postItem.views.count} />
					<Typography variant={'span'} typo={'mute'} className="text-xs sm:text-sm">
						{getElapsedTime(postItem.created_at)}
					</Typography>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default PostListItem;
