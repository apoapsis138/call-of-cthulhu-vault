---
type: open-question
status: active
question_topic:
summary:
blocked: false
blocked_by:
resolution:
related_sessions: []
related_npcs: []
related_locations: []
related_clues: []
related_leads: []
related_timeline: []
related_factions: []
related_entities: []
related_evidence: []
related_organizations: []
importance: medium
<% "dg-publish: true" %>
tags:
- campaign/coc
- open-question
---

# <% tp.file.title %>

## Question
State the unresolved mystery clearly.

## Question Status
<% tp.file.include("[[Snippet - Question Status]]") %>

## Context
Why are we asking this? What caused the question?

## Current Thinking
What do we suspect, if anything?

## Resolution
What ultimately answered, resolved, reframed, or closed this question?

## Follow-Up Actions

- [ ]

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
