import { render, screen } from '@testing-library/react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/data/site';

describe('site shell', () => {
  it('provides skip navigation and direct hiring links', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );

    const navigation = screen.getByRole('navigation', { name: /direct links/i });
    expect(navigation).toBeInTheDocument();

    for (const label of ['Email', 'Resume', 'GitHub', 'LinkedIn']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }

    for (const label of ['GitHub', 'LinkedIn']) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });

  it('keeps the footer compact and informational', () => {
    render(<SiteFooter />);

    expect(screen.getByText(siteConfig.location)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.availability)).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
