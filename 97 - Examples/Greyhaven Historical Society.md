---
type: organization
status: active
group_type: academic
public_status: public
summary: The town's historical society, which keeps the parish and harbour records.
location: "[[Greyhaven]]"
public_front:
known_members:
  - "[[Edith Crane]]"
related_npcs:
  - "[[Edith Crane]]"
related_locations:
  - "[[Greyhaven]]"
related_organizations: []
related_factions:
  - "[[The Lantern Society]]"
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Greyhaven Historical Society

## Organization Summary

Six members, a reading room above the post office, and the tide register in a locked cabinet.

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

## Public Role

- Type: Local history society
- Public purpose: Keeping the town's records
- Headquarters/location: Above the post office
- Known representatives: [[Edith Crane]]

## Known Members or Associates
```dataviewjs

const p = dv.current();

function normalize(value) { if (!value) return []; return Array.isArray(value) ? value : [value]; }

const items = normalize(p.known_members);

if (items.length > 0) { dv.list(items); } else { dv.paragraph("No known members recorded."); }

```

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
