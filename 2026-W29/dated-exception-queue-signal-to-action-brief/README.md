# 2026-W29 Signal-to-Action Brief — Dated Exception Queue

Static Supply Chain Signals app for the 2026-W29 weekly signal.

## Source mode

`signal-translation`

Built from the clean `/data/Self-OS` `origin/master` Signal Translation package at:

`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W29/dated-exception-queue/`

Primary handoff files read: `README.md`, `source-map.md`, `visuals.md`, and `substack.md`.

## Executive signal

The week did not produce one clean shock. It produced a pile-up of dated operating files: Brazil tariffs from July 22, USTR forced-labor Section 301 hearings and proof work, UK and EU steel quota rules, mixed freight capacity, EU cargo-data requirements, and long-lead electrical equipment.

## Operator read

Management attention is the constrained asset. The useful internal move is a dated exception board: external trigger, affected family, required file, primary owner, deadline, decision and escalation trigger.

## App views

- Start view — weekly signal and hidden operator problem.
- Brief Builder view — six practical context questions, no raw metrics.
- Output readout — personalized posture, owner queue and watchlist.
- Agent Workflow view — Signal Reader → Business Matcher → Decision Coach.
- Guide view — how to use the signal without a fake composite score.

## Sources used

- USTR forced-labor Section 301 hearing and proposed action releases.
- Reuters Brazil tariff action, July 2026.
- GOV.UK UK steel trade measure from 1 July 2026.
- Reuters EU steel quota coverage.
- NRF/Hackett Global Port Tracker July 2026 forecast.
- Maersk North America and Europe July 2026 market updates.
- Reuters/Wood Mackenzie power equipment lead-time coverage.

## Local verification

```bash
node --check app.js
python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
assert './styles.css' in html and './app.js' in html
for view in ['view-start','view-brief-builder','view-output-readout','view-agent-workflow','view-guide']:
    assert f'id="{view}"' in html
assert Path('styles.css').exists() and Path('app.js').exists()
print('html references ok')
PY
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
