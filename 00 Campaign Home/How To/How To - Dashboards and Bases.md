---
type: structure-note
dg-publish: false
---

# How To - Dashboards and Bases

What's in `09 Dashboards`, what each dashboard reads, and how to change them.

Dashboards are built two ways:

- **Bases** (`.base` files in `09 Dashboards/Bases`). Obsidian's core Bases plugin: saved filtered views of notes as tables, lists or cards. A dashboard note embeds a view with `![[Overview.base#Sessions]]` (file name, then `#` and the view's name). Without the `#View` part it shows the first view.
- **Dataview** queries and scripts written into the dashboard note itself.

Every base filters on `type`, never on folder, and leaves out `10 Templates`, `98 - Vault System` and `99 - Archive`. So a note shows up wherever it lives, as long as its `type` is right.

## The dashboards

| Dashboard | Built from | Shows |
|---|---|---|
| [[Dashboard - Campaign Overview]] | `Overview.base`: views Sessions, Open Leads, Open Questions, People, Newest Clues | The whole case at a glance. Sessions newest first (by `session_number`); open leads with `next_action`; open questions with `summary`; NPCs grouped by `status`; clues with `confidence` and `found_during` |
| [[Dashboard - Clues]] | `Clue.base` | Clue cards grouped by `confidence`, hiding `archived`, with people and leads |
| [[Dashboard - Open Leads]] | `Leads.base` | Every lead not `resolved`, `dead-end` or `archived`, with `next_action`, `blocked_by`, clues and source |
| [[Dashboard - NPCs]] | `NPCs.base` (Rogues' Gallery view) plus three Dataview lists | Portrait cards grouped by `status`, then plain lists of active, unknown and dead NPCs from `02 Characters/NPCs` |
| [[Dashboard - Timeline]] | the `timeline` view script | The visual timeline. See [[How To - View Scripts]] |
| [[Dashboard - Relationship Web]] | the `relationship-web` view script | A Mermaid diagram of who is tied to whom. Obsidian only (`dg-publish: false`); the site shows the string board instead |

`Timeline.base` is a plain table of timeline entries with their summaries. No dashboard embeds it yet; I open it directly when I want to sort or bulk-edit entries.

`NPCs.base` also has a second view, Cards, with more properties on each card (first and last seen, faction, organization, importance). Switch to it from the view menu at the top of the embed.

## The string board

`09 Dashboards/Boards/Relationship Web.canvas` is an empty Obsidian Canvas with its publish settings already in it. I build it up by hand, using the relationship web dashboard as the list of ties. The layout rules and the checker are in [[String Board Standard]].

## Changing a base

The easiest way is in Obsidian: open the `.base` file (or click into the embed), then use the toolbar: Filter, Sort, Properties (which columns show), Group, and the view menu (add a view, change its layout to table, cards or list). Changes save into the `.base` file.

By hand, a `.base` is YAML:

- `properties:` gives a property a display name (`displayName: Next Action`).
- `views:` is a list. Each has `type` (`table`, `cards`, `list`), `name` (what goes after `#` in the embed), `filters`, `order` (the columns), `sort`, and optionally `groupBy`.
- Cards views can show a picture with `image: note.portrait` and size it with `cardSize`, `imageAspectRatio` and `imageFit`.

If I add a filter on a new value, check that the value is in the allowed lists in [[Metadata Reference]], otherwise notes quietly drop out.

## Making a new dashboard

1. New note in `09 Dashboards`, named `Dashboard - Name`, then Templater, `Template - Dashboard Note`. It comes with sample Dataview queries to replace.
2. Either write a Dataview query in it, or make a base: right-click `09 Dashboards/Bases`, New base, set its filters (start with `type == "..."` and the three folder exclusions copied from an existing base), then embed it with `![[Name.base#View name]]`.
3. Link it from Start Here on [[Campaign Home]].
4. If it should be on the site, leave `dg-publish: true`. Bases are rendered into the page when published, so republish the dashboard after notes change.

## On the site

Dashboards are frozen at the moment they were published. After a session I republish them along with the notes that changed (the Publication Center lists them).
