import { ArrowLink } from '@/components/ArrowLink';
import { siteConfig } from '@/data/site';

export function ContactPanel() {
  return (
    <section className="contact-panel" aria-labelledby="contact-panel-title">
      <div className="site-frame contact-panel-inner">
        <p className="contact-index">04 / Contact</p>
        <div>
          <h2 id="contact-panel-title">Work with Subhajit</h2>
          <p>
            I&apos;m open to remote developer-tools, AI-systems, and product-engineering roles with
            teams that care about clear boundaries and software people can trust.
          </p>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href={siteConfig.links.email}>
            {siteConfig.email}
          </a>
          <ArrowLink href={siteConfig.links.linkedin}>Connect on LinkedIn</ArrowLink>
        </div>
      </div>
    </section>
  );
}
