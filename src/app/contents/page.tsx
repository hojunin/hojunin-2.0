import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

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
    label: '회사생활',
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
      <Card className="flex items-center gap-x-3 w-full h-20 p-4 mb-10 mt-10">
        {categories.map(({ label, path }) => (
          <Button asChild key={`${label}-${path}`}>
            <Link href={`/contents/${path}`}>{label}</Link>
          </Button>
        ))}
      </Card>
    </div>
  );
};

export default ContentsPage;
