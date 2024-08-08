import { fetchMetaData } from '@/api/contents';
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '컨텐츠 | HJINN';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
	const content = await fetchMetaData(params.slug);
	if (!content) {
		return new Response('Not found', { status: 404 });
	}
	const { title, description } = content;
	const nanumHand = fetch(
		'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/sign/asset/nanum.ttf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldC9uYW51bS50dGYiLCJpYXQiOjE3MjMxMzI4NTQsImV4cCI6MjAzODQ5Mjg1NH0.u_vxn3BzZFe0M8ZS9VM5S7Vw4m7YZ9L8BWCIPsDqe4M&t=2024-08-08T16%3A00%3A55.228Z',
	).then(res => res.arrayBuffer());

	return new ImageResponse(
		(
			<div
				style={{
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					border: '1px solid #f2f2f2',
					borderRadius: '8px',
				}}
			>
				<h1 style={{ fontSize: 128, fontWeight: 'bold' }}>{title}</h1>
				<br />
				<p style={{ fontSize: 64 }}>{description?.slice(0, 40)}</p>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Nanum Hand',
					data: await nanumHand,
					style: 'normal',
					weight: 400,
				},
			],
		},
	);
}
