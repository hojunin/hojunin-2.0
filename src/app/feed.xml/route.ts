import { getBlogPosts } from '@/lib/mdx';
import RSS from 'rss';

export async function GET() {
	const feed = new RSS({
		title: 'HJ의 블로그',
		description: '인호준의 글 모음집',
		generator: 'RSS for Node and Next.js',
		feed_url: 'https://www.datadeveloper.kr/feed.xml',
		site_url: 'https://www.datadeveloper.kr',
		copyright: `Copyright ${new Date().getFullYear().toString()} All Reserved`,
		language: 'ko-KR',
		pubDate: new Date().toUTCString(),
		ttl: 60,
	});

	const allPosts = await getBlogPosts();

	if (allPosts) {
		allPosts.map(post => {
			const { metadata, slug } = post;

			feed.item({
				title: metadata?.title,
				description: metadata?.description,
				url: slug,
				date: metadata?.date,
			});
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
