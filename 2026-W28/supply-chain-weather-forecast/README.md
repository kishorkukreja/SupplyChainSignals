# W28 Supply Chain Weather Forecast

Companion artifact for the 2026-W28 Supply Chain Signals brief.

Shared source of truth: `data/2026-W28.json`.

The weather map keeps separate stations separate: imports, forced-labor proof, freight/diesel cost, ISM input friction and field-to-fork category exposure. It does not create a blended risk score.

Verification:

```bash
node --check app.js
python3 -m http.server 4173
curl -I --max-time 5 http://127.0.0.1:4173/
```
