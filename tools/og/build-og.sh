#!/usr/bin/env bash
# Gera public/og.jpg (PT) e public/og-en.jpg (EN), 1200×630, a partir de tools/og/og.html.
# Requer: build feito (usa a ilustração do hero de dist/), Firefox e libvips.
# Uso: npm run build && bash tools/og/build-og.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/prof"

python3 -I - "$tmp" <<'PY'
import re, sys, pathlib
tmp = pathlib.Path(sys.argv[1])
html = pathlib.Path('dist/index.html').read_text()
art = re.search(r'<svg[^>]*class="hero-art[^"]*"[\s\S]*?</svg>', html).group(0)
art = re.sub(r'\sdata-astro-cid-[\w-]+(="[^"]*")?', '', art)
tpl = pathlib.Path('tools/og/og.html').read_text()
texts = {
    'pt': dict(eyebrow='Barbearia clássica · Recife Antigo', tag='Seu horário em 30 segundos.',
               meta='Agende e confirme no WhatsApp', concept='Projeto conceitual'),
    'en': dict(eyebrow='Classic barbershop · Old Recife', tag='Book your chair in 30 seconds.',
               meta='Book online, confirm on WhatsApp', concept='Concept project'),
}
for lang, t in texts.items():
    out = tpl.replace('{{art}}', art)
    for k, v in t.items():
        out = out.replace('{{' + k + '}}', v)
    # caminhos das fontes relativos ao repositório
    out = out.replace('../../public/', str(pathlib.Path.cwd() / 'public') + '/')
    (tmp / f'og-{lang}.html').write_text(out)
PY

for lang in pt en; do
  firefox --headless --no-remote --profile "$tmp/prof" --window-size=1200,630 \
    --screenshot "$tmp/og-$lang.png" "file://$tmp/og-$lang.html" >/dev/null 2>&1 || true
done
vips copy "$tmp/og-pt.png" "public/og.jpg[Q=86,strip]" 2>/dev/null
vips copy "$tmp/og-en.png" "public/og-en.jpg[Q=86,strip]" 2>/dev/null
ls -la public/og.jpg public/og-en.jpg
