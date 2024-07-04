import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: 'https://hojunin-2-0.vercel.app/sitemap.xml',
	};
}
