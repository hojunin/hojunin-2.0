'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { fetchContents } from './useInfiniteFetchContentQuery';
import { ContentsStatus } from '@/types/contents';

const PaginationButton = () => {
	return (
		<Button
			onClick={async () => {
				await fetchContents({
					page: 1,
					status: ContentsStatus.PUBLISHED,
					tag: 1,
				});
			}}
		>
			누르면 페치됨
		</Button>
	);
};

export default PaginationButton;
