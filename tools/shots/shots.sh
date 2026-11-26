#!/usr/bin/env bash
# Prints de celular (390 px, 2x) do fluxo de agendamento, para /case e press-kit.
# Uso:  npm run build && npm run shots            (salva em src/assets/case/)
#       bash tools/shots/shots.sh <pasta> [largura altura]
#       SHOTS_EXTRA_CSS='...' bash tools/shots/shots.sh <pasta>   (CSS extra em todos os prints)
# Como funciona: copia dist/ para uma pasta temporária, injeta em cada cópia um
# estado pronto do agendamento (sessionStorage) e fotografa com Firefox headless.
set -euo pipefail
cd "$(dirname "$0")/../.."
out="$(realpath -m "${1:-src/assets/case}")"
w="${2:-390}"
h="${3:-844}"
port=4401
[ -f dist/index.html ] || { echo "Rode 'npm run build' antes." >&2; exit 1; }
mkdir -p "$out"

tmp="$(mktemp -d)"
cleanup() {
  [ -n "${pid:-}" ] && kill "$pid" 2>/dev/null || true
  rm -rf "$tmp" # só a pasta temporária criada acima
}
trap cleanup EXIT

cp -r dist/. "$tmp/site"
mkdir -p "$tmp/prof"
# Densidade 2x (tela de celular) e sem barras de rolagem no print.
cat >"$tmp/prof/user.js" <<'EOF'
user_pref("layout.css.devPixelsPerPx", "2");
user_pref("widget.gtk.overlay-scrollbars.enabled", true);
user_pref("ui.useOverlayScrollbars", 1);
EOF

python3 -I -m http.server "$port" -d "$tmp/site" --bind 127.0.0.1 >/dev/null 2>&1 &
pid=$!
sleep 1

# Próxima sexta-feira (dia aberto para os 3 barbeiros), em Recife.
day="$(TZ=America/Recife date -d 'next friday' +%F)"
base='"service":"corte-barba"'

# shot <nome> <página em dist> <chave> <json> [css extra]
shot() {
  local name=$1 page=$2 key=$3 json=$4 css=${5:-}
  local file="_shot-$name.html"
  local inject="<script>try{sessionStorage.setItem('$key',JSON.stringify($json))}catch(e){}</script><style>*,*::before,*::after{animation:none!important;transition:none!important}$css${SHOTS_EXTRA_CSS:-}</style>"
  # Injeta logo após <head> (sed com | como separador; o JSON não usa |).
  sed "0,/<head>/s|<head>|<head>${inject//&/\\&}|" "$tmp/site/$page" >"$tmp/site/$file"
  timeout 90 firefox --headless --no-remote --profile "$tmp/prof" \
    --window-size="$w,$h" --screenshot "$out/$name.png" "http://127.0.0.1:$port/$file" >/dev/null 2>&1
  echo "  $out/$name.png"
}

only_booking='main > *:not(#agendar){display:none!important}#agendar .section-head{display:none!important}#agendar.section{padding-top:12px!important}'

for lang in pt en; do
  if [ "$lang" = pt ]; then
    home=index.html thanks=obrigado/index.html name=Rafael
  else
    home=en/index.html thanks=en/thank-you/index.html name=Rafael
  fi
  echo "[$lang]"
  shot "$lang-0-hero" "$home" x '{}'
  shot "$lang-1-service" "$home" fm-booking "{\"step\":1,$base}" "$only_booking"
  shot "$lang-2-barber" "$home" fm-booking "{\"step\":2,$base,\"barber\":\"bie\"}" "$only_booking"
  shot "$lang-3-time" "$home" fm-booking \
    "{\"step\":3,$base,\"barber\":\"bie\",\"day\":\"$day\",\"slot\":\"15:30\"}" "$only_booking"
  shot "$lang-4-details" "$home" fm-booking \
    "{\"step\":4,$base,\"barber\":\"bie\",\"day\":\"$day\",\"slot\":\"15:30\",\"name\":\"$name\",\"phone\":\"(81) 9 8765-4321\"}" \
    "$only_booking"
  if [ "$lang" = pt ]; then
    svc='Corte + barba' when="Sex, $(date -d "$day" +%d/%m)" t=15:30
  else
    svc='Haircut + beard' when="Fri, $(LC_ALL=C date -d "$day" '+%b %-d')" t='3:30 PM'
  fi
  shot "$lang-5-thanks" "$thanks" fm-booking-done \
    "{\"lang\":\"$lang\",\"service\":\"$svc\",\"duration\":70,\"price\":80,\"barber\":\"Bié\",\"day\":\"$day\",\"dateLabel\":\"$when\",\"time\":\"15:30\",\"timeLabel\":\"$t\",\"name\":\"$name\",\"waUrl\":\"https://wa.me/\"}"
done
