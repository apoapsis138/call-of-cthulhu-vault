---
type: evidence
status: active
source:
found_during: "[[Session 01 - Arrival in Greyhaven]]"
found_in: "[[Greyhaven]]"
found_by:
  - "[[Margaret Ashby]]"
examined_by: []
physical_location: Margaret's coat pocket
summary: A heavy brass key found jammed in the lighthouse door, stamped with a lantern.
related_clues:
  - "[[Clue - The Bell Rings Only at Low Tide]]"
related_leads:
  - "[[Lead - Search the Keeper's Cottage]]"
related_npcs: []
related_locations:
  - "[[Greyhaven]]"
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

# Brass Lighthouse Key

## Evidence Image or Attachment

![[PlaceholderImage.png|300]]

## Evidence Summary

Found wedged in the lighthouse door from the inside, as if someone left in a hurry.

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

## Physical Description

- Size: About five inches long
- Material: Brass
- Condition: Salt-crusted, recently used
- Markings: A lantern stamped on the bow
- Language/symbols: The same lantern as the Lantern Society
- Distinctive features: Wards filed by hand

## What It Suggests

Silas had a key to somewhere the Lantern Society controls.

## Tests, Research, or Examination

- [ ] Try it on the keeper's cottage.

## Chain of Custody

Lighthouse door, then Margaret.

## Open Questions

- [ ] Who filed the wards?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
