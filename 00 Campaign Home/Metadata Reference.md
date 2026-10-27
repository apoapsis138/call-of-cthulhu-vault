---
type: structure-note
dg-publish: true
---

# Metadata Reference

The properties, allowed values and tags used in this vault, and what each one actually does. I check it whenever I create or change a template, dashboard or note type. Example values come from the made-up scenario in `97 - Examples`.

---

# Core Rules

## Use properties for structured data

Anything that should be sorted, filtered, grouped or shown on a dashboard or the site's case board goes in a property: `type`, `status`, `confidence`, `importance`, `location`, `campaign_date`, `related_npcs` and so on.

## Use links for named things

People, places, groups, books, clues, leads and sessions are wiki links, and link-valued properties are quoted.

```yaml
location: "[[Greyhaven]]"
found_during: "[[Session 01 - Arrival in Greyhaven]]"
related_npcs:
  - "[[Edith Crane]]"
related_leads:
  - "[[Lead - Search the Keeper's Cottage]]"
```

Only clues, leads, questions, timeline entries, travel legs, gear lists, maps, dashboards and sessions carry a name prefix. People, places, evidence, handouts and lore notes use their plain name. See [[Vault Standards]].

## Write each relationship once

Relationships are recorded on the note where they happened: sessions, clues, leads, timeline entries, evidence, handouts and questions. People, places and lore notes do not keep lists of clues or leads; their Connections panel finds them. See [[Workflow Reference]].

## Use tags sparingly

Tags are broad and reusable. Never create a tag for a single NPC, city or clue.

---

# What Reads the Properties

Properties are hidden inside notes in Obsidian and are not listed on site pages. They matter because the things below read them. If a property is not in this section, it is a record only: it shows in the Properties panel and nowhere else.

## The case board on the site's home page

Only if the site is a copy of the site repo from my previous campaign; a stock Digital Garden site has no case board. It is built from published notes each time the site is built. Nothing needs editing by hand, but these properties have to be right.

| Panel | Reads | Notes |
|---|---|---|
| Dateline | `current_location` and `current_date` on [[Campaign Home]]; the session with the highest `session_number` | Update Campaign Home after each session |
| Tallies | `type` and `status` | Open leads are every lead whose `status` is not `resolved`, `dead-end` or `archived`. Clues are counted unless `archived`. Dead counts NPCs with `status: dead` |
| Where we are | The map note's `map_image` (or `cover`) and `map_view`; `current_location` on Campaign Home; each location's `map_pin`; travel legs with `status: planned` and their `origin`, `destination`, `method`, `departure_date` | A place without a `map_pin` uses its `parent_location`'s pin. Destinations of planned travel legs are marked Next. Check the site code for pins left over from the old campaign and clear them out |
| Next moves | Open leads: `next_action`, `importance` | `importance: high` puts a lead first and stamps it Urgent. If more than half the open leads are high, none are stamped |
| Persons of interest | Every `npc`: `character_name`, `portrait` (or `cover`), `status`, `disposition` | No picture means the placeholder image. NPCs named in the latest session's `major_npcs` come first. `dead` and `missing` get a stamp |
| Evidence locker | Every `handout` and `evidence` note with `image` set | No `image`, no card |
| Lately | The five latest `timeline-entry` notes with a `campaign_date`: `event_type`, `timeline_order`, `importance` | `importance: high` highlights the event. Entries with only `date_text` are left out |

Any published page whose `status` is `dead` or `missing` also gets a Deceased or Missing stamp on its portrait.

### Following the campaign around

If the site has the location-focus version of the board, it shows the country that Campaign Home's `current_location` belongs to, so changing that one property switches the whole board.

