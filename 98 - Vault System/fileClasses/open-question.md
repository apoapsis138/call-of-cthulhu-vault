---
limit: 20
mapWithTag: false
icon: help-circle
tagNames: null
filesPaths:
- 04 Investigation/Open Questions
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- Z4wiCj
- i1e0BE
- pIAqU2
- JEqj1B
- aCYntT
- 9tEai0
- OoqUOn
- alSEll
- h8Wg5j
- TRgbws
- L9Fowq
- NqQNWe
- MTXywy
- SOCalD
version: '2.1'
fields:
- name: status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': active
      '2': resolved
      '3': inactive
      '4': dead-end
      '5': unknown
      '6': archived
  path: ''
  id: Z4wiCj
- name: question_topic
  type: Input
  options: {}
  path: ''
  id: i1e0BE
- name: summary
  type: Input
  options: {}
  path: ''
  id: pIAqU2
- name: resolution
  type: Input
  options: {}
  path: ''
  id: JEqj1B
- name: related_sessions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: aCYntT
- name: related_npcs
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: 9tEai0
- name: related_locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: OoqUOn
- name: related_clues
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Clues"')
  path: ''
  id: alSEll
- name: related_leads
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Leads"')
  path: ''
  id: h8Wg5j
- name: related_timeline
  type: MultiFile
  options:
    dvQueryString: dv.pages('"05 Timeline"')
  path: ''
  id: TRgbws
- name: related_factions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Cults and Factions"')
  path: ''
  id: L9Fowq
- name: related_entities
  type: MultiFile
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Mythos Entities"')
  path: ''
  id: NqQNWe
- name: related_evidence
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Evidence"')
  path: ''
  id: MTXywy
- name: importance
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': high
      '2': medium
      '3': low
  path: ''
  id: SOCalD
---

# open-question

Metadata Menu definition for `open-question` notes in: 04 Investigation/Open Questions.
Edit fields via Metadata Menu's fileClass view, not by hand.
