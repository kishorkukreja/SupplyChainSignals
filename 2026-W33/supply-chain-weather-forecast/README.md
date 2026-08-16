# 2026-W33 Supply Chain Weather Forecast

Recurring companion artifact for Supply Chain Signals W33, rebuilt for the fresh public thesis: **declarations are becoming testable claims**.

## Source mode

Built from the same source of truth as the new Signal-to-Action Brief: the current-week Signal Translation package in a clean `/data/Self-OS` `origin/master` worktree at commit `566d79d2`.

Primary data file:

- `data/2026-W33.json`

Newsletter insert generated from the same facts:

- `newsletter-insert.md`

No newsletter fallback was used. The earlier `verified-exception-file` framing was not used as the active thesis.

## Weather stations

This artifact intentionally does **not** blend separate public indexes into a fake composite metric. It presents five separate stations:

1. Origin observation
2. Product attributes
3. Flow split
4. Simulation approval
5. Inland and storage condition

Each station contains source-backed facts, owner, operator meaning and external watch item.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m json.tool data/2026-W33.json
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
