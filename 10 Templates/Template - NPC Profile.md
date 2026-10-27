---
type: npc
status: active
character_name:
portrait: "[[PlaceholderImage.png]]"
cover: "[[PlaceholderImage.png]]"
disposition:
occupation:
nationality:
age:
pronouns:
first_seen:
last_seen:
location:
faction:
organization:
summary:
confidence:
importance: medium
tags:
  - campaign/coc
<% "dg-publish: true" %>
---

# <% tp.file.title %>

> [!infobox|right]
> # `= default(this.character_name, this.file.name)`
> ![[PlaceholderImage.png]]
>
> | Attribute | Record |
> |---|---|
> | Occupation | `= default(this.occupation, "Unknown")` |
> | Nationality | `= default(this.nationality, "Unknown")` |
> | Age | `= default(this.age, "Unknown")` |
> | Pronouns | `= default(this.pronouns, "Unknown")` |
> | Disposition | `= default(this.disposition, "Unknown")` |
> | First Seen | `= default(this.first_seen, "Not recorded")` |
> | Last Seen | `= default(this.last_seen, "Not recorded")` |
> | Location | `= default(this.location, "Unknown")` |
> | Faction | `= default(this.faction, "Unknown")` |
> | Organization | `= default(this.organization, "Unknown")` |
> | Status | `$= dv.span(dv.current().status ?? "Unknown", {cls: "coc-status coc-status-" + String(dv.current().status ?? "unknown").toLowerCase()})` |

## Summary

Briefly describe who this person is and why they matter.

Use this section to expand on the `summary` property if more detail is needed.

## Known Information

Use this section for details that do not belong cleanly in properties.

- Description:
- Mannerisms:
- Known associates:
- Reputation:
- First impression:

## Disposition

How do they seem to feel about the investigators?

## What They Know

## What They Want

## What They Are Hiding

## Relationship Notes

Use this section for relationship nuance that does not fit cleanly in properties: trust, suspicion, debts, threats, loyalties, rivalries, obligations, or emotional complications.

## Open Questions

- [ ]

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
