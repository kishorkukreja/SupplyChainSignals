# W30 Signal-to-Action Brief: Entry Exception Board

Path: `/data/SupplyChainSignals/2026-W30/entry-exception-board-signal-to-action-brief/`

This static app turns the W30 Supply Chain Signals package into an operator-facing Signal-to-Action Brief. It helps an importer convert the weekly signal into a next-72-hour owner queue without asking the user to enter raw operating metrics.

## Source mode

Built from the current-week Signal Translation package found in a clean detached `/data/Self-OS` `origin/master` worktree:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W30/entry-exception-board/README.md`
- `source-map.md`
- `visuals.md`
- final newsletter brief: `wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W30/brief/supply-chain-signals-2026-W30-brief.md`

No newsletter fallback was used.

## Signal summary

- **Executive Signal:** the forced-labor tariff headline became entry execution work.
- **What Changed:** USTR's final action took effect at 12:01 a.m. ET on 24 July 2026; the transition cutoff is 12:01 a.m. ET on 28 July for goods loaded before the effective moment and entered before the cutoff.
- **Operator Read:** the visible rate is less important than row-level exception ownership across product, origin, HTS, exemption status, vessel status, customer commitment and owner.
- **What To Do This Week:** create one entry exception board, assign primary owners, validate proof files and hold customer pricing/service language until treatment is known.
- **Chain of the Week lens:** molecule to medicine, because a reported generic-drug qualification window shows why duty-free time can disappear inside validation and supplier-change work.
- **What To Watch Next:** CBP/broker guidance, USTR clarifications, trading-partner responses, formal generic-drug text, Drewry WCI movement, import-volume follow-through and oil/fuel movement.

## Files

- `index.html` — five-view static app: start, brief builder, output readout, agent workflow and guide.
- `styles.css` — Supply Chain Signals dark/cream/red visual system with serif masthead and signal band.
- `app.js` — deterministic in-browser decision-coach logic.

## Local verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```

Also verify that `index.html` references local `./styles.css` and `./app.js`, and includes `view-start`, `view-brief-builder`, `view-output-readout`, `view-agent-workflow` and `view-guide`.
