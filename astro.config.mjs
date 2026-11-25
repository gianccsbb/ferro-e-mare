// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Trocar pela URL final do Cloudflare Pages na Fase 7.
  site: 'https://ferro-e-mare.pages.dev',
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: { prefixDefaultLocale: false }, // PT em "/", EN em "/en/"
  },
});
