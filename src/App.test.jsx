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

    expect(screen.getByRole('heading', { name: /AI Full-Stack Engineer/i })).toBeInTheDocument();
  });

  it('renders a project route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/tarka-sabha']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Tarka Sabha/i })).toBeInTheDocument();
  });
});
