---
type: dashboard
status: active
dashboard_type: npc
related_note_types:
  - npc_profile
importance: medium
tags:
  - campaign/coc
dg-publish: true
---

# Dashboard - NPCs

## Purpose

A list of NPCs and their current dispositions

## Rogues' Gallery

![[NPCs.base#Rogues' Gallery]]
### Active NPCs

```dataview
LIST WITHOUT ID
  file.link +
  "<br>**Status:** " + status +
  "<br>**Disposition:** " + disposition +
  "<br>**Location:** " + default(location, "Unknown")
FROM "02 Characters/NPCs"
WHERE type = "npc"
  AND status = "active"
SORT file.name ASC
```

### Unknown Status

```dataview
LIST WITHOUT ID
  file.link +
  "<br>**Status:** " + status +
  "<br>**Disposition:** " + disposition +
  "<br>**Location:** " + default(location, "Unknown")
FROM "02 Characters/NPCs"
WHERE type = "npc"
  AND status = "unknown"
SORT file.name ASC
```

### Deceased

```dataview
LIST WITHOUT ID
  file.link +
  "<br>**Occupation:** " + default(occupation, "Unknown") +
  "<br>**Last Seen:** " + default(last_seen, "Unknown")
FROM "02 Characters/NPCs"
WHERE type = "npc"
  AND status = "dead"
SORT file.name ASC
```
