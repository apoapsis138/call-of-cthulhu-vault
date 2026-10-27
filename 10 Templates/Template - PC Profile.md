---
type: pc
status: active
character_name:
player:
my_character: false
portrait: "[[PlaceholderImage.png]]"
occupation:
nationality:
age:
pronouns:
first_seen:
current_location:
sanity_status:
summary:
associated_locations: []
relationships: []
related_locations: []
related_pcs: []
related_npcs: []
trusted_contacts: []
strained_relationships: []
confidence: confirmed
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
---

# <% tp.file.title %>

> [!infobox|right]
> # `= this.character_name`
> ![[PlaceholderImage.png]]
>
> | Attribute | Record |
> |---|---|
> | Player | `= default(this.player, "Unknown")` |
> | Occupation | `= default(this.occupation, "Unknown")` |
> | Nationality | `= default(this.nationality, "Unknown")` |
> | Age | `= default(this.age, "Unknown")` |
> | Pronouns | `= default(this.pronouns, "Unknown")` |
> | First Seen | `= default(this.first_seen, "Unknown")` |
> | Current Location | `= default(this.current_location, "Unknown")` |
> | Sanity | `= default(this.sanity_status, "Unknown")` |
> | Status | `$= dv.span(dv.current().status ?? "Unknown", {cls: "coc-status coc-status-" + String(dv.current().status ?? "unknown").toLowerCase()})` |

## Character Summary

Briefly describe who this investigator is, how they present themselves, and why they are involved.

Use this section to expand on the `summary` property if more detail is needed.

## Concept

- Occupation:
- Social class:
- Nationality:
- Age:
- Education:
- Personality:
- Public reputation:

## Motivation

Why is this character involved in the investigation?

## What My Character Knows

Use this section for personal interpretation, suspicions, misunderstandings, or conclusions.

## Relationship to My Character

Current relationship, trust level, tensions, debts, secrets, or shared history.

## Relationships and Trust

Use this section to describe who this character trusts, distrusts, relies on, fears, owes, suspects, or feels responsible for.

## Notable Skills or Strengths

## Weaknesses, Risks, or Concerns

## Notable Moments

## Personal Goals

- [ ]

## Fears, Obsessions, and Instabilities

## Sanity and Trauma Notes

## Equipment Highlights

## Open Questions

- [ ]

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
