import { ArrowLink } from '@/components/ArrowLink';
import type { ProjectLink } from '@/data/projects';

type EvidenceLinksProps = {
  links: ProjectLink[];
};

export function EvidenceLinks({ links }: EvidenceLinksProps) {
  return (
    <ul className="evidence-links" aria-label="Project evidence">
      {links.map((link) => (
        <li key={link.href}>
          <span>{link.kind}</span>
          <ArrowLink href={link.href}>{link.label}</ArrowLink>
        </li>
      ))}
    </ul>
  );
}
