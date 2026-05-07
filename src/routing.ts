import { siteBasePath, siteOrigin } from '../site.config';

export type Page = 'home' | 'impressum' | 'datenschutz';

export const pageRoutePaths: Record<Page, string> = {
  home: '/',
  impressum: '/impressum/',
  datenschutz: '/datenschutz/',
};

const trimmedBasePath = siteBasePath.endsWith('/') ? siteBasePath.slice(0, -1) : siteBasePath;

function normalizeRoutePath(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalized = withLeadingSlash.replace(/\/{2,}/g, '/');

  if (normalized === '/') {
    return normalized;
  }

  return normalized.endsWith('/') ? normalized : `${normalized}/`;
}

export function stripBasePath(pathname: string): string {
  if (!pathname || pathname === trimmedBasePath || pathname === siteBasePath) {
    return '/';
  }

  if (pathname.startsWith(`${trimmedBasePath}/`)) {
    return pathname.slice(trimmedBasePath.length) || '/';
  }

  return pathname;
}

export function getPageFromPathname(pathname: string): Page {
  const normalizedPath = normalizeRoutePath(stripBasePath(pathname));

  if (normalizedPath === pageRoutePaths.impressum) {
    return 'impressum';
  }

  if (normalizedPath === pageRoutePaths.datenschutz) {
    return 'datenschutz';
  }

  return 'home';
}

export function getPagePath(page: Page): string {
  return pageRoutePaths[page];
}

export function buildAppPath(pathname: string): string {
  const normalizedPath = normalizeRoutePath(pathname);

  if (normalizedPath === '/') {
    return siteBasePath;
  }

  return `${trimmedBasePath}${normalizedPath}`;
}

export function getPageHref(page: Page): string {
  return buildAppPath(getPagePath(page));
}

export function getSectionHref(sectionId: string): string {
  return `${getPageHref('home')}#${sectionId}`;
}

export function getStaticAssetPath(assetPath: string): string {
  return `${siteBasePath}${assetPath.replace(/^\/+/, '')}`;
}

export function getCanonicalUrl(page: Page): string {
  return new URL(getPageHref(page), siteOrigin).toString();
}
