import { siteConfig } from '@/data/site';
import { externalLinkProps } from '@/lib/urls';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <p>
          <span>{siteConfig.location}</span>
          <span>{siteConfig.availability}</span>
        </p>
        <p className="footer-links">
          <a href={siteConfig.links.email}>Email</a>
          <a href={siteConfig.resumePath}>Resume</a>
          <a href={siteConfig.links.github} {...externalLinkProps}>
            GitHub
          </a>
          <a href={siteConfig.links.linkedin} {...externalLinkProps}>
            LinkedIn
          </a>
        </p>
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}
