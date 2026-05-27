import { describe, expect, it } from 'vitest';
import projects from './projects';

const requiredFields = [
  'title',
  'slug',
  'role',
  'oneLine',
  'problem',
  'usersOrContext',
  'workflow',
  'architecture',
  'decisions',
  'tradeoffs',
  'nextImprovements',
  'stack',
  'github',
  'demo',
];

describe('projects data', () => {
  it('contains the approved featured project slugs', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'tarka-sabha',
      'intentpay',
      'campushelper',
    ]);
  });

  it('has the required case-study fields for every project', () => {
    for (const project of projects) {
      for (const field of requiredFields) {
        expect(project[field], `${project.slug}.${field}`).toBeTruthy();
      }
      expect(project.decisions.length).toBeGreaterThanOrEqual(2);
      expect(project.tradeoffs.length).toBeGreaterThanOrEqual(1);
      expect(project.nextImprovements.length).toBeGreaterThanOrEqual(1);
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
    }
  });
});
