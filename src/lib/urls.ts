export function isExternalUrl(href: string) {
  try {
    const url = new URL(href);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const externalLinkProps = {
  target: '_blank',
  rel: 'noreferrer noopener',
} as const;
