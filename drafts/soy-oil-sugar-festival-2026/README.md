# Soy Oil + Sugar Deficit — India Festival Market (Diwali 2026)

Working folder for the opinionated Supply Chain Signals article on soybean oil price pressure + India's sugar supply squeeze ahead of the 2026 festival season (Diwali Nov 8, 2026).

**Source task:** [Notion — Create opinionated blog on soy oil and sugar deficit impact on India's festival market](https://app.notion.com/p/3c5fa0aaebdf8186b02fc7c56a1f80e9) (Task OS Canonical, Work ID `w_01M1X0D7Q97QCFVCDE4849ZMB3`)

## Workflow being followed

Per the Notion task, this article runs through a two-model research-comparison pipeline before drafting:

1. **Bot 1 — Agency Agents** ([msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)) — DONE, this session.
2. **Bot 2 — hyperresearch** ([jordan-gibbs/hyperresearch](https://github.com/jordan-gibbs/hyperresearch)) — installed this session, **not yet run**. See below.
3. Merge/compare both bots' claims → adversarial red-team → synthesis → article draft → visual brief.

## Status: Bot 1 (Agency Agents) — complete

Ran three Agency Agents specialist personas as parallel research subagents (no Hermes router — orchestrated directly), each doing live web research against the same working thesis:

- `bot1-trend-researcher.md` — Trend Researcher persona: thesis refinement, research questions, market signals
- `bot1-pricing-analyst.md` — Pricing Analyst persona: cost structure, price transmission, elasticity, sensitivity framing
- `bot1-business-strategist.md` — Business Strategist persona: supply-chain mapping, second-order effects, scenario framework
- `bot1-evidence-pack-A.md` — **merged evidence pack**: cross-specialist agreement, contradictions, sensitivity model, open gaps. Start here.

**Headline finding:** all three specialists independently converged on the same three corrections to the original working thesis — (1) the "sugar deficit" is contested by ISMA's own data and is better framed as a stock/hoarding/policy-lag story, (2) soy oil and sugar are independent cost shocks landing in the same seasonal window, not one shared cause, and (3) the organized-vs-unorganized risk split is about who has multiple quiet levers (grammage cuts, hedging, GST headroom) vs. one blunt lever (a visible price hike), not simply who "can" pass through costs.

Full detail, sources, and known data-reliability caveats (several Indian business-press domains returned egress-blocked on direct fetch; a handful of load-bearing numbers need primary-source verification) are in `bot1-evidence-pack-A.md`.

## Status: Bot 2 (hyperresearch) — installed, ready to run next session

`hyperresearch` (PyPI, v0.11.1) is a Claude Code skill framework, not an independent research engine — it drives *this same Claude session* through a stricter, citation-audited pipeline (decompose → width-sweep fetch → contradiction graph → depth investigation → cross-locus reconcile → triple-draft → synthesize → 4 parallel critics → gap-fetch → patch → cite-check → polish → readability audit), backed by a SQLite-tracked vault for provenance.

**Why it wasn't run this session:** its 16-18 step skills only get registered in Claude Code's skill list at session start. They were installed here mid-session, so `Skill(skill: "hyperresearch")` couldn't resolve them. Installing into the repo (this commit) means a **fresh session** starting in this repo will have them registered natively.

### To run Bot 2 in a fresh session

1. **Prerequisite (this container is ephemeral — the pip package itself does not survive to a new session):**
   ```bash
   pip3 install --user hyperresearch
   ```
   The repo's `.claude/skills/`, `.claude/agents/`, `.claude/settings.json` hook, and `CLAUDE.md` blurb are already committed — only the Python package needs reinstalling.
2. Invoke: `/hyperresearch <research query>` — see suggested query below.
3. The entry skill (`.claude/skills/hyperresearch/SKILL.md`) auto-bootstraps the vault (`hyperresearch init .`) and step skills if missing — safe to run unconditionally.

**Suggested Bot 2 research query** (same working thesis Bot 1 used, so outputs are comparable, plus explicit instructions to target Bot 1's stated gaps):

> Research India's 2025-26 sugar supply situation and soybean/edible oil cost pressure and their combined effect on margins for festival-goods manufacturers (mithai, snacks, packaged confectionery) ahead of Diwali 2026 (Nov 8). Specifically resolve: (1) the authoritative 2025-26 sugar production figure — sources in a prior research pass ranged 28.3-34.9 MMT and could not be reconciled; (2) primary-source verification of Bikaji Foods' edible-oil cost inflation (a prior pass found conflicting 12-14% vs 63% figures); (3) the edible-oil import duty timeline (cut May 2025, reportedly raised again Jan 2026) via a primary PIB/CBIC source; (4) any hard mithai-specific sales-volume data post the 2025/2026 price hikes (prior pass found only spend-intent survey data, no confirmed volumes); (5) current RBI reference rate and ICE Brent crude levels for 2026 (prior pass could not verify secondary-sourced figures of INR 94-97/USD and Brent $111-121). Full context and the prior research pass (Bot 1 / Agency Agents) is in `drafts/soy-oil-sugar-festival-2026/bot1-evidence-pack-A.md` in this repo — read it first so Bot 2's findings are comparable and gap-filling, not duplicative.

Recommended tier: **full** (the installed default gear; ~1.5-2.5 hours, 55-80 sources, full adversarial critic suite) — matches the Notion task's explicit "adversarial research / fact check" stage. **light** tier (~30-40 min, 15-25 sources, no critics) is available if a faster/cheaper pass is preferred; switch gears with `hyperresearch profile use <full|premier>` before starting (takes effect on the next run, not mid-run).

## Not yet done (per the original Notion workflow)

- Merge Bot 1 + Bot 2 claims into a single reconciled evidence pack with confidence ratings
- Adversarial red-team pass (Reality Checker persona, adapted — its native persona is web-QA-specific and needs the tooling stripped, keeping only its "default to NEEDS WORK, demand evidence" posture)
- Argument map (what's happening → why now → who absorbs it → responses → second-order effects → what to watch)
- Long-form article draft (Book Co-Author persona, used for one article-length piece, not its native multi-chapter book structure)
- Visual brief (Data Visualization Engineer persona) → NotebookLM/manual visual production
- Write outputs back to Notion; set `Review state = content-review-required` per the task's recommended orchestration
