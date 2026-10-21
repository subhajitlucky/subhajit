import { posts } from '../src/data/posts';
import { listedProjects } from '../src/data/projects';

export const CORE_ROUTES = ['/', '/projects', '/kalia', '/writing'] as const;
export const PROJECT_ROUTES = listedProjects.map((project) => `/projects/${project.slug}`);
export const WRITING_ROUTES = posts.map((post) => `/writing/${post.slug}`);
export const ALL_ROUTES = [...CORE_ROUTES, ...PROJECT_ROUTES, ...WRITING_ROUTES];
