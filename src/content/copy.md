# Copy — Ferro & Maré

> **Arquivo gerado** por `tools/copy-to-md.mjs` a partir de `src/data/*.json`.
> Para mudar um texto, edite o JSON e rode `npm run copy:md`.
> Placeholders entre chaves (`{time}`, `{service}`…) são preenchidos pelo site.

## SEO (title ≤ 60 · description ≤ 155)

| Chave | PT | EN |
|---|---|---|
| `home.title` | Ferro & Maré \| Barbearia no Recife Antigo | Ferro & Maré \| Barbershop in Old Recife, Brazil |
| `home.description` | Barbearia no Recife Antigo: corte, barba na toalha quente e café passado. Agende seu horário em 30 segundos pelo WhatsApp. | Barbershop in Old Recife: haircuts, hot-towel shaves and fresh coffee. Book your time in 30 seconds on WhatsApp. |
| `thanks.title` | Horário pedido \| Ferro & Maré | Time requested \| Ferro & Maré |
| `thanks.description` | Seu pedido de horário foi enviado pelo WhatsApp. | Your booking request was sent on WhatsApp. |

## 1. Header

| Chave | PT | EN |
|---|---|---|
| `nav.services` | Serviços | Services |
| `nav.team` | Equipe | Team |
| `nav.club` | Clube | Club |
| `nav.location` | Como chegar | Directions |
| `cta` | Agendar | Book |
| `status.openUntil` | Aberto agora · Fecha às {time} | Open now · Closes at {time} |
| `status.opensToday` | Fechado · Abre hoje às {time} | Closed · Opens today at {time} |
| `status.opensOn` | Fechado · Abre {day} às {time} | Closed · Opens {day} at {time} |
| `status.fallback` | Ter–Sex 9h–20h · Sáb 8h–18h | Tue–Fri 9am–8pm · Sat 8am–6pm |

## 2. Hero

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Barbearia clássica · Recife Antigo | Classic barbershop · Old Recife |
| `h1` | Barbearia no Recife Antigo. | Barbershop in Old Recife. |
| `h1Accent` | Seu horário em 30 segundos. | Book in 30 seconds. |
| `sub` | Corte, barba na toalha quente e café passado. Ter a Sáb. | Haircuts, hot-towel shaves and fresh-brewed coffee. Tue to Sat. |
| `ctaPrimary` | Agendar horário | Book a time |
| `ctaSecondary` | Chamar no WhatsApp | Message on WhatsApp |
| `proof` | ★ 4,9 · avaliações ilustrativas | ★ 4.9 · illustrative reviews |
| `perks` | • Toalha quente<br>• Café passado na hora<br>• Horário pontual | • Hot towel<br>• Fresh-brewed coffee<br>• On-time, every time |
| `imageAlt` | Ilustração: cadeira de barbeiro sob uma luminária, num arco de casarão com os guindastes do porto ao fundo | Illustration: a barber chair under a pendant lamp, framed by an old townhouse arch with harbour cranes behind |

## 3. Serviços & preços

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Serviços & preços | Services & prices |
| `title` | Preço na parede. Sem surpresa no caixa. | Prices on the wall. No surprises at the till. |
| `minutes` | {n} min | {n} min |
| `bookThis` | Agendar este | Book this |
| `note` | Pix, crédito, débito ou dinheiro. | Pix, credit, debit or cash. Prices in Brazilian reais (R$). |

| Serviço PT | Service EN | Duração | Preço | Descrição PT | Description EN |
|---|---|---|---|---|---|
| Corte | Haircut | 40 min | R$ 50 | Máquina, tesoura ou os dois. Lavagem e finalização inclusas. | Clippers, scissors or both. Wash and styling included. |
| Barba com toalha quente | Hot-towel beard shave | 30 min | R$ 40 | Toalha quente, navalha e balm. O café vem junto. | Hot towel, straight razor and balm. Coffee comes with it. |
| ⭐ Corte + barba | Haircut + beard | 70 min | R$ 80 | O serviço completo, R$ 10 a menos que separado. Chegou, sentou, saiu outro. | The full service, R$ 10 less than booking both. Walk in, sit down, walk out a new man. |
| Pezinho / acabamento | Neckline & edge-up | 15 min | R$ 20 | Mantém o corte em dia entre uma visita e outra. | Keeps your cut sharp between visits. |
| Sobrancelha na navalha | Straight-razor brow cleanup | 10 min | R$ 15 | Só o necessário. Ninguém percebe o que mudou, só que ficou melhor. | Just enough. Nobody can tell what changed, only that it looks better. |

