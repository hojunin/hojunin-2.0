import PostList from '@/components/contents/post/post-list';
import React from 'react';

const ContentsCategoryPage = ({
  params: { category },
}: {
  params: { category: 'dev' | 'life' | 'money' | 'etc' };
}) => {
  return (
    <div>
      <PostList category={category} />
    </div>
  );
};

export default ContentsCategoryPage;

//페이지 캐싱 정책 - https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic';
export const revalidate = 600;
