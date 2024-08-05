import Typography from '@/components/common/typography';
import ContentsDetailBreadCrumb from '@/components/contents/contents-detail/bread-crumbs';
import { Content, ContentTag } from '@/types/contents';
import { EyeIcon } from 'lucide-react';
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

			<div className="my-4 flex items-center justify-between gap-y-4">
				<Link href={'/about'} className="flex items-center gap-x-4">
					<Image
						src="https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/prod/hojun.jpeg-33426"
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
							컨텐츠 만드는 개발자
						</Typography>
					</div>
				</Link>

				<div className="flex items-center gap-x-2">
					<EyeIcon color="#667085" />
					<Typography variant={'p'} className="text-muted-foreground">
						{metaData.views.count}
					</Typography>
				</div>
			</div>
		</section>
	);
};

export default ContentsDetailHeader;
