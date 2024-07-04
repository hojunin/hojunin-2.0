import React, { cache } from 'react';
import Typography from '@/components/common/typography';
import { EyeIcon } from 'lucide-react';
import { addComma } from '@/lib/number';
import { incrementViewCount } from '@/api/actions';

interface Props {
	slug: string;
}

const ContentsViewCount = async ({ slug }: Props) => {
	const cachedIncrementViewCount = cache(incrementViewCount);
	const count = await cachedIncrementViewCount(slug);

	return (
		<div className="flex items-center gap-x-2">
			<EyeIcon width={16} height={16} color="#efefef" />
			<Typography variant={'span'} typo={'mute'}>
				{addComma(count)}
			</Typography>
		</div>
	);
};

export default ContentsViewCount;
