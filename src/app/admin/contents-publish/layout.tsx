'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useGetUser from '../useGetUser';

export default function AdminPublishLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const { user, isInitialized } = useGetUser();

	useEffect(() => {
		if (isInitialized && !user) {
			router.push('/login?from=' + encodeURIComponent(pathname));
		}
	}, [user, isInitialized, router, pathname]);

	if (!isInitialized) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p>로딩 중...</p>
			</div>
		);
	}

	if (!user) {
		return null; // 리다이렉트가 처리될 때까지 아무것도 표시하지 않음
	}

	return <div className="container mx-auto">{children}</div>;
}
