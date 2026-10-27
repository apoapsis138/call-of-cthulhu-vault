---
limit: 20
mapWithTag: false
icon: clock
tagNames: null
filesPaths:
- 05 Timeline
bookmarksGroups: null
excludes: null
extends: null
savedViews: []
favoriteView: null
fieldsOrder:
- 6fBqYP
- L9hJY5
- gzNZ1a
- 3mVLQH
- nLZZ6G
- 5pFrWD
- TwmL1V
- qBwNTz
- U2TJQN
- PJIpLE
- oKUxv3
- FnRGpS
- Wij7Fq
- yrvt7Z
- RnQKSN
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
  id: 6fBqYP
- name: event_type
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      '1': prologue
      '2': historical
      '3': discovery
      '4': reveal
      '5': meeting
      '6': travel
      '7': death
      '8': attack
  path: ''
  id: L9hJY5
- name: campaign_date
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: gzNZ1a
- name: campaign_time
  type: Input
  options: {}
  path: ''
  id: 3mVLQH
- name: campaign_end_date
  type: Date
  options:
    dateFormat: YYYY-MM-DD
    defaultInsertAsLink: false
  path: ''
  id: nLZZ6G
- name: date_text
  type: Input
  options: {}
  path: ''
  id: 5pFrWD
- name: timeline_order
  type: Number
  options: {}
  path: ''
  id: TwmL1V
- name: location
  type: File
  options:
    dvQueryString: dv.pages('"03 Locations"')
  path: ''
  id: qBwNTz
- name: summary
  type: Input
  options: {}
  path: ''
  id: U2TJQN
- name: changed
  type: Input
  options: {}
  path: ''
  id: PJIpLE
- name: related_sessions
  type: MultiFile
  options:
    dvQueryString: dv.pages('"01 Sessions"')
  path: ''
  id: oKUxv3
- name: related_npcs
  type: MultiFile
  options:
    dvQueryString: dv.pages('"02 Characters/NPCs"')
  path: ''
  id: FnRGpS
- name: related_clues
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Clues"')
  path: ''
  id: Wij7Fq
- name: related_leads
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Leads"')
  path: ''
  id: yrvt7Z
- name: related_handouts
  type: MultiFile
  options:
    dvQueryString: dv.pages('"04 Investigation/Handouts"')
  path: ''
  id: RnQKSN
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

# timeline-entry

Metadata Menu definition for `timeline-entry` notes in: 05 Timeline.
Edit fields via Metadata Menu's fileClass view, not by hand.
