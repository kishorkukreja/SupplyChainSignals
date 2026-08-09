# 2026-W32 Supply Chain Weather Forecast

Recurring companion artifact for the W32 Supply Chain Signals demo.

## Shared source of truth

- Web artifact reads `data/2026-W32.json`.
- Newsletter copy/paste insert is saved in `newsletter-insert.md` and mirrors the same stations, owner moves and watch items.

## Source mode

Built from the current-week Signal Translation package found in a clean detached `/data/Self-OS` `origin/master` worktree at demo-run time:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W32/restart-and-reservation-board/README.md`
- `source-map.md`
- `visuals.md`
- `substack.md`

No newsletter fallback was used.

## Forecast discipline

The weather artifact presents separate stations instead of a composite metric:

1. Restart clock
2. Entry-file station
3. Freight/import station
4. Scarce-input station
5. Food-input station

Each station has a source-backed fact set, owner, decision and external watch item.

## Local verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
