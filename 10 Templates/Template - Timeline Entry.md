---
type: timeline-entry
status: active
event_type:
campaign_date:
campaign_time:
campaign_end_date:
date_text:
timeline_order:
location:
summary:
changed:
related_sessions: []
related_npcs: []
related_clues: []
related_leads: []
related_handouts: []
confidence: confirmed
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
---

# <% tp.file.title %>

## Event Summary
*What happened?*

Use this section to expand on the `summary` property if more detail is needed.

## Timeline Metadata

<% tp.file.include("[[Snippet - Timeline Metadata Summary]]") %>

## What Changed
*Why does this event matter?*

Use this section to expand on the `changed` property if more explanation is needed.

## Notes

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
