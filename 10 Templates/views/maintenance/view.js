// Vault maintenance checks: what needs attention after notes change.
// Usage inside a note:
//   ```dataviewjs
//   await dv.view("10 Templates/views/maintenance")
//   ```
// Optional input:
//   { sections: ["seen", "review"] }   only show some sections
//   { since: "2026-10-01" }            ignore edits before this date in "Worth a second look"
//                                      (also read from the host note's `review_since` property)
// Sections: home, seen, review, create, values, blanks, unlinked, publish
//
// Excusing a note: the Excuse button on a row adds that section's name to the
// note's `maintenance_ignore` property, and the note stops appearing in that
// section. `maintenance_ignore: [all]` hides it from every section. Remove the
// value (or the property) to bring it back.
//
// This view is for working in Obsidian only. It has buttons that edit
// properties, so keep the note that hosts it unpublished.

const cur = dv.current();
const opts = input || {};
const wanted = opts.sections ? new Set(opts.sections) : null;
const show = (id) => !wanted || wanted.has(id);

// ---------- Configuration ----------
const SKIP_FOLDERS = ["10 Templates/", "98 - Vault System/", "99 - Archive/"];
const HIDDEN_TYPES = new Set(["dashboard", "structure-note", "campaign-home"]);
const FILECLASS_FOLDER = "98 - Vault System/fileClasses";

// Notes where relationships get written (see Workflow Reference).
const EVENT_TYPES = new Set([
  "session", "clue", "lead", "timeline-entry", "evidence", "handout",
  "open-question", "travel-leg",
]);

// Properties that should not be left empty, by note type.
const SHOULD_FILL = {
  session: ["session_number", "real_date", "summary"],
  npc: ["summary", "disposition"],
  clue: ["summary", "found_during"],
  lead: ["next_action"],
  evidence: ["found_during", "image"],
  handout: ["found_during", "image"],
  "open-question": ["summary"],
  "timeline-entry": ["summary"],
};
const CLOSED_STATUSES = new Set(["resolved", "dead-end", "archived", "answered"]);
const PLACEHOLDER_IMAGE = "PlaceholderImage";
const PREFIXES = /^(Clue|Lead|Question|Travel|Evidence|Handout|Gear|Map|Timeline) - /;
const TOLERANCE_MS = 60 * 1000; // ignore edits made within a minute of each other

// ---------- Helpers ----------
const arr = (v) => (v && v.array ? v.array() : Array.isArray(v) ? v : v ? [...v] : []);
const typeOf = (p) => String(p.type ?? "");
const millis = (d) => (d && d.toMillis ? d.toMillis() : d ? new Date(String(d)).getTime() : 0);
const day = (d) => (d && d.toFormat ? d.toFormat("yyyy-MM-dd") : String(d ?? ""));
const isBlank = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
const inSkipFolder = (path) => SKIP_FOLDERS.some((f) => path.startsWith(f));
const shortName = (p) => p.file.name.replace(PREFIXES, "");
const link = (p) => dv.fileLink(p.file.path, false, shortName(p)).toString();
const byName = (a, b) => a.file.name.localeCompare(b.file.name);
const list = (pages, max = 6) => {
  const shown = pages.slice(0, max).map(link).join(", ");
  return pages.length > max ? `${shown} and ${pages.length - max} more` : shown;
};

const pages = arr(dv.pages()).filter((p) => p.file && !inSkipFolder(p.file.path));
const content = pages.filter((p) => typeOf(p) && !HIDDEN_TYPES.has(typeOf(p)));
const byPath = new Map(pages.map((p) => [p.file.path, p]));
const linkers = (p) =>
  [...new Set(arr(p.file.inlinks).map((l) => l.path))]
    .filter((path) => path !== p.file.path)
    .map((path) => byPath.get(path))
    .filter((q) => q && typeOf(q) && !HIDDEN_TYPES.has(typeOf(q)));

async function setProps(path, changes) {
  const file = app.vault.getAbstractFileByPath(path);
  if (!file) return;
  await app.fileManager.processFrontMatter(file, (fm) => Object.assign(fm, changes));
}
const today = () =>
  typeof moment !== "undefined" ? moment().format("YYYY-MM-DD") : new Date().toISOString().slice(0, 10);
