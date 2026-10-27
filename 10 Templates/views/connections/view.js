// Connections panel for any note.
// Usage inside a note:
//   ```dataviewjs
//   await dv.view("10 Templates/views/connections")
//   ```
// Shows two lists:
//   1. "Recorded here": links stored in this note's own properties.
//   2. "Mentioned in": every other note that links to this one, grouped by type.
// Relationships are written once (on clues, leads, sessions, timeline entries,
// evidence, handouts and questions); people and places pick them up here.
//
// Everything is rendered in a single pass (no awaits) so Digital Garden
// captures the full panel when it publishes.

const cur = dv.current();
if (!cur) return;

const HIDDEN_TYPES = new Set(["dashboard", "structure-note", "campaign-home"]);
const HIDDEN_FOLDERS = ["10 Templates/", "99 - Archive/"];

// Display order and headings for "Mentioned in"
const GROUPS = [
  ["session", "Sessions"],
  ["timeline-entry", "Timeline"],
  ["clue", "Clues"],
  ["lead", "Leads"],
  ["open-question", "Open Questions"],
  ["evidence", "Evidence"],
  ["handout", "Handouts"],
  ["item", "Items"],
  ["travel-leg", "Travel"],
  ["npc", "People"],
  ["pc", "Investigators"],
  ["fellow-pc", "Investigators"],
  ["location", "Places"],
  ["faction", "Cults and Factions"],
  ["organization", "Organizations"],
  ["mythos-entity", "Mythos"],
  ["occult-practice", "Occult Practices"],
  ["tome", "Tomes"],
  ["map", "Maps"],
  ["gear", "Gear"],
];
const GROUP_OF = Object.fromEntries(GROUPS);
const GROUP_ORDER = [...new Set(GROUPS.map((g) => g[1])), "Other Notes"];

// Headings for "Recorded here" (property name -> label)
const PROP_LABELS = {
  source: "Source",
  found_in: "Found In",
  found_during: "Found During",
  found_by: "Found By",
  examined_by: "Examined By",
  physical_location: "Currently Held",
  location: "Location",
  locations: "Places",
  current_location: "Current Location",
  parent_location: "Part Of",
  country: "Country",
  origin: "From",
  destination: "To",
  faction: "Faction",
  organization: "Organization",
  owner: "Owner",
  pcs_present: "Investigators Present",
  travelers: "Travelers",
  related_pcs: "Investigators",
  major_npcs: "People",
  related_npcs: "People",
  known_members: "Known Members",
  known_enemies: "Known Enemies",
  trusted_contacts: "Trusted Contacts",
  strained_relationships: "Strained Relationships",
  relationships: "Relationships",
  related_locations: "Places",
  associated_locations: "Places",
  major_clues: "Clues",
  related_clues: "Clues",
  major_leads: "Leads",
  related_leads: "Leads",
  blocked_by: "Blocked By",
  related_questions: "Open Questions",
  major_evidence: "Evidence",
  related_evidence: "Evidence",
  major_handouts: "Handouts",
  related_handouts: "Handouts",
  related_sessions: "Sessions",
  related_timeline: "Timeline",
  related_travel: "Travel",
  related_factions: "Cults and Factions",
  associated_factions: "Cults and Factions",
  related_organizations: "Organizations",
  related_entities: "Mythos",
  associated_entities: "Mythos",
  related_occult_practices: "Occult Practices",
  related_tomes: "Tomes",
  related_mechanics: "Mechanics",
  read_by: "Read By",
  complications: "Complications",
};
// Properties that hold images or are shown elsewhere
const SKIP_PROPS = new Set([
  "file", "tags", "aliases", "cssclasses", "portrait", "cover", "image",
  "map_image", "map", "first_seen", "last_seen", "current_session",
  "up", "down", "same", "next", "prev",
]);

const PREFIXES = /^(Clue|Lead|Question|Travel|Evidence|Handout|Gear|Map) - /;

function isHidden(p) {
  if (!p || !p.file) return true;
  if (p.file.path === cur.file.path) return true;
  if (HIDDEN_TYPES.has(p.type)) return true;
  return HIDDEN_FOLDERS.some((f) => p.file.path.startsWith(f));
}

function asArray(v) {
  if (v === undefined || v === null || v === "") return [];
  return Array.isArray(v) ? v.flat(Infinity) : [v];
}

function shortName(p) {
  return p.file.name.replace(PREFIXES, "");
}

function linkFor(p) {
  return dv.fileLink(p.file.path, false, shortName(p)).toString();
}

function suffix(p) {
  const bits = [];
  if (p.type === "timeline-entry" && (p.campaign_date || p.date_text)) {
    const d = p.campaign_date && p.campaign_date.toFormat
      ? p.campaign_date.toFormat("yyyy-MM-dd")
      : (p.date_text || p.campaign_date);
    bits.push(String(d));
  }
  if (["lead", "open-question"].includes(p.type) && p.status) bits.push(String(p.status));
  if (p.type === "clue" && p.confidence) bits.push(String(p.confidence));
  return bits.length ? ` *(${bits.join(", ")})*` : "";
}

function sortKey(p) {
  if (p.type === "session") return String(p.session_number ?? "").padStart(4, "0") + p.file.name;
  if (p.type === "timeline-entry") {
    const d = p.campaign_date && p.campaign_date.toFormat ? p.campaign_date.toFormat("yyyy-MM-dd") : "";
    return String(p.timeline_order ?? "").padStart(6, "0") + d + p.file.name;
  }
  return p.file.name.toLowerCase();
}

// ---------- 1. Recorded here ----------
const recorded = new Map(); // label -> Map(path -> markdown)
for (const [key, value] of Object.entries(cur)) {
  if (SKIP_PROPS.has(key) || key.startsWith("dg-") || key.startsWith("BC-")) continue;
  for (const v of asArray(value)) {
    if (!dv.value.isLink(v)) continue;
    const label = PROP_LABELS[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    if (!recorded.has(label)) recorded.set(label, new Map());
    const target = dv.page(v.path);
    const md = target && target.file
      ? linkFor(target) + suffix(target)
      : v.toString(); // unresolved link: keep it visible so it can be created
    recorded.get(label).set(target && target.file ? target.file.path : v.path, md);
  }
}

// ---------- 2. Mentioned in ----------
const mentioned = new Map(); // group -> [page]
for (const l of cur.file.inlinks || []) {
  const p = dv.page(l.path);
  if (isHidden(p)) continue;
  const group = GROUP_OF[p.type] || "Other Notes";
  if (!mentioned.has(group)) mentioned.set(group, new Map());
  mentioned.get(group).set(p.file.path, p);
}

// ---------- Render (single pass) ----------
const out = [];
if (recorded.size) {
  out.push("#### Recorded Here");
  for (const [label, items] of recorded) {
    out.push(`**${label}:** ` + [...items.values()].join(", "));
    out.push("");
  }
}
out.push("#### Mentioned In");
const groups = [...mentioned.keys()].sort((a, b) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b));
if (!groups.length) {
  out.push("*No other notes link here yet.*");
} else {
  for (const g of groups) {
    const pages = [...mentioned.get(g).values()].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
    out.push(`**${g}**`);
    for (const p of pages) out.push(`- ${linkFor(p)}${suffix(p)}`);
    out.push("");
  }
}

dv.el("div", out.join("\n"), { cls: "coc-connections" });
