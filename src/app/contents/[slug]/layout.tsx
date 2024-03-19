import { fetcher } from '@/api/fetcher';
import { PostListItemInterface } from '@/types/contents';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto my-6 sm:my-12">
      {children}
    </div>
  );
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

export async function generateStaticParams() {
  const contents = await fetcher<PostListItemInterface[]>({
    path: 'contents',
  });

  if (!contents) {
    return [];
  }

  return contents.map(({ slug }) => ({
    slug,
  }));
}

export const dynamicParams = false;
export const revalidate = 3600;
