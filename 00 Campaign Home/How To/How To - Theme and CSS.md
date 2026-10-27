---
type: structure-note
dg-publish: false
---

# How To - Theme and CSS

How the vault gets its 1920s case-file look, and where to change it.

## The layers

1. **ITS Theme** (`.obsidian/themes/ITS Theme`, by SlRvb). The base theme. Set in Settings, Appearance, Themes. It brings the `infobox` and `caption` callouts the NPC, PC and Tome templates use.
2. **S - Encoded Fonts** and **S - Encoded Icons**. ITS Theme's companion snippets: fonts and icon sets (Remix, Material, Font Awesome, RPG Awesome) packed into the CSS so they work offline. Leave them on.
3. **coc-1920s.css**. The case-file theme on top of ITS. Light mode is a manila folder with typed ink and red rubber stamps; dark mode is the same file under a desk lamp. Every text colour is contrast-checked, and links are always underlined so nothing depends on colour alone.
4. **coc-1920s-cool.css**. Three extra palettes for the same theme, switched in Style Settings. Needs `coc-1920s.css` on too.
5. **card.css** (off by default). Gives Bases cards a card-back picture (the image is packed into the file, the same one as `assets/cardback.png`). Turn it on if I want the dashboards to look like a deck of cards.

Snippets are turned on and off in Settings, Appearance, CSS snippets. The four that should be on: S - Encoded Fonts, S - Encoded Icons, coc-1920s, coc-1920s-cool.

Accent colour (Settings, Appearance) is `#7A5A1E`. Base colour scheme follows the system unless I pick light or dark.

## Palettes

Settings, Style Settings, Case-file palette, Palette:

| Palette | Look |
|---|---|
| Manila (default) | Warm manila paper, brown-black ink, red stamps. The original |
| Carbon Copy | Pale neutral grey paper with a faint blue cast, pewter ornaments, silver accents |
| Midnight Archive | Deep blue-black page, off-white text, light blue links, soft red stamps. Portraits show as black-and-white prints |
| Follow light/dark mode | Carbon Copy in light mode, Midnight Archive in dark mode |

The palette is a class on the page body (`coc-palette-manila` and so on), saved in the Style Settings plugin's `data.json`.

## What coc-1920s.css styles

Each part has its own commented section in the file, in this order:

- **Fonts**: Courier Prime for text, Special Elite for headings, loaded from Google Fonts at the top of the file (so they need an internet connection the first time).
- **Colours**: all colours are variables named `--coc-*` (`--coc-paper`, `--coc-ink`, `--coc-stamp`, `--coc-link` and so on), set once for light and once for dark. To change a colour everywhere, change the variable.
- **Page**: faint ruled lines like a typed report.
- **Title**: the note title is typed in capitals with a small "CASE FILE, CALL OF CTHULHU" line above it. To change that line, edit `content:` under `.inline-title::before`.
- Headings, links, horizontal rules (typed dashes with scissors), blockquotes (pasted-in clippings), tags (red rubber stamps), tables (typed ledger), callouts (index cards).
- **Infobox**: the dossier card with a clipped photo on NPC and PC notes.
- **Status stamps**: when a person's `status` is `dead` or `missing`, the infobox's Status cell gets the class `coc-status-dead` or `coc-status-missing` and a DECEASED or MISSING stamp is drawn over the photo. Automatic.
- **Bases cards** as typed index cards.
- **Connections panel** (`.coc-connections`), **dashboard card grids**, and the **visual timeline** (`.coc-timeline`, with `mt-day`, `mt-entry`, `mt-mark`, `mt-card` inside).

## Changing things safely

- Edit the snippet in any text editor; Obsidian reloads it when the file is saved.
- Keep the `--coc-*` names the same in both files, and in the view scripts (they set the `coc-*` classes). The full list of class names the scripts use is at the end of [[How To - View Scripts]].
- If the site uses the same look, its stylesheet has its own copy of these colours and needs the same change. See [[How To - Publishing Setup]].
- If a change breaks something, `git diff .obsidian/snippets` shows exactly what I changed.
