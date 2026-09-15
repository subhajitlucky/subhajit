import { render, screen, within } from '@testing-library/react';
import { featuredProjects } from '@/data/projects';
import { education, experience, siteConfig, skillGroups } from '@/data/site';
import HomePage from './page';

describe('HomePage', () => {
  it('opens with plain full-stack positioning and hiring links', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: siteConfig.role })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.summary)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.availability)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteConfig.resumePath,
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      siteConfig.links.github,
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

  it('renders exactly four featured project cards in the approved order', () => {
    render(<HomePage />);

    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(4);

    expect(cards.map((card) => within(card).getByRole('heading').textContent)).toEqual(
      featuredProjects.map((project) => project.title),
    );
  });

  it('renders useful source and product actions for each featured project', () => {
    render(<HomePage />);

    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(featuredProjects.length);
    const allowedKinds = new Set(['source', 'package', 'live']);

    for (const [index, project] of featuredProjects.entries()) {
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

  it('keeps all experience in sight and current employment minimal', () => {
    render(<HomePage />);

    for (const organization of ['Giakaa Capital', 'uElement Technologies', 'QuadB Technologies']) {
      expect(screen.getByText(organization)).toBeInTheDocument();
    }

    const giakaaEntry = screen.getByTestId('experience-giakaa-capital');
    expect(giakaaEntry).toHaveTextContent('Giakaa Capital');
    expect(giakaaEntry).toHaveTextContent('Full Stack Software Developer');
    expect(giakaaEntry).toHaveTextContent('May 2026-Present');
    expect(giakaaEntry).toHaveTextContent('Remote');
    expect(within(giakaaEntry).queryByRole('paragraph')).not.toBeInTheDocument();

    expect(screen.getByTestId('experience-uelement-technologies')).toHaveTextContent(
      'Software Developer Intern',
    );
    expect(screen.getByTestId('experience-quadb-technologies')).toHaveTextContent(
      'Software Engineering Trainee',
    );
  });

  it('renders the plain section headings in reading order', () => {
    render(<HomePage />);

    const projects = screen.getByRole('heading', { name: 'Projects' });
    const experienceHeading = screen.getByRole('heading', { name: 'Experience' });
    const skills = screen.getByRole('heading', { name: 'Skills' });
    const contact = screen.getByRole('heading', { name: 'Get in touch' });

    expect(
      projects.compareDocumentPosition(experienceHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      experienceHeading.compareDocumentPosition(skills) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(skills.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders every skill group and the education block', () => {
    render(<HomePage />);

    for (const group of skillGroups) {
      expect(screen.getByRole('heading', { name: group.label })).toBeInTheDocument();
      expect(screen.getByText(group.items.join(', '))).toBeInTheDocument();
    }

    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText(education.degree)).toBeInTheDocument();
    expect(screen.getByText(education.organization)).toBeInTheDocument();
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
