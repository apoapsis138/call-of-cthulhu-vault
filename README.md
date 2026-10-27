# Call of Cthulhu Campaign Vault

A blank Obsidian vault for keeping player-side notes on a Call of Cthulhu (7th edition) campaign: sessions, investigators, NPCs, places, clues, leads, open questions, evidence, handouts, a timeline, lore, travel and gear. It can also publish to a website with the Digital Garden plugin.

I built it for my own table and keep it here so I can start the next campaign from a clean copy.

## What's in it

- Numbered folders for every kind of note, from `00 Campaign Home` to `08 Player Tools`.
- Templater templates for 22 note types, with QuickAdd commands for the nine I make most often.
- Dashboards built with Bases and Dataview: campaign overview, open leads, clues, NPCs, a visual timeline and a relationship web.
- A Connections panel at the bottom of every note that lists everything linking to it.
- A Vault Maintenance note that lists what needs updating after a session, with buttons to fix most of it.
- Metadata Menu definitions so properties get dropdowns and link pickers.
- A 1920s case-file theme (ITS Theme plus CSS snippets) with four palettes.
- Two Python scripts: one gives photographs a consistent period look, the other checks string-board canvases for layout problems.
- `97 - Examples`: one filled-in note of every type from a made-up scenario. Delete it when you start.

## Getting started

1. Clone the repo and open the folder as a vault in Obsidian.
2. Trust the vault so the community plugins load.
3. Open `00 Campaign Home/How To/How To - Start a New Campaign.md`.

The `How To` folder covers every template, dashboard, script and plugin, the theme, and setting up publishing from scratch.

## Plugins

Templater, QuickAdd, Dataview, Metadata Menu, Digital Garden, Style Settings, Frontmatter Visibility, Linter and Excalidraw, plus the core Bases and Canvas plugins. They're included in `.obsidian/plugins`. The Digital Garden plugin has a small local patch so canvases can be published; see `How To - Plugins`.

## Publishing

The Digital Garden plugin is installed but not connected. Its GitHub repo, user name, token and site address are blank. If you connect it, keep the token out of git (`How To - Publishing Setup` explains how).

## Notes

- Publisher PDFs belong in `assets/reference`, which git ignores.
- This is fan material. Call of Cthulhu is a trademark of Chaosium Inc. Nothing here is published, endorsed or approved by Chaosium.
- ITS Theme is by SlRvb; the plugins belong to their authors and keep their own licences.
