---
type: structure-note
---

# String Board Standard

How I build a string board (a `.canvas` in `09 Dashboards/Boards`) so it reads cleanly in Obsidian and on the site: a corkboard of people, places and groups joined by labelled strings. This note stays in Obsidian and isn't published.

I run the checker before publishing a board and fix everything it lists. Setup is in [[How To - Scripts]].

```
python "98 - Vault System/scripts/check_boards.py"                        every board
python "98 - Vault System/scripts/check_boards.py" "Relationship Web"     one board
python "98 - Vault System/scripts/check_boards.py" --fix-sides            also re-pick where every string leaves and lands
```

## Publishing a board

A canvas has no properties panel, so its publish settings live in the file's JSON, under `metadata.frontmatter`. The empty `Relationship Web.canvas` already has the block; for a new board I copy it:

```json
"metadata": { "frontmatter": { "dg-publish": true, "dg-content-classes": "string-board", "title": "Board Name" } }
```

- Out of the box the Digital Garden plugin only checks note properties for the flag, so it refuses to publish a board ("Note does not have the dg-publish: true set"). The copy of the plugin in this vault is patched to skip that check for canvases (two small edits in `.obsidian/plugins/digitalgarden/main.js`, in `publish()` and `publishBatch()`). **A plugin update undoes the patch.** After updating I either re-apply it or install the Advanced Canvas plugin, which also makes boards publish. Details in [[How To - Plugins]].
- Every picture on a board must also be embedded in a note. The publishing plugin deletes any picture no note uses, and it doesn't count boards. Portraits are safe (each NPC page shows its own); evidence photos are safe if the evidence note shows them.
- A board appears on the site at `/09-dashboards/boards/<name>.canvas/`.

## Cards

| Card | Size | Text |
|---|---|---|
| **Person** (has a portrait) | 240 × 460 | `![[Portrait.jpg]]` · `**[[Name]]**` · one short line (about 35 characters) |
| **Evidence photo** | 240 × 460 | `![[Photo.jpg]]` · `**[[Evidence]]**` · one short line |
| **Index card** (place, faction, entity, person without a portrait) | 280 × 230 | `### [[Note]]`, then two short sentences at most |
| **Sticky note** (canvas yellow, color 3) | 260 × 150 or more | a question or a one-line judgment |

- A dead or missing person's print can carry a stamp: add `<span class="board-stamp st-deceased">DECEASED</span>` (or `st-missing`, `MISSING`) as its last line.
- People cards use the portrait named in the person's `portrait` property. Anyone still on the placeholder image goes on an index card instead.
- Optionally one home card, drawn as a round seal, using a `<span class="board-home">` marker (needs the site's CSS for it).

## Layout

- Cards go on a grid: columns **560** apart, rows **540** apart, each card centred on its grid point. That leaves about 280 of cork between neighbours, room for a tag on the string between them.
- The cards that share the most strings go in the same row or column.
- **60** of clear cork around every card.
- No string may cross a card it doesn't belong to, in either viewer. If one would, I move a card. When one string has to jump a row of cards, I run it over the top: both ends on `top`.
- Two strings that cross each other read badly. A diagonal string cuts the corner between two cards, so I don't also string those two corner cards to each other.

## Strings

- **Sides:** strings between cards in the same row run `right` to `left`, and between cards in the same column `bottom` to `top`. A string between cards on a diagonal leaves from one level side and lands on one upright side, so it turns a single smooth corner. `--fix-sides` applies this and avoids pins other strings already use.
- **One string per pair of cards**, with one tag.
- **Tags:** short, lowercase, ending in `?` when the link is only suspected. About 18 characters on a level string.
- **Colour:** red (`1`) for what's established; blue (`5`) for what's only suspected.

## Why

- The site tilts each print a degree or two. The tilt goes on an inner element, not the card: the canvas viewer places cards with a CSS transform, so tilting the card also moves it off the ends of its strings.
- Obsidian bends a string straight out from each side before turning, so facing sides give straight strings and mismatched sides make loops.
- Text that doesn't fit is cut off without warning in both viewers.
- Site styles that force inner card layers to be transparent can strip a card's paper background. Worth checking after any CSS change.
- For dark mode, a map card can hold a day and a night version of the map, with CSS hiding one per theme (matched on the image's alt text or filename).
- If the site makes link-preview images by screenshotting a live board, they have to be taken after the board is published, or they capture a 404 page.
