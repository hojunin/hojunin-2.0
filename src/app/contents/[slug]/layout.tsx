import { fetcher } from '@/api/fetcher';
import { PostListItemInterface } from '@/types/contents';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ContentsDetailLayout;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await fetcher<PostListItemInterface>({
    path: `/contents/${slug}`,
  });

  if (!post) {
    return;
  }

  const { created_at, description, tag, thumbnail, title } = post;

  return {
    title: `${title} | ${tag.name} `,
    description: description,
    openGraph: {
      title: `${title} | ${tag.name} `,
      description: description,
      publishedTime: created_at,
      images: [
        {
          url: thumbnail,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${tag.name} `,
      description: post.description,
      images: [thumbnail],
    },
  };
}

export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = 3600;
