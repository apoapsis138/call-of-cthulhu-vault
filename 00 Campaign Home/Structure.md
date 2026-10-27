---
type: structure-note
dg-publish: true
---
# Structure

Where everything lives in the vault. See [[Vault Standards]] for naming and image rules, [[Metadata Reference]] for properties, and [[Workflow Reference]] for how notes get made.

## Folders

**00 Campaign Home**  
The landing page ([[Campaign Home]]) and the reference notes: this one, [[Vault Standards]], [[Metadata Reference]], [[Workflow Reference]], [[Image Attributions]] and [[Useful Links]].
- `How To`: my setup reminders for the templates, dashboards, scripts, plugins, theme and publishing. Start with [[How To - Start a New Campaign]]. Never published.

**01 Sessions**  
One note per session, named `Session NN - Title`.

**02 Characters**  
- `PCs`: every investigator, mine and the other players', all on the same template. Mine carries `my_character: true`.
- `NPCs`: everyone else we meet: contacts, rivals, cultists, patrons, guides and recurring weirdos.

**03 Locations**  
Countries, cities, buildings and sites. Once the campaign covers more than one country or region I add a subfolder for each one (QuickAdd lets me pick the subfolder when I make a location).

**04 Investigation**  
The heart of the vault.
- `Clues`: what we learned (`Clue - ...`)
- `Leads`: what to do about it (`Lead - ...`)
- `Open Questions`: unresolved mysteries (`Question - ...`)
- `Evidence`: physical objects
- `Handouts`: Keeper-provided documents, images and letters

**05 Timeline**  
One note per in-game event, named `Timeline - YYYY-MM-DD - Event`.

**06 Lore and Mythos**  
What the investigators learn about the supernatural and the people behind it: `Books and Tomes`, `Cults and Factions`, `Mythos Entities`, `Occult Practices`, `Organizations`.

**07 Travel and Expeditions**  
`Travel Legs` (journeys), `Maps`, and `Gear and Supplies` (packing lists and loadouts).

**08 Player Tools**  
My own reference material: `Character Mechanics`, `Keeper Questions`, `Rules References`. I don't publish anything from here.

**09 Dashboards**  
The dashboard notes, plus `Bases`, which holds the `.base` files the dashboards embed, and `Boards`, which holds the string boards (`.canvas`).

**10 Templates**  
- Templater templates, one per note type (`Template - ...`)
- `snippets`: small Dataview blocks the templates paste into new notes
- `views`: the scripts behind the Connections panel, the visual timeline, the relationship web and the maintenance checks

**97 - Examples**  
One filled-in note per note type, from a made-up scenario, so I can see what a finished note looks like. Delete the whole folder when the real campaign starts. None of it is published.

**98 - Vault System**  
Machinery, not campaign content.
- `Vault Maintenance`: the checklist note that shows what needs updating after notes change. Obsidian only.
- `String Board Standard`: how to lay out a string board
- `fileClasses`: the Metadata Menu definitions that give properties their dropdowns and link pickers
- `scripts`: helper scripts: the photograph treatment and the string board checker

**99 - Archive**  
Old templates and snippets, tests, placeholders and backups. Nothing here appears in dashboards, Connections panels or on the site.

**assets**  
Every image in the vault.
- `NPCs`, `PCs`: portraits
- `evidence`, `handouts`, `maps`: images for those notes
- `originals`: created by the photo script, holds the untouched copy of every portrait it treats
- `PlaceholderImage.png`: the stand-in used wherever a note has no picture yet
- `cardback.png`: the card back used by the optional `card` CSS snippet
- `reference`: the publisher's PDFs. Kept out of git and never published.

## What Reaches the Site

A note is published when it has `dg-publish: true` and is published through the Digital Garden plugin. Every template sets that property, so new notes are publishable by default.

- **Templates never appear on the site.** They carry `dg-publish` so the notes made from them inherit it, which means the plugin may offer to publish them, but the site build ignores the whole `10 Templates` folder.
- **Kept off the site:** `00 Campaign Home/How To`, `97 - Examples`, `98 - Vault System`, `99 - Archive` and `assets/reference`.
- **Images** are published along with the notes that use them.
- If the site has the case board on its home page, it is built from the properties of published notes. [[Metadata Reference]] lists which properties it reads.
