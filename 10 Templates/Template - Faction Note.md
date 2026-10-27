---
type: faction
status: active
faction_type:
public_status: unknown
summary:
location:
public_front:
known_members: []
known_enemies: []
associated_locations: []
associated_entities: []
related_npcs: []
related_locations: []
related_organizations: []
confidence: unknown
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
  - faction
---

# <% tp.file.title %>

## Faction Summary

Briefly describe what this faction is, what it appears to want, and why it matters to the investigation.

Use this section to expand on the `summary` property if more detail is needed.

## Faction Record

<% tp.file.include("[[Snippet - Core Metadata Summary]]") %>

## Public Face

What can ordinary people, investigators, authorities, locals, academics, or outsiders observe about this faction?

- **Apparent role:**
- **Public status:**
- **Known territory or sphere of influence:**
- **Public representatives:**
- **Reputation:**

## What We Know

Record facts the investigators have learned from direct observation, testimony, handouts, clues, research, or reliable sources.

-

## What We Suspect

Record theories, suspicions, inconsistencies, and uncertain conclusions.

-

## Goals and Methods

What does this faction seem to want, and how does it pursue those goals?

- **Likely goals:**
- **Methods:**
- **Resources:**
- **Influence:**
- **Typical tactics:**

## Members and Associates

Who belongs to, serves, assists, funds, protects, studies, opposes, or appears connected to this faction?

Use `known_members` for confirmed members or strongly suspected members.

-

## Enemies, Rivals, or Opposition

Who appears to oppose this faction, compete with it, fear it, hunt it, or suffer because of it?

Use `known_enemies` where appropriate.

-

## Territory and Influence

Where does this faction operate, recruit, meet, hide, travel, worship, trade, or exert influence?

Use `associated_locations` and `related_locations` where appropriate.

-

## Signs, Symbols, and Patterns

What recurring signs might point to this faction’s activity?

- **Symbols:**
- **Ritual behavior:**
- **Language or phrases:**
- **Dress or objects:**
- **Methods of contact:**
- **Threats or warnings:**
- **Historical patterns:**

## Risks and Dangers

What danger does this faction pose to the investigators or others?

- **Physical danger:**
- **Social or legal danger:**
- **Occult or supernatural danger:**
- **Political or institutional danger:**
- **Unknown risks:**

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
