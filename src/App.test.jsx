import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App routing', () => {
  it('renders the homepage route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /AI Full-Stack Engineer/i }),
    ).toBeInTheDocument();
  });

  it('renders a project route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/tarka-sabha']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Tarka Sabha/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Open Tarka Sabha GitHub repository/i }),
    ).toHaveAttribute('href', 'https://github.com/subhajitlucky/tarkaSabha');
  });

  it('renders the not-found route with a page heading', () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Page not found/i }),
    ).toBeInTheDocument();
  });
});
