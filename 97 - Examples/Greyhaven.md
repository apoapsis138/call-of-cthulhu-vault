---
type: location
status: visited
location_type: city
parent_location:
country: "[[United States]]"
first_visited: 1923-10-14
last_visited: 1923-10-15
related_locations: []
map: "[[Map - Greyhaven Harbour]]"
map_pin: 52.0, 40.5
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Greyhaven

## Summary

A fishing town on the Maine coast with a disused lighthouse on the point and a church that lost its bell in a storm in 1871.

## Metadata Summary

```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

const rows = [
  ["Type", p.type],
  ["Status", p.status],
  ["Summary", p.summary],

  ["Group type", p.group_type],
  ["Faction type", p.faction_type],
  ["Entity type", p.entity_type],
  ["Practice type", p.practice_type],
  ["Dashboard type", p.dashboard_type],

  ["Travel status", p.travel_status],
  ["Method", p.method],
  ["Origin", p.origin],
  ["Destination", p.destination],
  ["Departure date", p.departure_date],
  ["Arrival date", p.arrival_date],
  ["Approximate date", p.date_text],

  ["Public status", p.public_status],
  ["Public front", p.public_front],

  ["Known names", p.known_names],
  ["Known members", p.known_members],
  ["Known enemies", p.known_enemies],

  ["Disposition", p.disposition],
  ["Confidence", p.confidence],
  ["Importance", p.importance],

  ["Location", p.location],
  ["Current location", p.current_location],
  ["Parent location", p.parent_location],
  ["Country", p.country],

  ["Faction", p.faction],
  ["Organization", p.organization],
  ["Associated factions", p.associated_factions],
  ["Associated entities", p.associated_entities],
  ["Associated locations", p.associated_locations],

  ["First seen", p.first_seen],
  ["Last seen", p.last_seen],
  ["First visited", p.first_visited],
  ["Last visited", p.last_visited],

  ["Owner", p.owner]
].filter(row => row[1] !== undefined);

dv.list(rows.map(row => `**${row[0]}:** ${show(row[1])}`));
```

## Description

Grey shingle houses, smoke from the smokehouses, gulls everywhere. The tide goes out a long way and leaves black weed on the flats.

## Local Knowledge

- One boarding house, run by Mrs Pell.
- The coast bus comes twice a week.
- Nobody goes onto the flats after dark.

## Dangers and Complications

- The tide comes in faster than it looks.
- The constable closed the Crane case in a day.

## Open Questions

- [ ] Where did the church bell go?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
