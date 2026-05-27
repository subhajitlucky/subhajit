import type { ReactNode } from 'react';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a className="text-link" href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}
