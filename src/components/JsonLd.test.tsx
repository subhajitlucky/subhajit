import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonLd from './JsonLd';

describe('JsonLd', () => {
  it('keeps data containing script delimiters inside one JSON-LD script', () => {
    const { container } = render(
      <JsonLd data={{ description: '</script><script>alert("xss")</script>' }} />,
    );

    const scripts = container.querySelectorAll('script');
    const content = scripts[0]?.textContent ?? '';

    expect(scripts).toHaveLength(1);
    expect(content).toContain('\\u003c/script\\u003e');
    expect(content).not.toContain('</script>');
  });
});