## 4. Agendamento

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Agendamento | Booking |
| `title` | Escolha. Toque. Pronto. | Pick. Tap. Done. |
| `intro` | Quatro passos e a confirmação chega no WhatsApp, com a mensagem já escrita. | Four steps, then you confirm on WhatsApp with the message already written. |
| `progress` | Passo {n} de 4 | Step {n} of 4 |
| `steps.service` | Serviço | Service |
| `steps.barber` | Barbeiro | Barber |
| `steps.datetime` | Dia e horário | Day & time |
| `steps.details` | Seus dados | Your details |
| `anyBarber` | Qualquer um | Anyone |
| `anyBarberHint` | Mais rápido | Fastest |
| `today` | Hoje | Today |
| `tomorrow` | Amanhã | Tomorrow |
| `noSlots` | Esse dia lotou. Tente outro dia ou outro barbeiro. | This day is fully booked. Try another day or barber. |
| `nameLabel` | Seu nome | Your name |
| `phoneLabel` | Celular (WhatsApp) | Mobile (WhatsApp) |
| `phonePlaceholder` | (81) 9 9999-9999 | +1 555 123 4567 |
| `phoneHint` | Só pra confirmar o horário. Nada de spam. Número de fora do Brasil? Comece com +. | Only to confirm your booking. No spam. Outside Brazil? Start with + and your country code. |
| `errors.name` | Diga como podemos te chamar. | Tell us what to call you. |
| `errors.phone` | Confira o celular: DDD + 9 dígitos, ou comece com + se for de fora. | Check the number: start with + and your country code, or use a Brazilian mobile with area code. |
| `errors.slot` | Escolha um horário. | Pick a time. |
| `errors.service` | Escolha um serviço. | Pick a service. |
| `errors.barber` | Escolha um barbeiro (ou qualquer um). | Pick a barber (or anyone). |
| `back` | Voltar | Back |
| `next` | Continuar | Continue |
| `confirm` | Confirmar no WhatsApp | Confirm on WhatsApp |
| `summary` | Resumo | Summary |
| `noJs` | O agendamento rápido precisa de JavaScript. Sem problema: chame a gente direto. | Quick booking needs JavaScript. No problem: just message us directly. |
| `whatsappMessage` | Olá! Quero agendar na Ferro & Maré:<br>• Serviço: {service} ({duration} min)<br>• Barbeiro: {barber}<br>• Dia: {date} às {time}<br>• Nome: {name} | Hi! I'd like to book at Ferro & Maré:<br>• Service: {service} ({duration} min)<br>• Barber: {barber}<br>• Day: {date} at {time}<br>• Name: {name} |
| `whatsappGeneric` | Olá! Quero agendar um horário na Ferro & Maré. | Hi! I'd like to book a time at Ferro & Maré. |
| `stepsNav` | Etapas do agendamento | Booking steps |
| `dayLegend` | Dia | Day |
| `timeLegend` | Horário | Time |
| `total` | Total | Total |
| `opening` | Abrindo o WhatsApp… | Opening WhatsApp… |

## 5. Equipe

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Equipe | The team |
| `title` | Três cadeiras. Três especialistas. | Three chairs. Three specialists. |

### Jonas — Degradê e cortes modernos / Fades and modern cuts
Dias: Ter, Qua, Qui, Sex, Sáb

- **PT:** Doze anos de máquina na mão. O degradê dele parece feito com régua.
- **EN:** Twelve years with the clippers. His fades look like they were drawn with a ruler.
- **Botão:** Agendar com Jonas / Book with Jonas

### Bié — Barba clássica na navalha / Classic straight-razor shaves
Dias: Ter, Qua, Qui, Sex, Sáb

- **PT:** Toalha quente, navalha afiada e conversa boa. Barba aqui é com ele.
- **EN:** Hot towel, sharp razor and good conversation. Beards are his department.
- **Botão:** Agendar com Bié / Book with Bié

