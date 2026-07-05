# Deadline Compression Simulator — 2026-W27

Static Supply Chain Signals companion simulator for the W27 Signal Translation package.

## Source mode

- Mode: `signal-translation`
- Provenance: Built from the Signal Translation package on `origin/master` via clean temp worktree `/tmp/selfos-simulator-source-2026-W27-vImodw`.
- Topic slug: `deadline-compression`
- Source folder: `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W27/deadline-compression/`

## Operating thesis

Retailers are pulling seasonal China orders four to six weeks early while spot freight, USTR proof work, CBP CAPE refunds, carton readiness and receiving calendars collide in the same July queue. The simulator turns that signal into an editable decision board.

## Files

- `index.html` — three-view app shell: landing, simulator, guide.
- `styles.css` — Supply Chain Signals visual system.
- `app.js` — editable simulator, scenario logic and live recommendations.

## Traceable figures used

- Drewry WCI: $4,530 per 40-foot container on 2 July, +9% week over week and +61% year over year.
- Drewry lanes: Shanghai–Los Angeles $6,349; Shanghai–New York $7,902.
- Reuters: retailers moved China orders four to six weeks early; May imports from China +35% YoY with normal-to-soft demand caveat.
- NRF/Hackett: June major-port imports forecast at 2.25M TEU, +14.3% YoY; July–September below 2025.
- USTR/Federal Register: comments due 6 July; hearings begin 7 July; proposed duty tiers 10% and 12.5% with textile/apparel mechanism.
- CBP/Supply Chain Dive: CAPE refund processing creates entry-file and finance work; published expansion figures cited $28.7B and possible later $11.4B.

## Local verification

Run:

```bash
node --check app.js
python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
assert './styles.css' in html and './app.js' in html
for view in ['view-landing', 'view-simulator', 'view-guide']:
    assert f'id="{view}"' in html
assert Path('styles.css').exists() and Path('app.js').exists()
print('html references ok')
PY
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
