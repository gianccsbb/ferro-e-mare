// Evento de calendário gerado no navegador (.ics) + link do Google Agenda.
// Recife usa UTC−3 fixo (sem horário de verão desde 2019), então a conversão é direta.
const RECIFE_UTC_OFFSET_H = 3;

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

/** Data local de Recife ("2026-12-12", "15:30") → instante UTC. */
export function recifeToUtc(iso: string, hhmm: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  const [h, min] = hhmm.split(':').map(Number);
  return new Date(Date.UTC(y, m - 1, d, h + RECIFE_UTC_OFFSET_H, min));
}

export interface CalEvent {
  title: string;
  start: Date;
  durationMin: number;
  location: string;
  description: string;
}

// Texto em iCalendar: escapar \ ; , e quebras de linha.
const esc = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

export function buildIcs(e: CalEvent): string {
  const end = new Date(e.start.getTime() + e.durationMin * 60_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ferro e Mare//Agendamento//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.start.getTime()}-${Math.random().toString(36).slice(2)}@ferro-e-mare`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.location)}`,
    `DESCRIPTION:${esc(e.description)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(e.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

export function googleCalendarUrl(e: CalEvent): string {
  const end = new Date(e.start.getTime() + e.durationMin * 60_000);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${stamp(e.start)}/${stamp(end)}`,
    details: e.description,
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}
