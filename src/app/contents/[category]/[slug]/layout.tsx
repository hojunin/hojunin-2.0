import { BASE_URL } from '@/api/path';
import { createClient } from '@/lib/supabase/server';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';
import { cookies } from 'next/headers';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="bg-white dark:bg-gray-900 dark:text-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto my-6 sm:my-12">
      {children}
    </article>
  );
};

export default ContentsDetailLayout;

export async function generateMetadata({
  params: { category, slug },
}: {
  params: { category: ValueOf<typeof ContentsCategory>; slug: string };
}) {
  const response = await fetch(`${BASE_URL}contents/${category}/${slug}`);
  if (!response.ok) {
    return {
      title: '컨텐츠 | HJINN',
      description: '프론트엔드 개발자 인호준의 개인 사이트',
    };
  }

  const post = await response.json();
  console.log('🚀 ~ post:', post);

  return {
    title: `컨텐츠 | ${post.title}`,
    description: post.description,
    openGraph: {
      title: `컨텐츠 | ${post.title}`,
      description: post.description,
      images: [post.thumbnail],
    },
  };
}
