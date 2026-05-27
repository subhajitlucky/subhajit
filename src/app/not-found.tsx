import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero page-hero--compact">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The route you opened is not part of the current portfolio.</p>
      <Link className="section-link" href="/">
        Return home
      </Link>
    </section>
  );
}