| What | How the board decides |
|---|---|
| Which country | `current_location` on Campaign Home, then that location's `country` (or the top of its `parent_location` chain) |
| Which notes are shown | A note belongs to the countries of the places it names: `location` on NPCs and timeline entries, `found_in` and `related_locations` on clues, evidence and handouts, `related_locations` on leads and open questions. A note that names no place is shown everywhere. NPCs in the latest session's `major_npcs` always stay |
| Which map | The map note whose `location` is in that country. No such map, no map panel |
| Map crop | `map_view` on the map note: left, top, right, bottom as percentages of the image. Blank shows the whole image |
| Pins | Every location in the country with a `map_pin`: across, down as percentages of the map image |
| Extra panels | Open questions (not `resolved`, `dead-end`, `inactive` or `archived`), and up to six clues whose `found_during` is the latest session |

So when the campaign moves: update `current_location` on Campaign Home, keep each NPC's `location` current, and give the new country a map note and its places a `map_pin`.

## The Connections panel

At the bottom of every note, from `10 Templates/views/connections`.

- **Recorded Here** lists every property on the note that holds a link, under a readable heading. A new link property shows up automatically. Left out: `portrait`, `cover`, `image`, `map_image`, `map`, `first_seen`, `last_seen`, `current_session`, `tags`, `aliases`.
- **Mentioned In** lists every note that links here, grouped by its `type`. It adds the `status` of leads and questions, the `confidence` of clues and the `campaign_date` of timeline entries, and sorts sessions by `session_number`.
- Notes of type `dashboard`, `structure-note` and `campaign-home`, and anything in `10 Templates` or `99 - Archive`, never appear.

## The relationship web

On [[Dashboard - Relationship Web]] (Obsidian only; the site shows the hand-built [[Relationship Web.canvas|Relationship Web]] board instead). Two people or groups are joined when one clue, lead, timeline entry, evidence or handout note names both **in its properties**. Body links do not count. Nodes are notes of type `npc`, `faction`, `organization` and `mythos-entity`; `status: dead` and `status: missing` change how a node is drawn.

## The visual timeline

On [[Dashboard - Timeline]]. Reads every `timeline-entry` outside `10 Templates`, `98 - Vault System` and `99 - Archive` unless `status: archived`: `campaign_date` (groups by day), `timeline_order` (order within a day), `date_text` (heading when there is no date), `event_type` (symbol), `campaign_time`, `summary`, `location`, `related_sessions`.

## Dashboards

| Dashboard | Properties shown or used |
|---|---|
| Clues | `status` (hides `archived`), `confidence` (groups), `related_npcs`, `related_leads` |
| Open Leads | `status` (hides `resolved`, `dead-end`, `archived`), `next_action`, `blocked_by`, `related_clues`, `source` |
| NPCs | `portrait` (card picture), `occupation`, `disposition`, `location`, `status` (groups), `last_seen` |
| Campaign Overview | Sessions: `session_number`, `campaign_date`, `summary`. Leads: `status`, `next_action`. Questions: `status`, `summary`. People: `status`, `disposition`, `location`, `summary`. Clues: `confidence`, `found_during` |

## Inside the note

- **NPC and PC infobox:** `character_name`, `occupation`, `nationality`, `age`, `pronouns`, `status` and, for NPCs, `disposition`, `first_seen`, `last_seen`, `location`, `faction`, `organization`; for PCs, `player`, `first_seen`, `current_location`, `sanity_status`. The picture in the infobox is an embed in the note body, not the `portrait` property, so change both.
- **Source and Origin** (clues, leads, evidence, handouts): `source`, `found_in`, `found_during`, `found_by`, `examined_by`, `physical_location`, `related_handouts`, `related_evidence`.
- **Question Status:** `status`, `importance`, `question_topic`, `summary`, `blocked`, `blocked_by`, `resolution`.
- **Timeline Metadata, Session Metadata, Route Summary, Map Record and the metadata summary** on locations, factions, organizations, entities, practices and tomes list that note's main properties.

## Dropdowns and link pickers

Metadata Menu offers dropdowns and folder-limited link pickers for notes in these folders: Sessions, NPCs, Locations, Clues, Leads, Open Questions, Evidence and Handouts, Timeline, and Cults and Factions and Organizations. The definitions are in `98 - Vault System/fileClasses`. Other note types are typed by hand.