const IGNORE_KEY = "maintenance_ignore";
const ignoreList = (p) => {
  const v = (p.file.frontmatter || {})[IGNORE_KEY];
  return (Array.isArray(v) ? v : isBlank(v) ? [] : String(v).split(",")).map((x) => String(x).trim());
};
const excusedFrom = (p, id) => { const l = ignoreList(p); return l.includes(id) || l.includes("all"); };
async function excuse(path, id) {
  const file = app.vault.getAbstractFileByPath(path);
  if (!file) return;
  await app.fileManager.processFrontMatter(file, (fm) => {
    const v = fm[IGNORE_KEY];
    const now = Array.isArray(v) ? v.map(String) : isBlank(v) ? [] : String(v).split(",").map((x) => x.trim());
    if (!now.includes(id)) now.push(id);
    fm[IGNORE_KEY] = now;
  });
}
// Notes a section should check: everything not excused from it.
const candidates = (id) => content.filter((p) => !excusedFrom(p, id));
const notify = (msg) => { if (typeof Notice !== "undefined") new Notice(msg); };

// ---------- Rendering ----------
const root = dv.el("div", "", { cls: "coc-maintenance" });

function section(id, title, blurb, rows, bulk) {
  if (!show(id)) return;
  dv.el("h3", `${title} (${rows.length})`, { container: root });
  dv.el("p", rows.length ? blurb : "*Nothing to do.*", { container: root });
  if (!rows.length) return;
  if (bulk) button(root, bulk.label, bulk.run);
  for (const r of rows) {
    const row = dv.el("div", "", { container: root, cls: "coc-maintenance-row" });
    row.style.display = "flex";
    row.style.alignItems = "baseline";
    row.style.gap = "0.75em";
    row.style.margin = "0.25em 0";
    const text = dv.el("div", r.text, { container: row });
    text.style.flex = "1";
    if (r.action) button(row, r.action.label, r.action.run);
    if (r.path) button(row, "Excuse", () => excuse(r.path, id)).title = "Stop listing this note in this section";
  }
}

function button(parent, label, run) {
  const b = document.createElement("button");
  b.textContent = label;
  b.addEventListener("click", async () => {
    b.disabled = true;
    try { await run(); } catch (e) { notify("Maintenance view: " + e.message); b.disabled = false; }
  });
  parent.appendChild(b);
  return b;
}

// ---------- 0. Campaign Home ----------
if (show("home")) {
  const rows = [];
  const home = pages.find((p) => typeOf(p) === "campaign-home");
  const latest = pages
    .filter((p) => typeOf(p) === "session" && p.session_number != null)
    .sort((a, b) => Number(b.session_number) - Number(a.session_number))[0];
  if (home && latest && !excusedFrom(home, "home")) {
    const recorded = home.current_session && home.current_session.path ? dv.page(home.current_session.path) : null;
    if (!recorded || recorded.file.path !== latest.file.path) {
      rows.push({
        path: home.file.path,
        text: `${link(home)}: \`current_session\` says ${recorded ? link(recorded) : "nothing"}, but the latest session is ${link(latest)}. Check \`current_location\`, \`current_date\` and the hand-written sections too.`,
        action: { label: "Fix", run: () => setProps(home.file.path, { current_session: `[[${latest.file.name}]]` }) },
      });
    }
  }
  section("home", "Campaign Home", "The site's front page reads these properties.", rows);
}

