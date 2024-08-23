'use client';
import WriteEditor from '@/components/admin/write-content/write-editor';
import React from 'react';
import { useAdminPage } from '../admin-page.hooks';
import { useRouter } from 'next/navigation';

const WriteContentPage = () => {
	const { isInitialized, user } = useAdminPage();
	const router = useRouter();
	if (isInitialized && (!user || user?.role !== 'authenticated')) {
		router.push('/admin');
		return null;
	}
	return (
		<div className="container mx-auto p-4">
			<WriteEditor />
		</div>
	);
};

export default WriteContentPage;
