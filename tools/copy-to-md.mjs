#!/usr/bin/env node
// Gera src/content/copy.md (documento de revisão, PT | EN lado a lado)
// a partir dos JSONs em src/data/. NÃO edite copy.md à mão: edite os JSONs
// e rode `npm run copy:md`.
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const load = (f) => JSON.parse(readFileSync(new URL(`src/data/${f}`, root), 'utf8'));

const copy = load('copy.json');
const services = load('services.json');
const team = load('team.json');
const reviews = load('reviews.json');
const gallery = load('gallery.json');
const hours = load('hours.json');
const business = load('business.json');

const isBi = (v) => v && typeof v === 'object' && 'pt' in v && 'en' in v;
const cell = (v) =>
  (Array.isArray(v) ? v.map((x) => `• ${x}`).join('<br>') : String(v))
    .replaceAll('|', '\\|')
    .replaceAll('\n', '<br>');

/** Achata um objeto de copy em linhas [chave, pt, en]. */
function rows(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (isBi(v)) out.push([key, v.pt, v.en]);
    else if (Array.isArray(v)) v.forEach((item, i) => out.push(...rows(item, `${key}[${i + 1}]`)));
    else if (v && typeof v === 'object') out.push(...rows(v, key));
  }
  return out;
}
const table = (r) =>
  [
    '| Chave | PT | EN |',
    '|---|---|---|',
    ...r.map(([k, pt, en]) => `| \`${k}\` | ${cell(pt)} | ${cell(en)} |`),
  ].join('\n');

const brl = (n) => `R$ ${n}`;
const L = [];
const h = (s) => L.push('', s, '');

L.push(
  '# Copy — Ferro & Maré',
  '',
  '> **Arquivo gerado** por `tools/copy-to-md.mjs` a partir de `src/data/*.json`.',
  '> Para mudar um texto, edite o JSON e rode `npm run copy:md`.',
  '> Placeholders entre chaves (`{time}`, `{service}`…) são preenchidos pelo site.',
);

h('## SEO (title ≤ 60 · description ≤ 155)');
L.push(table(rows(copy.seo)));
h('## 1. Header');
L.push(table(rows(copy.header)));
h('## 2. Hero');
L.push(table(rows(copy.hero)));

h('## 3. Serviços & preços');
L.push(table(rows(copy.services)), '');
L.push(
  '| Serviço PT | Service EN | Duração | Preço | Descrição PT | Description EN |',
  '|---|---|---|---|---|---|',
);
for (const s of services)
  L.push(
    `| ${s.featured ? '⭐ ' : ''}${s.name.pt} | ${s.name.en} | ${s.duration} min | ${brl(s.price)} | ${cell(s.desc.pt)} | ${cell(s.desc.en)} |`,
  );

h('## 4. Agendamento');
L.push(table(rows(copy.booking)));

h('## 5. Equipe');
L.push(table(rows(copy.team)), '');
const dayAbbr = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
for (const m of team) {
  L.push(
    `### ${m.name} — ${m.specialty.pt} / ${m.specialty.en}`,
    `Dias: ${m.days.map((d) => dayAbbr[d]).join(', ')}`,
    '',
    `- **PT:** ${m.bio.pt}`,
    `- **EN:** ${m.bio.en}`,
    `- **Botão:** ${m.cta.pt} / ${m.cta.en}`,
    '',
  );
}

h('## 6. Galeria (texto alternativo das fotos)');
L.push(table(rows(copy.gallery)), '');
L.push('| # | Alt PT | Alt EN |', '|---|---|---|');
gallery.forEach((g, i) => L.push(`| ${i + 1} | ${g.alt.pt} | ${g.alt.en} |`));

h('## 7. Clube Ferro & Maré');
L.push(table(rows(copy.club)));

h('## 8. Avaliações (ilustrativas)');
L.push(table(rows(copy.reviews)), '');
L.push('| Autor | PT | EN |', '|---|---|---|');
for (const r of reviews)
  L.push(
    `| ${r.author}, ${r.place.pt} (${'★'.repeat(r.stars)}) | ${cell(r.text.pt)} | ${cell(r.text.en)} |`,
  );

h('## 9. Como chegar');
const a = business.address;
L.push(`**Endereço:** ${a.street} — ${a.neighborhood}, ${a.city}/${a.region} (fictício)`, '');
L.push(
  '**Horário:** ' +
    Object.entries(hours.week)
      .map(([d, v]) => `${dayAbbr[+d]} ${v ? v.join('–') : 'fechado'}`)
      .join(' · '),
  '',
);
L.push(table(rows(copy.location)));

h('## 10. FAQ');
L.push(table(rows(copy.faq)));
h('## 11. Footer');
L.push(table(rows(copy.footer)));
h('## Barra de ação mobile');
L.push(table(rows(copy.mobileBar)));
h('## Página /obrigado · /en/thank-you');
L.push(table(rows(copy.thanks)));
L.push('');

writeFileSync(new URL('src/content/copy.md', root), L.join('\n'));
console.log('src/content/copy.md atualizado');