## The Vault Maintenance checks

`98 - Vault System/Vault Maintenance.md` (Obsidian only, never published) lists what needs attention, from `10 Templates/views/maintenance`.

| Check | Reads | Notes |
|---|---|---|
| Campaign Home | `current_session` on Campaign Home; `session_number` on sessions | Flags Campaign Home when `current_session` is not the latest session. Fix writes the right one; `current_location` and `current_date` still need updating by hand |
| First seen and last seen | `first_seen`, `last_seen` on NPCs and PCs; `session_number` on sessions | Fix writes the session into the note |
| Worth a second look | When each note was last edited; `review_since` on the maintenance note | The Reviewed button writes today's date into a `reviewed` property on the note |
| Values outside the allowed lists | Dropdown properties defined in `98 - Vault System/fileClasses` | Only covers the folders listed under Dropdowns above. PCs, mythos entities, tomes, travel legs, gear, maps, occult practices and items are **not** checked, so check their values against this note by hand |
| Blank fields and placeholder images | Sessions: `session_number`, `real_date`, `summary`. NPCs: `summary`, `disposition`. Clues: `summary`, `found_during`. Leads: `next_action`. Evidence and handouts: `found_during`, `image`. Questions and timeline entries: `summary`, and a `campaign_date` or `date_text`. Anyone: `portrait`, `cover` | |
| Publishing gaps | `dg-publish` | Unpublished notes, and published notes that link to unpublished ones |

Every check skips notes excused from it in `maintenance_ignore`. The Excuse button on a row adds that check's name to the note (`home`, `seen`, `review`, `values`, `blanks`, `unlinked`, `publish`); `all` hides the note from every check. Excused notes are listed at the bottom of the maintenance note.

## Recorded but not read by anything

Worth keeping for the record, but no dashboard, panel or site feature uses them today:

- `importance` on everything except leads and timeline entries
- `confidence` on everything except clues
- `my_character`
- `changed` on timeline entries
- `age`, `nationality`, `pronouns` beyond the infobox
- `author`, `language`, `translator`, `approximate_date`, `format`, `condition` on tomes
- `scale`, `accuracy` on maps beyond the Map Record
- `dashboard_type`, `related_note_types`, `primary_filters`, `primary_sort` on dashboards

---

# Core Properties

| Property | Purpose | Example |
|---|---|---|
| `type` | The kind of note. Drives every dashboard, panel and the case board | `npc` |
| `status` | Current state of the note, person or thread | `active` |
| `summary` | One or two sentences. Shown on dashboards and the timeline | |
| `confidence` | How certain the investigators are | `likely` |
| `importance` | Priority. Only acts on leads and timeline entries | `high` |
| `location` | Where a person, group or event is | `"[[Greyhaven]]"` |
| `current_location` | Where a PC, tome, item or the party is now | `"[[Greyhaven]]"` |
| `parent_location` | The larger place containing this one | `"[[Greyhaven]]"` |
| `country` | Country of a location | `"[[United States]]"` |
| `source` | Who or what provided it: a link, or plain text such as `keeper` | `"[[Edith Crane]]"` |
| `found_in` | The place it was found | `"[[Greyhaven]]"` |
| `found_during` | The session it was found in | `"[[Session 01 - Arrival in Greyhaven]]"` |
| `found_by`, `examined_by` | The investigators who found or studied it | `"[[Margaret Ashby]]"` |
| `related_sessions` | Sessions connected to the note | `"[[Session 01 - Arrival in Greyhaven]]"` |
| `related_npcs` | NPCs connected to the note | `"[[Edith Crane]]"` |
| `related_pcs` | PCs connected to the note | `"[[Margaret Ashby]]"` |
| `related_locations` | Places connected to the note | `"[[Greyhaven]]"` |
| `related_clues` | Clues connected to the note | `"[[Clue - The Bell Rings Only at Low Tide]]"` |
| `related_leads` | Leads connected to the note | `"[[Lead - Search the Keeper's Cottage]]"` |
| `related_questions` | Open questions connected to the note | `"[[Question - Where Is Silas Crane]]"` |
| `related_handouts` | Handouts connected to the note | `"[[Letter from Silas Crane]]"` |
| `related_evidence` | Evidence connected to the note | `"[[Brass Lighthouse Key]]"` |
| `related_timeline` | Timeline entries connected to the note | |
| `related_factions` | Cults and factions connected to the note | `"[[The Lantern Society]]"` |
| `related_organizations` | Organizations connected to the note | |
| `related_entities` | Mythos entities connected to the note | `"[[The Thing Below the Bell]]"` |
| `related_occult_practices` | Rituals or practices connected to the note | |
| `related_tomes` | Books and manuscripts connected to the note | `"[[The Greyhaven Tide Register]]"` |
| `related_travel` | Travel legs connected to the note | `"[[Travel - Boston to Greyhaven]]"` |
| `tags` | Broad reusable tags | `campaign/coc` |
| `dg-publish` | Publishes the note to the site | `true` |

