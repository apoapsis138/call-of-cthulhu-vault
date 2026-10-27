---
type: travel-leg
status: planned
summary:
origin:
destination:
departure_date:
arrival_date:
date_text:
method:
travelers: []
related_locations: []
related_sessions: []
related_leads: []
related_npcs: []
related_clues: []
related_handouts: []
related_evidence: []
related_questions: []
related_timeline: []
related_travel: []
complications: []
confidence: confirmed
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
  - travel
---

# <% tp.file.title %>

## Travel Summary

Briefly describe the journey, why it matters, and what the investigators hope to accomplish.

Use this section to expand on the `summary` property if more detail is needed.

## Route Summary

```dataviewjs
const p = dv.current();

function show(value) {
if (!value) return "Not recorded or not applicable";
if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
if (value.toFormat) return value.toFormat("yyyy-MM-dd");
return value;
}

dv.list([
`**Status:** ${show(p.status)}`,
`**Origin:** ${show(p.origin)}`,
`**Destination:** ${show(p.destination)}`,
`**Departure date:** ${show(p.departure_date)}`,
`**Arrival date:** ${show(p.arrival_date)}`,
`**Approximate date:** ${show(p.date_text)}`,
`**Method:** ${show(p.method)}`,
`**Travelers:** ${show(p.travelers)}`,
`**Confidence:** ${show(p.confidence)}`,
`**Importance:** ${show(p.importance)}`
]);
```

## Purpose

Why are we making this trip?

-

## Travelers

Who is traveling, who stayed behind, who joined along the way, and who may be following?

Use `travelers` for the full travel party, including investigators, guides, hirelings, NPC companions, passengers, escorts, pursuers, or suspicious tagalongs.

-

## Route Details

Use this section for the practical travel record.

- **Major stops:**
- **Terrain or route conditions:**
- **Weather:**
- **Border, customs, or official scrutiny:**
- **Local guides or hired help:**
- **Animals, vehicles, ships, trains, or aircraft:**
- **Lodging or camps:**

## Supplies and Gear

What was packed, purchased, lost, damaged, consumed, or left behind?

-

## Risks and Complications

Use this section for known hazards, suspicious delays, illness, pursuit, ambush risk, strange dreams, missing supplies, unreliable guides, bad weather, or other problems.

-

## Events During Travel

Record anything that happened during the journey.

-

## Clues, Leads, and Discoveries

Use this section for narrative notes. Add structured links to `related_clues`, `related_leads`, `related_handouts`, or `related_evidence` as needed.

-

## Arrival Notes

What changed when we arrived? What was immediately obvious, wrong, dangerous, or promising?

-

## Follow-Up

- [ ] Create or update related location notes.
- [ ] Create or update related timeline entries.
- [ ] Create or update related clues, leads, handouts, or evidence.
- [ ] Create or update open questions.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
