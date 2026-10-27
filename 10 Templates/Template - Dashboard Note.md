---
type: dashboard
status: active
dashboard_type:
summary:
related_note_types: []
primary_filters: []
primary_sort:
importance: medium
<% "dg-publish: true" %>
tags:
  - campaign/coc
---

# <% tp.file.title %>

## Purpose

What question does this dashboard help answer?

Use this section to explain the dashboard’s role in the vault.

Examples:

- What leads are still open?
- What clues are high importance?
- Which NPCs are active?
- What happened in chronological order?
- What questions remain unresolved?

## Dashboard Summary

Use this section to expand on the `summary` property if more detail is needed.

## Dashboard Design Notes

Describe the intended Dataview display, filters, sorting, grouping, and style.

- Display style:
  - List
  - Card grid
  - Grouped list
  - Table
  - Mixed
- Primary note types:
- Primary filters:
- Primary sort:
- Grouping:
- Publish-facing purpose:

## Dataview Query

Add the main Dataview or DataviewJS query here.

```dataview
LIST
FROM ""
WHERE type
SORT file.name ASC
```

## Active Items

Use this section for active, unresolved, or currently relevant notes.

```dataview
LIST
FROM ""
WHERE status = "active"
SORT importance DESC, file.name ASC
```

## High Importance Items

Use this section for high-importance notes.

```dataview
LIST
FROM ""
WHERE importance = "high"
SORT file.name ASC
```

## Recently Updated or Reviewed

Use this section if the dashboard benefits from review tracking.

```dataview
LIST
FROM ""
SORT file.mtime DESC
LIMIT 10
```

## Review Prompts

Use these prompts when reviewing the dashboard.

- What needs action?
- What is blocked?
- What is newly important?
- What should be archived?
- What should be linked to another note?
- What should become a clue, lead, timeline entry, or open question?

## Notes

- 