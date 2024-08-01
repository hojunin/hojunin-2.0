import Typography from '@/components/common/typography';
import { EyeIcon } from 'lucide-react';
import React from 'react';
interface Props {
	slug: string;
}
const PostListItemViewCount = ({ slug }: Props) => {
	return (
		<div className="flex items-center gap-x-2">
			<EyeIcon width={16} height={16} color="#efefef" />
			<Typography variant={'span'} typo={'mute'}>
				0
			</Typography>
		</div>
	);
};

export default PostListItemViewCount;
