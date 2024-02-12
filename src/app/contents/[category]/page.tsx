import PostList from '@/components/contents/tech/tech-post-list';
import React from 'react';

const ContentsCategoryPage = ({
  params: { category },
}: {
  params: { category: 'dev' | 'life' | 'money' | 'etc' };
}) => {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {category}
      </h1>

      <PostList category={category} />
    </div>
  );
};

export default ContentsCategoryPage;
