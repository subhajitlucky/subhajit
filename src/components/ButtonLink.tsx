import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  download?: boolean;
};

export default function ButtonLink({
  href,
  children,
  icon,
  variant = 'secondary',
  external = false,
  download = false,
}: ButtonLinkProps) {
  const className = `button-link button-link--${variant}`;
  const content = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (external || href.startsWith('mailto:')) {
    return (
      <a
        className={className}
        href={href}
        rel={external ? 'noreferrer' : undefined}
        target={external ? '_blank' : undefined}
        download={download}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}
