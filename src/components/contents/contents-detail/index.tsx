import React from 'react';
import { useMDXComponents } from '@/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import prism from 'rehype-prism-plus';
import { parseCodeSnippet } from '@/lib/mdx';

interface Props {
  content: string;
}

const ContentsDetail = async ({ content }: Props) => {
  const MDXComponents = useMDXComponents();

  return (
    <div>
      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [prism, parseCodeSnippet],
          },
        }}
        source={content}
        components={MDXComponents}
      />
    </div>
  );
};

export default ContentsDetail;