### Caio — Cortes infantis e social / Kids' cuts and classic styles
Dias: Qua, Qui, Sex, Sáb

- **PT:** Paciência de sobra. Criança entra desconfiada e sai querendo voltar.
- **EN:** Endless patience. Kids walk in suspicious and walk out asking to come back.
- **Botão:** Agendar com Caio / Book with Caio


## 6. Galeria (texto alternativo das fotos)

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Galeria | Gallery |
| `title` | O trabalho fala. | The work speaks. |
| `open` | Ampliar foto: {alt} | Enlarge photo: {alt} |
| `close` | Fechar | Close |
| `prev` | Foto anterior | Previous photo |
| `next` | Próxima foto | Next photo |

| # | Alt PT | Alt EN |
|---|---|---|
| 1 | Degradê baixo com risca lateral, visto de perfil | Low fade with a side part, seen in profile |
| 2 | Barba cheia aparada e contornada na navalha | Full beard trimmed and lined up with a razor |
| 3 | Barbeiro aplicando toalha quente no rosto de um cliente | Barber placing a hot towel on a client's face |
| 4 | Corte social curto com acabamento na tesoura | Short classic cut finished with scissors |
| 5 | Bancada com navalha, pincel e frascos de latão | Counter with a straight razor, brush and brass bottles |
| 6 | Degradê alto com textura no topo | High fade with a textured top |
| 7 | Cadeira de barbeiro clássica sob luz quente | Classic barber chair under warm light |
| 8 | Corte infantil moderno, visto de trás | Modern kids' haircut, seen from behind |
| 9 | Acabamento do pezinho feito com navalha | Neckline cleaned up with a straight razor |

## 7. Clube Ferro & Maré

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Assinatura | Membership |
| `title` | Clube Ferro & Maré | Ferro & Maré Club |
| `pitch` | Pra quem não quer pensar em quando cortou da última vez. | For those who'd rather not remember when they last got a haircut. |
| `price` | R$ 89 | R$ 89 |
| `period` | /mês | /month |
| `benefits` | • 2 cortes por mês<br>• 10% de desconto em produtos<br>• Prioridade na agenda de sábado<br>• Cancele quando quiser, sem multa | • 2 haircuts a month<br>• 10% off all products<br>• Priority on Saturday bookings<br>• Cancel anytime, no fees |
| `cta` | Quero assinar | Join the Club |
| `whatsappMessage` | Olá! Quero assinar o Clube Ferro & Maré (R$ 89/mês). Como funciona? | Hi! I'd like to join the Ferro & Maré Club (R$ 89/month). How does it work? |

## 8. Avaliações (ilustrativas)

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Avaliações | Reviews |
| `title` | Quem senta, volta. | Once you sit, you come back. |
| `label` | Avaliações ilustrativas: projeto conceitual. | Illustrative reviews: concept project. |
| `starsLabel` | {n} de 5 estrelas | {n} out of 5 stars |

| Autor | PT | EN |
|---|---|---|
| R., Boa Viagem (★★★★★) | Agendei no almoço, cheguei e sentei na hora. Sem fila, sem enrolação. | Booked on my lunch break, showed up and sat right down. No line, no fuss. |
| M., Casa Forte (★★★★★) | A barba na toalha quente vale cada centavo. E o café é bom de verdade. | The hot-towel shave is worth every cent. And the coffee is actually good. |
| L., Espinheiro (★★★★★) | Levei meu filho de 6 anos com medo de chorar. Saiu pedindo pra voltar. | Took my 6-year-old expecting tears. He left asking when we're coming back. |
| T., Graças (★★★★★) | Assino o Clube faz quatro meses. Corte sempre em dia e ainda sai mais barato que pagar avulso. | I've been in the Club for four months. My cut's always fresh, and it costs less than paying per visit. |

## 9. Como chegar

**Endereço:** Rua do Exemplo, 000 — Recife Antigo, Recife/PE (fictício)

