// Só o estudo de caso entra no sitemap: as páginas do negócio fictício são noindex.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const pt = new URL('/case/', site).href;
  const en = new URL('/en/case/', site).href;
  const alt = `<xhtml:link rel="alternate" hreflang="pt-BR" href="${pt}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${pt}</loc>${alt}</url>
  <url><loc>${en}</loc>${alt}</url>
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
