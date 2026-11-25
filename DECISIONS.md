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

## D-007 — Textos em JSON bilíngue; `copy.md` é gerado

2026-11-25. O handout pede `src/content/copy.md`. Com dois idiomas, o código precisa ler os
textos de forma estruturada. A fonte única são os JSONs de `src/data/`, com `{ "pt": …, "en": … }`.
`src/content/copy.md` é gerado por `npm run copy:md` só para revisão humana. Assim não existem
duas cópias para manter sincronizadas.

## D-008 — Agenda fictícia em padrão semanal

2026-11-25. Datas fixas em `agenda.json` ficariam no passado em poucos dias. A agenda guarda
blocos ocupados por dia da semana e por barbeiro, mais a pausa de almoço. O fluxo de
agendamento (Fase 5) aplica o padrão às próximas datas e esconde horários que já passaram hoje.
Grade de início a cada 30 min (`slotStepMinutes`). O serviço precisa caber inteiro antes do
fechamento e sem cruzar blocos ocupados.

## D-009 — Detalhes de conteúdo

2026-11-25.

- A versão EN mantém preços em R$ (o negócio é em Recife). A nota de serviços avisa "Brazilian reais".
- Avaliações usam só inicial + bairro (ex.: "R., Boa Viagem"), sem nome completo nem foto de rosto.
- Barbeiros só com primeiro nome/apelido (Jonas, Bié, Caio), para reduzir a chance de coincidir com pessoa real.
- Clube: benefícios extras ("prioridade no sábado", "cancele quando quiser") reforçam a ideia de recorrência.
- Os textos de `/case` ficam para a Fase 8 porque dependem de números medidos.

## D-010 — Contatos via `astro:env`, WhatsApp e "Ligar" no número do estúdio

2026-11-25. `PUBLIC_WHATSAPP_DEMO` e `PUBLIC_PHONE_DEMO` são declarados no `env.schema` do
Astro: se faltarem, o build falha em vez de publicar links quebrados. Os dois apontam para o
número do estúdio, então o prospect que testa o fluxo, ou que liga, cai na conversa do estúdio.
O número fica fora do repo (`.env` ignorado), mas aparece no site publicado, como é preciso.

## D-011 — Estrutura de componentes e rotas

2026-11-25. `Home.astro` e `Thanks.astro` recebem `lang` e servem às rotas PT e EN.
`trailingSlash: 'always'` mantém URLs canônicas consistentes (`/obrigado/`, `/en/thank-you/`).
O selo "Aberto agora" é renderizado com o horário fixo como fallback (sem JS) e recalculado
no navegador a cada minuto, no fuso `America/Recife`, independente do fuso do visitante.

## D-012 — Imagens híbridas: ilustração SVG + fotos só na galeria

2026-11-25. O hero (arco de casarão, cadeira, porto, placa de rua esmaltada), os retratos da equipe
e o mapa são SVG inline próprios. Ficam leves, são autorais e não usam fotos de rosto ligadas
a pessoas inventadas. Os retratos não têm rosto realista. Fotos reais (Unsplash/Pexels) entram
só na galeria de cortes, onde o cliente quer ver resultado. Créditos em
`src/assets/gallery/CREDITS.md` e, depois, em `/case`.

## D-013 — Elementos de assinatura visual

2026-11-25. Seções numeradas como placas (contador CSS), rebites nos cantos (`.plate`, 4 gradientes
radiais, sem imagem), faixa letreiro (CSS, 48 s por volta, para com `prefers-reduced-motion`),
cartão de sócio no Clube, nome gigante em contorno no rodapé. O card "Mais pedido" vem primeiro no
DOM e ocupa 2 colunas, para a grade fechar sem buracos e a ordem do Tab seguir a ordem visual.

## D-014 — Agendamento: ilha em TypeScript puro, HTML gerado no servidor (Fase 5)

- Os 4 passos são HTML estático; o script (~2,5 KB gzip + lógica 2,2 KB) só alterna passos,
  calcula a agenda e monta a mensagem. Sem framework → JS total do site ≈ 6 KB gzip.
- Sem JS: formulário oculto, aparece o fallback (WhatsApp + telefone).
- Toque/clique em serviço, barbeiro ou horário avança sozinho (4 toques até o fim);
  pelo teclado não avança (setas mudam a opção), usa-se "Continuar".
- Hoje: horários só a partir de agora + 30 min. "Qualquer um" = união das agendas livres.
- Estado em sessionStorage (try/catch): sobrevive a recarregar/voltar do WhatsApp.

