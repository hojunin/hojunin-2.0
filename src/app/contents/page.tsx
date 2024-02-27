import Link from 'next/link';
import React from 'react';
import CategoryCard from '../../components/contents/category-card';
import Callout from '@/components/common/callout';

const categories = [
  {
    label: '개발',
    path: 'dev',
  },
  {
    label: '생활',
    path: 'life',
  },
  {
    label: '커리어',
    path: 'work',
  },
  {
    label: '제테크',
    path: 'money',
  },
];

const ContentsPage = () => {
  return (
    <div>
      <Callout title="공사중" type="info" message="뭘 넣는게 좋을까~" />
      <section className="flex w-full gap-x-4 mt-5">
        {categories.map(({ label, path }) => (
          <Link href={`/contents/${path}`} key={`${label}-${path}`}>
            <CategoryCard category={label} />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ContentsPage;
