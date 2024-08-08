import { getBlogPosts } from '@/lib/mdx';
import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

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
				// Skip the contents/[slug] directory and api folder
				if (file === 'contents' || file === 'api') continue;

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
					!['layout', 'page', 'loading', 'error', 'not-found'].includes(name) &&
					['.js', '.jsx', '.ts', '.tsx'].includes(ext)
				) {
					const route = path.join(baseRoute, name === 'index' ? '' : name);
					entries.push({
						url: `${baseUrl}${route}`,
						lastModified: new Date(),
						changeFrequency: 'weekly',
						priority: 0.7,
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
			changeFrequency: 'weekly',
			priority: 0.5,
		};
	});
};

export default function sitemap(): MetadataRoute.Sitemap {
	const contentsMap = generateContentsMap();
	const commonMap = generateSitemapWithFs();
	return [...contentsMap, ...commonMap];
}
