export function getRouterBasename(baseUrl = '/') {
  if (!baseUrl || baseUrl === '/') {
    return undefined;
  }

  const path = baseUrl.startsWith('http') ? new URL(baseUrl).pathname : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const basename = normalizedPath.replace(/\/+$/, '');

  return basename === '' || basename === '/' ? undefined : basename;
}
