# 2026-W33 Signal-to-Action Brief — Verified Exception File

Static Supply Chain Signals app for the 2026-W33 signal: **the verified exception file**.

## Source mode

Built from the current-week Signal Translation package in a clean `/data/Self-OS` `origin/master` worktree:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W33/verified-exception-file/README.md`
- `source-map.md`
- `visuals.md`
- `substack.md`

No newsletter fallback was used.

## Operator flow

1. Start view: states the weekly signal and hidden operator problem.
2. Brief Builder: asks context questions about lane, decision, owner, constraint and friction.
3. Output Readout: produces a deterministic 72-hour owner queue and external watchlist.
4. Agent Workflow: shows Signal Reader → Business Matcher → Decision Coach.
5. Guide: explains how to use the signal without entering raw operating metrics.

## Editorial structure

- Executive Signal: verified exception files now matter more than raw dashboards.
- What Changed: transshipment enforcement, freight/import divergence, AI planning, Rhine constraints and farm-to-fork proof pressure.
- Operator Read: attach source, owner, proof artifact, deadline, approval and failure mode to the relevant SKU, supplier, entry, shipment, route, storage site or planning exception.
- Operating model: five-lane verified-exception board.
- What To Do This Week: assign owners and proof files in the next 72 hours.
- What To Watch Next: external-only watchlist.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
