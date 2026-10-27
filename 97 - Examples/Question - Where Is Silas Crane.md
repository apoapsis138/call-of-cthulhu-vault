---
type: open-question
status: active
question_topic: Missing person
summary: Silas Crane walked out to the lighthouse on 22 September and hasn't been seen since.
blocked: false
blocked_by:
resolution:
related_sessions:
  - "[[Session 01 - Arrival in Greyhaven]]"
related_npcs:
  - "[[Edith Crane]]"
related_locations:
  - "[[Greyhaven]]"
related_clues:
  - "[[Clue - The Bell Rings Only at Low Tide]]"
related_leads:
  - "[[Lead - Search the Keeper's Cottage]]"
related_timeline: []
related_factions:
  - "[[The Lantern Society]]"
related_entities: []
related_evidence:
  - "[[Brass Lighthouse Key]]"
related_organizations: []
importance: high
tags:
  - campaign/coc
  - example
  - open-question
dg-publish: false
maintenance_ignore:
  - publish
---

# Question - Where Is Silas Crane

## Question

Where is Silas Crane, and is he alive?

## Question Status
```dataviewjs  
const p = dv.current();  
  
function show(value) {  
if (value === true) return "Yes";  
if (value === false) return "No";  
if (!value) return "Not recorded or not applicable";  
if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";  
if (value.toFormat) return value.toFormat("yyyy-MM-dd");  
return value;  
}  
  
const rows = [  
["Status", p.status],  
["Importance", p.importance],  
["Topic", p.question_topic],  
["Summary", p.summary],  
["Blocked", p.blocked]  
];  
  
if (p.blocked && p.blocked_by) {  
rows.push(["Blocked by", p.blocked_by]);  
}  
  
if (p.resolution) {  
rows.push(["Resolution", p.resolution]);  
}  
  
dv.list(rows.map(row => `**${row[0]}:** ${show(row[1])}`));  
```

## Context

The reason we are in Greyhaven at all.

## Current Thinking

He went onto the flats at low tide after the bell. Whether he came back is another matter.

## Resolution

Open.

## Follow-Up Actions

- [ ] Search the cottage.
- [ ] Read the tide register.

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
