import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin', '/login', '/rss.xml', '/not-found'],
		},
		sitemap: 'https://hojunin.com/sitemap.xml',
	};
}
