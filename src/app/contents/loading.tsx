import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const LoadingContentListItem = () => {
	return (
		<Card className="cursor-pointer hover:opacity-70">
			<CardHeader className="block">
				<Skeleton className="h-48 w-full" />
			</CardHeader>

			<CardHeader>
				<Skeleton className="h-8 w-11" />
				<Skeleton className="h-8 w-24" />
			</CardHeader>
		</Card>
	);
};

const LoadingContentList = () => {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
			{Array(12)
				.fill(null)
				.map((_, index) => {
					return <LoadingContentListItem key={index} />;
				})}
		</div>
	);
};

export default LoadingContentList;