Session notes use their own names for the same idea: `locations`, `pcs_present`, `major_npcs`, `major_clues`, `major_leads`, `major_handouts`, `major_evidence`.

---

# Image Properties

| Property | Used on | What it does |
|---|---|---|
| `portrait` | NPCs, PCs | Picture on the NPC dashboard cards and the case board. Templates start it at `"[[PlaceholderImage.png]]"` |
| `cover` | NPCs, maps, tomes | Fallback when `portrait` or `map_image` is empty. Keep it the same as `portrait` on NPCs |
| `image` | Evidence, handouts | Puts the note in the case board's Evidence locker |
| `map_image` | Maps | The map picture on the case board |
| `map_view` | Maps | The slice of the map the case board shows: left, top, right, bottom in percent, e.g. `8, 52, 48, 82`. Pick a slice about four wide to three tall |
| `map_pin` | Locations | Where the place sits on its country's map: across, down in percent of the full image, e.g. `20.3, 65.2` |

Images follow the treatment and attribution rules in [[Vault Standards]].

---

# Date Properties

Use ISO format (`1923-10-14`) whenever the date is known.

| Property | Purpose | Example |
|---|---|---|
| `real_date` | Real-world date a session was played | `2026-01-10` |
| `campaign_date` | In-game date of a session or timeline entry | `1923-10-14` |
| `campaign_end_date` | In-game end date when it spans several days | `1923-10-16` |
| `campaign_time` | Time of day for a timeline entry, as text | `evening` |
| `timeline_order` | Number that orders events on the same day | `2` |
| `date_text` | Readable date when the exact one is unknown | `Sometime in 1922` |
| `current_date` | On Campaign Home only: today's in-game date | `1923-10-15` |
| `departure_date` | Start of a travel leg | `1923-10-13` |
| `arrival_date` | End of a travel leg | `1923-10-14` |
| `first_seen`, `last_seen` | The session a person first and most recently appeared in (a link, not a date) | `"[[Session 01 - Arrival in Greyhaven]]"` |
| `first_visited`, `last_visited` | In-game dates a location was first and last visited | `1923-10-14` |
| `approximate_date` | When a tome was written, as text | `late eighteenth century` |
| `reviewed` | Real-world date a note was last marked as checked. Written by the Reviewed button in Vault Maintenance; do not add it by hand or to templates | `2026-10-01` |
| `review_since` | On the Vault Maintenance note only: edits before this date are ignored by its "Worth a second look" list | `2026-10-01` |
| `maintenance_ignore` | Not a date, but it belongs with `reviewed`: a list of Vault Maintenance checks this note is excused from (`home`, `seen`, `review`, `values`, `blanks`, `unlinked`, `publish`, or `all`). Written by the Excuse button; remove a value to bring the note back | `- seen` |

