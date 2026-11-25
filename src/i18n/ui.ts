// Strings de interface (chrome do site). O conteúdo longo das seções
// virá de src/content/ e src/data/ na Fase 2.

export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

/** Valor do atributo <html lang>. */
export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

export const ui = {
  pt: {
    'skip.content': 'Pular para o conteúdo',
  },
  en: {
    'skip.content': 'Skip to content',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** Descobre o idioma a partir da URL ("/en/..." → en). */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : 'pt';
}

/**
 * Pares de rotas equivalentes entre idiomas, para o seletor PT/EN
 * levar à mesma página no outro idioma.
 */
const routePairs: Array<[pt: string, en: string]> = [
  ['/', '/en/'],
  ['/obrigado/', '/en/thank-you/'],
  ['/case/', '/en/case/'],
];

export function alternatePath(pathname: string, target: Lang): string {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const [pt, en] of routePairs) {
    if (p === pt || p === en) return target === 'pt' ? pt : en;
  }
  return target === 'pt' ? '/' : '/en/';
}
