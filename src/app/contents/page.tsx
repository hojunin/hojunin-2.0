'use client';

import InfinityContentsList from '@/components/contents/post/InfinityContentsList';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrackPageView } from '@/hooks/events/useTrack';
import { Suspense } from 'react';

const ContentsPage = () => {
	useTrackPageView({ title: 'contents' });

	return (
		<Suspense
			fallback={
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{[...Array(12)].map((_, index) => (
						<Skeleton key={index} />
					))}
				</div>
			}
		>
			<InfinityContentsList />
		</Suspense>
	);
};

export default ContentsPage;
