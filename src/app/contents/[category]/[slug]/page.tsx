import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { ValueOf } from '@/types/common';
import { ContentsCategory, PostListItemInterface } from '@/types/contents';
import { fetcher } from '@/api/fetcher';

const ContentsPage = async ({
  params: { category, slug },
}: {
  params: { category: ValueOf<typeof ContentsCategory>; slug: string };
}) => {
  return (
    <div>
      <ContentsDetail category={category} slug={slug} />
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
export const revalidate = false;
