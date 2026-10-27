---
limit: 20
mapWithTag: false
icon: user
tagNames: null
filesPaths:
- 02 Characters/NPCs
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- cOnWdC
- 0oJhds
- OMbCJN
- 1mQQku
- lUxtV3
- CzdeGb
- a7J3Yc
- ECvAN2
- nr0RH9
- QbfQ6M
- NAzneN
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
      '2': missing
      '3': dead
      '4': unknown
      '5': inactive
      '6': archived
  path: ''
  id: cOnWdC
- name: disposition
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': ally
      '2': friendly
      '3': neutral
      '4': suspicious
      '5': hostile
      '6': enemy
      '7': unknown
  path: ''
  id: 0oJhds
- name: occupation
  type: Input
  options: {}
  path: ''
  id: OMbCJN
- name: nationality
  type: Input
  options: {}
  path: ''
  id: 1mQQku
- name: pronouns
  type: Input
  options: {}
  path: ''
  id: lUxtV3
- name: first_seen
  type: File
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: CzdeGb
- name: last_seen
  type: File
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: a7J3Yc
- name: location
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: ECvAN2
- name: faction
  type: File
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Cults and Factions"')
  path: ''
  id: nr0RH9
- name: organization
  type: File
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Organizations"')
  path: ''
  id: QbfQ6M
- name: summary
  type: Input
  options: {}
  path: ''
  id: NAzneN
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

# npc

Metadata Menu definition for `npc` notes in: 02 Characters/NPCs.
Edit fields via Metadata Menu's fileClass view, not by hand.
