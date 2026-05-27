import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProjectCaseStudy from './ProjectCaseStudy';

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProjectCaseStudy', () => {
  it('renders a known project case study', () => {
    renderRoute('/projects/tarka-sabha');

    expect(screen.getByRole('heading', { name: /Tarka Sabha/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Problem/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Architecture/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tradeoffs/i })).toBeInTheDocument();
  });

  it('suppresses the demo link when it duplicates the GitHub URL', () => {
    renderRoute('/projects/tarka-sabha');

    expect(
      screen.getByRole('link', { name: /Open Tarka Sabha GitHub repository/i }),
    ).toHaveAttribute('href', 'https://github.com/subhajitlucky/tarka-sabha');
    expect(screen.queryByRole('link', { name: /Demo/i })).not.toBeInTheDocument();
  });

  it('renders a demo link when a project has a distinct demo URL', () => {
    renderRoute('/projects/campushelper');

    expect(screen.getByRole('heading', { name: /CampusHelper/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open CampusHelper live demo/i })).toHaveAttribute(
      'href',
      'https://campushelper.vercel.app',
    );
  });

  it('renders a useful not-found state for an unknown slug', () => {
    renderRoute('/projects/not-real');

    expect(screen.getByRole('heading', { name: /Project not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to home/i })).toBeInTheDocument();
  });
});
