# Scaffold — soy-oil-sugar-diwali-ff53a2 (PRIVATE, never appears in final report)

## User Prompt (VERBATIM — gospel)

Research India's 2025-26 sugar supply situation and soybean/edible oil cost pressure and their combined effect on margins for festival-goods manufacturers (mithai, snacks, packaged confectionery) ahead of Diwali 2026 (Nov 8). Specifically resolve: (1) the authoritative 2025-26 sugar production figure — sources in a prior research pass ranged 28.3-34.9 MMT and could not be reconciled; (2) primary-source verification of Bikaji Foods' edible-oil cost inflation (a prior pass found conflicting 12-14% vs 63% figures); (3) the edible-oil import duty timeline (cut May 2025, reportedly raised again Jan 2026) via a primary PIB/CBIC source; (4) any hard mithai-specific sales-volume data post the 2025/2026 price hikes (prior pass found only spend-intent survey data, no confirmed volumes); (5) current RBI reference rate and ICE Brent crude levels for 2026 (prior pass could not verify secondary-sourced figures of INR 94-97/USD and Brent $111-121). Full context and the prior research pass (Bot 1 / Agency Agents) is in drafts/soy-oil-sugar-festival-2026/bot1-evidence-pack-A.md in this repo — read it first so Bot 2's findings are comparable and gap-filling, not duplicative.

## Run config
- vault_tag: soy-oil-sugar-diwali-ff53a2
- query_file_path: research/runs/soy-oil-sugar-diwali-ff53a2/query.md
- scale gear: full (55–80 sources, full adversarial critic suite)
- forced tier: full (Bot 2 mandate — override any lighter classification from step 1)
- modality: synthesize + forecast (defended thesis on margin pressure + forward Diwali-2026 outlook)

## Modality rationale
The query is analytical/argumentative: it asks to resolve five contested numeric/factual questions AND to characterize a combined margin effect ahead of a dated future event (Diwali 2026, Nov 8). Primary modality = synthesize (evidence-chained thesis reconciling contradictory figures); secondary = forecast (forward margin/price outlook). Numbers 1-5 are collect-style fact resolutions embedded inside the synthesize frame.

## Tier rationale
Task mandate ("Bot 2") explicitly requires FULL tier with the full adversarial critic suite regardless of step-1 auto-classification. If step 1 classifies as `light`, OVERRIDE to `full` and run all 16 steps. Rationale: five contested figures with irreconcilable source ranges demand contradiction-graph + depth-investigation + adversarial critics; a light pass would just re-inherit Bot 1's unresolved spreads.

## Comparability / gap-fill mandate (Bot 2 specific)
Bot 1's evidence pack (drafts/soy-oil-sugar-festival-2026/bot1-evidence-pack-A.md) is the prior pass. Bot 2 must be COMPARABLE and GAP-FILLING, not duplicative. Bot 1's explicitly-flagged open gaps to prioritize:
1. Authoritative 2025-26 sugar production number (28.3 / 30.95 net / 32.4 / 34.9 MMT spread — ISMA vs AISTA).
2. Bikaji edible-oil cost inflation primary source (12-14% concall vs 63% baseline) + edible-oil duty timeline via PIB/CBIC.
3. Hard mithai unit-volume/elasticity data post price-hike (Bot 1 had only spend-intent surveys).
4. Disaggregated unorganized-sector cost/margin data (may not exist).
5. Primary RBI reference rate + ICE Brent crude levels for 2026 (INR 94-97/USD, Brent $111-121 unverified).
6. India-US trade deal soybean-oil tariff/TRQ status (margin-relief wildcard).

## Wrapper requirements
- Save path: research/notes/final_report_soy-oil-sugar-diwali-ff53a2.md (pipeline default)
- Citation format: pipeline default (note-id backed inline citations)
- Terminal sections: pipeline default
- No PR, no article-write, no Bot-1 comparison in THIS session (separate session handles synthesis).
- Ship gate: `hyperresearch run finish <vault_tag> --json` must report "passed": true before commit+push.

## Tier rationale (filled after step 1)
Classified FULL / argumentative / wikilink. FULL is both the auto-appropriate tier and the forced Bot 2 mandate: five contested figures with irreconcilable published spreads (sugar 28.3-34.9 MMT; Bikaji 12-14% vs 63%; unverified FX/Brent) require the contradiction-graph, parallel depth-investigation, and full adversarial critic suite — a light pass would merely re-inherit Bot 1's unresolved ranges. Response format is argumentative (defended reconciliation thesis + forward Diwali-2026 margin forecast). inference_depth=deep because the load-bearing numbers live in PIB/CBIC notifications, RBI/ICE archives and company filings that secondary press garbled.
