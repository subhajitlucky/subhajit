import { BriefcaseBusiness, Code2, Download, Mail } from 'lucide-react';
import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import { siteConfig } from '@/data/site';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-header__brand" href="/" aria-label="Subhajit Pradhan home">
        <span>SP</span>
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
        <ButtonLink href={siteConfig.resumePath} icon={<Download size={16} />} variant="ghost">
          Resume
        </ButtonLink>
        <ButtonLink href={siteConfig.links.email} icon={<Mail size={16} />} variant="primary">
          Email
        </ButtonLink>
        <a href={siteConfig.links.github} aria-label="GitHub profile" rel="noreferrer" target="_blank">
          <Code2 size={18} />
        </a>
        <a
          href={siteConfig.links.linkedin}
          aria-label="LinkedIn profile"
          rel="noreferrer"
          target="_blank"
        >
          <BriefcaseBusiness size={18} />
        </a>
      </div>
    </header>
  );
}
