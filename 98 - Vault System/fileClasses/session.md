---
limit: 20
mapWithTag: false
icon: calendar
tagNames: null
filesPaths:
- 01 Sessions
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- 5TEbOo
- j344UI
- G65X4O
- SnsLtK
- OSMcwi
- ephtMA
- DQsJBr
- 3T2XO5
- PzAxSu
- C8iENC
- OnCs4n
- jmMp6c
- tTAQ5G
- dKIAih
- wsnRCq
- SOCalD
version: '2.1'
fields:
- name: status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': planned
      '2': active
      '3': complete
      '4': missed
      '5': archived
  path: ''
  id: 5TEbOo
- name: session_number
  type: Number
  options: {}
  path: ''
  id: j344UI
- name: real_date
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: G65X4O
- name: campaign_date
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: SnsLtK
- name: campaign_end_date
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: OSMcwi
- name: summary
  type: Input
  options: {}
  path: ''
  id: ephtMA
- name: locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: DQsJBr
- name: pcs_present
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/PCs"')
  path: ''
  id: 3T2XO5
- name: major_npcs
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: PzAxSu
- name: major_clues
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Clues"')
  path: ''
  id: C8iENC
- name: major_leads
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Leads"')
  path: ''
  id: OnCs4n
- name: major_handouts
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Handouts"')
  path: ''
  id: jmMp6c
- name: major_evidence
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Evidence"')
  path: ''
  id: tTAQ5G
- name: related_questions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Open Questions"')
  path: ''
  id: dKIAih
- name: related_timeline
  type: MultiFile
  options:
    dvQueryString: dv.pages('"05 Timeline"')
  path: ''
  id: wsnRCq
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

# session

Metadata Menu definition for `session` notes in: 01 Sessions.
Edit fields via Metadata Menu's fileClass view, not by hand.
