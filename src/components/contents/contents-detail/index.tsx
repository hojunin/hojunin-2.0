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
		<div className="max-w-full overflow-x-auto whitespace-normal sm:overflow-x-visible">
			<div className="w-full">
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
		</div>
	);
};

export default ContentsDetail;
