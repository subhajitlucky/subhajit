import { render, screen } from '@testing-library/react';
import { TagList } from '@/components/TagList';

describe('TagList', () => {
  it('renders each tag as a list item', () => {
    render(<TagList tags={['TypeScript', 'Node.js', 'Vitest']} />);
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'TypeScript',
      'Node.js',
      'Vitest',
    ]);
  });

  it('renders nothing for an empty list', () => {
    const { container } = render(<TagList tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
