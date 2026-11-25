// Cálculo de "Aberto agora" no fuso do negócio, independente do fuso do visitante.
import type { Lang } from '../i18n/ui';

export type Week = Record<string, [string, string] | null>;

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Dia da semana (0=dom) e minutos desde 00:00 no fuso indicado. */
export function nowIn(timeZone: string, date = new Date()): { day: number; min: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, min: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type Status =
  | { state: 'open'; closes: string }
  | { state: 'opensToday'; opens: string }
  | { state: 'opensOn'; day: number; opens: string };

export function openStatus(week: Week, now: { day: number; min: number }): Status {
  const today = week[String(now.day)];
  if (today) {
    const [o, c] = today;
    if (now.min >= toMin(o) && now.min < toMin(c)) return { state: 'open', closes: c };
    if (now.min < toMin(o)) return { state: 'opensToday', opens: o };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    const h = week[String(d)];
    if (h) return { state: 'opensOn', day: d, opens: h[0] };
  }
  throw new Error('hours.json sem nenhum dia aberto');
}

/** "09:00" → pt "9h" / en "9am"; "09:30" → "9h30" / "9:30am". */
export function fmtTime(hhmm: string, lang: Lang): string {
  const [h, m] = hhmm.split(':').map(Number);
  if (lang === 'pt') return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
  const h12 = h % 12 || 12;
  const ap = h < 12 ? 'am' : 'pm';
  return m ? `${h12}:${String(m).padStart(2, '0')}${ap}` : `${h12}${ap}`;
}
