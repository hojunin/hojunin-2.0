import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Typography from './components/common/typography';
import Callout from '@/components/common/callout';
import HeadingWithAnchor from '@/components/common/heading-with-anchor';

const IMAGE_WHITE_LIST = ['lnwblzacktgzeiihvxtu.supabase.co', 'i.imgur.com'];

function NextImage(props: HTMLProps<HTMLImageElement>) {
	const { src } = props;
	const width = isNaN(Number(props.width)) ? 1000 : Number(props.width);
	const height = isNaN(Number(props.height)) ? 600 : Number(props.height);

	if (!src) {
		return <p> 이미지에 문제가 있어요 - {src}</p>;
	}

	// TODO : vercel 비싸서 일반이미지 - 현재는 일반 img 태그 사용
	// eslint-disable-next-line @next/next/no-img-element
	return <img src={src} alt={src} width={width} height={height} className="rounded-lg" />;

	// NOTE: 아래 코드는 현재 사용하지 않음 (위에서 조기 반환)
	// if (IMAGE_WHITE_LIST.some(host => src.includes(host))) {
	// 	return (
	// 		<Image
	// 			width={width}
	// 			height={height}
	// 			alt={props.alt || ''}
	// 			crossOrigin="anonymous"
	// 			src={src}
	// 			placeholder="empty"
	// 			className="rounded-lg"
	// 		/>
	// 	);
	// }

	// if (src.startsWith('http')) {
	// 	// eslint-disable-next-line @next/next/no-img-element
	// 	return <img src={src} alt={src} width={width} height={height} className="rounded-lg" />;
	// }
	// return (
	// 	<Image
	// 		width={width}
	// 		height={height}
	// 		alt={props.alt || ''}
	// 		crossOrigin="anonymous"
	// 		src={src}
	// 		placeholder="empty"
	// 		className="rounded-lg"
	// 	/>
	// );
}

interface RoundedImageProps {
	alt?: string;
	src: string;
	width?: number;
	height?: number;
	[key: string]: any;
}

function RoundedImage(props: RoundedImageProps) {
	return <Image alt={props.alt || ''} className="my-6 rounded-lg" {...props} />;
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<HeadingWithAnchor variant="h1" className="my-9 whitespace-normal break-words">
				{children}
			</HeadingWithAnchor>
		),
		h2: ({ children }) => (
			<HeadingWithAnchor variant="h2" className="mb-5 mt-10 break-before-page whitespace-normal">
				{children}
			</HeadingWithAnchor>
		),
		h3: ({ children }) => (
			<HeadingWithAnchor variant="h3" className="mb-5 mt-8 whitespace-normal break-words">
				{children}
			</HeadingWithAnchor>
		),
		h4: ({ children }) => (
			<HeadingWithAnchor variant="h4" className="my-5">
				{children}
			</HeadingWithAnchor>
		),
		p: ({ children }) => (
			<Typography variant="p" className="my-5 text-base font-normal leading-relaxed">
				{children}
			</Typography>
		),
		img: NextImage,
		blockquote: ({ children }) => (
			<blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
		),
		ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
		ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
		li: ({ children }) => <li>{children}</li>,
		pre: ({ children }) => (
			<pre className="rounded-md bg-gray-300 p-4 dark:bg-gray-800">{children}</pre>
		),
		a: props => {
			const { href, children, ...rest } = props;
			if (!href) {
				return <span>{children}</span>;
			}
			if (href.startsWith('/')) {
				return (
					<Link href={href} {...rest} className="text-primary underline">
						{children}
					</Link>
				);
			}

			if (href.startsWith('#')) {
				return (
					<a href={href} {...rest} className="text-primary underline">
						{children}
					</a>
				);
			}

			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary underline"
					{...rest}
				>
					{children}
				</a>
			);
		},
		Image: RoundedImage,
		Callout: Callout,
		...components,
	};
}
