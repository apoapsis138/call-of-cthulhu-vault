---
type: lead
status: new
source: "[[Clue - The Bell Rings Only at Low Tide]]"
related_clues:
  - "[[Clue - The Bell Rings Only at Low Tide]]"
related_npcs:
  - "[[Edith Crane]]"
related_locations:
  - "[[Greyhaven]]"
related_sessions:
  - "[[Session 01 - Arrival in Greyhaven]]"
next_action: Go out to the cottage at the next low tide with the brass key.
blocked_by:
confidence: unknown
importance: high
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Lead - Search the Keeper's Cottage

## Lead Summary

The lighthouse keeper's cottage has been shut up since Silas vanished, and the key Margaret found may open it.

## Why This Matters

Silas was last seen walking out to the point.

## Source and Origin
```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

const rows = [
  ["Source / provided by", p.source],
  ["Found or encountered in", p.found_in],
  ["Found or learned during", p.found_during],
  ["Found, noticed, or recovered by", p.found_by],
  ["Examined, interpreted, or analyzed by", p.examined_by],
  ["Current physical location", p.physical_location],
  ["Related handouts", p.related_handouts],
  ["Related evidence", p.related_evidence]
].filter(row => row[1] !== undefined);

dv.list(rows.map(row => `**${row[0]}:** ${show(row[1])}`));
```

## Next Action

- [ ] Try the [[Brass Lighthouse Key]] on the cottage door.

## Investigation Notes

Edith says the cottage belonged to the old keeper, who drowned in 1912.

## Obstacles or Blockers
``Use this section for details about what is blocking the lead, what is needed next, or what would make this lead actionable.``

```dataviewjs
const p = dv.current();

if (p.blocked_by) {
  dv.paragraph(p.blocked_by);
} else {
  dv.paragraph("No blocker recorded.");
}
```

## Outcome

Not yet.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
