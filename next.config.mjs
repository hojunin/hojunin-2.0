import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import prism from 'rehype-prism-plus';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const nextConfig = {
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
			},
			{
				protocol: 'https',
				hostname: 'lnwblzacktgzeiihvxtu.supabase.co',
			},
			{
				protocol: 'http',
				hostname: 't1.daumcdn.net',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
		rehypePlugins: [prism],
	},
});

export default withMDX(nextConfig);
