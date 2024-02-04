import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    li: ({ children }) => <li className="bg-indigo-500">{children}</li>,
    ...components,
  };
}
