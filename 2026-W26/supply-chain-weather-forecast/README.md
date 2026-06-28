# W26 Supply Chain Weather Forecast

A dual-use companion artifact for Supply Chain Signals:

1. **Newsletter insert**: `newsletter-insert.md` is ready to paste into the W26 newsletter.
2. **Visual web artifact**: `index.html`, `styles.css`, `app.js`, and `data/2026-W26.json` render the same forecast as a branded weather-map page.

## Source mode

Signal Translation material for `2026-W26` was absent after the required immediate check plus **4 × 15-minute retries**, so this artifact uses the newsletter fallback source set:

- `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W26/README.md`
- latest daily research: `daily/2026-06-28-daily-research.md`
- latest source notes: `sources/2026-06-28-sources.md`
- weekly brief: `brief/supply-chain-signals-2026-W26-brief.md`
- visuals workspace: `visuals/README.md`

## Forecast thesis

W26 is about **calendar triage under cost pressure**. Freight, tariff classification, inventory placement, port timing, and strategic-input controls are separate clocks. The weather metaphor helps readers remember the operating state without pretending the signals are one composite index.

## Newsletter placement

Insert after the working thesis or before "What to Watch". Keep the source discipline: Drewry, LMI, NRF/Hackett, Section 232 explainers and Reuters rare-earth reporting remain separate weather stations.

## Local verification

Run from this folder:

```bash
node --check app.js
python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
assert './styles.css' in html
assert './app.js' in html
for view in ['mapView', 'operatorView', 'newsletterView']:
    assert f'id="{view}"' in html
assert Path('styles.css').exists()
assert Path('app.js').exists()
assert Path('data/2026-W26.json').exists()
print('html references ok')
PY
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
