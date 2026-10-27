---
type: structure-note
dg-publish: true
---
# Vault Standards

Naming conventions, image rules and basic note hygiene for this vault.

I'm after consistency, not perfection. Notes should be quick to make during play, easy to find later, and structured enough that the dashboards and the site can use them.

See also [[Structure]] for the folder layout, [[Metadata Reference]] for properties and allowed values, and [[Workflow Reference]] for how notes are created and connected. The names below come from the made-up scenario in `97 - Examples`.

---
# Core Principles

## 1. Use properties for structured data

Anything that should be sorted, filtered, grouped or shown on a dashboard goes in a property.

Properties aren't listed on the published pages, but the dashboards, the Connections panel and the site's case board (if the site has one) are built from them. A wrong `status` or a missing `portrait` shows up. [[Metadata Reference]] lists what reads each property.

The ones I use most:

- type
- status
- confidence
- importance
- location
- campaign_date
- related_sessions
- related_npcs
- related_clues
- related_leads

## 2. Use links for named things

People, places, groups, books, artifacts, sessions and major concepts are wiki links.

- [[Edith Crane]]
- [[Greyhaven]]
- [[Clue - The Bell Rings Only at Low Tide]]
- [[Lead - Search the Keeper's Cottage]]
- [[Session 01 - Arrival in Greyhaven]]

I record each relationship once, on the clue, lead, session, timeline entry, evidence, handout or question where it happened. People and places pick it up in their Connections panel.

## 3. Use tags sparingly

Tags are broad and reusable. No tag for every NPC, city, clue or location.

Good tags:

- `campaign/coc`
- `mythos`
- `danger`
- `clue`

Not:

- `greyhaven`
- `edith-crane`
- `brass-key`

Those should be links or properties instead. Status and importance go in properties, not tags.

## 4. Readable note names

Note names have to make sense in search, backlinks, graph view and dashboards.

These note types take a prefix, which QuickAdd adds for me:

| Type | Name pattern | Example |
|---|---|---|
| Session | `Session NN - Title` | Session 01 - Arrival in Greyhaven |
| Clue | `Clue - What we learned` | Clue - The Bell Rings Only at Low Tide |
| Lead | `Lead - What to do` | Lead - Search the Keeper's Cottage |
| Open question | `Question - The question` | Question - Where Is Silas Crane |
| Timeline entry | `Timeline - YYYY-MM-DD - Event` | Timeline - 1923-10-14 - Investigators Arrive in Greyhaven |
| Travel leg | `Travel - From to To` | Travel - Boston to Greyhaven |
| Gear list | `Gear - Name` | Gear - Coastal Investigation Kit |
| Map | `Map - Name` | Map - Greyhaven Harbour |
| Dashboard | `Dashboard - Name` | Dashboard - Open Leads |

Everything else uses its plain name with no prefix: people (Edith Crane), places (Greyhaven), evidence (Brass Lighthouse Key), handouts (Letter from Silas Crane) and lore notes (The Lantern Society).

For a timeline entry with an unknown date, I write `XX` for the missing parts: `Timeline - 1923-XX-XX - Lighthouse Keeper Disappears`.

## 5. Don't over-folder

Folders are broad organization. Links, properties and dashboards are the real structure.

I only add a subfolder when a category gets genuinely large. The current layout is in [[Structure]].

## 6. ISO dates

ISO format for real-world and campaign dates:

```yaml
real_date: 2026-01-10
campaign_date: 1923-10-14
```

---
# Images

## 7. Photograph Treatment

Every real photograph I use (portraits, locations, evidence) gets the same treatment so they all sit together:

- Crop to 3:4 and resize to 720 x 960. For portraits, crop to head and shoulders.
- Convert to black and white, darken, and vignette the backdrop to near-black.
- Apply a slight warm tint. Not a sepia filter: the tint is fixed at R x1.04, G x1.00, B x0.84.
- Handouts and painted artwork don't get this treatment; it's for photographs only.

The treatment is scripted, so results stay identical. Setup and every command are in [[How To - Scripts]].

```
python "98 - Vault System/scripts/photo_treatment.py" SOURCE OUTPUT --crop LEFT TOP RIGHT BOTTOM
python "98 - Vault System/scripts/photo_treatment.py" --new
```

## 8. Image Attribution

Only public domain or freely licensed images. Every image that didn't come from the campaign book or our own table gets a row in [[Image Attributions]]: who or what it shows, where I found it, its licence, and where it lives in the vault.

## 9. Where Images Go

Images live in `assets`, in the subfolder for their kind, named with underscores:

| Kind | Folder | Example |
|---|---|---|
| NPC portrait | `assets/NPCs` | `Edith_Crane.jpg` |
| PC portrait | `assets/PCs` | `Margaret_Ashby.jpg` |
| Evidence | `assets/evidence` | `Brass_Lighthouse_Key.jpg` |
| Handout | `assets/handouts` | `Letter_from_Silas_Crane.jpg` |
| Map | `assets/maps` | `greyhaven_harbour.png` |

A picture is set in two places: the property (`portrait` on people, `image` on evidence and handouts, `map_image` on maps) and the embed in the note body. The property feeds the dashboards and the case board; the embed is what shows on the note's own page. On NPCs, I keep `cover` the same as `portrait`.

## 10. Placeholder Image

A note with no picture yet uses `assets/PlaceholderImage.png`. The NPC and PC templates set it as the `portrait` and embed it in the infobox. I replace both the property and the embed when a real picture turns up.

---
# Publishing

## 11. What Gets Published

Every template sets `dg-publish: true`, so notes are publishable as soon as they're created.

Templates are never part of the site: the site build ignores `10 Templates`, even if the Digital Garden plugin offers to publish it. Nothing from `00 Campaign Home/How To`, `97 - Examples`, `98 - Vault System`, `99 - Archive` or `assets/reference` gets published.
