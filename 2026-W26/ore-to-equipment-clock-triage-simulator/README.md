# W26 Ore-to-Equipment Clock Triage Simulator

Static Supply Chain Signals companion simulator for ISO week `2026-W26`.

## Source mode

Signal Translation material at `/data/Self-OS/wikis/supply-chain-os/raw/analysis/signal-translation/2026-W26/` was absent after the required immediate check plus **4 × 15-minute retries**, so this simulator was built from the newsletter fallback source set:

- `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W26/README.md`
- `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W26/daily/2026-06-28-daily-research.md`
- `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W26/sources/2026-06-28-sources.md`
- `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W26/visuals/README.md`
- `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W26/brief/supply-chain-signals-2026-W26-brief.md`

No `/data/Self-OS` files were modified by this simulator workflow.

## Operating thesis

W26 is about **calendar triage under cost pressure**. The selected chain lens is `ore to equipment`: the bottleneck is not metal as a commodity headline, but equipment item-master truth — HTS code, bill of materials, covered-metal share, origin, supplier attestation, annex treatment, shipment date, tariff assumption and margin.

The app keeps station families separate:

- Drewry WCI and transpacific lane rates are the freight clock.
- USTR Section 301 dates and White House Section 232 treatment are policy clocks.
- LMI transportation and inventory readings are cost/warehouse clocks.
- NRF/Hackett and port flow are timing/demand clocks.

It does **not** blend those sources into a fake master score.

## App shape

- `index.html` — three-view branded static app: landing, simulator, operator guide.
- `styles.css` — Supply Chain Signals dark/cream/red visual system.
- `app.js` — editable order board, scenarios, live exposure readout and recommendations.

## Default reference facts

- Drewry WCI: `$4,166 / 40ft`, up `5%` week over week on 25 June 2026.
- Shanghai-Los Angeles: `$5,750 / 40ft`, up `12%` week over week.
- Shanghai-New York: `$7,149 / 40ft`, up `6%` week over week.
- LMI: overall `69.5`, Transportation Prices `96.0`, Transportation Capacity `31.7`, Inventory Costs about `84`.
- USTR: forced-labor Section 301 written comments due `6 July 2026`; hearings begin `7 July 2026`.
- Section 232: steel, aluminum, copper and derivative products can sit in different treatment buckets depending on category, content, origin, annex coverage and proof.

## Local verification

```bash
node --check app.js
python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
assert './styles.css' in html
assert './app.js' in html
for view in ['view-landing', 'view-simulator', 'view-guide']:
    assert f'id="{view}"' in html
assert Path('styles.css').exists()
assert Path('app.js').exists()
print('html references ok')
PY
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
