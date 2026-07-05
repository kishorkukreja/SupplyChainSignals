# Supply Chain Weather Forecast — 2026-W27

Recurring Supply Chain Signals weather artifact for W27 deadline compression.

## Source mode

- Mode: `signal-translation`
- Provenance: Built from the Signal Translation package on `origin/master` via clean temp worktree `/tmp/selfos-simulator-source-2026-W27-vImodw`.
- Source folder: `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W27/deadline-compression/`

## Source discipline

This artifact deliberately keeps weather stations separate. It does **not** blend Drewry freight rates, NRF/Hackett forecasts, USTR policy dates, CBP refund status, ISM diffusion indexes or FAO commodity indexes into a fake composite score.

## Files

- `index.html` — branded visual/web artifact with map, operator and newsletter views.
- `styles.css` — Supply Chain Signals visual system.
- `app.js` — renders the shared JSON and newsletter insert.
- `data/2026-W27.json` — shared source of truth.
- `newsletter-insert.md` — copy/paste Markdown generated from the JSON content.

## Forecast headline

A July deadline front is turning freight speed into a proof, carton and receiving storm.

## Verification

Run:

```bash
node --check app.js
python3 -m json.tool data/2026-W27.json >/dev/null
python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
assert './styles.css' in html and './app.js' in html
for view in ['mapView', 'operatorView', 'newsletterView']:
    assert f'id="{view}"' in html
assert Path('styles.css').exists() and Path('app.js').exists()
assert Path('data/2026-W27.json').exists()
print('html references ok')
PY
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
