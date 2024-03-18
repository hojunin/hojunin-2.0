import ContentsDetailBreadCrumb from '@/components/contents/contents-detail/bread-crumbs';
import ContentsViewCount from '@/components/contents/contents-view-count';
import { Skeleton } from '@/components/ui/skeleton';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';
import { EyeIcon } from 'lucide-react';
import React, { Suspense } from 'react';

interface Props {
  category: ValueOf<typeof ContentsCategory>;
  slug: string;
}

const ContentsDetailHeader = ({ category, slug }: Props) => {
  return (
    <section>
      <ContentsDetailBreadCrumb currentCategory={category} slug={slug} />

      <Suspense
        fallback={
          <div className="flex items-center gap-x-2">
            <EyeIcon width={16} height={16} color="#efefef" />
            <Skeleton className="w-4 h-4" />
          </div>
        }
      >
        <ContentsViewCount slug={slug} />
      </Suspense>
    </section>
  );
};

export default ContentsDetailHeader;
