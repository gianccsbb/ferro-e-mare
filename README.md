# Ferro & Maré Barbearia

**Site no ar / Live site:** https://ferro-e-mare.gianccsbb.workers.dev/

> **Projeto conceitual de portfólio.** O negócio, o endereço e as avaliações são fictícios.
> _Portfolio concept project — the business, address and reviews are fictional._

Site de serviço local focado em **conversão**: o visitante vê serviço e preço, escolhe barbeiro
e horário, e confirma no **WhatsApp com a mensagem já preenchida**, em até 4 toques.

A local-service website built for **conversion**: pick a service, a barber and a time slot,
then confirm on **WhatsApp with the message pre-filled**, in 4 taps or fewer.

## Stack

- [Astro](https://astro.build) (static, zero JS by default) + TypeScript strict
- Vanilla CSS with design tokens, self-hosted variable fonts
- Bilingual: PT-BR (`/`) and English (`/en/`)

## Rodar localmente / Run locally

```sh
npm install
cp .env.example .env   # set PUBLIC_WHATSAPP_DEMO
npm run build
npm run preview
```

## Metas / Budgets

Lighthouse mobile ≥ 95 in all four categories · JS ≤ 50 KB gzip · page ≤ 1 MB · WCAG 2.2 AA.

Decisions log: [`DECISIONS.md`](DECISIONS.md).

---

Fonts: Big Shoulders Display and Instrument Sans, both SIL Open Font License 1.1.
