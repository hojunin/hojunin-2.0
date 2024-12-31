import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import prism from 'rehype-prism-plus';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { headers } from 'next/headers';

const nextConfig = {
	experimental: {
		optimizeCss: true,
	},
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
		return [
			...oldSlugs.map(slug => ({
				source: `/${slug}`,
				destination: `contents/${slug}`,
				permanent: true,
			})),
			{
				source: '/:path*.php',
				destination: '/',
				permanent: true,
			},
			{
				source: '/:path*.php7',
				destination: '/',
				permanent: true,
			},
		];
	},
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
			{
				source: '/sw.js',
				headers: [
					{
						key: 'Content-Type',
						value: 'application/javascript; charset=utf-8',
					},
					{
						key: 'Cache-Control',
						value: 'no-cache, no-store, must-revalidate',
					},
					{
						key: 'Content-Security-Policy',
						value: "default-src 'self'; script-src 'self'",
					},
				],
			},
		];
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
