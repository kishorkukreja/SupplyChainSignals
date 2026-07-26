# W30 Supply Chain Weather Forecast

Path: `/data/SupplyChainSignals/2026-W30/supply-chain-weather-forecast/`

This recurring companion artifact presents W30 supply-chain weather as separate stations, not a fake composite score. The shared source of truth is `data/2026-W30.json`; both the web artifact and `newsletter-insert.md` are derived from that JSON content.

## Source mode

Built from the current-week Signal Translation package found in a clean detached `/data/Self-OS` `origin/master` worktree:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W30/entry-exception-board/README.md`
- `source-map.md`
- `visuals.md`
- final newsletter brief: `wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W30/brief/supply-chain-signals-2026-W30-brief.md`

No newsletter fallback was used.

## Stations

- USTR entry clock
- Duty coverage
- India exemption math
- Brazil stacking
- Freight station
- Import volume
- Pharma qualification
- AI infrastructure
- Fuel station

## Files

- `index.html` — branded static weather artifact.
- `styles.css` — Supply Chain Signals dark/cream/red visual system.
- `app.js` — loads and renders `data/2026-W30.json`.
- `data/2026-W30.json` — shared forecast source.
- `newsletter-insert.md` — copy/paste newsletter insert generated from the same JSON content.

## Local verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```

Also verify that `index.html` references local `./styles.css` and `./app.js`, and that `data/2026-W30.json` parses as JSON.
