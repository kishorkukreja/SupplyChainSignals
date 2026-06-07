# Supply Chain Signals Inventory Timing Bet Simulator

A static browser simulator inspired by `Inventory is becoming a timing bet`.

The tool lets an operator edit a small SKU portfolio, assign ABC/XYZ segments, and compare inventory positions against three scenarios from the article:

- Soft landing for inventory
- Bullwhip hangover
- Policy and freight squeeze

Each SKU returns:

- ABC/XYZ-derived service target and cost tolerance
- Inventory reason code
- Baseline timing-risk score
- Scenario timing-risk score
- Recommended action

## Local Run

This is a static app with no backend and no package install.

From this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

You can also open `index.html` directly in a browser.

## Deployment

The current Vercel project is deployed from this folder:

```text
2026-W23/inventory-timing-bet-simulator
```

Production URL:

```text
https://inventory-timing-bet-simulator.vercel.app
```

Recommended Vercel settings:

- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`

## Scoring Logic

The scoring logic is in `app.js`.

ABC/XYZ sets the operating policy first:

- `AX`: highest service target and highest cost tolerance
- `AY`, `AZ`, `BX`: high service and moderate-high tolerance
- `BY`, `BZ`, `CX`: moderate service and tolerance
- `CY`, `CZ`: lower service and low tolerance

The timing-risk score blends tariff exposure, freight exposure, supplier delay risk, working-capital pressure, inventory value, demand weakness, service gap, and excess days on hand. The model is a reason-code classifier for inventory conversations, not a forecast model.
