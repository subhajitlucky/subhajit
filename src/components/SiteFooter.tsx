import { ArrowLink } from '@/components/ArrowLink';
import { siteConfig } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-frame footer-inner">
        <p className="footer-kicker">Have a complicated system?</p>
        <h2>Let&apos;s build the tool that clarifies it.</h2>
        <a className="footer-email" href={siteConfig.links.email}>
          {siteConfig.email}
        </a>
        <div className="footer-meta">
          <p>
            {siteConfig.location}
            <br />
            {siteConfig.availability}
          </p>
          <div className="footer-links" aria-label="Profile links">
            <ArrowLink href={siteConfig.links.github}>GitHub</ArrowLink>
            <ArrowLink href={siteConfig.links.linkedin}>LinkedIn</ArrowLink>
            <ArrowLink href={siteConfig.resumePath}>Resume</ArrowLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
