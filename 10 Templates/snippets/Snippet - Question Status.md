```dataviewjs  
const p = dv.current();  
  
function show(value) {  
if (value === true) return "Yes";  
if (value === false) return "No";  
if (!value) return "Not recorded or not applicable";  
if (Array.isArray(value) && value.length === 0) return "Not recorded or not applicable";  
if (value.toFormat) return value.toFormat("yyyy-MM-dd");  
return value;  
}  
  
const rows = [  
["Status", p.status],  
["Importance", p.importance],  
["Topic", p.question_topic],  
["Summary", p.summary],  
["Blocked", p.blocked]  
];  
  
if (p.blocked && p.blocked_by) {  
rows.push(["Blocked by", p.blocked_by]);  
}  
  
if (p.resolution) {  
rows.push(["Resolution", p.resolution]);  
}  
  
dv.list(rows.map(row => `**${row[0]}:** ${show(row[1])}`));  
```
