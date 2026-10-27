```dataviewjs
const p = dv.current();

function show(value) {
  if (!value) return "Not recorded or not applicable";
  if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";
  if (value.toFormat) return value.toFormat("yyyy-MM-dd");
  return value;
}

const rows = [
  ["Source / provided by", p.source],
  ["Found or encountered in", p.found_in],
  ["Found or learned during", p.found_during],
  ["Found, noticed, or recovered by", p.found_by],
  ["Examined, interpreted, or analyzed by", p.examined_by],
  ["Current physical location", p.physical_location],
  ["Related handouts", p.related_handouts],
  ["Related evidence", p.related_evidence]
].filter(row => row[1] !== undefined);

dv.list(rows.map(row => `**${row[0]}:** ${show(row[1])}`));
```