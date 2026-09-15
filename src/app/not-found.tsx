import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  return (
    <section className="not-found site-container">
      <h1>Page not found</h1>
      <p>The link may be old or the page may have moved.</p>
      <div className="not-found-links">
        <Link href="/projects">Browse selected work</Link>
        <a href={siteConfig.links.email}>Contact Subhajit</a>
      </div>
    </section>
  );
}
