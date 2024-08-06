import Typography from '@/components/common/typography';
import ContentsDetailBreadCrumb from '@/components/contents/contents-detail/bread-crumbs';
import { getElapsedTime } from '@/lib/date';
import { Content, ContentTag } from '@/types/contents';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	metaData: Content;
	tags: ContentTag[];
}

const ContentsDetailHeader = ({ tags, metaData }: Props) => {
	return (
		<section>
			<ContentsDetailBreadCrumb tags={tags} metaData={metaData} />

			<div>
				<Typography variant={'h1'} className="mt-4 whitespace-normal break-words">
					{metaData.title}
				</Typography>

				<Typography variant={'p'} className="mt-2 text-lg text-muted-foreground">
					{metaData.description}
				</Typography>
			</div>

			<div className="my-4 flex w-full items-center justify-between gap-y-4">
				<Link
					href={'https://hjinn.notion.site/hjinn/Full-Speed-Ahead-2d604da39fcd473d9328cf26877bb8cd'}
					className="flex items-center gap-x-4"
					target="_blank"
				>
					<Image
						src="https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/prod/18079523.jpeg-18679"
						alt="인호준 아바타 이미지"
						width={36}
						height={36}
						className="rounded-full"
					/>
					<div className="flex flex-col">
						<Typography variant={'p'} className="text-muted-foreground">
							인호준
						</Typography>
						<Typography variant={'p'} className="mt-[-4px] text-muted-foreground">
							Full Speed Ahead
						</Typography>
					</div>
				</Link>
				<Typography variant={'p'} className="text-muted-foreground">
					{getElapsedTime(metaData.created_at)}
				</Typography>
			</div>
		</section>
	);
};

export default ContentsDetailHeader;
