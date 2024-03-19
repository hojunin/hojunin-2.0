import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Typography from './components/common/typography';
import Callout from '@/components/common/callout';

function NextImage(props: HTMLProps<HTMLImageElement>) {
  const { src } = props;
  const width = isNaN(Number(props.width)) ? 1000 : Number(props.width);
  const height = isNaN(Number(props.height)) ? 600 : Number(props.height);

  if (src) {
    if (src.startsWith('http')) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={src}
          alt={src}
          width={width}
          height={height}
          className="rounded-lg"
        />
      );
    } else {
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
  } else {
    return <p>Currently, image is not available. {src}</p>;
  }
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg my-6" {...props} />;
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <Typography variant="h1" className="my-9">
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h2" className="mt-10 mb-5">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h3" className="mt-8 mb-5">
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
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    pre: ({ children }) => (
      <pre className="rounded-md p-4 bg-gray-300 dark:bg-gray-800">
        {children}
      </pre>
    ),
    a: (props) => {
      let href = props.href;
      if (!href) {
        return <span>{props.children}</span>;
      }
      if (href.startsWith('/')) {
        return (
          <Link href={href} {...props} className="text-primary underline">
            {props.children}
          </Link>
        );
      }

      if (href.startsWith('#')) {
        return <a {...props} className="text-primary underline" />;
      }

      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
          {...props}
        />
      );
    },
    Image: RoundedImage,
    Callout: Callout,
    ...components,
  };
}
