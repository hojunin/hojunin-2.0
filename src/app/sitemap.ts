import { getBlogPosts } from '@/lib/mdx';
import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const NOT_ALLOW_FILES = [
	'layout',
	'page',
	'loading',
	'error',
	'not-found',
	'opengraph-image',
	'sitemap',
	'robots',
];

const ALLOWED_EXP = ['.js', '.jsx', '.ts', '.tsx'];

const generateSitemapWithFs = () => {
	const baseUrl = process.env.HOST ?? '';
	const appDirectory = path.join(process.cwd(), 'src', 'app');

	const generateSitemapEntries = (dir: string, baseRoute: string = ''): MetadataRoute.Sitemap => {
		const entries: MetadataRoute.Sitemap = [];
		const files = fs.readdirSync(dir);

		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				if (
					file === 'contents' ||
					file === 'api' ||
					file === 'admin' ||
					file === 'login' ||
					file === 'rss.xml'
				)
					continue;

				// Recursively process other subdirectories
				const subRoute = path.join(baseRoute, file);
				entries.push(...generateSitemapEntries(filePath, subRoute));
			} else {
				// Process files (excluding special Next.js files)
				const ext = path.extname(file);
				const name = path.basename(file, ext);
				if (
					!name.startsWith('_') &&
					!name.startsWith('[') &&
					!NOT_ALLOW_FILES.includes(name) &&
					ALLOWED_EXP.includes(ext)
				) {
					const route = path.join(baseRoute, name === 'index' ? '' : name);
					entries.push({
						url: `${baseUrl}${route}`,
					});
				}
			}
		}

		return entries;
	};

	return generateSitemapEntries(appDirectory);
};

const generateContentsMap = (): MetadataRoute.Sitemap => {
	const posts = getBlogPosts();
	return posts.map(post => {
		const { metadata } = post;
		return {
			url: `${process.env.HOST ?? ''}/contents/${metadata.slug}`,
		};
	});
};

export default function sitemap(): MetadataRoute.Sitemap {
	const contentsMap = generateContentsMap();
	const commonMap = generateSitemapWithFs();
	return [...contentsMap, ...commonMap];
}