For an uncertain date, leave `campaign_date` blank and use `date_text` plus `confidence`. The entry still appears on the visual timeline but not on the case board.

```yaml
campaign_date:
date_text: "Sometime in 1922"
confidence: possible
```

`game_start_date` and `game_end_date` are retired. Sessions use `campaign_date` and `campaign_end_date`.

---

# Type Values

Use these exact `type` values.

| Type | Used for | Folder | Template |
|---|---|---|---|
| `campaign-home` | The landing page | 00 Campaign Home | |
| `structure-note` | Reference notes such as this one | 00 Campaign Home | |
| `session` | Session notes | 01 Sessions | Session Note |
| `pc` | Player characters, mine and the other investigators' | 02 Characters/PCs | PC Profile |
| `npc` | Non-player characters | 02 Characters/NPCs | NPC Profile |
| `location` | Countries, cities, buildings, sites | 03 Locations | Location Note |
| `clue` | Information discovered | 04 Investigation/Clues | Clue Note |
| `lead` | Actionable threads | 04 Investigation/Leads | Lead Note |
| `open-question` | Unresolved mysteries | 04 Investigation/Open Questions | Open Question |
| `evidence` | Physical objects under investigation | 04 Investigation/Evidence | Evidence Note |
| `handout` | Keeper-provided documents, images, letters | 04 Investigation/Handouts | Handout Analysis |
| `timeline-entry` | In-game events | 05 Timeline | Timeline Entry |
| `tome` | Books, manuscripts, journals | 06 Lore and Mythos/Books and Tomes | Tome Note |
| `faction` | Cults, conspiracies, agenda-driven groups | 06 Lore and Mythos/Cults and Factions | Faction Note |
| `mythos-entity` | Supernatural beings | 06 Lore and Mythos/Mythos Entities | Mythos Entity Note |
| `occult-practice` | Rituals, spells, symbols | 06 Lore and Mythos/Occult Practices | Occult Practice Note |
| `organization` | Public or formal groups | 06 Lore and Mythos/Organizations | Organization Note |
| `travel-leg` | Journeys | 07 Travel and Expeditions/Travel Legs | Travel Leg Note |
| `map` | Map notes | 07 Travel and Expeditions/Maps | Map Note |
| `gear` | Gear lists and loadouts | 07 Travel and Expeditions/Gear and Supplies | Gear List |
| `item` | Important individual items | | Item Note |
| `character-mechanics` | Stats, sanity, wounds, advancement | 08 Player Tools/Character Mechanics | Character Mechanics |
| `rule-reference` | Rules summaries | 08 Player Tools/Rules References | Rule Reference |
| `keeper-question` | Questions for the Keeper | 08 Player Tools/Keeper Questions | None yet |
| `dashboard` | Dashboard notes | 09 Dashboards | Dashboard Note |

All PCs share one template. My own investigator is marked with `my_character: true`; the old `fellow-pc` type is retired.

---

# Status Values

## General

For most note types: `active`, `resolved`, `inactive`, `dead-end`, `unknown`, `archived`.

## Session

`planned`, `active`, `complete`, `missed`, `archived`

## Lead

`new`, `investigating`, `blocked`, `waiting`, `resolved`, `dead-end`, `archived`

A lead counts as open everywhere until it is `resolved`, `dead-end` or `archived`.

## Clue

`unreviewed`, `reviewed`, `connected`, `unconnected`, `contradictory`, `resolved`, `archived`

## NPC

`active`, `missing`, `dead`, `unknown`, `inactive`, `archived`

`dead` and `missing` stamp the portrait on the site and change the relationship web.

## Location

`active`, `visited`, `unvisited`, `dangerous`, `destroyed`, `unknown`, `archived`

## Evidence, Item and Handout

`active`, `unreviewed`, `reviewed`, `lost`, `destroyed`, `stolen`, `transferred`, `archived`

## Travel Leg

`planned`, `in-progress`, `completed`, `delayed`, `cancelled`, `archived`

