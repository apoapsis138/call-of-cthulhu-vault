---
type: dashboard
status: active
dashboard_type: location
summary: Every place in the vault with its type, status and last visit.
related_note_types:
  - location
primary_filters:
  - type = location
primary_sort: file.name
importance: low
tags:
  - campaign/coc
  - example
dg-publish: false
maintenance_ignore:
  - publish
---

# Dashboard - Example Places

An example of a small Dataview dashboard. A real one goes in `09 Dashboards`.

## Places

```dataview
TABLE location_type AS "Type", status AS "Status", last_visited AS "Last visited"
FROM ""
WHERE type = "location"
  AND !contains(file.path, "10 Templates")
  AND !contains(file.path, "99 - Archive")
SORT file.name ASC
```
