---
type: structure-note
dg-publish: true
---
# Workflow Reference

How notes get made and kept current. The short version: write each fact once, let the panels and dashboards pick it up, then use **Vault Maintenance** to catch what doesn't follow along by itself.

## Reference

- [[Structure]]: where everything lives, and what reaches the site
- [[Vault Standards]]: naming and image rules
- [[Metadata Reference]]: every property, its allowed values, and what reads it
- [[Image Attributions]]
- The `How To` folder: setup reminders for every template, dashboard, script and plugin. Start with [[How To - Start a New Campaign]]

## How Connections Work

I write each relationship **once**, on the note where it happened:

| Note type | Links it records |
|---|---|
| Session | places, investigators present, people, clues, leads, evidence, handouts, questions, timeline |
| Clue | where and when it was found, who found it, people, places, leads, evidence, questions |
| Lead | clues, people, places, sessions |
| Timeline entry | location, people, clues, leads, sessions |
| Evidence / Handout | where and when found, people, clues, leads |

People, places, factions and lore notes **don't** keep lists of clues, leads or sessions. Their **Connections** panel (bottom of every note) finds everything that links to them automatically, grouped by type.

I put the link in a property when I can. A link in the body text shows up in the Connections panel, but the [[Dashboard - Relationship Web|relationship web]] and the dashboards only read properties.

## Keeping Related Notes Up To Date

Changing one note never rewrites another. What follows along by itself, and what doesn't:

| When I change a note | In Obsidian | On the site |
|---|---|---|
| Connections panels on the notes it links to | update straight away | update when those notes are republished |
| Dashboards and the timeline | update straight away | update when the dashboard is republished |
| The relationship web | rebuilds when I open its dashboard | updates when the dashboard is republished |
| The case board on the site's front page (if the site has one) | not shown in Obsidian | rebuilds from note properties each time I publish |
| Properties and prose on the related notes (an NPC's `last_seen`, `status`, `location`, summary) | **do not change** | **do not change** |
| [[Campaign Home]]: its `current_session`, `current_location` and `current_date`, and the hand-written Current Situation, Current Session and Current Expedition | **do not change** | **do not change** |

The last two rows are what goes stale. The **Vault Maintenance** note (`98 - Vault System/Vault Maintenance`, Obsidian only, never published) is the list of what to catch up on. How each section works is in [[How To - Vault Maintenance]].

## Creating Notes

**QuickAdd** (ribbon icon, or command palette then "QuickAdd"): New Clue, New Lead, New Open Question, New NPC, New Location, New Session, New Timeline Entry, New Evidence, New Handout. Each asks for a name, applies the template and files the note in the right folder.

Other note types (investigator, travel leg, map, tome, faction, organization, mythos entity, occult practice, item, gear, character mechanics, rule reference, dashboard) have a template but no QuickAdd entry. I create the note in its folder, then run **Templater: Open insert template modal** and pick the template. The full list is in [[How To - Templates and Note Types]].

**Metadata Menu** gives dropdowns (status, confidence, importance, disposition) and link pickers limited to the right folder (`related_npcs` only offers NPCs). Right-click a property or use the Metadata Menu button on the note. It covers sessions, NPCs, locations, clues, leads, open questions, evidence, handouts, timeline entries, factions and organizations; on other notes I type values by hand from [[Metadata Reference]].

## Session Workflow

### Before Session

- [ ] Read the Current Situation on [[Campaign Home]]
- [ ] Review [[Dashboard - Open Leads|Open Leads]]
- [ ] Review [[Dashboard - Clues|Clues]]
- [ ] Review [[Dashboard - NPCs|NPCs]]
- [ ] Check open questions on the [[Dashboard - Campaign Overview|Campaign Overview]]
- [ ] Confirm current location and next action
- [ ] Create the session note (QuickAdd, New Session)

### During Session

- [ ] Take notes in the current session note
- [ ] Create links freely, even if the notes don't exist yet
- [ ] Mark new clues and leads quickly

### After Session

In this order; each step feeds the next.

- [ ] Clean up the session note and fill its properties: `session_number`, `real_date`, `campaign_date`, `summary`, and the people, places, clues and leads it involved
- [ ] Create the new NPC, location, clue, lead, question, evidence, handout and timeline notes (QuickAdd)
- [ ] Put relationships on the clue, lead, session or timeline note, not on the person or place
- [ ] Give new NPCs a `portrait` (and swap the picture in the infobox), and new evidence and handouts an `image`
- [ ] Update leads: `status`, `next_action` and `importance`. Keep `high` for a few
- [ ] Update people who changed: `status` (dead, missing), `disposition`, `location`
- [ ] Open Vault Maintenance and work down it, top to bottom
- [ ] Update [[Campaign Home]]: `current_session`, `current_location` and `current_date`, then Current Situation, Current Session and Current Expedition
- [ ] Open [[Dashboard - Relationship Web]] once so the diagram rebuilds, and add any new tie to the [[Relationship Web.canvas|Relationship Web]] board (see String Board Standard)
- [ ] Publish: Digital Garden Publication Center, publish everything listed as changed, so Connections panels, dashboards and the case board refresh on the site
- [ ] Look at the site's front page to check it
- [ ] If `current_location` or `current_date` changed, refresh the shared-link preview: see [[#Link Previews]]

## When the Campaign Moves

- [ ] Update `current_location` on [[Campaign Home]]
- [ ] Create the travel leg note. It starts at `status: planned`, which is what puts the route on the case board map; change it to `in-progress` or `completed` as the journey happens
- [ ] Keep each NPC's `location` current, including the ones who travel with us
- [ ] For a new country or region: add a subfolder under `03 Locations`, a map note, and a `map_pin` on each place. [[Metadata Reference]] explains `map_pin` and `map_view`
- [ ] Refresh the shared-link preview: see [[#Link Previews]]

## Link Previews

When someone shares the site's address in Messenger, Discord and the like, the preview card comes from the site's share-card images. If the site builds the home card from `current_location` and `current_date` on [[Campaign Home]], it only moves once the site has the new values.

- [ ] Publish [[Campaign Home]] after changing `current_location` or `current_date`
- [ ] Open the [Sharing Debugger](https://developers.facebook.com/tools/debug/), paste the site's address and click **Scrape Again**. Facebook and Messenger keep an old preview until this is done
- [ ] Test by pasting the link into a new message; messages already sent keep the preview they had
- The debugger's "missing fb:app_id" warning can be ignored

## Publishing

- The site shows each page as it was when last published. Connections panels, dashboards and the timeline are frozen at that moment, which is why related notes need republishing after a change. The Publication Center lists them as changed.
- A note is published only when it has `dg-publish: true`. Templates set it, so new notes are publishable by default.
- Never publish anything from `10 Templates`, `97 - Examples`, `98 - Vault System`, `99 - Archive` or `00 Campaign Home/How To`.
- Full setup from nothing: [[How To - Publishing Setup]].
