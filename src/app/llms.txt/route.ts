import { posts } from '@/data/posts';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.role}. ${siteConfig.summary}`,
    '',
    `Portfolio: ${siteConfig.baseUrl}`,
    `GitHub: ${siteConfig.links.github}`,
    `KALIA model page: ${siteConfig.baseUrl}/kalia`,
    '',
    '## KALIA',
    '',
    '- [KALIA page](https://subhajitpradhan.vercel.app/kalia): 58M-parameter language model trained from scratch on free GPUs, with replayable training log, decisions, and incidents.',
    '- [Weights](https://huggingface.co/kalia-lm/kalia-v012): Apache-2.0 weights and model card.',
    '- [Source](https://github.com/subhajitlucky/kalia): training code, tests, journal, and pre-registration ledger.',
    '',
    '## Selected work',
    '',
  ];

  for (const project of projects) {
    lines.push(
      `- [${project.title}](${siteConfig.baseUrl}/projects/${project.slug}): ${project.summary}`,
    );
  }

  lines.push('', '## Writing', '');

  for (const post of posts) {
    lines.push(`- [${post.title}](${siteConfig.baseUrl}/writing/${post.slug}): ${post.summary}`);
  }

  lines.push(
    '',
    '## Open source tools',
    '',
    '- [Codebase Doctor](https://github.com/subhajitlucky/codebase-doctor): model-independent repository auditor for humans and coding agents. Emits text, JSON, or SARIF with stable finding fingerprints. npm: `npx codebase-doctor audit .`. MCP server included.',
    '- [RLS Doctor](https://github.com/subhajitlucky/rls-doctor): Postgres and Supabase Row Level Security auditor. Catalog checks plus behavioral probe mode. npm: `npx rls-doctor check`. MCP server included.',
    '',
    '## Profiles',
    '',
    ...siteConfig.nav
      .filter((item) => item.href.startsWith('http'))
      .map((item) => `- [${item.label}](${item.href})`),
  );

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
