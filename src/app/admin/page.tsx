'use client';
import useGetUser from '@/app/admin/useGetUser';
import FileUploadButton from '@/components/file-upload-button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminPage = () => {
  const { isInitialized, user } = useGetUser();
  const { replace } = useRouter();

  if (!isInitialized) {
    return <Loader2 className="w-20 h-20 animate-spin" />;
  }
  if (!user) {
    return <Link href={'/login'}>로그인하러 가기</Link>;
  }
  if (user.role !== 'authenticated') {
    replace('/');
  }

  return (
    <div>
      <FileUploadButton />
    </div>
  );
};

export default AdminPage;
