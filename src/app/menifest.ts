import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'HJINN',
		short_name: 'hjinn',
		description: 'HJINN 개인 웹사이트',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/apple-icon.png',
				sizes: '192x192',
				type: 'image/png',
			},
		],
	};
}
