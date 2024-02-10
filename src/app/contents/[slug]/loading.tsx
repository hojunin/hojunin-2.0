import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <Skeleton className="w-20 h-10" />
      <Skeleton className="w-96 h-10" />
    </div>
  );
};

export default Loading;
