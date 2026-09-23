import { render, screen } from '@testing-library/react';

import KaliaPage, { metadata } from './page';

vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ variable: 'kalia-display' }),
  JetBrains_Mono: () => ({ variable: 'kalia-mono' }),
}));

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

describe('KaliaPage', () => {
  beforeAll(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal(
      'matchMedia',
      (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    );
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('presents the release with its headline numbers and tagline', () => {
    render(<KaliaPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'KALIA' })).toBeInTheDocument();
    expect(screen.getByText(/Now begins the discipline of words/)).toBeInTheDocument();
    expect(screen.getByText('57.9M')).toBeInTheDocument();
    expect(screen.getByText('2.4366')).toBeInTheDocument();
    expect(screen.getAllByText('$0').length).toBeGreaterThan(0);
  });

  it('renders the replay console with real log data', () => {
    render(<KaliaPage />);

    expect(screen.getByRole('button', { name: /play|pause|replay/i })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /scrub/i })).toBeInTheDocument();
    expect(screen.getByText(/session 3 replay, steps 1,740/)).toBeInTheDocument();
  });

  it('offers a light/dark theme toggle', () => {
    render(<KaliaPage />);

    expect(screen.getByRole('button', { name: /switch to (light|dark) mode/i })).toBeInTheDocument();
  });

  it('includes the timeline, decisions, incidents, and verification links', () => {
    render(<KaliaPage />);

    expect(screen.getByText(/So this is how it started/)).toBeInTheDocument();
    expect(screen.getByText('Every decision')).toBeInTheDocument();
    expect(screen.getByText('Every incident')).toBeInTheDocument();
    expect(screen.getAllByText('D41').length).toBeGreaterThan(0);
    expect(screen.getAllByText('I12').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /download the weights/i })).toHaveAttribute(
      'href',
      'https://huggingface.co/kalia-lm/kalia-v012',
    );
    expect(screen.getByRole('link', { name: /train_log.csv/i })).toHaveAttribute(
      'href',
      '/kalia/logs/train_log.csv',
    );
  });

  it('publishes route-local metadata for the dedicated page', () => {
    expect(metadata.alternates?.canonical).toBe('/kalia');
    expect(metadata.title).toContain('58M language model');
  });
});
