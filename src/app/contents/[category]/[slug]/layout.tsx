import { fetcher } from '@/api/fetcher';
import { ValueOf } from '@/types/common';
import { ContentsCategory, PostListItemInterface } from '@/types/contents';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
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
    title: `${post.title} | 컨텐츠 `,
    description: post.description,
    openGraph: {
      title: `${post.title} | 컨텐츠 `,
      description: post.description,
      images: [post.thumbnail],
    },
  };
}
