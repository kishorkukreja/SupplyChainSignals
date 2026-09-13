## Coverage Matrix — query phrase → atomic item mapping

| Query phrase (verbatim) | Mapped atomic item(s) | Scope check | Gap? |
|---|---|---|---|
| "India's 2025-26 sugar supply situation" | SubQ1; entity: India 2025-26 sugar production, ISMA, AISTA, NFCSF/govt | OK — full season scope, all estimating bodies | No |
| "soybean/edible oil cost pressure" | SubQ3, SubQ6; entity: edible-oil import duty, Bikaji cost inflation | OK — soybean + palm + duty + FX drivers all in scope | No |
| "combined effect on margins for festival-goods manufacturers" | SubQ6; entities: Bikaji, Britannia, Nestle India | OK | No |
| "mithai, snacks, packaged confectionery" | SubQ4, SubQ7; entities: unorganized mithai/halwai, branded snack/confectionery | OK — both organized and unorganized covered | No |
| "ahead of Diwali 2026 (Nov 8)" | SubQ6, SubQ8; entity: Diwali 2026; time_horizon forward | OK — dated forward event | No |
| "(1) authoritative 2025-26 sugar production figure ... 28.3-34.9 MMT ... could not be reconciled" | SubQ1; required_formats: reconciliation table | OK — gross vs net + estimating body captured | No |
| "(2) primary-source verification of Bikaji Foods' edible-oil cost inflation ... 12-14% vs 63%" | SubQ2; entity: Bikaji Foods (primary_source, period) | OK — primary source (concall/IR) required | No |
| "(3) edible-oil import duty timeline (cut May 2025, raised Jan 2026) via primary PIB/CBIC" | SubQ3; entity: edible-oil import duty; time_periods May 2025 + Jan 2026 | OK — notification number + effective date captured | No |
| "(4) hard mithai-specific sales-volume data post price hikes" | SubQ4; scope: unit volumes NOT spend-intent | OK — explicitly distinguishes volume vs intent | No |
| "(5) current RBI reference rate and ICE Brent crude levels for 2026 ... INR 94-97/USD and Brent $111-121" | SubQ5; entities: RBI reference rate, ICE Brent | OK — both metrics, primary source | No |
| "margins" / "pass-through" (implicit) | SubQ7; entity: GST 2.0, Sugar Stockholding Limit Order | OK — asymmetry + policy offsets in scope | No |
| "India-US trade deal soybean-oil tariff/TRQ" (from Bot 1 missing-list, implied by 'edible oil cost pressure') | SubQ8; entity: India-US trade deal TRQ | OK — flagged wildcard covered | No |
| "gap-filling, not duplicative" (vs Bot 1 pack) | scope_conditions | OK — comparability mandate recorded | No |

**Zero `Gap? = YES` rows.** Decomposition covers every named phrase, both organized/unorganized readings, and all five numbered resolutions plus the trade-deal wildcard.
