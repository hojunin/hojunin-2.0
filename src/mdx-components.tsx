import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Typography from './components/common/typography';

function NextImage(props: HTMLProps<HTMLImageElement>) {
  const { src } = props;
  const width = Number(props.width);
  const height = Number(props.height);

  if (src) {
    if (src.startsWith('http')) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={src} width={width} height={height} />;
    } else {
      return (
        <Image
          width={width}
          height={height}
          alt={props.alt || ''}
          crossOrigin="anonymous"
          src={src}
          placeholder="empty"
        />
      );
    }
  } else {
    return <p>Currently, image is not available. {src}</p>;
  }
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
    h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
    h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
    h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
    p: ({ children }) => <Typography variant="p">{children}</Typography>,
    img: NextImage,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
      // return <Callout />;
    ),
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    li: ({ children }) => <li>{children}</li>,
    pre: ({ children }) => (
      <pre className="rounded-md p-4 bg-gray-300 dark:bg-gray-800">
        {children}
      </pre>
    ),
    a: ({ children, href }) => {
      if (!href) {
        return null;
      }

      <Link
        href={href}
        className="text-primary underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>;
    },
    ...components,
  };
}
