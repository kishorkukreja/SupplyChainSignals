# 2026-W34 Signal-to-Action Brief — Relief without replacement capacity

Static weekly Supply Chain Signals demo app.

## Source mode

Built from the 2026-W34 Signal Translation package found on `/data/Self-OS` `origin/master` in a clean detached temp worktree at commit `6925c440`:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W34/relief-without-replacement-capacity/README.md`
- `research.md`
- `source-map.md`
- `visuals.md`
- `substack.md`
- `quality-gate.md`

The quality gate reports `Final verdict: pass`; the demo did not replace or redefine the newsletter thesis.

## Operator problem

Relief can arrive faster than replacement capacity. Import windows, substitutions, subsidies and price cuts can protect the shelf or invoice temporarily while the real constraint remains in herds, supplier scale, trust, routes, crops, processing or consumer budgets.

## App flow

1. Start view — weekly signal and hidden operator problem.
2. Brief Builder — six context questions about exposed category, relief lever, capacity gap, decision, owner and failure mode.
3. Output readout — deterministic recommendation, rationale, owner queue and external watchlist.
4. Agent Workflow — Signal Reader → Business Matcher → Decision Coach.
5. Guide — how to use the signal without entering raw metrics.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