## D-015 — Confirmar é um link real para o WhatsApp

- `<a target="_blank">` cujo href é montado no clique: abertura direta pelo gesto do
  usuário, não cai em bloqueador de pop-up. A aba atual segue para /obrigado após 900 ms.

## D-016 — Celular: máscara BR + modo internacional

- `(81) 9 9999-9999` por padrão; começando com `+`, aceita número estrangeiro (8–15 dígitos).
  Motivo: prospects de fora (público-alvo do portfólio) precisam conseguir testar.

## D-017 — /obrigado: resumo, .ics e Google Agenda gerados no navegador

- `.ics` (com alarme 1 h antes) via Blob, sem servidor. Link do Google Agenda ao lado
  (mais prático no Android). "O WhatsApp não abriu?" reabre a mesma mensagem.
- Recife é UTC−3 fixo (sem horário de verão desde 2019): conversão direta.

## D-018 — Movimento só abaixo da dobra (Fase 6)

- Revelação ao rolar (opacidade + 8 px de translate, só transform → CLS 0) aplicada apenas
  ao que está abaixo da tela no carregamento: nada visível pisca e o LCP não espera.
- Sem JS ou com `prefers-reduced-motion`, a classe nunca é aplicada: tudo aparece direto.

## D-019 — Mapa: facade que é um link

- A ilustração é o "mapa estático"; o botão é um `<a>` para o Google Maps (funciona sem JS).
  Com JS, o clique troca a ilustração pelo iframe. Nenhuma requisição ao Google antes disso.

## D-020 — Galeria: `<dialog>` nativo + fotos via astro:assets

- Lightbox com `<dialog>`: Esc e foco preso nativos; setas, deslizar e clique no fundo.
  Ao fechar, o foco volta à miniatura.
- Fotos reais entram como `src/assets/gallery/gN.jpg`: AVIF/WebP em 3 larguras, lazy.
  Tratamento uniforme por CSS (sépia leve, contraste, vinheta e grão) para parecer um ensaio.
  Sem foto, continua a placa provisória.

## D-021 — FAQ: abertura suave progressiva

- `::details-content` + `interpolate-size` (Chrome 131+); nos demais abre sem animação.

## D-022 — Lighthouse medido após o deploy

- Não há Chrome nesta máquina (Lighthouse precisa dele). Medimos com PageSpeed Insights
  na URL pública (Fase 7), que é também o número que vai para o /case.

## D-023 — Fotos da galeria: 9 do Unsplash (licença livre), legendas fiéis

- Escolhidas olhando cada imagem (não pelo título): luz quente, sem máscaras/época marcada,
  sem cores fora da paleta. Unsplash+ (pago) descartado — por isso não há foto de toalha quente;
  no lugar entrou o salão com tijolo e luminárias.
- Legendas (alt) reescritas para descrever o que cada foto mostra de fato.
- Autores e links em `src/assets/gallery/CREDITS.md` (vão também para o /case).
- Peso: pior caso 167 KB para as 9 (AVIF), e só carregam perto da tela.

## D-024 — SEO de um negócio fictício (Fase 7)

- JSON-LD `HairSalon` na home (PT/EN), sem `aggregateRating`; horários agrupados
  (Ter–Sex 09–20, Sáb 08–18). Telefone = número demo (o mesmo já visível no site).
- `noindex, follow` em todas as páginas do negócio; `robots.txt` libera o rastreio
  (o robô precisa ler o noindex). Sitemap lista só `/case/` e `/en/case/`.
- `/case` segue noindex enquanto for esqueleto; vira `index` na Fase 8.

## D-025 — Cartão de compartilhamento gerado por script

- `tools/og/og.html` (molde) + `npm run og`: Firefox headless fotografa em 1200×630 e o
  libvips salva JPG (~85 KB). Reaproveita a ilustração do hero do build. Uma versão PT e uma EN.
- Selo "Projeto conceitual" no próprio cartão: honestidade já na prévia do WhatsApp.

## D-026 — Cloudflare Pages: `_headers` e 404

- Cache de 1 ano para `/_astro/*` (nomes com hash), 30 dias para fontes.
- `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
  CSP ficou de fora por enquanto: o Astro embute scripts pequenos inline.
- 404 bilíngue no estilo do site. Âncoras do menu viram `/#secao` fora da home.
- Favicon próprio (âncora de latão) + apple-touch-icon 180 px.