Put these in `status`. Only `status: planned` puts the journey on the case board map.

## Keeper Question

`active`, `asked`, `answered`, `resolved`, `deferred`, `archived`

---

# Disposition Values

How a person or group appears to relate to the investigators: `ally`, `friendly`, `neutral`, `suspicious`, `hostile`, `enemy`, `unknown`.

Shown under the portrait on the case board unless `unknown`.

---

# Confidence Values

| Value | Meaning |
|---|---|
| `confirmed` | Directly observed, strongly verified, or stated by a trusted source |
| `likely` | Strong evidence, but not fully proven |
| `possible` | Plausible theory with limited evidence |
| `rumor` | Hearsay, local story, or uncertain claim |
| `contradicted` | Evidence conflicts with this claim |
| `unknown` | Not enough information yet |

The Clues dashboard groups by confidence, and the Connections panel shows it beside each clue.

---

# Importance Values

| Value | Meaning |
|---|---|
| `high` | Central lead, active threat, turning point |
| `medium` | Relevant but not urgent |
| `low` | Background, colour or a minor detail |

Keep `high` rare. On leads it means "do this first" and earns the Urgent stamp on the case board; on timeline entries it highlights the event. If most leads are `high`, the stamp is dropped from all of them.

---

# Group Values

## `group_type` (organizations) and `faction_type` (factions)

`academic`, `archaeological`, `business`, `charitable`, `criminal`, `cult`, `government`, `medical`, `military`, `newspaper`, `occult`, `police`, `private-club`, `religious`, `shipping`, `secret-society`, `unknown`

## `public_status`

`public`, `secret`, `rumored`, `unknown`

---

# Timeline Values

## `event_type`

`prologue`, `historical`, `discovery`, `reveal`, `meeting`, `travel`, `death`, `attack`

These eight are in the dropdown and each has its own symbol on the visual timeline. Any other value still works but shows a plain dot.

## `changed`

A sentence on why the event mattered: what we learned, what became urgent, what relationship or assumption shifted. It should not repeat `summary`.

```yaml
changed: "Edith Crane hires the investigators and points them at the lighthouse."
```

---

# Location Type Values

`location_type`: `country`, `region`, `city`, `district`, `building`, `hotel`, `museum`, `university`, `library`, `archive`, `office`, `residence`, `ship`, `port`, `railway-station`, `dig-site`, `ruin`, `temple`, `camp`, `wilderness`, `other`, `unknown`

---

# Entity Type Values

`entity_type`: `god`, `outer-god`, `great-old-one`, `avatar`, `servitor`, `monster`, `spirit`, `manifestation`, `unknown`

Do not over-identify entities too early. Use `unknown` until the campaign confirms more.

---

# Practice Type Values

`practice_type`: `ritual`, `spell`, `symbol`, `chant`, `sacrifice`, `summoning`, `warding`, `dream`, `curse`, `translation`, `prophecy`, `unknown`

---

# Gear, Item and Map Values

- `gear_type`: `list`, `expedition`, `urban`, `medical`, `weapons`, `research`, `travel`, `camp`, `personal`
- `item_type`: `weapon`, `tool`, `book`, `artifact`, `document`, `map`, `medical`, `currency`, `clothing`, `photographic`, `occult`, `personal`, `unknown`
- `map_type`: `world`, `country`, `city`, `region`, `route`, `site`, `building`, `dungeon`, `battle-map`, `handout`, `unknown`

---

# Player Tool Values

- `mechanic_type`: `sanity`, `skills`, `injuries`, `conditions`, `phobias`, `manias`, `credit-rating`, `weapons`, `languages`, `advancement`, `general`
- `rule_topic`: `sanity`, `combat`, `chases`, `pushed-rolls`, `firearms`, `credit-rating`, `research`, `healing`, `luck`, `magic`, `mythos`, `travel`, `equipment`, `general`

---

# Dashboard Type Values

