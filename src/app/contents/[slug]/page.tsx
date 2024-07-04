import React from 'react';
import ContentsDetail from '@/components/contents/contents-detail';
import { getPostContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import ContentsDetailHeader from '@/components/contents/contents-detail/contents-detail-header';
import { Separator } from '@/components/ui/separator';

const ContentsPage = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const post = getPostContent(slug);

  if (!post) {
    notFound();
  }
  return (
    <article>
      <ContentsDetailHeader slug={slug} />

      <Separator className="mb-6" />

      <ContentsDetail content={post.content} />
    </article>
  );
};

export default ContentsPage;
