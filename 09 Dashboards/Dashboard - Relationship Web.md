---
type: dashboard
status: active
dashboard_type: relationships
related_note_types:
  - npc
  - faction
  - mythos-entity
importance: high
tags:
  - campaign/coc
dg-publish: false
---

# Dashboard - Relationship Web

On the site, relationships are drawn as the [[Relationship Web.canvas|Relationship Web]] string board, so this page stays unpublished. The diagram below stays in Obsidian as the list of ties: when a new line appears here, add a string (or a card) to the board.

Who is tied to whom. Two people or groups are joined when the same clue, lead, timeline entry, evidence or handout names them both. The diagram rebuilds itself from those notes whenever this page is opened in Obsidian.

%% relationship-web:start %%
%% relationship-web:end %%

```dataviewjs
await dv.view("10 Templates/views/relationship-web")
```
