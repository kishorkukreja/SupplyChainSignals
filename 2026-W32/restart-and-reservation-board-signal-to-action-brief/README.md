# 2026-W32 Signal-to-Action Brief — Restart-and-Reservation Board

Static Supply Chain Signals app for ISO week 2026-W32.

## Source mode

Built from the current-week Signal Translation package found in a clean detached `/data/Self-OS` `origin/master` worktree at demo-run time:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W32/restart-and-reservation-board/README.md`
- `source-map.md`
- `visuals.md`
- `substack.md`

No newsletter fallback was used.

## Executive Signal

The peak may be fading, but the queue remains. The useful W32 operating question is not whether supply chains are tight or loose; it is which clock now needs an owner.

## App structure

- Start view: states the weekly signal and hidden operator problem.
- Brief Builder view: asks practical context questions about exposure, due decision, owner, constraint and friction.
- Output readout: generates a deterministic 72-hour owner queue and external watchlist.
- Agent Workflow view: shows Signal Reader → Business Matcher → Decision Coach.
- Guide view: explains how to use the weekly signal without entering raw operating metrics.

## Source discipline

The app keeps ISM diffusion indexes, TEU forecasts, freight rates, CBP/USTR filing guidance, FAO price indexes, weather/restart events and dated policy windows as separate decision cards. It does not blend them into a fake composite supply-chain score.

## Local verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
