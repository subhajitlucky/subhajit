import { render, screen } from '@testing-library/react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/data/site';

describe('site shell', () => {
  it('provides skip navigation and the primary hiring routes', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );

    const navigation = screen.getByRole('navigation', { name: /primary navigation/i });
    expect(navigation).toBeInTheDocument();

    for (const label of ['Work', 'Experience', 'Resume', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('renders direct contact and safe external profile links', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: siteConfig.email })).toHaveAttribute(
      'href',
      siteConfig.links.email,
    );

    for (const label of ['GitHub', 'LinkedIn']) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });
});
