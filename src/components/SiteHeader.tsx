import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-header__brand" href="/" aria-label="Subhajit Pradhan home">
        <span aria-hidden="true">SP</span>
        <strong>{siteConfig.name}</strong>
      </Link>

      <nav className="site-header__nav" aria-label="Primary navigation">
        {siteConfig.nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-header__actions" aria-label="Contact links">
        <Link href={siteConfig.resumePath}>Resume</Link>
        <a href={siteConfig.links.email}>Email</a>
      </div>
    </header>
  );
}
