import { siteConfig } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <p>
          <span>{siteConfig.location}</span>
          <span>{siteConfig.availability}</span>
        </p>
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}
