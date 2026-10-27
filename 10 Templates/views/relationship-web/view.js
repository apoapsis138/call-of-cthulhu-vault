// Relationship web: who is connected to whom, built from the case notes.
// Usage (in a note that contains the two marker comments):
//   await dv.view("10 Templates/views/relationship-web")
//
// Two people/groups are linked when the same clue, timeline entry, evidence,
// handout or lead names them both. A thicker line means several notes do.
// The Mermaid code is written into the note between the markers, so it
// publishes as a normal diagram. It only rewrites when something changed.

const START = "%% relationship-web:start %%";
const END = "%% relationship-web:end %%";
const SOURCE_TYPES = new Set(["clue", "timeline-entry", "evidence", "handout", "lead"]);
const NODE_TYPES = new Set(["npc", "faction", "organization", "mythos-entity"]);
const HIDDEN = ["10 Templates/", "99 - Archive/", "98 - Vault System/"];

function asArray(v) {
  if (v === undefined || v === null || v === "") return [];
  return Array.isArray(v) ? v.flat(Infinity) : [v];
}
const idOf = (path) => "n" + path.replace(/[^A-Za-z0-9]/g, "").slice(-40);
const label = (s) => s.replace(/"/g, "'");

const nodes = new Map(); // path -> page
const edges = new Map(); // "a|b" -> count

for (const p of dv.pages().where((p) => SOURCE_TYPES.has(p.type) && !HIDDEN.some((h) => p.file.path.startsWith(h)))) {
  const found = new Set();
  for (const [k, v] of Object.entries(p)) {
    if (k === "file") continue;
    for (const x of asArray(v)) {
      if (!dv.value.isLink(x)) continue;
      const t = dv.page(x.path);
      if (t && NODE_TYPES.has(t.type)) { found.add(t.file.path); nodes.set(t.file.path, t); }
    }
  }
  const list = [...found].sort();
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++) {
      const key = list[i] + "|" + list[j];
      edges.set(key, (edges.get(key) || 0) + 1);
    }
}

const lines = [
  "%%{init: {'theme':'base','themeVariables':{'primaryColor':'#F7F0DC','primaryTextColor':'#1E1B16','primaryBorderColor':'#8C7A52','lineColor':'#4A4232','fontFamily':'Courier Prime, Courier New, monospace','fontSize':'14px'}}}%%",
  "flowchart LR",
];
for (const [path, t] of [...nodes].sort((a, b) => a[1].file.name.localeCompare(b[1].file.name))) {
  const name = label(t.file.name);
  const id = idOf(path);
  if (t.type === "faction" || t.type === "organization") lines.push(`  ${id}{{"${name}"}}`);
  else if (t.type === "mythos-entity") lines.push(`  ${id}(("${name}"))`);
  else lines.push(`  ${id}["${name}"]`);
  const status = String(t.status || "").toLowerCase();
  if (status === "dead") lines.push(`  class ${id} dead`);
  else if (status === "missing") lines.push(`  class ${id} missing`);
  else if (t.type !== "npc") lines.push(`  class ${id} group`);
}
for (const [key, n] of [...edges].sort()) {
  const [a, b] = key.split("|");
  lines.push(`  ${idOf(a)} ${n >= 2 ? "===" : "---"} ${idOf(b)}`);
}
lines.push("  classDef dead fill:#E9D9C4,stroke:#8A140C,stroke-width:2px,stroke-dasharray:5 3,color:#8A140C");
lines.push("  classDef missing fill:#E4E6EA,stroke:#1D2F4F,stroke-width:2px,stroke-dasharray:2 2,color:#1D2F4F");
lines.push("  classDef group fill:#EADBB6,stroke:#5A4A2A,stroke-width:2px");

const block = `${START}\n\`\`\`mermaid\n${lines.join("\n")}\n\`\`\`\n${END}`;

dv.el("p", `*Built automatically from ${edges.size} connections between ${nodes.size} people and groups. Thick line: named together in two or more notes. Dashed red: deceased.*`, { cls: "coc-web-caption" });

// Rewrite the diagram in the note only if it changed (prevents re-render loops).
const file = app.vault.getAbstractFileByPath(dv.current().file.path);
if (file) {
  app.vault.cachedRead(file).then((text) => {
    const s = text.indexOf(START), e = text.indexOf(END);
    if (s === -1 || e === -1) return;
    const current = text.slice(s, e + END.length);
    if (current !== block) app.vault.process(file, (data) => {
      const s2 = data.indexOf(START), e2 = data.indexOf(END);
      return s2 === -1 || e2 === -1 ? data : data.slice(0, s2) + block + data.slice(e2 + END.length);
    });
  });
}
