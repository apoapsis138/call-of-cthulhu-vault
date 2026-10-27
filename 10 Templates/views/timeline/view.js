// Visual case timeline: dated entries down a typed rule, grouped by day.
// Usage:  await dv.view("10 Templates/views/timeline")
// Renders in one pass (no awaits) so Digital Garden captures it when publishing.

const MARKS = {
  prologue: "✦", historical: "⌛", discovery: "✚", reveal: "◉",
  meeting: "☕", travel: "➜", death: "✝", attack: "⚔",
};

function fmt(d) {
  if (!d) return null;
  return d.toFormat ? d.toFormat("yyyy-MM-dd") : String(d);
}
function nice(d) {
  return d && d.toFormat ? d.toFormat("EEEE d MMMM yyyy") : String(d);
}

const HIDDEN = ["10 Templates/", "98 - Vault System/", "99 - Archive/"];

const events = dv.pages()
  .where((p) => p.type === "timeline-entry" && p.status !== "archived" && !HIDDEN.some((h) => p.file.path.startsWith(h)))
  .array()
  .sort((a, b) => {
    const da = fmt(a.campaign_date) || "9999", db = fmt(b.campaign_date) || "9999";
    if (da !== db) return da.localeCompare(db);
    return (a.timeline_order ?? 0) - (b.timeline_order ?? 0) || a.file.name.localeCompare(b.file.name);
  });

const root = dv.el("div", "", { cls: "coc-timeline" });
let lastDay = null;
for (const e of events) {
  const day = fmt(e.campaign_date) || e.date_text || "Undated";
  if (day !== lastDay) {
    dv.el("div", e.campaign_date ? nice(e.campaign_date) : day, { container: root, cls: "mt-day" });
    lastDay = day;
  }
  const type = String(e.event_type || "event").toLowerCase();
  const entry = dv.el("div", "", { container: root, cls: `mt-entry mt-${type}` });
  dv.el("div", MARKS[type] || "•", { container: entry, cls: "mt-mark" });
  const card = dv.el("div", "", { container: entry, cls: "mt-card" });
  const title = e.file.name.replace(/^Timeline - [^-]+-[^-]+-[^ ]+ - /, "").replace(/^Timeline - /, "");
  const bits = [`**${dv.fileLink(e.file.path, false, title)}**`, `<span class="mt-type">${type}</span>`];
  if (e.campaign_time) bits.push(`<span class="mt-time">${e.campaign_time}</span>`);
  dv.el("div", bits.join(" "), { container: card, cls: "mt-head" });
  if (e.summary) dv.el("div", String(e.summary), { container: card, cls: "mt-summary" });
  const meta = [];
  if (e.location) meta.push(`📍 ${e.location}`);
  const sessions = [].concat(e.related_sessions || []).filter(Boolean);
  if (sessions.length) meta.push(`📓 ${sessions.map(String).join(", ")}`);
  if (meta.length) dv.el("div", meta.join(" · "), { container: card, cls: "mt-meta" });
}
if (!events.length) dv.el("p", "*No timeline entries yet.*", { container: root });
