import type { MDXComponents } from 'mdx/types';

export function MDXComponents(components: MDXComponents): MDXComponents {
  return {
    li: ({ children }) => <li className="bg-indigo-500">{children}</li>,
    ...components,
  };
}
