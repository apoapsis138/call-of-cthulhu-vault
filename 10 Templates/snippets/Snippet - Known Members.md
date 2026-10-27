```dataviewjs

const p = dv.current();

function normalize(value) { if (!value) return []; return Array.isArray(value) ? value : [value]; }

const items = normalize(p.known_members);

if (items.length > 0) { dv.list(items); } else { dv.paragraph("No known members recorded."); }

```