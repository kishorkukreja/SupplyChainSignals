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

## Tutorial

Use the simulator as a structured inventory meeting tool. It is not trying to forecast demand. It is trying to explain why inventory exists and how that reason changes under different operating conditions.

### 1. Start with the SKU portfolio

The table ships with sample SKU families. Replace the names and values with a real product family, category, supplier lane, or item group.

For each row, edit:

- `SKU / family`: the inventory position being discussed.
- `ABC`: commercial or value importance.
- `XYZ`: demand predictability.
- `Days`: current inventory days on hand.
- `Value`: dollars tied up in the position.
- `Demand`: confidence that demand will absorb the stock.
- `Tariff`: how exposed the item is to tariff or policy timing.
- `Freight`: how exposed the item is to freight-rate timing.
- `Supplier`: supplier delay or lead-time variance risk.
- `Capital`: working-capital pressure from finance.

The five score inputs from `Demand` through `Capital` use a simple 0-100 scale:

- `0-30`: low pressure or weak signal.
- `31-60`: mixed or moderate pressure.
- `61-100`: high pressure or strong signal.

### 2. Read ABC/XYZ

ABC answers: how much does this item matter commercially?

- `A`: high value, margin, strategic account, or availability impact.
- `B`: meaningful, but not the highest-priority segment.
- `C`: lower value or easier to trade off.

XYZ answers: how predictable is demand?

- `X`: stable and predictable.
- `Y`: somewhat variable.
- `Z`: volatile, lumpy, or hard to trust.

The chip under each SKU combines the two. For example, `AX · 98% service · 9% tolerance` means the model will protect service aggressively and allow more cost to avoid stockouts. `CZ · 85% service · 1% tolerance` means the model expects tighter cash discipline.

### 3. Read the row result

Each row shows:

```text
Baseline risk -> scenario risk
```

Example:

```text
42 -> 58
+16 risk · Reclassify before next order
```

That means the SKU is manageable in the baseline, but the selected scenario makes it more exposed. The recommended action is the scenario action, not a permanent policy.

### 4. Use the scenarios

Click one of the three scenario buttons:

- `Soft landing`: demand improves, inventory days fall, and freight/tariff/supplier/cash pressure eases. If risk falls here, the stock was probably a prudent buffer.
- `Bullwhip hangover`: demand weakens, inventory ages, and working-capital pressure rises. If risk jumps here, the stock may have been pulled forward ahead of real demand.
- `Policy and freight squeeze`: tariff, freight, and supplier pressure rise together. If risk jumps here, the SKU needs reason-code separation before new buys.

### 5. Interpret reason codes

- `Service Buffer`: inventory exists to protect service or a real customer promise.
- `Tariff Hedge`: inventory exists because policy timing made earlier buying attractive.
- `Freight Hedge`: inventory exists because freight timing made earlier booking attractive.
- `Supplier-Risk Buffer`: inventory exists because supply reliability is uncertain.
- `Old Forecast Risk`: inventory may be tied to demand that has weakened or already happened.

### 6. Interpret recommendations

- `Hold with reorder trigger`: keep the stock, but release the next buy only after sell-through proof.
- `Hold with supplier trigger`: keep buffer while supplier risk remains elevated.
- `Reclassify before next order`: the inventory may be a hedge, but do not manage it like service stock.
- `Sell through`: avoid adding more until demand proves itself.
- `Stop-buy and sell through`: cash pressure and weak demand are high enough to pause buys.
- `Separate reason codes now`: the position is being pulled by too many clocks; split the inventory into service, hedge, supplier-risk, or old-forecast buckets.

### 7. Read the portfolio panel

The right panel summarizes the meeting:

- `Portfolio value`: total dollars represented by the rows.
- `Value at 60+ risk`: dollars attached to baseline timing-risk scores of 60 or higher.
- `Avg risk shift`: average baseline risk into selected scenario risk.
- `Scenario exceptions`: SKU count where the scenario recommends stop-buy or reclassification.
- `Baseline reason mix`: how portfolio dollars are distributed by inventory reason code.

Use the portfolio read to find the exposed tail first. The goal is not to make every SKU low risk. The goal is to know which inventory is protecting service and which inventory is making a timing bet.

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
