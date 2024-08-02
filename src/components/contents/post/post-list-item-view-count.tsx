import Typography from '@/components/common/typography';
import React from 'react';
import { EyeIcon } from 'lucide-react';
interface Props {
	viewCount: number;
}
const PostListItemViewCount = ({ viewCount }: Props) => {
	return (
		<div className="flex items-center gap-x-2">
			<EyeIcon width={16} height={16} color="#efefef" />
			<Typography variant={'span'} typo={'mute'}>
				{viewCount}
			</Typography>
		</div>
	);
};

export default PostListItemViewCount;
