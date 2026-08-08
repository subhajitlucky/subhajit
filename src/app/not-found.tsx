import { ArrowLink } from '@/components/ArrowLink';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  return (
    <section className="not-found site-frame">
      <p>404 / Unknown route</p>
      <h1>This page is outside the system.</h1>
      <p>The link may be old, or the project may have moved. The selected work is still here.</p>
      <div>
        <ArrowLink href="/projects">Browse selected work</ArrowLink>
        <ArrowLink href={siteConfig.links.email}>Contact Subhajit</ArrowLink>
      </div>
    </section>
  );
}
