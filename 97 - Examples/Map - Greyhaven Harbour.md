---
type: map
status: active
summary: Sketch map of the harbour, the point and the flats, copied from the Historical Society's wall.
map_type: city
map_image: "[[PlaceholderImage.png]]"
map_view:
cover:
location: "[[Greyhaven]]"
parent_location:
scale: About 1 inch to 200 yards
source: "[[Greyhaven Historical Society]]"
accuracy: Rough
related_locations:
  - "[[Greyhaven]]"
related_travel: []
related_clues:
  - "[[Clue - The Bell Rings Only at Low Tide]]"
related_leads: []
related_handouts: []
related_evidence: []
related_sessions:
  - "[[Session 01 - Arrival in Greyhaven]]"
related_questions: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - example
  - map
dg-publish: false
maintenance_ignore:
  - publish
---

# Map - Greyhaven Harbour

## Map Summary

Where the lighthouse, the cottage and the flats are in relation to the town.

## Map Record

```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

dv.list([
  `**Map type:** ${show(p.map_type)}`,
  `**Primary location:** ${show(p.location)}`,
  `**Parent location:** ${show(p.parent_location)}`,
  `**Scale:** ${show(p.scale)}`,
  `**Source:** ${show(p.source)}`,
  `**Accuracy:** ${show(p.accuracy)}`,
  `**Confidence:** ${show(p.confidence)}`,
  `**Importance:** ${show(p.importance)}`
]);
```
## Map or Attachment

Embed or link the map here.

![[PlaceholderImage.png]]

## Map Notes

The old church site is marked but the bell tower is not.

## Annotated Version

- **Annotated drawing:** none yet

## Important Markers

|Marker|Location|Notes|
|---|---|---|
|1|Lighthouse|Door forced from inside|
|2|Keeper's cottage|Locked|
|3|The flats|Where the bell is heard|

## Open Questions

- [ ] Where did the bell tower stand?

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
