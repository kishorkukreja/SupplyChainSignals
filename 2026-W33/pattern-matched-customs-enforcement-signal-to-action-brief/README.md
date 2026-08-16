# 2026-W33 Signal-to-Action Brief — Pattern-Matched Customs Enforcement

Static Supply Chain Signals app for the fresh 2026-W33 thesis: **declarations are becoming testable claims**.

## Source mode

Built from the current-week Signal Translation package in a clean `/data/Self-OS` `origin/master` worktree at commit `566d79d2`:

- `wikis/supply-chain-os/raw/analysis/signal-translation/2026-W33/pattern-matched-customs-enforcement/README.md`
- `research.md`
- `source-map.md`
- `visuals.md`
- `substack.md`

The finished newsletter brief used for this run is:

- `wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W33/brief/supply-chain-signals-2026-W33-brief.md`

No newsletter fallback was used. The previously generated `verified-exception-file` framing and any `2026-W33_old` material were treated only as rejected anti-repeat context, per the run override.

## Operator flow

1. Start view: states the weekly signal and the hidden operator problem.
2. Brief Builder: asks six practical context questions about exposed decision, chain lens, owner, constraint, evidence friction and timing.
3. Output Readout: generates a personalized decision, rationale, next-72-hour owner handoff and external watchlist.
4. Agent Workflow: shows Signal Reader → Business Matcher → Decision Coach.
5. Guide: explains how to use the weekly signal without asking users to enter raw operating metrics.

## Editorial structure

- Executive Signal: declarations are becoming testable claims.
- What Changed: CBP pattern detection, Section 301 timing, Section 232 / drone tariff clocks, import/rate divergence, simulation and inspection signals.
- Operator Read: record quality is response speed; declared records must survive comparison with observable evidence.
- What To Do This Week: assign owner, evidence surface, approval path and watch item for the decision due now.
- What To Watch Next: external-only CBP, Federal Register, import, rate, Rhine and AI/simulation signals.

## Verification

Run from this folder:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
