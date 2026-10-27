---
limit: 20
mapWithTag: false
icon: users
tagNames: null
filesPaths:
- 06 Lore and Mythos/Cults and Factions
- 06 Lore and Mythos/Organizations
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- g2xFrw
- 1pkW3K
- o8BiRw
- sLCWzV
- KzDN7u
- n9A6YD
- UDOGbZ
- OCvofU
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
      '2': resolved
      '3': inactive
      '4': unknown
      '5': archived
  path: ''
  id: g2xFrw
- name: public_status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': public
      '2': secret
      '3': rumored
      '4': unknown
  path: ''
  id: 1pkW3K
- name: summary
  type: Input
  options: {}
  path: ''
  id: o8BiRw
- name: location
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: sLCWzV
- name: known_members
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: KzDN7u
- name: known_enemies
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs" or "02 Characters/PCs"')
  path: ''
  id: n9A6YD
- name: associated_locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: UDOGbZ
- name: associated_entities
  type: MultiFile
  options:
    dvQueryString: dv.pages('"06 Lore and Mythos/Mythos Entities"')
  path: ''
  id: OCvofU
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

# faction

Metadata Menu definition for `faction` notes in: 06 Lore and Mythos/Cults and Factions, 06 Lore and Mythos/Organizations.
Edit fields via Metadata Menu's fileClass view, not by hand.
