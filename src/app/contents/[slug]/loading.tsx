import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
	return (
		<article className="flex flex-col gap-y-5">
			<Skeleton className="h-10 w-20" />

			<Skeleton className="h-10 w-96" />

			<Skeleton className="h-96 w-full" />
		</article>
	);
};

export default Loading;
