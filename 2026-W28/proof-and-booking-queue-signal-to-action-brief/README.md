# W28 Proof-and-Booking Queue Signal-to-Action Brief

Static Supply Chain Signals app for 2026-W28.

Source mode: Signal Translation package from `/data/Self-OS` `origin/master` via clean temporary worktree.

Primary source folder:
`wikis/supply-chain-os/raw/analysis/signal-translation/2026-W28/proof-and-booking-queue/`

The app follows the cleaned newsletter structure:

- Start view: weekly signal and hidden operator problem.
- Brief Builder view: six business-context questions, not raw metrics.
- Output readout: next-72-hour decision queue with owners.
- Agent Workflow view: Signal Reader -> Business Matcher -> Decision Coach.
- Guide view: how to use the signal without blending separate sources into one risk score.

Core mechanism: record July import pull-forward becomes a management-capacity problem across booking, proof, cost and strategic inputs.

Verification:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
