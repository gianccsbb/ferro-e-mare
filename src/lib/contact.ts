// Contatos vindos do .env (validados pelo astro:env no build).
import { PUBLIC_WHATSAPP_DEMO, PUBLIC_PHONE_DEMO } from 'astro:env/client';

const digits = (s: string) => s.replace(/\D/g, '');

export const whatsappNumber = digits(PUBLIC_WHATSAPP_DEMO);
export const phoneNumber = digits(PUBLIC_PHONE_DEMO);

/** Link wa.me com mensagem pré-preenchida. */
export const waLink = (text?: string) =>
  `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telLink = `tel:+${phoneNumber}`;

/** 5581998624594 → "(81) 99862-4594" */
export function formatPhone(d: string = phoneNumber): string {
  const local = d.startsWith('55') ? d.slice(2) : d;
  const ddd = local.slice(0, 2);
  const rest = local.slice(2);
  const split = rest.length - 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}
