# W25 Crude-to-Plastic Clock Triage Simulator

Static companion app for Supply Chain Signals 2026-W25.

## Signal

Working theme from the W25 notes: **planning under moving clocks**. Freight rates, fuel pass-through, tariff/compliance dates, warehouse readiness, and import pull-forward are moving on different calendars, while the purchase-order decision often has to happen before conditions settle.

## Chain/case-study lens

`Crude to plastic`: bunker fuel, petrochemical and packaging cost exposure, consumer-goods import timing, and SKU-level tariff/compliance data.

## App views

1. Landing/start page with W25 reference cards.
2. Simulator view with editable shipment, freight, inventory, stockout, tariff, warehouse, demand, and policy-mode inputs.
3. Operator guide for deciding whether to frontload, split, wait, or redesign.

## Source map

Built from `/data/Self-OS/wikis/supply-chain-os/raw/newsletters/supply-chain-signals/2026-W25/` because the scheduled `signal-translation/2026-W25` folder was absent when the weekly simulator cron ran.

Reference facts used:

- Drewry World Container Index, 18 Jun 2026: composite WCI $3,969 per 40-foot container, +12% WoW; Shanghai-New York $6,769, +15%; Shanghai-Los Angeles $5,142, +10%; Shanghai-Rotterdam $4,342, +15%; Shanghai-Genoa $5,756, +12%.
- Port of Los Angeles May 2026 release: 840,165 TEUs, +17% YoY; loaded imports 449,370 TEUs, +26%; no vessel backlogs or cargo delays.
- ISM June 2026 Supply Chain Planning Forecast: manufacturing revenue +8.4%, services revenue +8.6%; manufacturing prices +14.1%, services prices +8.9%; manufacturing capacity +9.7%, services capacity +7.1%; 77% of manufacturers planned tariff pass-through.
- Manufacturing Dive Razor case: China manufacturing exposure reduced from 100% to about 75%; roughly 25% shifted to Thailand and Vietnam through existing partners.
- Reuters forced-labor tariff proposal and memory-chip warnings retained as watch indicators, not as fabricated numeric indexes.

## Verification

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```

Do not combine Drewry, Freightos, NRF/Hackett, Port of LA, and ISM into one invented metric; the simulator keeps them as separate decision clocks.
