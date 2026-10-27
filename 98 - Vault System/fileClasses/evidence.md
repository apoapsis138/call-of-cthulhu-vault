---
limit: 20
mapWithTag: false
icon: archive
tagNames: null
filesPaths:
- 04 Investigation/Evidence
- 04 Investigation/Handouts
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- DeEr44
- TVGfHv
- h8pCg0
- VOkTXl
- BTdcoZ
- KTC75K
- Zv7icE
- uWs8Oe
- LrXF11
- XRWInu
- QHuE9V
- QWmG9g
- 6HFmbm
- Q1IO8i
- NRaDkQ
- SOCalD
version: '2.1'
fields:
- name: status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': active
      '2': unreviewed
      '3': reviewed
      '4': lost
      '5': destroyed
      '6': stolen
      '7': transferred
      '8': archived
  path: ''
  id: DeEr44
- name: summary
  type: Input
  options: {}
  path: ''
  id: TVGfHv
- name: source
  type: Input
  options: {}
  path: ''
  id: h8pCg0
- name: found_in
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: VOkTXl
- name: found_during
  type: File
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: BTdcoZ
- name: found_by
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/PCs"')
  path: ''
  id: KTC75K
- name: examined_by
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/PCs"')
  path: ''
  id: Zv7icE
- name: physical_location
  type: Input
  options: {}
  path: ''
  id: uWs8Oe
- name: related_clues
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Clues"')
  path: ''
  id: LrXF11
- name: related_leads
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Leads"')
  path: ''
  id: XRWInu
- name: related_npcs
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: QHuE9V
- name: related_locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: QWmG9g
- name: related_handouts
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Handouts"')
  path: ''
  id: 6HFmbm
- name: related_evidence
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Evidence"')
  path: ''
  id: Q1IO8i
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

# evidence

Metadata Menu definition for `evidence` notes in: 04 Investigation/Evidence, 04 Investigation/Handouts.
Edit fields via Metadata Menu's fileClass view, not by hand.
