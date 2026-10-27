---
type: handout
status: reviewed
source: keeper
found_during: "[[Session 01 - Arrival in Greyhaven]]"
found_in: "[[Greyhaven]]"
found_by:
  - "[[Margaret Ashby]]"
summary: Silas's last letter to Edith, written the day before he vanished.
related_clues:
  - "[[Clue - The Bell Rings Only at Low Tide]]"
related_npcs:
  - "[[Edith Crane]]"
related_locations:
  - "[[Greyhaven]]"
related_leads: []
related_handouts: []
related_evidence: []
confidence: confirmed
importance: medium
image: "[[PlaceholderImage.png]]"
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Letter from Silas Crane

## Handout

![[PlaceholderImage.png|300]]

## Summary

Silas tells Edith he has found "the old entries" in the tide register and that he means to "ring it back before the next one". Signed, dated 21 September 1923.

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

## Important Details

- Names: Edith, "the Society"
- Dates: 21 September 1923
- Places: The point
- Symbols: A small lantern drawn by the signature
- Objects: The tide register
- Odd wording: "ring it back"

## Interpretation

He thought the bell could be answered, or sent back.

## Questions Raised

- [ ] What are "the old entries"?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
