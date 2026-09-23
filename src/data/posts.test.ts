import { getPost, posts } from '@/data/posts';

describe('writing content integrity', () => {
  it('publishes two long-form technical posts', () => {
    expect(posts).toHaveLength(2);
    expect(posts.map((post) => post.slug)).toEqual([
      'five-postgres-rls-mistakes',
      'what-breaks-if-i-change-this-file',
    ]);
  });

  it('gives every post a summary, date, reading time, and tags', () => {
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.summary.length).toBeGreaterThan(40);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.readingMinutes).toBeGreaterThan(5);
      expect(post.tags.length).toBeGreaterThan(0);
    }
  });

  it('writes substantive sections with code examples', () => {
    for (const post of posts) {
      expect(post.sections.length).toBeGreaterThanOrEqual(6);
      const codeBlocks = post.sections.flatMap((section) =>
        section.blocks.filter((block) => block.kind === 'code'),
      );
      expect(codeBlocks.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('does not use marketing language or fake metrics', () => {
    const serialized = JSON.stringify(posts).toLowerCase();
    expect(serialized).not.toContain('game-changer');
    expect(serialized).not.toContain('revolutionize');
    expect(serialized).not.toContain("in today's fast-paced");
  });

  it('looks up posts by slug without manufacturing missing entries', () => {
    expect(getPost('five-postgres-rls-mistakes')?.title).toContain('RLS');
    expect(getPost('missing-post')).toBeUndefined();
  });

  it('keeps every section block well-formed', () => {
    for (const post of posts) {
      for (const section of post.sections) {
        expect(section.id.length).toBeGreaterThan(0);
        expect(section.title.length).toBeGreaterThan(0);
        expect(section.blocks.length).toBeGreaterThan(0);
        for (const block of section.blocks) {
          if (block.kind === 'p') expect(block.text.length).toBeGreaterThan(0);
          if (block.kind === 'code') {
            expect(block.code.length).toBeGreaterThan(0);
            expect(block.lang.length).toBeGreaterThan(0);
          }
          if (block.kind === 'list') expect(block.items.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
