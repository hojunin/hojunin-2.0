import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Typography from './components/common/typography';
import Callout from '@/components/common/callout';

const IMAGE_WHITE_LIST = ['lnwblzacktgzeiihvxtu.supabase.co', 'i.imgur.com'];

function NextImage(props: HTMLProps<HTMLImageElement>) {
	const { src } = props;
	const width = isNaN(Number(props.width)) ? 1000 : Number(props.width);
	const height = isNaN(Number(props.height)) ? 600 : Number(props.height);

	if (!src) {
		return <p> 이미지에 문제가 있어요 - {src}</p>;
	}

	if (IMAGE_WHITE_LIST.some(host => src.includes(host))) {
		return (
			<Image
				width={width}
				height={height}
				alt={props.alt || ''}
				crossOrigin="anonymous"
				src={src}
				placeholder="empty"
				className="rounded-lg"
			/>
		);
	}

	if (src.startsWith('http')) {
		// eslint-disable-next-line @next/next/no-img-element
		return <img src={src} alt={src} width={width} height={height} className="rounded-lg" />;
	}
	return (
		<Image
			width={width}
			height={height}
			alt={props.alt || ''}
			crossOrigin="anonymous"
			src={src}
			placeholder="empty"
			className="rounded-lg"
		/>
	);
}

function RoundedImage(props) {
	return <Image alt={props.alt} className="my-6 rounded-lg" {...props} />;
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<Typography variant="h1" className="my-9">
				{children}
			</Typography>
		),
		h2: ({ children }) => (
			<Typography variant="h2" className="mb-5 mt-10">
				{children}
			</Typography>
		),
		h3: ({ children }) => (
			<Typography variant="h3" className="mb-5 mt-8">
				{children}
			</Typography>
		),
		h4: ({ children }) => (
			<Typography variant="h4" className="my-5">
				{children}
			</Typography>
		),
		p: ({ children }) => (
			<Typography variant="p" className="my-5 text-base font-normal">
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
