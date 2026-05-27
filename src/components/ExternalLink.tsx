import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a className="text-link" href={href} rel="noreferrer" target="_blank">
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
