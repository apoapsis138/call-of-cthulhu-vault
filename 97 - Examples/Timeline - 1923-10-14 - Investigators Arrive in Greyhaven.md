---
type: timeline-entry
status: active
event_type: travel
campaign_date: 1923-10-14
campaign_time: afternoon
campaign_end_date:
date_text:
timeline_order: 1
location: "[[Greyhaven]]"
summary: Margaret Ashby arrives on the coast bus and meets Edith Crane.
changed: Edith hires Margaret and points her at the lighthouse.
related_sessions:
  - "[[Session 01 - Arrival in Greyhaven]]"
related_npcs:
  - "[[Edith Crane]]"
related_clues: []
related_leads: []
related_handouts:
  - "[[Letter from Silas Crane]]"
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Timeline - 1923-10-14 - Investigators Arrive in Greyhaven

## Event Summary

Margaret gets off the bus in the rain and Edith is waiting with an umbrella and the letter.

## Timeline Metadata

```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

dv.list([
  `**Campaign date:** ${show(p.campaign_date)}`,
  `**Campaign time:** ${show(p.campaign_time)}`,
  `**End date:** ${show(p.campaign_end_date)}`,
  `**Approximate date:** ${show(p.date_text)}`,
  `**Timeline order:** ${show(p.timeline_order)}`,
  `**Event type:** ${show(p.event_type)}`,
  `**Location:** ${show(p.location)}`,
  `**Related sessions:** ${show(p.related_sessions)}`,
  `**Related handouts:** ${show(p.related_handouts)}`,
  `**Confidence:** ${show(p.confidence)}`,
  `**Importance:** ${show(p.importance)}`
]);
```

## What Changed

The case begins.

## Notes

-

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
