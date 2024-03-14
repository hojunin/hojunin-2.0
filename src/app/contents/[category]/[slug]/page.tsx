import React, { Suspense } from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { ValueOf } from '@/types/common';
import { ContentsCategory, PostListItemInterface } from '@/types/contents';
import { fetcher } from '@/api/fetcher';
import { Skeleton } from '@/components/ui/skeleton';
import ContentsDetailBreadCrumb from '@/components/contents/contents-detail/bread-crumbs';

const ContentsPage = async ({
  params: { category, slug },
}: {
  params: { category: ValueOf<typeof ContentsCategory>; slug: string };
}) => {
  return (
    <div>
      <ContentsDetailBreadCrumb currentCategory={category} slug={slug} />

      <article className="bg-white dark:bg-gray-900 dark:text-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto my-6 sm:my-12">
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <ContentsDetail category={category} slug={slug} />
        </Suspense>
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
export const revalidate = false;
