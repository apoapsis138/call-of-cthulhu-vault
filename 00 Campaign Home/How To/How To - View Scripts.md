---
type: structure-note
dg-publish: false
---

# How To - View Scripts

The four scripts in `10 Templates/views`. Each is a DataviewJS view: a folder with a `view.js` in it, run from a note with

```
await dv.view("10 Templates/views/<folder name>")
```

inside a `dataviewjs` code block. They need Dataview with JavaScript queries turned on (Settings, Dataview, Enable JavaScript Queries). If one shows an error, that's the first thing to check.

They all skip `10 Templates`, `98 - Vault System` and `99 - Archive`, so templates and old notes never turn up in them.

## Connections panel (`views/connections`)

At the bottom of every note made from a template. It's how people, places and lore notes find everything that mentions them, so I never keep lists of clues or sessions on those notes by hand.

It shows two lists:

- **Recorded Here**: every property on this note that holds a link, under a readable heading (`related_npcs` shows as People, `found_during` as Found During and so on). A new link property appears without any change to the script. Image and housekeeping properties (`portrait`, `cover`, `image`, `map_image`, `map`, `first_seen`, `last_seen`, `current_session`, `tags`, `aliases`) are left out.
- **Mentioned In**: every note that links here (in a property or in the text), grouped by its `type`. Leads and questions show their `status`, clues their `confidence`, timeline entries their date. Sessions are sorted by `session_number`.

Dashboards, structure notes and Campaign Home never show up in it.

To change it:
- Headings for "Recorded Here": `PROP_LABELS` near the top.
- Group names and order for "Mentioned In": `GROUPS`.
- Prefixes stripped from names in the list (so "Clue - X" shows as "X"): `PREFIXES`.

It renders in one pass on purpose, so Digital Garden captures the whole panel when it publishes. If I edit it, keep it free of `await`.

## Visual timeline (`views/timeline`)

On [[Dashboard - Timeline]]. Every `timeline-entry` (unless `status: archived`) down a typed rule, grouped by day.

- Order: `campaign_date`, then `timeline_order` within a day, then name. Entries with no date go to the end under their `date_text`.
- Each entry shows a symbol for its `event_type`, the title (the `Timeline - date -` part is stripped), the type, `campaign_time`, the `summary`, the `location` and the `related_sessions`.
- Symbols are in `MARKS` at the top: prologue, historical, discovery, reveal, meeting, travel, death, attack. Any other `event_type` gets a plain dot. To add one, add it to `MARKS`, to the `event_type` dropdown in `98 - Vault System/fileClasses/timeline-entry.md`, and to [[Metadata Reference]].
- Styling is the `.coc-timeline` section of `coc-1920s.css`.

## Relationship web (`views/relationship-web`)

On [[Dashboard - Relationship Web]]. Builds a Mermaid diagram of who is tied to whom.

- Two people or groups are joined when the same clue, timeline entry, evidence, handout or lead names them both **in its properties**. Body links don't count.
- Nodes are notes of type `npc`, `faction`, `organization` and `mythos-entity`. Factions and organizations are drawn as hexagons, entities as circles. `status: dead` is dashed red, `status: missing` dashed blue.
- A thick line means two or more notes name the pair together.
- The script writes the diagram into the note between the `%% relationship-web:start %%` and `%% relationship-web:end %%` markers, and only rewrites it when something changed. That's why it publishes as an ordinary diagram. If I delete the markers, it stops updating.
- It only rebuilds when the dashboard is open, so I open it once after each session.

## Maintenance checks (`views/maintenance`)

The engine behind [[Vault Maintenance]]. It has buttons that change note properties, so the note that hosts it must never be published. How to use it is in [[How To - Vault Maintenance]]; this is how to change it.

- `SKIP_FOLDERS` and `HIDDEN_TYPES`: what it never looks at.
- `EVENT_TYPES`: the note types where relationships get written (sessions, clues, leads and so on). They're treated differently by "Worth a second look" and "Not connected".
- `SHOULD_FILL`: which properties must not be blank, per type. Add to it when a new property matters.
- `PLACEHOLDER_IMAGE`: the file name it looks for to flag placeholder portraits.
- `FILECLASS_FOLDER`: where it reads the allowed dropdown values from.
- Optional input when calling it: `await dv.view("10 Templates/views/maintenance", { sections: ["seen", "blanks"] })` shows only some sections, and `{ since: "2026-01-01" }` overrides `review_since`.

## The CSS class names

The scripts tag their output with classes that `coc-1920s.css` styles: `coc-connections`, `coc-timeline` (and `mt-*` inside it), `coc-maintenance`, `coc-web-caption`, and `coc-status coc-status-<status>` in the infoboxes. If the site uses the same styling, its stylesheet needs the same names. See [[How To - Publishing Setup]].