`dashboard_type`, as used today: `overview`, `clue`, `lead`, `npc`, `timeline`, `relationships`. It is a label only.

---

# Tags

Every note carries `campaign/coc`. When I start a new campaign I can find and replace it across the vault with a campaign-specific tag. Templates add a few more:

| Tag | Added by |
|---|---|
| `clue` | Clue |
| `open-question` | Open Question |
| `faction` | Faction |
| `mythos`, `danger` | Mythos Entity, Occult Practice |
| `mythos`, `tome` | Tome |
| `map` | Map |
| `travel` | Travel Leg |

Nothing in the vault or on the site filters by tag, so status and importance belong in properties, not tags. Do not create a tag for a single person, place or clue.

---

# Properties by Note Type

What each template creates. Every template also adds `dg-publish: true`.

## Campaign Home

```yaml
type: campaign-home
status: active
campaign: My Call of Cthulhu Campaign
current_session:
current_location:
current_date:
dg-home: true
tags:
  - campaign/coc
```

## Session

```yaml
type: session
status: complete
session_number:
real_date:
campaign_date:
campaign_end_date:
date_text:
summary:
locations: []
pcs_present: []
major_npcs: []
major_clues: []
major_leads: []
major_handouts: []
major_evidence: []
related_questions: []
related_timeline: []
importance: medium
tags:
  - campaign/coc
```

## PC

```yaml
type: pc
status: active
character_name:
player:
my_character: false
portrait: "[[PlaceholderImage.png]]"
occupation:
nationality:
age:
pronouns:
first_seen:
current_location:
sanity_status:
summary:
associated_locations: []
relationships: []
related_locations: []
related_pcs: []
related_npcs: []
trusted_contacts: []
strained_relationships: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
```

All player characters live in `02 Characters/PCs` and use `Template - PC Profile`. Set `my_character: true` on my own investigator only.

## NPC

```yaml
type: npc
status: active
character_name:
portrait: "[[PlaceholderImage.png]]"
cover: "[[PlaceholderImage.png]]"
disposition:
occupation:
nationality:
age:
pronouns:
first_seen:
last_seen:
location:
faction:
organization:
summary:
confidence:
importance: high
tags:
  - campaign/coc
```

## Location

```yaml
type: location
status: active
location_type:
parent_location:
country:
first_visited:
last_visited:
related_locations: []
map:
map_pin:
confidence: confirmed
importance: medium
tags:
  - campaign/coc
```

## Clue

```yaml
type: clue
status: unreviewed
summary:
source:
found_in:
found_during:
found_by: []
examined_by: []
related_locations: []
related_npcs: []
related_leads: []
related_handouts: []
related_evidence: []
related_questions: []
related_factions: []
related_entities: []
confidence: unknown
importance: medium
tags:
  - campaign/coc
  - clue
```

## Lead

```yaml
type: lead
status: new
source:
related_clues: []
related_npcs: []
related_locations: []
related_sessions: []
next_action:
blocked_by:
confidence: unknown
importance: medium
tags:
  - campaign/coc
```

## Open Question

```yaml
type: open-question
status: active
question_topic:
summary:
blocked: false
blocked_by:
resolution:
related_sessions: []
related_npcs: []
related_locations: []
related_clues: []
related_leads: []
related_timeline: []
related_factions: []
related_entities: []
related_evidence: []
related_organizations: []
importance: medium
tags:
  - campaign/coc
  - open-question
```

## Evidence

```yaml
type: evidence
status: active
source:
found_during:
found_in:
found_by: []
examined_by: []
physical_location:
summary:
related_clues: []
related_leads: []
related_npcs: []
related_locations: []
related_handouts: []
related_evidence: []
confidence: confirmed
importance: medium
image:
tags:
  - campaign/coc
```

## Handout

```yaml
type: handout
status: unreviewed
source: keeper
found_during:
found_in:
found_by: []
summary:
related_clues: []
related_npcs: []
related_locations: []
related_leads: []
related_handouts: []
related_evidence: []
confidence: confirmed
importance: medium
image:
tags:
  - campaign/coc
```

