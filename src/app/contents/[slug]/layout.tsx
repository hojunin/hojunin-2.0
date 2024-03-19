import { fetcher } from '@/api/fetcher';
import { getPostContent } from '@/lib/mdx';
import { PostListItemInterface } from '@/types/contents';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ContentsDetailLayout;

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string };
// }) {
//   const post = getPostContent(slug)

//   return {
//     title: `${post.title} | 컨텐츠 `,
//     description: post.description,
//     openGraph: {
//       title: `${post.title} | 컨텐츠 `,
//       description: post.description,
//       images: [post.thumbnail],
//     },
//   };
// }

export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = 3600;
