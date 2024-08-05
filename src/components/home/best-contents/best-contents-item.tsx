import Typography from '@/components/common/typography';
import { Content, PostListItemInterface } from '@/types/contents';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	content: Content;
}
const DRAFT_THUMBNAIL =
	'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302';

const BestContentsItem = ({ content }: Props) => {
	return (
		<li className="flex flex-1">
			<Link
				href={`/contents/${content.slug}`}
				className="flex w-full flex-col gap-y-3 rounded-lg border bg-card p-3 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md sm:w-64 md:w-72 lg:w-80"
			>
				<div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
					<Image
						src={content.thumbnail ?? DRAFT_THUMBNAIL}
						alt={`${content.title} 미리보기 이미지`}
						fill
						className="absolute inset-0 object-cover transition-transform duration-300 hover:scale-105"
					/>
				</div>
				<Typography
					variant={'h4'}
					className="line-clamp-2 h-12 whitespace-normal break-words text-base sm:text-lg"
				>
					{content.title}
				</Typography>
			</Link>
		</li>
	);
};

export default BestContentsItem;
