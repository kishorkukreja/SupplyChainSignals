# 2026-W31 Signal-to-Action Brief: Entry proof queue

Static Supply Chain Signals demo app built from the current-week Signal Translation handoff on `origin/master`.

- Week: `2026-W31`
- Topic slug: `entry-proof-queue`
- Source mode: `signal-translation`
- Source path used: `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W31/entry-proof-queue/`
- Files read: `README.md`, `source-map.md`, `visuals.md`, and `substack.md`

## Executive Signal

The tariff rate is the headline. The proof file is the signal. The operator problem is whether each affected shipment, SKU family or sourcing commitment has proof, owner and approval before it hits the entry file.

## What Changed

- USTR announced final Section 301 action tied to forced-labor import enforcement against 60 economies.
- The Federal Register set a 12:01 a.m. ET 24 July effective time and 12:01 a.m. ET 28 July in-transit relief cutoff for qualifying goods.
- Reuters reported the UFLPA Entity List expanded from 144 to 187 entities.
- Drewry, Freightos, NRF/Hackett and Reuters/Descartes indicators are kept as separate weather stations, not blended into one risk score.

## Operator Read

Proof capacity is being rationed. Customs, procurement, logistics, finance, brokers and sales need one trusted row before a shipment becomes an entry, landed-cost update or customer commitment.

## What To Do This Week

Open an entry proof board with one row per affected product or shipment group. Each row should carry product, origin, HTS, authority, exemption state, in-transit status, supplier proof, broker instruction, landed-cost treatment, customer exposure, owner, next review time and failure mode.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```

## Provenance

Built in `/data/SupplyChainSignals` only. `/data/Self-OS` was used read-only through a clean detached `origin/master` worktree; no Self-OS files were modified.
