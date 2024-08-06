import { getBlogPosts } from '@/lib/mdx';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getBlogPosts();
	return posts.map(post => {
		const { metadata } = post;
		return {
			url: `${process.env.HOST ?? ''}/contents/${metadata.slug}`,
			changeFrequency: 'weekly',
			priority: 0.5,
		};
	});
}
