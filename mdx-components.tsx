import type { MDXComponents } from 'mdx/types';

const externalLink = (href: string | undefined) => href?.startsWith('http') ?? false;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2>{children}</h2>,
    p: ({ children }) => <p>{children}</p>,
    ul: ({ children }) => <ul>{children}</ul>,
    li: ({ children }) => <li>{children}</li>,
    a: ({ children, href }) =>
      externalLink(href) ? (
        <a href={href} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      ),
    ...components,
  };
}