**Horário:** Dom fechado · Seg fechado · Ter 09:00–20:00 · Qua 09:00–20:00 · Qui 09:00–20:00 · Sex 09:00–20:00 · Sáb 08:00–18:00

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Como chegar | Directions |
| `title` | No coração do Recife Antigo. | Right in the heart of Old Recife. |
| `addressLabel` | Endereço | Address |
| `hoursLabel` | Horário | Opening hours |
| `phoneLabel` | Telefone | Phone |
| `closed` | Fechado | Closed |
| `days` | • Domingo<br>• Segunda<br>• Terça<br>• Quarta<br>• Quinta<br>• Sexta<br>• Sábado | • Sunday<br>• Monday<br>• Tuesday<br>• Wednesday<br>• Thursday<br>• Friday<br>• Saturday |
| `openMaps` | Abrir no Google Maps | Open in Google Maps |
| `loadMap` | Carregar mapa interativo | Load interactive map |
| `call` | Ligar agora | Call now |
| `mapNote` | O mapa só carrega quando você toca, pra página abrir rápido. | The map only loads when you tap, so the page opens fast. |

## 10. FAQ

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Dúvidas | FAQ |
| `title` | Perguntas rápidas. | Quick questions. |
| `items[1].q` | Precisa agendar? | Do I need to book? |
| `items[1].a` | Não é obrigatório, mas quem agenda não espera. Sem horário marcado, a gente encaixa assim que uma cadeira vagar. | It's not required, but people who book don't wait. Walk-ins get the next free chair. |
| `items[2].q` | Aceita Pix? | Do you take Pix or cards? |
| `items[2].a` | Aceita. Pix, crédito, débito e dinheiro. | Yes. Pix (Brazil's instant payment), credit, debit and cash. |
| `items[3].q` | Tem estacionamento? | Is there parking? |
| `items[3].a` | Não temos estacionamento próprio, mas há estacionamentos rotativos a poucos passos. Dá pra vir de bicicleta: tem onde prender. | We don't have our own lot, but there are paid car parks a short walk away. Coming by bike? There's a rack out front. |
| `items[4].q` | Atende criança? | Do you cut kids' hair? |
| `items[4].a` | Atende, sim. O Caio é especialista em corte infantil e tem a paciência que o momento pede. | We do. Caio specializes in kids' cuts and has all the patience it takes. |
| `items[5].q` | E se eu me atrasar? | What if I'm running late? |
| `items[5].a` | Avise pelo WhatsApp. Até 10 minutos a gente segura; depois disso, remarcamos sem custo. | Message us on WhatsApp. We'll hold your chair for 10 minutes; after that, we'll reschedule at no cost. |

## 11. Footer

| Chave | PT | EN |
|---|---|---|
| `tagline` | Barbearia clássica com alma portuária. | A classic barbershop with a harbour soul. |
| `notice` | Projeto conceitual de portfólio: negócio, endereço e avaliações são fictícios. | Portfolio concept project: the business, address and reviews are fictional. |
| `credit` | Site de portfólio · ver estudo de caso | Portfolio site · see the case study |
| `rights` | Ferro & Maré é uma marca fictícia. | Ferro & Maré is a fictional brand. |

## Barra de ação mobile

| Chave | PT | EN |
|---|---|---|
| `whatsapp` | WhatsApp | WhatsApp |
| `call` | Ligar | Call |
| `book` | Agendar | Book |

## Página /obrigado · /en/thank-you

| Chave | PT | EN |
|---|---|---|
| `eyebrow` | Pedido enviado | Request sent |
| `title` | Combinado. Te esperamos. | Done. See you soon. |
| `body` | Seu pedido foi pro WhatsApp. Assim que a gente responder, o horário está garantido. | Your request went to WhatsApp. Once we reply, your time is locked in. |
| `summary` | Seu agendamento | Your booking |
| `addToCalendar` | Adicionar ao calendário | Add to calendar |
| `back` | Voltar ao site | Back to the site |
| `whatsappAgain` | O WhatsApp não abriu? Tocar aqui | WhatsApp didn't open? Tap here |
| `empty` | Não encontramos um agendamento nesta sessão. | We couldn't find a booking in this session. |
| `calendarTitle` | {service} · Ferro & Maré | {service} · Ferro & Maré |
| `googleCalendar` | Google Agenda | Google Calendar |
| `calendarDescription` | Agendamento de demonstração (projeto conceitual de portfólio). | Demo booking (portfolio concept project). |
