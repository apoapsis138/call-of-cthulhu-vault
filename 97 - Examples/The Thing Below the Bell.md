---
type: mythos-entity
status: active
entity_type: unknown
summary: Whatever rings the bell on the flats at low tide.
known_names:
  - The bell
associated_factions:
  - "[[The Lantern Society]]"
associated_locations:
  - "[[Greyhaven]]"
associated_entities: []
related_npcs: []
related_occult_practices:
  - "[[The Low-Tide Rite]]"
related_tomes:
  - "[[The Greyhaven Tide Register]]"
confidence: rumor
importance: high
tags:
  - campaign/coc
  - example
  - mythos
  - danger
dg-publish: false
maintenance_ignore:
  - publish
---

# The Thing Below the Bell

## Entity Summary

We have only heard it. It may not be a thing at all.

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

## Known Names

What names, titles, aliases, translations, masks, epithets, or local terms have been connected to this entity?

```dataviewjs

const p = dv.current();

function normalize(value) { if (!value) return []; return Array.isArray(value) ? value : [value]; }

const items = normalize(p.known_names);

if (items.length > 0) { dv.list(items); } else { dv.paragraph("No known names recorded."); }

```

## What We Know

- A bell rings at low tide where there is no bell.

## What We Suspect

- It has something to do with the bell lost in 1871.

## Signs of Influence

- **Physical signs:** None yet
- **Behavioral signs:** Locals stay in after dark

## Dangers

- **Unknown risks:** Silas went to meet it

## Associated Cults, Factions, or Organizations

What groups appear to worship, serve, study, conceal, oppose, or misunderstand this entity?

Use structured links in `associated_factions` where appropriate.

-

## Associated Locations

Where has this entity’s influence, worship, activity, legend, or evidence appeared?

Use structured links in `associated_locations` where appropriate.

-

## Associated Entities

What other mythos entities, beings, gods, monsters, spirits, or supernatural forces may be connected?

Use structured links in `associated_entities` where appropriate.

-

## Related Occult Practices

What rituals, ceremonies, symbols, sacrifices, spells, taboos, or supernatural practices seem connected?

Use structured links in `related_occult_practices` where appropriate.

-

## Related Tomes or Sources

What books, records, inscriptions, handouts, academic sources, legends, or testimony mention this entity?

Use structured links in `related_tomes`, `related_clues`, or `related_handouts` where appropriate.

-

## Theories

- [ ] The bell itself, still ringing
- [ ] Something using the bell
- [ ] A local story and nothing more

## Open Questions

- [ ] What is this entity truly capable of?
- [ ] Who knows more about it?
- [ ] What evidence would confirm or disprove our current theory?
- [ ] What should we avoid doing?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
