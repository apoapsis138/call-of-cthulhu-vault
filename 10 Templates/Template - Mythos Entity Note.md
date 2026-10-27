---
type: mythos-entity
status: active
entity_type: unknown
summary:
known_names: []
associated_factions: []
associated_locations: []
associated_entities: []
related_npcs: []
related_occult_practices: []
related_tomes: []
confidence: unknown
importance: high
<% "dg-publish: true" %>
tags:
  - campaign/coc
  - mythos
  - danger
---

# <% tp.file.title %>

## Entity Summary

Briefly describe what the investigators currently believe this entity, creature, god, spirit, monster, or mythos force to be.

Use this section to expand on the `summary` property if more detail is needed.

## Metadata Summary

<% tp.file.include("[[Snippet - Core Metadata Summary]]") %>

## Known Names

What names, titles, aliases, translations, masks, epithets, or local terms have been connected to this entity?

<% tp.file.include("[[Snippet - Known Names]]") %>

## What We Know

Record facts the investigators have actually learned from direct observation, testimony, handouts, clues, research, or reliable sources.

-

## What We Suspect

Record theories, guesses, pattern-matching, and uncertain conclusions.

-

## Signs of Influence

How does this entity appear to affect people, places, dreams, rituals, artifacts, organizations, or events?

- **Physical signs:**
- **Behavioral signs:**
- **Dreams or visions:**
- **Symbols or imagery:**
- **Ritual traces:**
- **Environmental effects:**
- **Historical patterns:**

## Dangers

What risks might this entity pose to the investigators or others?

- **Physical danger:**
- **Mental or spiritual danger:**
- **Social or legal danger:**
- **Occult or supernatural danger:**
- **Unknown risks:**

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

Use this section to compare competing explanations.

- [ ]
- [ ]
- [ ]

## Open Questions

- [ ] What is this entity truly capable of?
- [ ] Who knows more about it?
- [ ] What evidence would confirm or disprove our current theory?
- [ ] What should we avoid doing?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
