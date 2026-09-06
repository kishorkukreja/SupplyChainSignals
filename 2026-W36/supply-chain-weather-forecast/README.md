# Supply Chain Weather Forecast 2026-W36

Source mode: **Signal Translation primary source**.

Built from the current `origin/master` Signal Translation package:

`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W36/attribution-before-allocation/`

The same source of truth powers:

- `data/2026-W36.json`
- `index.html`
- `newsletter-insert.md`

## Editorial discipline

This artifact does **not** blend unrelated metrics into a composite weather score. It presents separate weather stations for manufacturing inputs, services prices, food commodity categories, freight/import timing, AI hardware/power equipment and fuel/energy policy.

## Newsletter insert

Copy/paste insert path:

`/data/SupplyChainSignals/2026-W36/supply-chain-weather-forecast/newsletter-insert.md`

The newsletter workflow is responsible for inserting the section into Self-OS if desired. This demo run did not patch `/data/Self-OS`.

## Verification

Required commands:

```bash
node --check app.js
python3 -m json.tool data/2026-W36.json >/dev/null
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```

HTML coverage must include local `./styles.css`, local `./app.js`, and IDs for `mapView`, `operatorView`, and `newsletterView`.
