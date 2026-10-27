---
type: tome
status: active
summary: The harbourmaster's ledger of tides since 1790, with odd marginal entries on certain low tides.
known_names:
  - The tide book
author: Successive Greyhaven harbourmasters
language: English
translator:
approximate_date: late eighteenth century onwards
format: Bound ledger
condition: Water-stained, some pages cut out
current_location: "[[Greyhaven]]"
owner: "[[Greyhaven Historical Society]]"
read_by: []
examined_by: []
related_entities:
  - "[[The Thing Below the Bell]]"
related_factions:
  - "[[The Lantern Society]]"
related_organizations:
  - "[[Greyhaven Historical Society]]"
related_occult_practices:
  - "[[The Low-Tide Rite]]"
related_locations:
  - "[[Greyhaven]]"
confidence: possible
importance: high
cover:
image:
tags:
  - campaign/coc
  - example
  - mythos
  - tome
dg-publish: false
maintenance_ignore:
  - publish
---

# The Greyhaven Tide Register

>[!caption|right] Tome
>![[PlaceholderImage.png|hm-sm]]
>*The register, as far as we know*

## Tome Summary

What Silas called "the old entries" are probably in here.

## Tome Record

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

## Known Names

What titles, translations, alternate names, catalog labels, local names, aliases, or misremembered references are associated with this text?

```dataviewjs

const p = dv.current();

function normalize(value) { if (!value) return []; return Array.isArray(value) ? value : [value]; }

const items = normalize(p.known_names);

if (items.length > 0) { dv.list(items); } else { dv.paragraph("No known names recorded."); }

```

## Contents

- Daily tide heights.
- Every few years, a lantern drawn beside a low tide, and a name.

## Important Passages or Topics

- 1871: the night the church bell was lost.

## Research Notes

- [ ] Ask the Historical Society to let us see it.

## Risks or Effects of Reading

- **Mental or spiritual risk:** Unknown
- **Attention from dangerous people or entities:** The Lantern Society keeps it close

## Open Questions

- [ ] Who cut the pages out?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
