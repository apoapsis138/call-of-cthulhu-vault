---
type: structure-note
dg-publish: false
---

# How To - Templates and Note Types

Every template in `10 Templates`, what it makes, and how I make each kind of note. The properties each template creates are listed in [[Metadata Reference]], and a filled-in copy of each is in `97 - Examples` (until I delete it).

## Two ways to make a note

**QuickAdd** (for the nine types I make all the time). Ribbon icon (the lightning bolt) or command palette, "QuickAdd: Run QuickAdd", then pick the entry. It asks for a name, adds the prefix, applies the template and files the note in the right folder. Each entry is also its own command, so I can give it a hotkey in Settings, Hotkeys (search "QuickAdd: New Clue" and so on).

**Templater** (for everything else). Make an empty note in the right folder and name it, then command palette, "Templater: Open insert template modal" (default hotkey `Alt+E`), and pick the template. The template replaces the empty note's contents and fills in the title.

Don't use Obsidian's core Templates plugin (it doesn't run the `<% %>` code); always Templater.

## The templates

| Template | `type` | Folder | How I make it | Name |
|---|---|---|---|---|
| Template - Session Note | `session` | 01 Sessions | QuickAdd: New Session | `Session NN - Title` (QuickAdd asks for "03 - Title") |
| Template - PC Profile | `pc` | 02 Characters/PCs | Templater | the investigator's name |
| Template - NPC Profile | `npc` | 02 Characters/NPCs | QuickAdd: New NPC | the person's name |
| Template - Location Note | `location` | 03 Locations (or a subfolder) | QuickAdd: New Location (asks which subfolder) | the place's name |
| Template - Clue Note | `clue` | 04 Investigation/Clues | QuickAdd: New Clue | `Clue - What we learned` |
| Template - Lead Note | `lead` | 04 Investigation/Leads | QuickAdd: New Lead | `Lead - What to do` |
| Template - Open Question | `open-question` | 04 Investigation/Open Questions | QuickAdd: New Open Question | `Question - The question` |
| Template - Evidence Note | `evidence` | 04 Investigation/Evidence | QuickAdd: New Evidence | the object's name |
| Template - Handout Analysis | `handout` | 04 Investigation/Handouts | QuickAdd: New Handout | the handout's name |
| Template - Timeline Entry | `timeline-entry` | 05 Timeline | QuickAdd: New Timeline Entry | `Timeline - YYYY-MM-DD - Event` |
| Template - Tome Note | `tome` | 06 Lore and Mythos/Books and Tomes | Templater | the book's title |
| Template - Faction Note | `faction` | 06 Lore and Mythos/Cults and Factions | Templater | the group's name |
| Template - Mythos Entity Note | `mythos-entity` | 06 Lore and Mythos/Mythos Entities | Templater | what we call it |
| Template - Occult Practice Note | `occult-practice` | 06 Lore and Mythos/Occult Practices | Templater | the ritual or spell |
| Template - Organization Note | `organization` | 06 Lore and Mythos/Organizations | Templater | the organization's name |
| Template - Travel Leg Note | `travel-leg` | 07 Travel and Expeditions/Travel Legs | Templater | `Travel - From to To` |
| Template - Map Note | `map` | 07 Travel and Expeditions/Maps | Templater | `Map - Name` |
| Template - Gear List | `gear` | 07 Travel and Expeditions/Gear and Supplies | Templater | `Gear - Name` |
| Template - Item Note | `item` | wherever it fits (no fixed folder) | Templater | the item's name |
| Template - Character Mechanics | `character-mechanics` | 08 Player Tools/Character Mechanics | Templater | e.g. `Name - Sanity and Injuries` |
| Template - Rule Reference | `rule-reference` | 08 Player Tools/Rules References | Templater | the rule's name |
| Template - Dashboard Note | `dashboard` | 09 Dashboards | Templater | `Dashboard - Name` |

Keeper questions (`08 Player Tools/Keeper Questions`) have no template yet; the suggested properties are at the end of [[Metadata Reference]].

## What's in every template

- **Properties** for the note type, mostly blank. Link properties are lists (`[]`) where a note can have several.
- **`dg-publish: true`**, written as `<% "dg-publish: true" %>`. Templater turns it into the real property when the note is made, so new notes are publishable but the template file itself doesn't count as a published note.
- **`tags: campaign/coc`**, plus a type tag on a few (clue, open-question, faction, mythos, danger, tome, map, travel).
- **Headings with prompts** under them. I overwrite the prompt text as I fill the note in.
- **A Connections panel** at the bottom (`await dv.view("10 Templates/views/connections")`). See [[How To - View Scripts]].
- NPC and PC templates have an **infobox** callout (`> [!infobox|right]`) with the placeholder picture and inline Dataview fields that read the properties. When a real portrait arrives I change both the `portrait` property and the `![[...]]` line in the infobox.

## Snippets

`10 Templates/snippets` holds small Dataview blocks that templates paste in with `<% tp.file.include("[[Snippet - ...]]") %>`. They are copied into the note when it's made, so changing a snippet later doesn't change notes that already exist.

| Snippet | Used by | Shows |
|---|---|---|
| Snippet - Core Metadata Summary | location, faction, organization, mythos entity, occult practice, tome | a list of whichever main properties the note has |
| Snippet - Source and Origin | clue, lead, evidence, handout | source, where and when found, who found and examined it |
| Snippet - Question Status | open question | status, importance, topic, blocked, resolution |
| Snippet - Timeline Metadata Summary | timeline entry | date, time, order, event type, location, sessions |
| Snippet - Known Names | mythos entity, occult practice, tome | the `known_names` list |
| Snippet - Known Members | organization | the `known_members` list |

Session, map and travel leg templates have the same kind of summary block written straight into the template instead of a snippet.

## Changing a template

- Edit the file in `10 Templates`. Only notes made afterwards get the change.
- If I add a property, also add it to [[Metadata Reference]], to the fileClass in `98 - Vault System/fileClasses` if that type has one (so Metadata Menu offers it), and to `.obsidian/types.json` if it should have a fixed type (date, number, list).
- A new link property shows up in the Connections panel on its own. If I want a nicer heading than the property name, add it to `PROP_LABELS` in `10 Templates/views/connections/view.js`.

## Adding a QuickAdd entry for another type

Settings, QuickAdd, type a name (e.g. "New Tome"), choose **Template**, Add Choice, then the gear icon on the new entry:

- Template path: `10 Templates/Template - Tome Note.md`
- File name format: on, e.g. `{{VALUE:Tome title}}` (or `Travel - {{VALUE:From and to}}` for a prefixed type)
- Create in folder: on, pick the folder
- Open: on
- Back in the list, click the lightning icon so it becomes a command of its own.

## Dropdowns (Metadata Menu)

Notes in these folders get dropdowns and folder-limited link pickers from the fileClasses in `98 - Vault System/fileClasses`: Sessions, NPCs, Locations, Clues, Leads, Open Questions, Evidence and Handouts, Timeline, Cults and Factions and Organizations. Right-click a property name, or use the Metadata Menu icon in the note's header.

To change a dropdown's values: open the fileClass note, then the Metadata Menu fileClass view (the table icon at the top of the note), Fields, edit the field. Don't hand-edit the YAML; the field ids have to stay matched. The Vault Maintenance "Values outside the allowed lists" check reads the same files, so it updates by itself.
