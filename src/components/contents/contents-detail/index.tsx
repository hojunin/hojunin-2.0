import React from 'react';
import { fetcher } from '@/api/fetcher';
import CommonError from '@/components/common/common-error';
import { useMDXComponents } from '@/mdx-components';
import { ValueOf } from '@/types/common';
import { ContentsCategory, PostListItemInterface } from '@/types/contents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import prism from 'rehype-prism-plus';
import { parseCodeSnippet } from '@/lib/mdx';

interface Props {
  category: ValueOf<typeof ContentsCategory>;
  slug: string;
}

const ContentsDetail = async ({ category, slug }: Props) => {
  const MDXComponents = useMDXComponents();
  const contentDetail = await fetcher<PostListItemInterface>({
    path: `contents/${category}/${slug}`,
  });

  if (!contentDetail) {
    return <CommonError />;
  }
  return (
    <div>
      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [prism, parseCodeSnippet],
          },
        }}
        source={contentDetail.body}
        components={MDXComponents}
      />
    </div>
  );
};

export default ContentsDetail;
