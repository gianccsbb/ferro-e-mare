// Lógica do agendamento (sem DOM): datas no fuso do negócio, horários livres,
// máscara de celular e mensagem do WhatsApp. Testável em Node.
import agendaJson from '../data/agenda.json';
import teamJson from '../data/team.json';
import { toMin, type Week } from './hours';

type Block = [string, string];
type BarberAgenda = { lunch?: Block } & Record<string, Block[] | Block | undefined>;
const agenda = agendaJson.busy as unknown as Record<string, BarberAgenda>;
const team = teamJson as Array<{ id: string; name: string; days: number[] }>;

export const ANY = 'any';

export interface Day {
  iso: string; // 2026-12-12 (data local do negócio)
  y: number;
  m: number; // 1–12
  d: number;
  weekday: number; // 0=dom
  offset: number; // 0 = hoje
}

const pad = (n: number) => String(n).padStart(2, '0');
export const minToHHMM = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

/** Data e minuto atuais no fuso do negócio. */
export function todayIn(timeZone: string, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get('year'), m: get('month'), d: get('day'), min: get('hour') * 60 + get('minute') };
}

/** Próximos `count` dias abertos (a partir de hoje), opcionalmente só os dias de um barbeiro. */
export function nextOpenDays(
  week: Week,
  count: number,
  today: { y: number; m: number; d: number },
  barberId: string = ANY,
): Day[] {
  const works = barberId === ANY ? null : team.find((b) => b.id === barberId)?.days;
  const out: Day[] = [];
  for (let offset = 0; out.length < count && offset < 60; offset++) {
    // Aritmética em UTC sobre a data local: imune a fuso/horário de verão do visitante.
    const dt = new Date(Date.UTC(today.y, today.m - 1, today.d + offset));
    const weekday = dt.getUTCDay();
    if (!week[String(weekday)]) continue;
    if (works && !works.includes(weekday)) continue;
    const y = dt.getUTCFullYear();
    const m = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();
    out.push({ iso: `${y}-${pad(m)}-${pad(d)}`, y, m, d, weekday, offset });
  }
  return out;
}

export function barberWorks(barberId: string, weekday: number): boolean {
  return team.find((b) => b.id === barberId)?.days.includes(weekday) ?? false;
}

function busyBlocks(barberId: string, weekday: number): Array<[number, number]> {
  const a = agenda[barberId];
  if (!a) return [];
  const blocks = (a[String(weekday)] as Block[] | undefined) ?? [];
  const all = a.lunch ? [...blocks, a.lunch] : blocks;
  return all.map(([s, e]) => [toMin(s), toMin(e)]);
}

/** O barbeiro está livre em [start, start+dur)? */
export function isFree(barberId: string, weekday: number, start: number, dur: number): boolean {
  if (!barberWorks(barberId, weekday)) return false;
  const end = start + dur;
  return busyBlocks(barberId, weekday).every(([s, e]) => end <= s || start >= e);
}

export interface Slot {
  time: string; // "15:30"
  barbers: string[]; // quem pode atender
}

/**
 * Horários de início livres num dia. O serviço precisa caber inteiro antes do
 * fechamento; hoje, só horários com pelo menos `leadMin` minutos de antecedência.
 */
export function slotsFor(
  day: Day,
  duration: number,
  barberId: string,
  week: Week,
  step: number,
  nowMin: number,
  leadMin = 30,
): Slot[] {
  const open = week[String(day.weekday)];
  if (!open) return [];
  const [o, c] = [toMin(open[0]), toMin(open[1])];
  const candidates = barberId === ANY ? team.map((b) => b.id) : [barberId];
  const out: Slot[] = [];
  for (let s = o; s + duration <= c; s += step) {
    if (day.offset === 0 && s < nowMin + leadMin) continue;
    const barbers = candidates.filter((b) => isFree(b, day.weekday, s, duration));
    if (barbers.length) out.push({ time: minToHHMM(s), barbers });
  }
  return out;
}

// ---------- Rótulos ----------
const WD = {
  pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
const MON_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
type L = 'pt' | 'en';

export const weekdayShort = (day: Day, lang: L) => WD[lang][day.weekday];
/** "12/12" (pt) · "Dec 12" (en) */
export const dateShort = (day: Day, lang: L) =>
  lang === 'pt' ? `${pad(day.d)}/${pad(day.m)}` : `${MON_EN[day.m - 1]} ${day.d}`;
/** "Sex, 12/12" · "Fri, Dec 12" */
export const dateLabel = (day: Day, lang: L) =>
  `${weekdayShort(day, lang)}, ${dateShort(day, lang)}`;
/** "15:30" (pt) · "3:30 PM" (en) */
export function timeLabel(hhmm: string, lang: L): string {
  if (lang === 'pt') return hhmm;
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
}

// ---------- Celular ----------
/** Máscara progressiva: "(81) 9 9999-9999". Começando com "+", aceita formato internacional. */
export function maskPhone(raw: string): string {
  if (raw.trimStart().startsWith('+')) {
    return (
      '+' +
      raw
        .replace(/[^\d ]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trimStart()
        .slice(0, 20)
    );
  }
  const d = raw.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length === 3) return `(${d.slice(0, 2)}) ${d[2]}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3)}`;
  return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3, 7)}-${d.slice(7)}`;
}

export function phoneValid(v: string): boolean {
  const digits = v.replace(/\D/g, '');
  if (v.trimStart().startsWith('+')) return digits.length >= 8 && digits.length <= 15;
  return digits.length === 11 && digits[2] === '9';
}

export function nameValid(v: string): boolean {
  return v.trim().length >= 2;
}

/** Preenche {placeholders}. */
export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
