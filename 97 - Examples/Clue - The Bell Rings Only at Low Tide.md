---
type: clue
status: reviewed
summary: The bell heard at night only rings when the tide is fully out, and seems to come from the flats beyond the lighthouse.
source: "[[Margaret Ashby]]"
found_in: "[[Greyhaven]]"
found_during: "[[Session 01 - Arrival in Greyhaven]]"
found_by:
  - "[[Margaret Ashby]]"
examined_by: []
related_locations:
  - "[[Greyhaven]]"
related_npcs:
  - "[[Edith Crane]]"
related_leads:
  - "[[Lead - Search the Keeper's Cottage]]"
related_handouts:
  - "[[Letter from Silas Crane]]"
related_evidence: []
related_questions:
  - "[[Question - Where Is Silas Crane]]"
related_factions:
  - "[[The Lantern Society]]"
related_entities:
  - "[[The Thing Below the Bell]]"
confidence: likely
importance: high
tags:
  - campaign/coc
  - example
  - clue
dg-publish: false
maintenance_ignore:
  - publish
---

# Clue - The Bell Rings Only at Low Tide

## Clue Summary

The bell only rings at dead low water. Checked against the tide table in the boarding house.

## What We Found

- Heard at 2:10 in the morning, low tide 2:05.
- The sound came from the sea side of the lighthouse, not from the town.

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

## Possible Meaning

- Something on the flats is only reachable, or only awake, when the water is out.

## Contradictions or Uncertainty

- Only heard once so far.
- Mrs Pell says it rings "some nights", not every low tide.

## Follow-Up Actions

- [ ] Listen again on the next night tide.
- [ ] Ask who keeps the tide register.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
