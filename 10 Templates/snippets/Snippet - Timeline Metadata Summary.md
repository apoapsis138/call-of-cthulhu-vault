```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

dv.list([
  `**Campaign date:** ${show(p.campaign_date)}`,
  `**Campaign time:** ${show(p.campaign_time)}`,
  `**End date:** ${show(p.campaign_end_date)}`,
  `**Approximate date:** ${show(p.date_text)}`,
  `**Timeline order:** ${show(p.timeline_order)}`,
  `**Event type:** ${show(p.event_type)}`,
  `**Location:** ${show(p.location)}`,
  `**Related sessions:** ${show(p.related_sessions)}`,
  `**Related handouts:** ${show(p.related_handouts)}`,
  `**Confidence:** ${show(p.confidence)}`,
  `**Importance:** ${show(p.importance)}`
]);
```
