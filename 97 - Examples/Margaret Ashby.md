---
type: pc
status: active
character_name: Margaret Ashby
player: Me
my_character: true
portrait: "[[PlaceholderImage.png]]"
occupation: Journalist
nationality: American
age: 31
pronouns: she/her
first_seen: "[[Session 01 - Arrival in Greyhaven]]"
current_location: "[[Greyhaven]]"
sanity_status: 54 / 60
summary: Boston Herald reporter who takes on Edith Crane's search for her missing brother as a story.
associated_locations: []
relationships: []
related_locations: []
related_pcs: []
related_npcs:
  - "[[Edith Crane]]"
trusted_contacts:
  - "[[Edith Crane]]"
strained_relationships: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Margaret Ashby

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

A features writer for a Boston paper who smells a story in a missing antiquarian and a bell nobody will explain.

## Concept

- Occupation: Journalist
- Social class: Middle class
- Nationality: American
- Age: 31
- Education: Radcliffe, English
- Personality: Dry, stubborn, kinder than she lets on
- Public reputation: Known for her shipwreck pieces

## Motivation

Edith wrote to the paper after the police gave up. Margaret wants the story, then finds she wants Silas found.

## What My Character Knows

- The bell rings at low tide.
- Silas was frightened of something in the parish records.

## Relationship to My Character

This is my character.

## Relationships and Trust

Trusts Edith. Doesn't trust the constable, who closed the case in a day.

## Notable Skills or Strengths

- Library Use 70, Persuade 60, Spot Hidden 55

## Weaknesses, Risks, or Concerns

- Can't swim.

## Notable Moments

- Heard the bell ([[Session 01 - Arrival in Greyhaven]]).

## Personal Goals

- [ ] Find Silas Crane.
- [ ] Get the story past her editor.

## Fears, Obsessions, and Instabilities

- Deep water.

## Sanity and Trauma Notes

See [[Margaret Ashby - Sanity and Injuries]].

## Equipment Highlights

- Notebook, Kodak camera, flashlight. See [[Gear - Coastal Investigation Kit]].

## Open Questions

- [ ] Why did Silas write to Edith and not the police?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
