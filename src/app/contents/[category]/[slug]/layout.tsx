import { fetcher } from '@/api/fetcher';
import { ValueOf } from '@/types/common';
import { ContentsCategory, PostListItemInterface } from '@/types/contents';
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
  const post = await fetcher<PostListItemInterface>({
    path: `contents/${category}/${slug}`,
  });

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
