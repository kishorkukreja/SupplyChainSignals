# 2026-W34 Supply Chain Weather Forecast

Recurring Supply Chain Signals companion artifact for W34.

## Source mode

Built from the 2026-W34 Signal Translation package found on `/data/Self-OS` `origin/master` in a clean detached temp worktree at commit `6925c440`:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W34/relief-without-replacement-capacity/README.md`
- `research.md`
- `source-map.md`
- `visuals.md`
- `substack.md`

No newsletter workspace was patched by this demo run. The copy/paste insert is in `newsletter-insert.md` and is rendered from the same shared JSON source in `data/2026-W34.json`.

## Source discipline

The artifact presents separate weather stations. It does not combine Reuters food-safety facts, Reuters import-policy facts, trader estimates, FAO category indexes or retail-price reporting into a fake composite score.

## Stations

- Beef relief station
- Lettuce trust station
- Edible-oil substitution station
- Sugar policy station
- Food category split station

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m json.tool data/2026-W34.json >/dev/null
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
