import { ArrowLink } from '@/components/ArrowLink';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  return (
    <section className="not-found site-frame">
      <p>404</p>
      <h1>Page not found</h1>
      <p>The link may be old or the page may have moved.</p>
      <div>
        <ArrowLink href="/projects">Browse selected work</ArrowLink>
        <ArrowLink href={siteConfig.links.email}>Contact Subhajit</ArrowLink>
      </div>
    </section>
  );
}
