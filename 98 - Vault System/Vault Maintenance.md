---
type: structure-note
review_since:
---

# Vault Maintenance

What needs attention after notes change. This note stays in Obsidian: it isn't published, and the buttons below edit note properties.

I run through it after each session, top to bottom. How it fits into the session routine is in [[Workflow Reference]], and what each section means is in [[How To - Vault Maintenance]].

`review_since` (in this note's properties) is the starting line for **Worth a second look**: edits before that date are ignored. I move it forward if a bulk tidy-up floods the list.

**Excuse** hides a note from one section for good, by adding that section to the note's `maintenance_ignore` property. Excused notes are listed at the bottom.

```dataviewjs
await dv.view("10 Templates/views/maintenance")
```
