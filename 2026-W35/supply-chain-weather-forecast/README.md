# Supply Chain Weather Forecast — 2026-W35

Recurring companion artifact for the Supply Chain Signals weekly demo workflow.

## Source mode

Built from the Signal Translation package present on `/data/Self-OS` `origin/master` at demo-run time:

`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W35/product-boundaries-before-capacity-moves/`

The data source of truth is `data/2026-W35.json`. The web artifact and `newsletter-insert.md` use the same facts and wording so the newsletter insert and visual/web artifact do not drift.

## Editorial discipline

This forecast deliberately keeps separate weather stations instead of blending them into a fake composite metric:

- Canada product-list station.
- Cheese-name access station.
- Auto capacity station.
- VW industrial decision station.
- Freight reference station.
- Food category station.
- Strategic input watch station.

Drewry, FreightWaves/Xeneta, FAO, Reuters policy facts and company-capacity signals are presented as separate owner files and reference cards.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
