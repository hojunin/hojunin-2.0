import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';

const ContentsPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  return (
    <div>
      <ContentsDetail slug={slug} />
    </div>
  );
};

export default ContentsPage;
