import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { ValueOf } from '@/types/common';
import { ContentsCategory, PostListItemInterface } from '@/types/contents';
import { fetcher } from '@/api/fetcher';
import ContentsDetailHeader from '@/components/contents/contents-detail/contents-detail-header';
import { getPostContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';

const ContentsPage = async ({
  params: { category, slug },
}: {
  params: {
    category: ValueOf<typeof ContentsCategory>;
    slug: string;
  };
}) => {
  let post = getPostContent(slug);

  if (!post) {
    notFound();
  }
  return (
    <div>
      <ContentsDetailHeader category={category} slug={slug} />

      <article className="bg-white dark:bg-gray-900 dark:text-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto my-6 sm:my-12">
        <ContentsDetail content={post.content} />
      </article>
    </div>
  );
};

export default ContentsPage;

export async function generateStaticParams() {
  const contents = await fetcher<PostListItemInterface[]>({
    path: 'contents',
  });
  if (!contents) {
    return [];
  }

  return contents.map(({ category, slug }) => ({
    category,
    slug,
  }));
}

export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = 3600;
