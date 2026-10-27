---
type: map
status: active
summary:
map_type:
map_image:
map_view:
cover:
location:
parent_location:
scale:
source:
accuracy:
related_locations: []
related_travel: []
related_clues: []
related_leads: []
related_handouts: []
related_evidence: []
related_sessions: []
related_questions: []
confidence: confirmed
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
  - map
---

# <% tp.file.title %>

## Map Summary

Briefly describe what this map represents, why it matters, and how the investigators are using it.

Use this section to expand on the `summary` property if more detail is needed.

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

Use this section for interpretation, annotations, route planning, player observations, or details that do not belong cleanly in properties.

## Annotated Version

To mark routes, pins or notes on this map, open it in Excalidraw (right-click the image → "Open in Excalidraw", or create a drawing and paste the image in) and embed the drawing here. Excalidraw drawings publish to the site; Leaflet maps do not.

- **Annotated drawing:**

## Important Markers

|Marker|Location|Notes|
|---|---|---|
||||

## Open Questions

- [ ]

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
