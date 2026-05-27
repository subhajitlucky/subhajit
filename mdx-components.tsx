import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2>{children}</h2>,
    p: ({ children }) => <p>{children}</p>,
    ul: ({ children }) => <ul>{children}</ul>,
    li: ({ children }) => <li>{children}</li>,
    a: ({ children, href }) => (
      <a href={href} rel={href?.startsWith('http') ? 'noreferrer' : undefined} target={href?.startsWith('http') ? '_blank' : undefined}>
        {children}
      </a>
    ),
    ...components,
  };
}
