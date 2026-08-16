# 2026-W33 Supply Chain Weather Forecast

Recurring companion artifact for Supply Chain Signals W33.

## Source mode

Built from the same source of truth as the Signal-to-Action Brief: the current-week Signal Translation package in a clean `/data/Self-OS` `origin/master` worktree.

Primary data file:

- `data/2026-W33.json`

Newsletter insert generated from the same facts:

- `newsletter-insert.md`

No newsletter fallback was used.

## Weather stations

This artifact intentionally does **not** blend separate public indexes into a fake composite metric. It presents five separate stations:

1. Origin proof
2. Classification / master data
3. Freight capacity
4. Inventory simulation
5. Farm-to-fork proof

Each station contains source-backed facts, owner, decision, and external watch item.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
