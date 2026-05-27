const absoluteUrlPattern = /^[a-z][a-z\d+\-.]*:\/\//i;

export function getPublicAssetUrl(assetPath, baseUrl = import.meta.env.BASE_URL) {
  const normalizedAssetPath = assetPath.replace(/^\/+/, '');
  const normalizedBaseUrl = baseUrl || '/';

  if (absoluteUrlPattern.test(normalizedBaseUrl)) {
    return new URL(normalizedAssetPath, normalizedBaseUrl).toString();
  }

  const normalizedBasePath = `/${normalizedBaseUrl.replace(/^\/+|\/+$/g, '')}`;

  if (normalizedBasePath === '/') {
    return `/${normalizedAssetPath}`;
  }

  return `${normalizedBasePath}/${normalizedAssetPath}`;
}
