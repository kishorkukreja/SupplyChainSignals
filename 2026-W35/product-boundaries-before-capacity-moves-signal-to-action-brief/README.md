# Supply Chain Signals 2026-W35 — Product Boundaries Before Capacity Moves

Static Signal-to-Action Brief app generated for the Sunday weekly demo workflow.

## Source mode

Built from the Signal Translation package present on `/data/Self-OS` `origin/master` at demo-run time:

`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W35/product-boundaries-before-capacity-moves/`

Primary source files used: `README.md`, `research.md`, `source-map.md`, `visuals.md`, `substack.md`, and the published newsletter brief at `raw/newsletters/supply-chain-signals/2026-W35/brief/supply-chain-signals-2026-W35-brief.md`.

## App job

The app converts this week's finished newsletter signal into an operator decision brief. It does **not** ask the user to enter raw tariff, carton, dock, freight or margin metrics. The user answers practical context questions about exposed product family, next 72-hour decision, constraint, owner, implementation friction and first external clock.

Five-view pattern preserved:

1. Start view — weekly signal and hidden operator problem.
2. Brief Builder — 4–6 business-context questions.
3. Output readout — personalized recommendation, owner queue and external watchlist.
4. Agent Workflow — Signal Reader → Business Matcher → Decision Coach handoff.
5. Guide — how to use the weekly signal without doing the signal translation yourself.

## Source facts encoded as reference cards

- Canada announced counter-tariffs across roughly 700 products, with 15%, 25% and 50% rates and a planned 8 September start.
- Canada removed seafood and fish from the list after feedback about economic harm.
- Reuters reported cheese-name protections as a U.S.-Mexico trade-talk stumbling block.
- Reuters reported a threatened 50% U.S. tariff on Canadian vehicles, auto parts and trucks from 1 January 2027.
- VW's supervisory board is due to meet on 4 September over possible restructuring.
- Drewry's 27 August WCI was $4,473 per 40-foot container, down 1%; it is kept as freight context, not blended into the product-boundary thesis.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
