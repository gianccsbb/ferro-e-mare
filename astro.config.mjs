// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // URL pública (Cloudflare Workers, static assets).
  site: 'https://ferro-e-mare.gianccsbb.workers.dev',
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