// ---------- 1. First seen / last seen ----------
if (show("seen")) {
  const sessions = pages
    .filter((p) => typeOf(p) === "session" && p.session_number != null)
    .sort((a, b) => Number(a.session_number) - Number(b.session_number));
  const fixes = [];
  for (const p of candidates("seen").filter((p) => ["npc", "pc"].includes(typeOf(p))).sort(byName)) {
    const seenIn = sessions.filter((s) => arr(s.file.outlinks).some((l) => l.path === p.file.path));
    if (!seenIn.length) continue;
    const fm = p.file.frontmatter || {};
    const first = seenIn[0], last = seenIn[seenIn.length - 1];
    const changes = {}, notes = [];
    if (isBlank(fm.first_seen)) {
      changes.first_seen = `[[${first.file.name}]]`;
      notes.push(`first seen is blank, should be ${link(first)}`);
    }
    // Only notes that carry a last_seen property are checked (NPCs do, PCs usually don't).
    if ("last_seen" in fm) {
      const recorded = p.last_seen && p.last_seen.path ? dv.page(p.last_seen.path) : null;
      const recordedNo = recorded && recorded.session_number != null ? Number(recorded.session_number) : -Infinity;
      if (Number(last.session_number) > recordedNo) {
        changes.last_seen = `[[${last.file.name}]]`;
        notes.push(`last seen says ${recorded ? link(recorded) : "nothing"}, but ${link(last)} mentions them`);
      }
    }
    if (notes.length) fixes.push({ path: p.file.path, changes, text: `${link(p)}: ${notes.join("; ")}` });
  }
  section(
    "seen", "First seen and last seen",
    "These people appear in a session that their own note doesn't record yet. **Fix** writes the session into the note's properties.",
    fixes.map((f) => ({ path: f.path, text: f.text, action: { label: "Fix", run: () => setProps(f.path, f.changes) } })),
    fixes.length > 1 && {
      label: `Fix all ${fixes.length}`,
      run: async () => { for (const f of fixes) await setProps(f.path, f.changes); notify(`Updated ${fixes.length} notes`); },
    }
  );
}

// ---------- 2. Worth a second look ----------
if (show("review")) {
  const since = millis(opts.since ?? (cur && cur.review_since));
  const stale = [];
  for (const p of candidates("review").filter((p) => !EVENT_TYPES.has(typeOf(p)))) {
    const own = millis(p.file.mtime);
    const newer = linkers(p)
      .filter((q) => EVENT_TYPES.has(typeOf(q)))
      .filter((q) => millis(q.file.mtime) > own + TOLERANCE_MS && millis(q.file.mtime) >= since)
      .sort((a, b) => millis(b.file.mtime) - millis(a.file.mtime));
    if (newer.length) stale.push({ p, newer });
  }
  stale.sort((a, b) => b.newer.length - a.newer.length || byName(a.p, b.p));
  const mark = (path) => setProps(path, { reviewed: today() });
  section(
    "review", "Worth a second look",
    "Notes that link to these were edited after the note itself was last touched, so its summary, status or location may be out of date. Editing the note clears it from this list; **Reviewed** clears it without other changes by stamping today's date in a `reviewed` property.",
    stale.map(({ p, newer }) => ({
      path: p.file.path,
      text: `${link(p)} *(${typeOf(p)}, last edited ${day(p.file.mtime)})*: ${list(newer)}`,
      action: { label: "Reviewed", run: () => mark(p.file.path) },
    })),
    stale.length > 1 && {
      label: `Mark all ${stale.length} reviewed`,
      run: async () => { for (const s of stale) await mark(s.p.file.path); notify(`Marked ${stale.length} notes reviewed`); },
    }
  );
}

// ---------- 3. Notes to create ----------
if (show("create")) {
  const missing = new Map(); // link text -> [source page]
  for (const [source, targets] of Object.entries(app.metadataCache.unresolvedLinks || {})) {
    const src = byPath.get(source);
    if (!src || !typeOf(src) || HIDDEN_TYPES.has(typeOf(src))) continue;
    for (const target of Object.keys(targets)) {
      if (!missing.has(target)) missing.set(target, []);
      missing.get(target).push(src);
    }
  }
  section(
    "create", "Notes to create",
    "Links that point at notes that don't exist yet. Create them with QuickAdd so they get the right template and folder.",
    [...missing.entries()]
      .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
      .map(([target, sources]) => ({ text: `**${target}**: mentioned in ${list(sources.sort(byName))}` }))
  );
}

