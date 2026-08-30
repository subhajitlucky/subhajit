import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { externalLinkProps, isExternalUrl } from '@/lib/urls';

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="site-container header-inner">
        <Link
          className="wordmark"
          href="/"
          aria-label={`${siteConfig.shortName}, ${siteConfig.name}, home`}
        >
          {siteConfig.shortName}
        </Link>
        <nav aria-label="Direct links">
          <ul className="direct-links">
            {siteConfig.nav.map((item) => {
              const content = item.label;

              return (
                <li key={item.label}>
                  {isExternalUrl(item.href) ? (
                    <a href={item.href} {...externalLinkProps}>
                      {content}
                    </a>
                  ) : item.href.startsWith('/') ? (
                    <Link href={item.href}>{content}</Link>
                  ) : (
                    <a href={item.href}>{content}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