## Timeline Entry

```yaml
type: timeline-entry
status: active
event_type:
campaign_date:
campaign_time:
campaign_end_date:
date_text:
timeline_order:
location:
summary:
changed:
related_sessions: []
related_npcs: []
related_clues: []
related_leads: []
related_handouts: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
```

## Organization

```yaml
type: organization
status: active
group_type:
public_status: unknown
summary:
location:
public_front:
known_members: []
related_npcs: []
related_locations: []
related_organizations: []
related_factions: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
```

## Faction

```yaml
type: faction
status: active
faction_type:
public_status: unknown
summary:
location:
public_front:
known_members: []
known_enemies: []
associated_locations: []
associated_entities: []
related_npcs: []
related_locations: []
related_organizations: []
confidence: unknown
importance: medium
tags:
  - campaign/coc
  - faction
```

## Mythos Entity

```yaml
type: mythos-entity
status: active
entity_type: unknown
summary:
known_names: []
associated_factions: []
associated_locations: []
associated_entities: []
related_npcs: []
related_occult_practices: []
related_tomes: []
confidence: unknown
importance: high
tags:
  - campaign/coc
  - mythos
  - danger
```

## Occult Practice

```yaml
type: occult-practice
status: active
practice_type: unknown
summary:
known_names: []
associated_factions: []
associated_entities: []
associated_locations: []
related_npcs: []
related_tomes: []
confidence: unknown
importance: high
tags:
  - campaign/coc
  - mythos
  - danger
```

## Tome

```yaml
type: tome
status: active
summary:
known_names: []
author:
language:
translator:
approximate_date:
format:
condition:
current_location:
owner:
read_by: []
examined_by: []
related_entities: []
related_factions: []
related_organizations: []
related_occult_practices: []
related_locations: []
confidence: unknown
importance: high
cover:
image:
tags:
  - campaign/coc
  - mythos
  - tome
```

## Travel Leg

```yaml
type: travel-leg
status: planned
summary:
origin:
destination:
departure_date:
arrival_date:
date_text:
method:
travelers: []
related_locations: []
related_sessions: []
related_leads: []
related_npcs: []
related_clues: []
related_handouts: []
related_evidence: []
related_questions: []
related_timeline: []
related_travel: []
complications: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - travel
```

A travel leg appears on the case board map while its `status` is `planned`. Move it to `in-progress` or `completed` once the journey starts. `travel_status` is retired.

## Map

```yaml
type: map
status: active
summary:
map_type:
map_image:
map_view:
cover:
location:
parent_location:
scale:
source:
accuracy:
related_locations: []
related_travel: []
related_clues: []
related_leads: []
related_handouts: []
related_evidence: []
related_sessions: []
related_questions: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
  - map
```

## Gear

```yaml
type: gear
status: active
gear_type: list
owner:
current_location:
related_travel: []
tags:
  - campaign/coc
```

## Item

```yaml
type: item
status: active
item_type:
owner:
current_location:
source:
found_during:
related_npcs: []
related_locations: []
confidence: confirmed
importance: medium
tags:
  - campaign/coc
```

## Character Mechanics

```yaml
type: character-mechanics
status: active
character:
mechanic_type:
importance: medium
tags:
  - campaign/coc
```

## Rule Reference

```yaml
type: rule-reference
status: active
system: Call of Cthulhu 7e
rule_topic:
source_book:
page_reference:
related_mechanics: []
importance: medium
tags:
  - campaign/coc
```

## Keeper Question

No template yet. Suggested properties:

```yaml
type: keeper-question
status: active
question_topic:
related_sessions: []
asked_date:
answered_date:
importance: medium
tags:
  - campaign/coc
```

## Dashboard

```yaml
type: dashboard
status: active
dashboard_type:
summary:
related_note_types: []
primary_filters: []
primary_sort:
importance: medium
tags:
  - campaign/coc
```
