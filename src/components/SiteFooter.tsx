import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p>{siteConfig.name}</p>
        <span>{siteConfig.role}</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/blog">Blog</Link>
        <Link href="/projects">Projects</Link>
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
