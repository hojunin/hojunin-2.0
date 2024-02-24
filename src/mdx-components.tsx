import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function MDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
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
    code: ({ children }) => {
      if (typeof children === 'string') {
        return (
          <code className="inline p-2 m-2 overflow-visible wor">
            {children}
          </code>
        );
      }
      return null;
    },
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
  };
}
