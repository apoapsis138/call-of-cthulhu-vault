---
type: session
status: complete
session_number:
real_date:
campaign_date:
campaign_end_date:
date_text:
summary:
locations: []
pcs_present: []
major_npcs: []
major_clues: []
major_leads: []
major_handouts: []
major_evidence: []
related_questions: []
related_timeline: []
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
---

# <% tp.file.title %>

## Session Summary

Briefly summarize what happened during the session.

Use this section to expand on the `summary` property if more detail is needed.

## Session Metadata

```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

dv.list([
  `**Session number:** ${show(p.session_number)}`,
  `**Real date:** ${show(p.real_date)}`,
  `**Campaign date:** ${show(p.campaign_date)}`,
  `**Campaign end date:** ${show(p.campaign_end_date)}`,
  `**Approximate date:** ${show(p.date_text)}`,
  `**Status:** ${show(p.status)}`,
  `**Importance:** ${show(p.importance)}`,
  `**Summary:** ${show(p.summary)}`
]);
```

## Recap

What happened in order?

## Important Moments

-

## Decisions Made

-

## Clues Found

Use this section for quick notes during play. Create or update formal Clue notes after the session.

-

## Leads Created or Advanced

Use this section for quick notes during play. Create or update formal Lead notes after the session.

-

## Evidence, Handouts, or Items

-

## NPCs Encountered

-

## Locations Visited

-

## Open Questions Raised

- [ ]

## Character Notes

Notes about party behavior, relationships, fears, injuries, sanity, suspicions, or roleplay moments.

-

## Follow-Up Tasks

- [ ] Create or update clue notes.
- [ ] Create or update lead notes.
- [ ] Create or update NPC notes.
- [ ] Create or update location notes.
- [ ] Create or update timeline entries.
- [ ] Create or update open questions.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
