export function isExternalUrl(href: string) {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function isAssetUrl(href: string) {
  return /\.[a-z0-9]+(?:[?#]|$)/i.test(href);
}

export const externalLinkProps = {
  target: '_blank',
  rel: 'noreferrer noopener',
} as const;
