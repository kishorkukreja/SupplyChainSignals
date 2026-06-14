# Supply Chain Signals Cost-of-Time Simulator

Static browser simulator for the 2026-W24 Signal Translation package: `The cost of time in supply chains`.

The app turns the week’s signal into an operator decision tool. It models open purchase orders as a stack of clocks:

- carrier clock: spot freight, GRIs, fuel pass-through, capacity and blank sailings;
- policy clock: tariff rates, USTR process dates, country exposure and exemptions;
- compliance clock: origin evidence and forced-labor documentation readiness;
- retail clock: demand proof, seasonal dates and sell-through risk;
- finance clock: margin buffer, working capital and repricing window;
- supplier clock: lead-time reliability and backup qualification.

## Included views

1. `Start`: landing page explaining the W24 signal and entry choices.
2. `Simulator`: editable purchase-order board, scenario/policy buttons, live risk readout and portfolio recommendations.
3. `Guide`: operator instructions, scenario meanings and clock-code definitions.

## Scenario modes

- `The premium works`: early movement protects service and demand absorbs the freight/fuel premium.
- `Air pocket arrives`: June pull-forward borrowed from July/August, inventory ages and cash drag rises.
- `Policy and fuel squeeze`: tariff detail, fuel pass-through and documentation gaps stay expensive.

## Source basis

This simulator uses the local Signal Translation source folder:

```text
/data/Self-OS/wikis/supply-chain-os/raw/analysis/signal-translation/2026-W24/cost-of-time-in-supply-chains/
```

Key facts reflected in the app:

- Drewry WCI: `$3,549` per 40ft container on 11 June, up `3%` week over week.
- Reuters fuel signal: VLSFO averaged `$845` across 20 hubs; bunker fuel was reported up `55%` since the Iran conflict began.
- NRF/Hackett forecast: June U.S. imports at `2.25M TEU`, up `14.3%` YoY, followed by weaker July/August forecasts.
- USTR forced-labor process clock: hearing requests due `22 Jun`, comments due `6 Jul`, hearings starting `7 Jul`; proposed duties of `10%`/`12.5%` across 60 economies.
- ISM operating friction: Manufacturing Prices `82.1`; Services Prices `71.3`; Services Inventories `62.5`.

The app keeps those sources as reference cards and does **not** combine them into a fake unified market index.

## Local run

No build step or package install is required.

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

## Verification run

Expected checks from this folder:

```bash
node --check app.js
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
# checks local script/link references and required view IDs
PY
python3 -m http.server 4173
curl -I http://127.0.0.1:4173/
```
