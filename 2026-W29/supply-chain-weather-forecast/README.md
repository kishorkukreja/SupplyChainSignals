# 2026-W29 Supply Chain Weather Forecast

Recurring companion artifact for the 2026-W29 Supply Chain Signals demo.

## Source mode

`signal-translation`

Built from the clean `/data/Self-OS` `origin/master` Signal Translation package at:

`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W29/dated-exception-queue/`

Primary handoff files read: `README.md`, `source-map.md`, `visuals.md`, and `substack.md`.

## Source discipline

This artifact deliberately presents separate weather stations rather than a blended supply-chain risk score. Brazil tariffs, USTR proof work, steel quotas, port forecasts, carrier updates, ICS2 data requirements and electrical-equipment lead times use different source families, owners and clocks.

Shared source of truth: `data/2026-W29.json`.

Newsletter copy/paste insert: `newsletter-insert.md`.

## Weather stations

- Brazil tariff clock — July 22 red-date front.
- Forced-labor proof — documentation fog bank.
- UK/EU steel — quota-pressure system.
- North America booking — compressed peak-season squall.
- Europe cargo data — ICS2 data-quality turbulence.
- Power equipment — long-lead capacity drought.

## Local verification

```bash
node --check app.js
python3 -m json.tool data/2026-W29.json >/dev/null
python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
assert './styles.css' in html and './app.js' in html
for view in ['mapView','operatorView','newsletterView']:
    assert f'id="{view}"' in html
assert Path('styles.css').exists() and Path('app.js').exists()
assert Path('data/2026-W29.json').exists()
print('weather html references ok')
PY
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
