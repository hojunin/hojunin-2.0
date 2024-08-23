'use client';

import DetailAdminLinksNavigator from '@/components/admin/detail-admin-links-navigator';
import MagicButton from '@/components/admin/magic-button';
import FileUploadButton from '@/components/file-upload-button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useAdminPage } from './admin-page.hooks';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
	const { isInitialized, user } = useAdminPage();
	const { replace } = useRouter();

	if (!isInitialized) {
		return <Loader2 className="h-20 w-20 animate-spin" />;
	}
	if (!user) {
		return <Link href={'/login'}>로그인하러 가기</Link>;
	}

	if (user?.role !== 'authenticated') {
		replace('/');
	}
	return (
		<main className="mt-4 flex flex-col gap-y-4 px-4">
			<DetailAdminLinksNavigator />

			<FileUploadButton />

			<MagicButton />
		</main>
	);
};

export default AdminPage;
