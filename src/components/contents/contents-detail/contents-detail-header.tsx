import ContentsDetailBreadCrumb from '@/components/contents/contents-detail/bread-crumbs';
import ContentsViewCount from '@/components/contents/contents-view-count';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';
import React, { Suspense } from 'react';

interface Props {
  category: ValueOf<typeof ContentsCategory>;
  slug: string;
}

const ContentsDetailHeader = ({ category, slug }: Props) => {
  return (
    <section>
      <ContentsDetailBreadCrumb currentCategory={category} slug={slug} />

      <Suspense fallback={null}>
        <ContentsViewCount slug={slug} />
      </Suspense>
    </section>
  );
};

export default ContentsDetailHeader;
