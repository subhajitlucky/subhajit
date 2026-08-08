import Link from 'next/link';
import type { ReactNode } from 'react';
import { externalLinkProps, isExternalUrl } from '@/lib/urls';

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function ArrowLink({ href, children, className = '', external }: ArrowLinkProps) {
  const opensNewTab = external ?? isExternalUrl(href);
  const linkClassName = ['arrow-link', className].filter(Boolean).join(' ');

  if (opensNewTab) {
    return (
      <a className={linkClassName} href={href} {...externalLinkProps}>
        <span>{children}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link className={linkClassName} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
