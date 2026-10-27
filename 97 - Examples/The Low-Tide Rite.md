---
type: occult-practice
status: active
practice_type: ritual
summary: Silas's phrase "ring it back" suggests a rite performed on the flats at low tide.
known_names:
  - Ringing it back
associated_factions:
  - "[[The Lantern Society]]"
associated_entities:
  - "[[The Thing Below the Bell]]"
associated_locations:
  - "[[Greyhaven]]"
related_npcs: []
related_tomes:
  - "[[The Greyhaven Tide Register]]"
confidence: possible
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

# The Low-Tide Rite

## Practice Summary

Guesswork so far, built on one line in a letter and the lanterns in the register.

## Practice Record

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

What names, titles, translations, local terms, euphemisms, or coded references have been connected to this practice?

```dataviewjs

const p = dv.current();

function normalize(value) { if (!value) return []; return Array.isArray(value) ? value : [value]; }

const items = normalize(p.known_names);

if (items.length > 0) { dv.list(items); } else { dv.paragraph("No known names recorded."); }

```

## Description

- **Witness descriptions:** None

## Known Requirements

- **Time/date:** Low tide, at night
- **Location:** The flats beyond the lighthouse

## Apparent Purpose or Effect

- **Claimed purpose:** "Ring it back"
- **Suspected purpose:** Silence the bell, or answer it

## Evidence of Use

What clues, handouts, evidence, testimony, injuries, symbols, or patterns suggest this practice has occurred?

Use structured links in `related_clues`, `related_handouts`, and `related_evidence` where appropriate.

-

## Associated Groups

What factions, cults, organizations, families, communities, or other groups appear connected to this practice?

Use `associated_factions` where appropriate.

-

## Associated Entities

What Mythos entities, spirits, gods, monsters, or supernatural forces may be connected?

Use `associated_entities` where appropriate.

-

## Associated Locations

Where has this practice been performed, described, witnessed, rumored, or investigated?

Use `associated_locations` where appropriate.

-

## Risks and Consequences

What danger does this practice pose?

- **Physical risks:**
- **Mental or spiritual risks:**
- **Social or legal risks:**
- **Occult or supernatural risks:**
- **Unknown consequences:**

## Countermeasures or Precautions

What might prevent, interrupt, expose, survive, or safely investigate this practice?

Keep this speculative unless confirmed.

-

## Theories

- [ ] It sends the bell away
- [ ] It calls it in

## Open Questions

- [ ] Who performs this practice?
- [ ] What does it actually accomplish?
- [ ] What evidence would confirm it happened?
- [ ] What should the investigators avoid doing?
- [ ] Is there a way to prevent, interrupt, or reverse it?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
