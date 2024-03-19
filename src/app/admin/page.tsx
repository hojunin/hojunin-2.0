'use client';
import useGetUser from '@/app/admin/useGetUser';
import ChallengeTemplateGenerateButton from '@/components/admin/challenge-template-generate-button';
import FileUploadButton from '@/components/file-upload-button';
import { Button } from '@/components/ui/button';
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
    <main className="flex flex-col gap-y-4 mt-4">
      <FileUploadButton />

      <ChallengeTemplateGenerateButton />
    </main>
  );
};

export default AdminPage;
