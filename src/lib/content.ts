// Acesso tipado aos dados de conteúdo (src/data/*.json).
import copyJson from '../data/copy.json';
import servicesJson from '../data/services.json';
import teamJson from '../data/team.json';
import reviewsJson from '../data/reviews.json';
import galleryJson from '../data/gallery.json';
import hoursJson from '../data/hours.json';
import businessJson from '../data/business.json';
import type { Lang } from '../i18n/ui';

export type Bi<T = string> = { pt: T; en: T };

export const copy = copyJson;
export const services = servicesJson as Array<{
  id: string;
  duration: number;
  price: number;
  featured?: boolean;
  badge?: Bi;
  name: Bi;
  desc: Bi;
}>;
export const team = teamJson;
export const reviews = reviewsJson;
export const gallery = galleryJson;
export const hours = hoursJson as unknown as {
  timezone: string;
  slotStepMinutes: number;
  bookingWindowOpenDays: number;
  week: Record<string, [string, string] | null>;
};
export const business = businessJson;

/** Escolhe o idioma: t(copy.hero.h1) → string. */
export const translator =
  (lang: Lang) =>
  <T>(v: Bi<T>): T =>
    v[lang];

/** Preenche placeholders: fmt('Fecha às {time}', { time: '20h' }). */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

export const brl = (n: number) => `R$ ${n}`;
