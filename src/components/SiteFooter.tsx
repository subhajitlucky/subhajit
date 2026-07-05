import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p>{siteConfig.name}</p>
        <span>{siteConfig.location}</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Writing</Link>
        <a href={siteConfig.links.email}>
          Contact
        </a>
        <a href={siteConfig.links.github} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <a href={siteConfig.links.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}
