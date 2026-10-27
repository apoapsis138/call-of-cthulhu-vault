---
type: faction
status: active
faction_type: secret-society
public_status: rumored
summary: Old Greyhaven families who are said to "keep the light" on certain nights.
location: "[[Greyhaven]]"
public_front: "[[Greyhaven Historical Society]]"
known_members: []
known_enemies: []
associated_locations:
  - "[[Greyhaven]]"
associated_entities:
  - "[[The Thing Below the Bell]]"
related_npcs: []
related_locations:
  - "[[Greyhaven]]"
related_organizations:
  - "[[Greyhaven Historical Society]]"
confidence: possible
importance: high
tags:
  - campaign/coc
  - example
  - faction
dg-publish: false
maintenance_ignore:
  - publish
---

# The Lantern Society

## Faction Summary

A rumour as much as a group. The lantern mark turns up on the key, the letter and the tide register.

## Faction Record

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

## Public Face

- **Apparent role:** None in public
- **Public status:** Rumoured
- **Known territory or sphere of influence:** Greyhaven
- **Public representatives:** Possibly the Historical Society
- **Reputation:** Mentioned in a whisper

## What We Know

- Their mark is a small lantern.

## What We Suspect

- They know what the bell is.

## Goals and Methods

- **Likely goals:** Keep the bell quiet, or keep it fed
- **Methods:** Unknown

## Members and Associates

- Unknown.

## Enemies, Rivals, or Opposition

- Silas Crane, perhaps.

## Territory and Influence

- [[Greyhaven]]

## Signs, Symbols, and Patterns

- **Symbols:** A lantern

## Risks and Dangers

- **Unknown risks:** All of them

## Open Questions

- [ ] Who truly leads this faction?
- [ ] What does this faction want right now?
- [ ] Who are its confirmed members?
- [ ] What evidence would prove its involvement?
- [ ] What should the investigators avoid doing?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
