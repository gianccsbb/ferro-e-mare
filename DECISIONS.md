# Decisões

Registro das escolhas feitas quando o handout não especificava algo, ou quando
foi preciso ajustar uma regra. Formato: **D-NNN — título**, data, decisão, motivo.

## D-001 — Dois repositórios: site público, press-kit privado

2026-11-25. O código do site fica em `ferro-e-mare` (público: mostra qualidade de
código a clientes). Press-kit e guia de gigs ficam em `ferro-e-mare-presskit` (privado).
Motivo: um repo do GitHub não esconde arquivos individuais.

## D-002 — Site inteiro bilíngue (PT + EN)

2026-11-25. PT-BR em `/`, inglês em `/en/` (i18n nativo do Astro, `prefixDefaultLocale: false`).
Rotas pareadas: `/obrigado/` ↔ `/en/thank-you/`, `/case/` ↔ `/en/case/`.
Motivo: o público-alvo inclui clientes estrangeiros (Fiverr, Upwork etc.).
O negócio continua sendo em Recife; preços seguem em R$ na versão EN.

## D-003 — Fontes variáveis, auto-hospedadas

2026-11-25. Um arquivo `woff2` variável por família (subset latin, que cobre os
acentos do português): Big Shoulders Display (~35 KB) e Instrument Sans (~30 KB).
São 2 arquivos, dentro do limite de 4. Copiados para `public/fonts/` com as licenças OFL, com preload.
Os pacotes `@fontsource-variable/*` foram usados só para obter os arquivos.

## D-004 — Tokens derivados para seções claras

2026-11-25. Contraste medido sobre `--foam`: `--brass` 2.64, `--steel` 2.21, `--cta` 1.97 (reprovam).
Criados `--brass-deep #8A5A1C` (5.15), `--steel-deep #55606B` (5.60), `--tide-deep #3F6878` (5.30).
Regras de uso:

- `--tide` sobre `--navy` = 3.99, só texto grande/ícones. Texto pequeno em navy usa `--steel`.
- `--rust` sobre `--navy` = 2.55, nunca como texto em navy; em `--ink` só texto grande (3.06); em `--foam` ok (5.14).
- `--cta` sobre `--ink`/`--navy` passa AA (7.99 / 6.65); o texto do botão é `--ink`.
  Cada seção define `--bg/--fg/--fg-muted/--accent` via `.surface-ink|navy|foam`.

## D-005 — Altura de linha dos títulos = 1.02

2026-11-25. Com 0.95 os acentos de maiúsculas (HORÁRIO) colidiam com a linha de cima.

## D-006 — "Eye-candy" dentro do orçamento

2026-11-25. O pedido é uma peça chamativa para portfólio, mas o handout manda (§0.5,
§11, §12). O impacto visual vem de tipografia grande, textura SVG/CSS, luz de latão em
gradiente e micro-interações em CSS. Nada de WebGL, vídeo ou bibliotecas de animação.
