---
type: session
status: complete
session_number: 1
real_date: 2026-01-10
campaign_date: 1923-10-14
campaign_end_date: 1923-10-15
date_text:
summary: Margaret arrives in Greyhaven at Edith Crane's request, hears the bell at low tide and finds Silas Crane's key in the lighthouse.
locations:
  - "[[Greyhaven]]"
pcs_present:
  - "[[Margaret Ashby]]"
major_npcs:
  - "[[Edith Crane]]"
major_clues:
  - "[[Clue - The Bell Rings Only at Low Tide]]"
major_leads:
  - "[[Lead - Search the Keeper's Cottage]]"
major_handouts:
  - "[[Letter from Silas Crane]]"
major_evidence:
  - "[[Brass Lighthouse Key]]"
related_questions:
  - "[[Question - Where Is Silas Crane]]"
related_timeline:
  - "[[Timeline - 1923-10-14 - Investigators Arrive in Greyhaven]]"
importance: medium
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Session 01 - Arrival in Greyhaven

## Session Summary

Margaret took the train and the coast bus up from Boston to meet Edith Crane, whose brother Silas went missing three weeks ago. That night we heard a church bell ringing out at sea, and in the morning Margaret found Silas's key wedged in the lighthouse door.

## Session Metadata

```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

dv.list([
  `**Session number:** ${show(p.session_number)}`,
  `**Real date:** ${show(p.real_date)}`,
  `**Campaign date:** ${show(p.campaign_date)}`,
  `**Campaign end date:** ${show(p.campaign_end_date)}`,
  `**Approximate date:** ${show(p.date_text)}`,
  `**Status:** ${show(p.status)}`,
  `**Importance:** ${show(p.importance)}`,
  `**Summary:** ${show(p.summary)}`
]);
```

## Recap

1. Margaret arrives in Greyhaven on the afternoon bus and takes a room at the boarding house.
2. Edith Crane shows her the letter Silas sent before he vanished.
3. Around two in the morning, at low tide, a bell rings somewhere offshore. Nobody in the boarding house will talk about it.
4. Next morning Margaret walks out to the lighthouse and finds the brass key.

## Important Moments

- The landlady crossed herself when the bell started.
- The lighthouse door had been forced from the inside.

## Decisions Made

- Margaret keeps the key rather than handing it to the constable.
- She will search the keeper's cottage before telling Edith what she found.

## Clues Found

- [[Clue - The Bell Rings Only at Low Tide]]

## Leads Created or Advanced

- [[Lead - Search the Keeper's Cottage]]

## Evidence, Handouts, or Items

- [[Brass Lighthouse Key]]
- [[Letter from Silas Crane]]
- [[Silas Crane's Pocket Watch]] (Edith lent it to Margaret)

## NPCs Encountered

- [[Edith Crane]]

## Locations Visited

- [[Greyhaven]]

## Open Questions Raised

- [ ] [[Question - Where Is Silas Crane]]

## Character Notes

- Margaret lost 1 SAN when the bell rang with no church for miles.

## Follow-Up Tasks

- [x] Create or update clue notes.
- [x] Create or update lead notes.
- [x] Create or update NPC notes.
- [x] Create or update location notes.
- [x] Create or update timeline entries.
- [x] Create or update open questions.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