// ---------- 4. Values outside the allowed lists ----------
if (show("values")) {
  const classes = arr(dv.pages(`"${FILECLASS_FOLDER}"`))
    .map((c) => c.file.frontmatter || {})
    .filter((fm) => Array.isArray(fm.filesPaths) && Array.isArray(fm.fields));
  const problems = [];
  for (const p of candidates("values").sort(byName)) {
    const fm = p.file.frontmatter || {};
    for (const c of classes) {
      if (!c.filesPaths.some((folder) => p.file.path.startsWith(folder + "/"))) continue;
      for (const field of c.fields) {
        if (field.type !== "Select" || !field.options || !field.options.valuesList) continue;
        const allowed = Object.values(field.options.valuesList).map(String);
        const value = fm[field.name];
        if (isBlank(value) || allowed.includes(String(value))) continue;
        problems.push({ path: p.file.path, text: `${link(p)}: \`${field.name}\` is \`${value}\`. Allowed: ${allowed.join(", ")}` });
      }
    }
  }
  section(
    "values", "Values outside the allowed lists",
    "Checked against the Metadata Menu definitions in `98 - Vault System/fileClasses`. Dashboards that filter on these properties can miss notes with unexpected values.",
    problems
  );
}

// ---------- 5. Blank fields and placeholder images ----------
if (show("blanks")) {
  const rows = [];
  for (const p of candidates("blanks").sort(byName)) {
    const fm = p.file.frontmatter || {};
    let keys = SHOULD_FILL[typeOf(p)] || [];
    if (CLOSED_STATUSES.has(String(fm.status))) keys = keys.filter((k) => k !== "next_action");
    const blank = keys.filter((k) => isBlank(fm[k]));
    if (typeOf(p) === "timeline-entry" && isBlank(fm.campaign_date) && isBlank(fm.date_text)) blank.push("campaign_date or date_text");
    const bits = [];
    if (blank.length) bits.push("blank " + blank.map((k) => `\`${k}\``).join(", "));
    if ([fm.portrait, fm.cover].some((v) => String(v ?? "").includes(PLACEHOLDER_IMAGE))) bits.push("still using the placeholder image");
    if (bits.length) rows.push({ path: p.file.path, text: `${link(p)}: ${bits.join("; ")}` });
  }
  section("blanks", "Blank fields and placeholder images", "Properties that dashboards and infoboxes rely on.", rows);
}

// ---------- 6. Notes nothing links to ----------
if (show("unlinked")) {
  // Clues, leads and the like connect by linking out; people, places and lore
  // connect by being linked to.
  const linksOut = (p) =>
    arr(p.file.outlinks).some((l) => {
      const q = byPath.get(l.path);
      return q && q !== p && typeOf(q) && !HIDDEN_TYPES.has(typeOf(q));
    });
  const rows = candidates("unlinked")
    .filter((p) => linkers(p).length === 0 && !(EVENT_TYPES.has(typeOf(p)) && linksOut(p)))
    .sort((a, b) => typeOf(a).localeCompare(typeOf(b)) || byName(a, b))
    .map((p) => ({ path: p.file.path, text: `${link(p)} *(${typeOf(p)})*` }));
  section(
    "unlinked", "Notes not connected to anything",
    "People, places and lore that no other note links to, and clues, leads or other records that link to nothing. None of these show up in a Connections panel.",
    rows
  );
}

// ---------- 7. Publishing ----------
if (show("publish")) {
  const published = (p) => (p.file.frontmatter || {})["dg-publish"] === true;
  const rows = [];
  for (const p of candidates("publish").sort(byName)) {
    if (!published(p)) { rows.push({ path: p.file.path, text: `${link(p)} is not published` }); continue; }
    const dead = [...new Set(arr(p.file.outlinks).map((l) => l.path))]
      .filter((path) => path.endsWith(".md"))
      .map((path) => dv.page(path))
      .filter((q) => q && q.file && !published(q));
    if (dead.length) rows.push({ path: p.file.path, text: `${link(p)} links to unpublished ${list(dead)}` });
  }
  section(
    "publish", "Publishing gaps",
    "Unpublished notes in the campaign folders, and published notes whose links will be dead on the site. For what has changed since the last publish, open the Digital Garden Publication Center.",
    rows
  );
}

// ---------- Excused notes ----------
{
  const excused = content.filter((p) => ignoreList(p).length).sort(byName);
  if (excused.length) {
    dv.el("h3", `Excused (${excused.length})`, { container: root });
    dv.el("p", "Hidden from the sections named. Remove the value from the note's `maintenance_ignore` property to bring it back.", { container: root });
    for (const p of excused) dv.el("div", `${link(p)}: ${ignoreList(p).join(", ")}`, { container: root, cls: "coc-maintenance-row" });
  }
}
