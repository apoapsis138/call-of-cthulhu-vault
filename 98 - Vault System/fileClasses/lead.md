---
limit: 20
mapWithTag: false
icon: footprints
tagNames: null
filesPaths:
- 04 Investigation/Leads
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- 2YGcf9
- gE8w8L
- 2B0FI7
- IPHnuS
- MNwDGy
- 1Ju0Rl
- T1hFyl
- a5mS2d
- NRaDkQ
- SOCalD
version: '2.1'
fields:
- name: status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': new
      '2': investigating
      '3': blocked
      '4': waiting
      '5': resolved
      '6': dead-end
      '7': archived
  path: ''
  id: 2YGcf9
- name: summary
  type: Input
  options: {}
  path: ''
  id: gE8w8L
- name: next_action
  type: Input
  options: {}
  path: ''
  id: 2B0FI7
- name: blocked_by
  type: Input
  options: {}
  path: ''
  id: IPHnuS
- name: related_clues
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Clues"')
  path: ''
  id: MNwDGy
- name: related_npcs
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: 1Ju0Rl
- name: related_locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: T1hFyl
- name: related_sessions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: a5mS2d
- name: confidence
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': confirmed
      '2': likely
      '3': possible
      '4': rumor
      '5': contradicted
      '6': unknown
  path: ''
  id: NRaDkQ
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

# lead

Metadata Menu definition for `lead` notes in: 04 Investigation/Leads.
Edit fields via Metadata Menu's fileClass view, not by hand.
