---
type: lead
status: new
source:
related_clues: []
related_npcs: []
related_locations: []
related_sessions: []
next_action:
blocked_by:
confidence: unknown
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
---

# <% tp.file.title %>

## Lead Summary

## Why This Matters

## Source and Origin
<% tp.file.include("[[Snippet - Source and Origin]]") %>

## Next Action

- [ ]

## Investigation Notes

## Obstacles or Blockers
``Use this section for details about what is blocking the lead, what is needed next, or what would make this lead actionable.``

```dataviewjs
const p = dv.current();

if (p.blocked_by) {
  dv.paragraph(p.blocked_by);
} else {
  dv.paragraph("No blocker recorded.");
}
```

## Outcome
`What happened when we pursued this lead?`

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
