---
limit: 20
mapWithTag: false
icon: map-pin
tagNames: null
filesPaths:
- 03 Locations
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- ykmTM0
- CdW8WF
- MhbSzz
- Gs2aUv
- imiQwv
- e5qJjq
- teXOVB
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
      '2': visited
      '3': unvisited
      '4': dangerous
      '5': destroyed
      '6': unknown
      '7': archived
  path: ''
  id: ykmTM0
- name: location_type
  type: Input
  options: {}
  path: ''
  id: CdW8WF
- name: parent_location
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: MhbSzz
- name: country
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: Gs2aUv
- name: first_visited
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: imiQwv
- name: last_visited
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: e5qJjq
- name: related_locations
  type: MultiFile
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: teXOVB
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

# location

Metadata Menu definition for `location` notes in: 03 Locations.
Edit fields via Metadata Menu's fileClass view, not by hand.
