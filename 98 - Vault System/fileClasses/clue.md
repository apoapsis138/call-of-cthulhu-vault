---
limit: 20
mapWithTag: false
icon: search
tagNames: null
filesPaths:
- 04 Investigation/Clues
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- w8k8BP
- XKQEUs
- hLvRyy
- 6IGYTW
- ygq5di
- zrxfLo
- qydL1t
- cQeFS6
- 3Zuzno
- 6NbKRZ
- FY4ro0
- 2vPqNU
- NNaqwP
- XXTbBC
- XcQrJU
- NRaDkQ
- SOCalD
version: '2.1'
fields:
- name: status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': unreviewed
      '2': reviewed
      '3': connected
      '4': unconnected
      '5': contradictory
      '6': resolved
      '7': archived
  path: ''
  id: w8k8BP
- name: summary
  type: Input
  options: {}
  path: ''
  id: XKQEUs
- name: source
  type: Input
  options: {}
  path: ''
  id: hLvRyy
- name: found_in
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: 6IGYTW
- name: found_during
  type: File
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: ygq5di
- name: found_by
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/PCs"')
  path: ''
  id: zrxfLo
- name: examined_by
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/PCs"')
  path: ''
  id: qydL1t
- name: related_npcs
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: cQeFS6
- name: related_locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: 3Zuzno
- name: related_leads
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Leads"')
  path: ''
  id: 6NbKRZ
- name: related_evidence
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Evidence"')
  path: ''
  id: FY4ro0
- name: related_handouts
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Handouts"')
  path: ''
  id: 2vPqNU
- name: related_questions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Open Questions"')
  path: ''
  id: NNaqwP
- name: related_factions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Cults and Factions"')
  path: ''
  id: XXTbBC
- name: related_entities
  type: MultiFile
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Mythos Entities"')
  path: ''
  id: XcQrJU
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

# clue

Metadata Menu definition for `clue` notes in: 04 Investigation/Clues.
Edit fields via Metadata Menu's fileClass view, not by hand.
