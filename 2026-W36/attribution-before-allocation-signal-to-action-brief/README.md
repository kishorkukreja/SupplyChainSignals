# Supply Chain Signals 2026-W36 Signal-to-Action Brief

Topic: **Attribution before allocation**

Source mode: **Signal Translation primary source**. Built from the current `origin/master` clean worktree package at:

`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W36/attribution-before-allocation/`

Newsletter quality gate: **pass** from `wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W36/brief/supply-chain-signals-2026-W36-quality-gate.md`.

## What the app does

This is a static in-browser Signal-to-Action Brief, not a raw simulator. It helps an operator turn the W36 signal into a 72-hour action queue without asking them to enter proof/carton/dock/freight percentages or other raw operating metrics.

Five views are included:

1. Start view — weekly signal and hidden operator problem.
2. Brief Builder — 6 practical context questions.
3. Output readout — personalized decision, rationale, owner queue and watchlist.
4. Agent Workflow — Signal Reader → Business Matcher → Decision Coach.
5. Guide — how to use attribution before allocation as an approval gate.

## Traceable source facts used

- ISM Manufacturing cooled while supplier deliveries rose to 59.3 and prices stayed at 71.1.
- ISM Services strengthened to 55.4; new orders rose to 60.9 and prices reached 72.6 while supplier deliveries eased to 51.3.
- FAO August Food Price Index rose to 133.3; all five groups rose, with sugar +11.9% and cereals +2.2%.
- Freight evidence is deliberately kept split: FreightWaves/McCown warned of a September air pocket while NRF/Hackett was less severe; Drewry was not used as a chart claim.
- AI hardware pressure is treated as separate physical constraints: chips, power equipment, cooling, grid connection and component lead times.

## Local verification

Required commands:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```

HTML coverage must include local `./styles.css`, local `./app.js`, and IDs for `startView`, `briefBuilderView`, `outputReadoutView`, `agentWorkflowView`, and `guideView`.
