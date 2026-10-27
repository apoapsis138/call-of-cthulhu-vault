---
type: structure-note
dg-publish: false
---

# How To - Plugins

The community plugins in `.obsidian/plugins`, what each one does here, and the settings that matter. Versions are what the vault shipped with; updating is fine, with the one exception under Digital Garden.

| Plugin | Version | What it does in this vault |
|---|---|---|
| Templater | 2.25.1 | Runs the templates in `10 Templates` (titles, snippets, the `dg-publish` line) |
| QuickAdd | 2.31.0 | The New Clue, New Lead, New NPC and other commands that name, template and file a note in one go |
| Dataview | 0.5.68 | Runs every `dataviewjs` block: Connections panel, timeline, relationship web, maintenance, infobox fields and the summary blocks |
| Metadata Menu | 0.8.12 | Dropdowns and folder-limited link pickers for properties, from the fileClasses in `98 - Vault System/fileClasses` |
| Digital Garden | 2.95.1 (patched) | Publishes notes to the site's GitHub repo |
| Style Settings | 1.0.9 | Settings page for the ITS Theme and for the case-file palette switch |
| Frontmatter Visibility | 2.1.0 | Collapses the properties block in notes so the page reads cleanly |
| Linter | 1.33.0 | Formats notes on demand (YAML tidy-up, spacing). Lint on save is off |
| Excalidraw | 2.28.1 | Drawing on maps and sketching layouts; drawings can be embedded and published |

Core plugins that matter: **Bases** (the dashboards), **Canvas** (the string boards), **Properties**, **Backlinks**, **Outgoing links** and **Page preview**. They're all on in `core-plugins.json`.

## Settings that matter

**Templater** (Settings, Templater)
- Template folder location: `10 Templates`.
- Trigger Templater on new file creation: on, but there are no folder templates set, so it only runs when I insert a template or QuickAdd applies one. Leave it that way, or new notes in some folders get the wrong template.

**QuickAdd** (Settings, QuickAdd)
- Nine Template choices: New Clue, New Lead, New Open Question, New NPC, New Location, New Session, New Timeline Entry, New Evidence, New Handout. Each has its template path, a file name format (adds the `Clue - ` style prefix) and a target folder. New Location lets me pick a subfolder of `03 Locations`.
- Adding another entry: see [[How To - Templates and Note Types]].

**Dataview** (Settings, Dataview)
- Enable JavaScript Queries: on. Enable Inline JavaScript Queries: on. Without these the panels, timeline and maintenance list are blank.
- Enable Inline Queries: on (the infoboxes use `= this.occupation` style fields).
- Allow HTML: on.

**Metadata Menu** (Settings, Metadata Menu)
- Class Files path: `98 - Vault System/fileClasses/`.
- Globally ignored fields: `dg-publish`, `dg-home`, `dg-metatags`, `tags`, `cssclasses`, `aliases`.
- Each fileClass applies to the folders listed in its `filesPaths`. A note gets the dropdowns only if it lives in one of those folders.

**Linter** (Settings, Linter)
- Folders to ignore: `10 Templates`, `98 - Vault System`, `99 - Archive`. Templater code in the templates must never be reformatted.
- Lint on file change is off. I run "Linter: Lint the current file" when a note's YAML gets messy.

**Frontmatter Visibility**
- Vault-wide mode: collapsed. Per-file overrides get saved in its `data.json`; that file isn't personal but it does list note paths, so I glance at it before committing.

**Excalidraw**
- Drawings go in an `Excalidraw` folder at the vault root (created the first time I make one). The Map Note template has a section for an annotated copy of the map.
- Digital Garden exports drawings as SVG when publishing (the plugin setting "Excalidraw SVG export" is on).

**Style Settings**
- Case-file palette: Manila, Carbon Copy, Midnight Archive, or follow light/dark. See [[How To - Theme and CSS]].
- ITS Theme: fonts are set to Courier Prime for text and Special Elite for headings.

## Digital Garden and the canvas patch

The plugin's settings (GitHub repo, user name, token, base URL) are blank in this vault. Setting them up is in [[How To - Publishing Setup]].

Out of the box Digital Garden refuses to publish a `.canvas` file, because it looks for `dg-publish: true` in note properties and a canvas has none. The `main.js` in this vault has two lines changed so canvases skip that check:

- in `publish(file)`: `if (file.getType() !== "canvas" && !isPublishFrontmatterValid(file.frontmatter))`
- in `publishBatch(files, onProgress)`: `(f) => f.getType() === "canvas" || isPublishFrontmatterValid(f.frontmatter)`

The originals are `if (!isPublishFrontmatterValid(file.frontmatter))` and `(f) => isPublishFrontmatterValid(f.frontmatter)`.

**Updating the plugin replaces `main.js` and undoes the patch.** After an update I either:

1. open `.obsidian/plugins/digitalgarden/main.js` in a text editor, search for `isPublishFrontmatterValid(`, and make the same two edits, then reload Obsidian; or
2. install the Advanced Canvas plugin, which also lets boards publish, and stop worrying about it.

The canvas's own publish settings live in its JSON under `metadata.frontmatter`; see [[String Board Standard]].

## Reinstalling a plugin from scratch

Settings, Community plugins, Browse, search the name, Install, Enable. Then put this vault's `data.json` back over the new one (from git) to get the settings above, and reload.
