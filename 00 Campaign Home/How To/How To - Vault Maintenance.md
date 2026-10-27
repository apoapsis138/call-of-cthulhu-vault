---
type: structure-note
dg-publish: false
---

# How To - Vault Maintenance

How I use [[Vault Maintenance]] (`98 - Vault System/Vault Maintenance.md`). It's the after-session list of what doesn't update by itself. Obsidian only, never published, because its buttons edit notes.

## The routine

After the session notes, clues, leads and people are made (see [[Workflow Reference]]), I open Vault Maintenance and work down it top to bottom. Each section shows a count; "Nothing to do." means it's clear. Fixing something in one section can add a row to a later one, so top to bottom is the order that works.

## The sections

| Section | What it finds | How I clear it |
|---|---|---|
| Campaign Home | `current_session` on [[Campaign Home]] isn't the session with the highest `session_number` | **Fix** writes the latest session in. Then update `current_location`, `current_date` and the hand-written sections myself |
| First seen and last seen | People a session links to whose own note doesn't record that session in `first_seen` (or `last_seen`, on notes that have it) | **Fix** writes it. **Fix all** does every row |
| Worth a second look | People, places and lore whose clues, leads or sessions were edited after the note itself | Read the note and update its summary, status or location, or press **Reviewed** if nothing needs changing |
| Notes to create | Links to notes that don't exist yet, and which notes mention them | Make each one with QuickAdd so it gets a template and folder |
| Values outside the allowed lists | A dropdown property (`status`, `confidence`, `disposition` and so on) with a value the fileClass doesn't allow | Pick a value from the Metadata Menu dropdown |
| Blank fields and placeholder images | Properties the dashboards rely on that are empty, and portraits still on the placeholder | Fill them in |
| Notes not connected to anything | People, places and lore that nothing links to, and clues, leads and the like that link to nothing | Link them from a clue, lead or session, or delete them |
| Publishing gaps | Unpublished notes, and published notes that link to unpublished ones (those links will be dead on the site) | Publish the note, or remove the link. If I'm not publishing at all, excuse the notes or ignore the section |

Which fields count as "must not be blank":

| Type | Fields |
|---|---|
| session | `session_number`, `real_date`, `summary` |
| npc | `summary`, `disposition` |
| clue | `summary`, `found_during` |
| lead | `next_action` (not checked once the lead is resolved, dead-end or archived) |
| evidence, handout | `found_during`, `image` |
| open-question | `summary` |
| timeline-entry | `summary`, and `campaign_date` or `date_text` |

Placeholder check: any note whose `portrait` or `cover` still points at `PlaceholderImage.png`.

## Excusing a note

Every row about a note has an **Excuse** button. It adds that section's short name to the note's `maintenance_ignore` property and the note stops appearing there. Good for things that will never apply, like a long-dead historical figure who will never have a `last_seen`.

| Section | Name written to `maintenance_ignore` |
|---|---|
| Campaign Home | `home` |
| First seen and last seen | `seen` |
| Worth a second look | `review` |
| Values outside the allowed lists | `values` |
| Blank fields and placeholder images | `blanks` |
| Notes not connected to anything | `unlinked` |
| Publishing gaps | `publish` |

`all` hides the note from every section. Excused notes are listed at the bottom of Vault Maintenance with what they're excused from. To bring one back, delete the value from its `maintenance_ignore` property.

The example notes in `97 - Examples` are all excused from `publish`, because they're deliberately unpublished.

## review_since

"Worth a second look" compares edit times. A bulk change (a find and replace, a tidy-up, a plugin that touches every file) makes everything look freshly edited and floods the list. To start fresh, set `review_since` on the Vault Maintenance note to today's date: edits before it are ignored. Blank means no cut-off.

**Reviewed** stamps today's date into a `reviewed` property on the note, which counts as an edit, so the row goes away. I don't add `reviewed` to templates or by hand.

## If it looks wrong

- Blank or error: Dataview's JavaScript queries are off, or Dataview hasn't finished indexing. Wait a few seconds after opening the vault.
- A button does nothing: check the console (`Ctrl+Shift+I`) for an error and that the note isn't open in another pane with unsaved edits.
- To change what it checks, see the maintenance section of [[How To - View Scripts]].
