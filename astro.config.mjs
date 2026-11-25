// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Trocar pela URL final do Cloudflare Pages na Fase 7.
  site: 'https://ferro-e-mare.pages.dev',
  trailingSlash: 'always',
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: { prefixDefaultLocale: false }, // PT em "/", EN em "/en/"
  },
  // Variáveis validadas no build: se faltarem, o build falha com aviso claro.
  env: {
    schema: {
      PUBLIC_WHATSAPP_DEMO: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_PHONE_DEMO: envField.string({ context: 'client', access: 'public' }),
    },
  },
});
