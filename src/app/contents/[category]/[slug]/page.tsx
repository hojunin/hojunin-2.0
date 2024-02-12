import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';

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
  return [
    { category: 'dev', slug: 'common-mistake-using-useeffect' },
    { category: 'dev', slug: 'thumbhash' },
  ];
}
