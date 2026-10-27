---
type: npc
status: active
character_name: Edith Crane
portrait: "[[PlaceholderImage.png]]"
cover: "[[PlaceholderImage.png]]"
disposition: friendly
occupation: Schoolteacher
nationality: American
age: 46
pronouns: she/her
first_seen: "[[Session 01 - Arrival in Greyhaven]]"
last_seen: "[[Session 01 - Arrival in Greyhaven]]"
location: "[[Greyhaven]]"
faction:
organization: "[[Greyhaven Historical Society]]"
summary: Silas Crane's sister. She hired Margaret to find him after the police stopped looking.
confidence: confirmed
importance: high
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Edith Crane

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

Silas Crane's older sister and the investigators' client. Sensible, worn out, and more afraid than she admits.

## Known Information

- Description: Grey coat, wire spectacles, always carrying a satchel of exercise books.
- Mannerisms: Straightens things on tables while she talks.
- Known associates: Her brother Silas; the Greyhaven Historical Society.
- Reputation: Respected in town.
- First impression: Calm until the bell is mentioned.

## Disposition

Friendly. Paying the bills.

## What They Know

- Silas spent his last weeks in the parish records.
- He was "going to ring it back", whatever that means.

## What They Want

Her brother home, or at least an answer.

## What They Are Hiding

Possibly that she has heard the bell all her life.

## Relationship Notes

Warm with Margaret. Cold towards the lighthouse keeper's family.

## Open Questions

- [ ] Did she know about the Lantern Society?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
