import Link from 'next/link';
import { projects } from '@/data/projects';

type ProjectNavigationProps = {
  slug: string;
};

export function ProjectNavigation({ slug }: ProjectNavigationProps) {
  const projectIndex = projects.findIndex((project) => project.slug === slug);
  const previous = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const next = projectIndex >= 0 && projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;

  return (
    <nav className="project-navigation" aria-label="Adjacent projects">
      {previous ? (
        <Link href={`/projects/${previous.slug}`}>
          <span>← Previous</span>
          <strong>{previous.title}</strong>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link href={`/projects/${next.slug}`}>
          <span>Next →</span>
          <strong>{next.title}</strong>
        </Link>
      ) : (
        <Link href="/projects">
          <span>Complete index →</span>
          <strong>All selected work</strong>
        </Link>
      )}
    </nav>
  );
}
