import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import CategoryCard from './[category]/category-card';

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
    <div className="flex w-full gap-x-4">
      {categories.map(({ label, path }) => (
        <Link href={`/contents/${path}`} key={`${label}-${path}`}>
          <CategoryCard category={label} />
        </Link>
      ))}
    </div>
  );
};

export default ContentsPage;
