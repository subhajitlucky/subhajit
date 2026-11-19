import { render, screen, within } from '@testing-library/react';
import { posts } from '@/data/posts';
import { projects } from '@/data/projects';
import { experience, siteConfig } from '@/data/site';
import HomePage from './page';

describe('HomePage', () => {
  it('opens with evidence-first positioning and hiring links', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: siteConfig.role })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.summary)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.availability)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteConfig.resumePath,
    );
    expect(screen.getByRole('link', { name: 'GitHub' }).closest('div')).toHaveAttribute(
      'aria-label',
      'Contact and profile links',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      siteConfig.links.linkedin,
    );
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      siteConfig.links.email,
    );
  });

  it('renders the four flagship projects in order', () => {
    render(<HomePage />);

    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(projects.length);

    expect(cards.map((card) => within(card).getByRole('heading').textContent)).toEqual(
      projects.map((project) => project.title),
    );
  });

  it('renders useful source and product actions for each project', () => {
    render(<HomePage />);

    const cards = screen.getAllByTestId('project-card');
    const allowedKinds = new Set(['source', 'package', 'live']);

    for (const [index, project] of projects.entries()) {
      const rowLinks = within(cards[index]).getAllByRole('link');
      const detailsLink = rowLinks.find(
        (link) =>
          link.getAttribute('href') === `/projects/${project.slug}` &&
          link.textContent?.trim() === 'Details',
      );

      expect(detailsLink?.textContent?.trim()).toBe('Details');

      for (const projectLink of project.links) {
        const hasLink = rowLinks.some((link) => link.getAttribute('href') === projectLink.href);

        if (allowedKinds.has(projectLink.kind)) {
          expect(hasLink).toBe(true);
        } else {
          expect(hasLink).toBe(false);
        }
      }
    }
  });

  it('keeps the two current roles and drops the trainee entry', () => {
    render(<HomePage />);

    for (const organization of [
      'Giakaa (Kailanchal Technologies Pvt Ltd)',
      'uElement Technologies',
    ]) {
      expect(screen.getByText(organization)).toBeInTheDocument();
    }

    expect(screen.queryByText('QuadB Technologies')).not.toBeInTheDocument();

    const giakaaEntry = screen.getByTestId(
      'experience-giakaa-kailanchal-technologies-pvt-ltd',
    );
    expect(giakaaEntry).toHaveTextContent('Giakaa (Kailanchal Technologies Pvt Ltd)');
    expect(giakaaEntry).toHaveTextContent('Full Stack Software Developer');
    expect(giakaaEntry).toHaveTextContent('May 2026-Present');
    expect(giakaaEntry).toHaveTextContent('Remote');
    expect(within(giakaaEntry).getByRole('paragraph')).toHaveTextContent('Owned backend delivery');
    expect(giakaaEntry.textContent?.toLowerCase()).not.toContain('hema');

    expect(screen.getByTestId('experience-uelement-technologies')).toHaveTextContent(
      'Associate Blockchain Developer',
    );
  });

  it('renders the section headings in reading order', () => {
    render(<HomePage />);

    const work = screen.getByRole('heading', { name: 'Selected work' });
    const experienceHeading = screen.getByRole('heading', { name: 'Experience' });
    const writing = screen.getByRole('heading', { name: 'Writing' });
    const contact = screen.getByRole('heading', { name: 'Get in touch' });

    expect(
      work.compareDocumentPosition(experienceHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      experienceHeading.compareDocumentPosition(writing) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(writing.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('links three curated posts on the home page', () => {
    render(<HomePage />);

    for (const slug of [
      'five-postgres-rls-mistakes',
      'what-breaks-if-i-change-this-file',
      'kalia-build-log',
    ]) {
      const post = posts.find((item) => item.slug === slug);
      expect(post).toBeDefined();
      if (!post) {
        throw new Error(`Expected ${slug} to be present in canonical post data`);
      }
      expect(screen.getByRole('link', { name: post.title })).toHaveAttribute(
        'href',
        `/writing/${post.slug}`,
      );
    }
  });

  it('keeps the contact section free of duplicated worldwide positioning', () => {
    render(<HomePage />);

    expect(screen.queryByText(/worldwide/i)).not.toBeInTheDocument();
  });

  it('renders one summary line for past roles only', () => {
    render(<HomePage />);

    for (const item of experience.slice(1)) {
      if (item.summary) {
        expect(screen.getByText(item.summary)).toBeInTheDocument();
      }
    }
  });
});
