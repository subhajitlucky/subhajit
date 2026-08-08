import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('introduces Subhajit as a developer tools and AI systems engineer', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /developer tools and ai systems/i,
      }),
    ).toBeInTheDocument();
  });
});
