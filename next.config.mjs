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
			{
				protocol: 'https',
				hostname: 'www.hojunin.com',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	redirects: async () => {
		return oldSlugs.map(slug => ({
			source: `/${slug}`,
			destination: `contents/${slug}`,
			permanent: true,
		}));
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
		rehypePlugins: [prism],
	},
});

export default withMDX(nextConfig);

const oldSlugs = [
	'react-query',
	'technical-conqueror',
	'functional-programming',
	'app-version',
	'workflow',
	'git',
	'graphql-architecture',
	'sentry',
	'use-imperactive-handle-modal',
	'good-at-work-developer',
	'developer-resume',
	'event-tracking-module',
	'webview-connection',
	'thumbhash',
	'error-experience',
	'docusaurus-blog',
	'library',
	'axios-error',
	'seo-raise-click',
	'breadcrumb',
	'great-developer',
];
