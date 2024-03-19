import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <article className="flex flex-col gap-y-5">
      <Skeleton className="w-20 h-10" />
      <Skeleton className="w-96 h-10" />

      <Skeleton className="w-full h-96" />
    </article>
  );
};

export default Loading;
