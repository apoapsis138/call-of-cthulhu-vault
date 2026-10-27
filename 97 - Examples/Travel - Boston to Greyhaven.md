---
type: travel-leg
status: completed
summary: Train to Portland, then the coast bus to Greyhaven.
origin: "[[Boston]]"
destination: "[[Greyhaven]]"
departure_date: 1923-10-14
arrival_date: 1923-10-14
date_text:
method: Train and bus
travelers:
  - "[[Margaret Ashby]]"
related_locations:
  - "[[Greyhaven]]"
related_sessions:
  - "[[Session 01 - Arrival in Greyhaven]]"
related_leads: []
related_npcs: []
related_clues: []
related_handouts:
  - "[[Letter from Silas Crane]]"
related_evidence: []
related_questions: []
related_timeline:
  - "[[Timeline - 1923-10-14 - Investigators Arrive in Greyhaven]]"
related_travel: []
complications: []
confidence: confirmed
importance: low
tags:
  - campaign/coc
  - example
  - travel
dg-publish: false
maintenance_ignore:
  - publish
---

# Travel - Boston to Greyhaven

## Travel Summary

A long wet day. Uneventful, which is the point of having an example.

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

- Answer Edith Crane's letter.

## Travelers

- [[Margaret Ashby]]

## Route Details

- **Major stops:** Portland
- **Weather:** Rain all the way
- **Animals, vehicles, ships, trains, or aircraft:** Boston and Maine railroad, then the coast bus

## Supplies and Gear

- [[Gear - Coastal Investigation Kit]]

## Risks and Complications

Use this section for known hazards, suspicious delays, illness, pursuit, ambush risk, strange dreams, missing supplies, unreliable guides, bad weather, or other problems.

-

## Events During Travel

- The bus driver wouldn't go past the church after dark.

## Clues, Leads, and Discoveries

Use this section for narrative notes. Add structured links to `related_clues`, `related_leads`, `related_handouts`, or `related_evidence` as needed.

-

## Arrival Notes

- Edith was waiting at the stop.

## Follow-Up

- [x] Create or update related location notes.
- [x] Create or update related timeline entries.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
