import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { getCanonicalUrl, getPageHref, type Page } from '../src/routing.ts';
import { getPageSeo } from '../src/seo.ts';
import { siteBaseUrl } from '../site.config.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

const prerenderRoutes: Page[] = ['home', 'impressum', 'datenschutz'];

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function replaceTag(html: string, matcher: RegExp, replacement: string): string {
  return matcher.test(html) ? html.replace(matcher, replacement) : html;
}

function injectSeo(template: string, page: Page): string {
  const seo = getPageSeo(page, 'de');
  const replacements: Array<[RegExp, string]> = [
    [
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(seo.title)}</title>`,
    ],
    [
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    ],
    [
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    ],
    [
      /<meta property="og:type" content="[^"]*"\s*\/?>/,
      '<meta property="og:type" content="website" />',
    ],
    [
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    ],
    [
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`,
    ],
    [
      /<meta name="twitter:card" content="[^"]*"\s*\/?>/,
      '<meta name="twitter:card" content="summary" />',
    ],
    [
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    ],
    [
      /<html lang="[^"]*">/,
      '<html lang="de">',
    ],
  ];

  return replacements.reduce((html, [matcher, replacement]) => replaceTag(html, matcher, replacement), template);
}

function injectMarkup(template: string, page: Page): string {
  const pathname = getPageHref(page);
  const appMarkup = renderToString(React.createElement(App, { initialPathname: pathname }));

  return template.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerender-pathname="${escapeHtml(pathname)}">${appMarkup}</div>`,
  );
}

function renderPage(template: string, page: Page): string {
  return injectMarkup(injectSeo(template, page), page);
}

async function writeRoutePage(page: Page, html: string) {
  if (page === 'home') {
    await writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, page);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

async function writeSitemap() {
  const urls = prerenderRoutes.map((page) => getCanonicalUrl(page));
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
  .join('\n')}
</urlset>
`;

  await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
}

async function writeRobots() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', siteBaseUrl).toString()}
`;

  await writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
}

async function main() {
  const template = await readFile(templatePath, 'utf8');
  let homeHtml = template;

  for (const page of prerenderRoutes) {
    const html = renderPage(template, page);
    await writeRoutePage(page, html);

    if (page === 'home') {
      homeHtml = html;
    }
  }

  await writeFile(path.join(distDir, '404.html'), homeHtml, 'utf8');
  await writeSitemap();
  await writeRobots();
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
