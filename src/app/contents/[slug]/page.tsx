import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { PostListItemInterface } from '@/types/contents';
import { fetcher } from '@/api/fetcher';
import { getPostContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';

const ContentsPage = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  let post = getPostContent(slug);

  if (!post) {
    notFound();
  }
  return (
    <div>
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

  return contents.map(({ slug }) => ({
    slug,
  }));
}
