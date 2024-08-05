'use client';

import InfinityContentsList from '@/components/contents/post/InfinityContentsList';
import { Suspense } from 'react';

const ContentsPage = () => {
	return (
		<Suspense fallback={<div>로딩중...</div>}>
			<InfinityContentsList />
		</Suspense>
	);
};

export default ContentsPage;
