import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="site-frame header-inner">
        <Link className="wordmark" href="/" aria-label={`${siteConfig.name}, home`}>
          <span className="wordmark-mark" aria-hidden="true">
            {siteConfig.shortName}
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <p className="availability">
          <span aria-hidden="true" />
          {siteConfig.availability}
        </p>
        <nav aria-label="Primary navigation">
          <ul className="primary-nav">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
