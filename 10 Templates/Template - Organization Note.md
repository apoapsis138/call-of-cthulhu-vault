---
type: organization
status: active
group_type:
public_status: unknown
summary:
location:
public_front:
known_members: []
related_npcs: []
related_locations: []
related_organizations: []
related_factions: []
confidence: confirmed
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
---

# <% tp.file.title %>

## Organization Summary
Briefly describe what this organization is and why it matters.

Use this section to expand on the `summary` property if more detail is needed.

## Metadata Summary
<% tp.file.include("[[Snippet - Core Metadata Summary]]") %>

## Public Role
- Type:
- Public purpose:
- Headquarters/location:
- Known representatives:

## Known Members or Associates
<% tp.file.include("[[Snippet - Known Members]]") %>

## Connections

```dataviewjs
await dv.view("10 Templates/views/connections")
```
