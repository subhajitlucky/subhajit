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
    expect(screen.getAllByText('2.4366').length).toBeGreaterThan(0);
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

  it('follows the paper structure: model, results, then appendices', () => {
    render(<KaliaPage />);

    expect(screen.getByRole('heading', { name: /1\. Model specification/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /2\. Evaluation — KALIA 0\.1\.2/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Appendix A\. Day-by-day log/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Appendix B\. Every decision/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Appendix C\. Every incident/ })).toBeInTheDocument();
    expect(screen.getAllByText('D41').length).toBeGreaterThan(0);
    expect(screen.getAllByText('I12').length).toBeGreaterThan(0);
  });

  it('shows the decisive comparisons as figures in the day-by-day log', () => {
    render(<KaliaPage />);

    expect(
      screen.getByAltText(/Bar chart of step-700 validation loss for AdamW/),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/control architecture \(3.4924\), looped depth/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Figure A3 — the plateau band/)).toBeInTheDocument();
  });

  it('offers verification links and a citation block', () => {
    render(<KaliaPage />);

    expect(screen.getByRole('link', { name: /download the weights/i })).toHaveAttribute(
      'href',
      'https://huggingface.co/kalia-lm/kalia-v012',
    );
    expect(screen.getByRole('link', { name: /train_log.csv/i })).toHaveAttribute(
      'href',
      '/kalia/logs/train_log.csv',
    );
    expect(screen.getByText(/cite this release/i)).toBeInTheDocument();
    expect(screen.getByText(/@misc\{kalia2026/)).toBeInTheDocument();
  });

  it('publishes route-local metadata for the dedicated page', () => {
    expect(metadata.alternates?.canonical).toBe('/kalia');
    expect(metadata.title).toContain('58M language model');
  });
});
