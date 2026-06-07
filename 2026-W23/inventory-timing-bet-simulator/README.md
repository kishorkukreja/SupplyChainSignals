# Supply Chain Signals Inventory Timing Bet

A lightweight browser calculator inspired by `Inventory is becoming a timing bet`.

The tool lets an operator enter practical signals and tags the inventory position as:

- Service Buffer
- Tariff Hedge
- Freight Hedge
- Supplier-Risk Buffer
- Old Forecast Risk

It also returns a recommendation: hold with trigger review, sell through, stop-buy, reclassify, or review before the next order.

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

You can also open `index.html` directly in a browser, but the local server path is closer to production hosting.

## Deployment Recommendation

Use Vercel. There is no server requirement, so Railway is unnecessary.

Recommended Vercel settings:

- Project root: `apps/supply-chain-signals-inventory-timing`
- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`

The app is plain HTML, CSS, and JavaScript, so it can also be hosted by any static host.

## Scoring Logic

The scoring logic is in `app.js`.

The model is deliberately simple:

- Demand-backed stock becomes `Service Buffer`.
- Tariff-exposed stock with timing pressure becomes `Tariff Hedge`.
- Freight-exposed stock with timing pressure becomes `Freight Hedge`.
- Supplier-delay exposure becomes `Supplier-Risk Buffer`.
- High days-on-hand, weak demand, and working-capital pressure become `Old Forecast Risk`.

The timing-risk score blends tariff exposure, freight exposure, supplier delay risk, working-capital pressure, inventory value, demand weakness, and excess days-on-hand. It is not a forecast model; it is a reason-code classifier for inventory conversations.
