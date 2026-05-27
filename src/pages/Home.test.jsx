import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('shows positioning, proof, selected work, stack, and experience', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /AI Full-Stack Engineer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Proof Snapshot/i })).toBeInTheDocument();
    expect(screen.getByText(/AI orchestration across providers/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Selected Work/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read Tarka Sabha case study/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Engineering Range/i })).toBeInTheDocument();
    expect(screen.getByText(/uElement/i)).toBeInTheDocument();
    expect(document.title).toBe('Subhajit Pradhan - AI Full-Stack Engineer');
  });
});
