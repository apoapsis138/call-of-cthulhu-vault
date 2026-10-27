"""Checks every string board in 09 Dashboards/Boards against the String Board Standard
(98 - Vault System/String Board Standard.md) and lists what breaks it.

    python check_boards.py            every board
    python check_boards.py "Relationship Web"

Measures are in canvas units, the same on the site and in Obsidian. Text widths are estimates for the
site's typewriter faces, so a near miss is worth a look rather than a certain fault.
"""
import json
import math
import re
import sys
from pathlib import Path

VAULT = Path(__file__).resolve().parents[2]
BOARDS = VAULT / "09 Dashboards/Boards"

PRINT_MIN = (240, 460)     # a photograph or a map, with a name and a line under it
CARD_MIN_W = 280           # an index card
CARD_GAP = 60              # clear cork between any two cards
TAG_CHAR, TAG_PAD = 10.5, 24  # a string's tag: width per character, and its margins
SAG_MAX = 70               # the site lets the yarn hang this far below the straight line
CLEAR = 12                 # how close a string may pass to a card it doesn't belong to


def is_print(n):
    return str(n.get("text", "")).startswith("![[")


def card_lines(text, width, size):
    """Rough count of typed lines a card's text needs at a given width."""
    per_line = max(1, int((width - 32) / size))
    lines = 0
    for para in re.sub(r"!\[\[[^\]]+\]\]", "", text).split("\n"):
        words = re.sub(r"\[\[([^\]|]+\|)?([^\]]+)\]\]", r"\2", para).replace("#", "").replace("*", "").strip()
        if words:
            lines += math.ceil(len(words) / per_line)
    return lines


def side_point(n, side):
    x, y, w, h = n["x"], n["y"], n["width"], n["height"]
    return {"left": (x, y + h / 2), "right": (x + w, y + h / 2), "top": (x + w / 2, y), "bottom": (x + w / 2, y + h)}[side]


def yarn(a, b, steps=24):
    """The string as the site hangs it: a curve sagging below the straight line between the pins."""
    (x1, y1), (x2, y2) = a, b
    sag = min(SAG_MAX, 18 + math.hypot(x2 - x1, y2 - y1) * 0.1)
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2 + sag
    return [((1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2)
            for t in (i / steps for i in range(steps + 1))]


NORMAL = {"left": (-1, 0), "right": (1, 0), "top": (0, -1), "bottom": (0, 1)}


def route(a, fs, b, ts, steps=24):
    """Every point the string passes through in either viewer: the site's sagging yarn, and Obsidian's curve,
    which leaves each card straight out from its side before bending."""
    p, q = side_point(a, fs), side_point(b, ts)
    k = min(math.hypot(q[0] - p[0], q[1] - p[1]) / 2, 150)
    c1 = (p[0] + NORMAL[fs][0] * k, p[1] + NORMAL[fs][1] * k)
    c2 = (q[0] + NORMAL[ts][0] * k, q[1] + NORMAL[ts][1] * k)
    curve = [tuple((1 - t) ** 3 * p[i] + 3 * (1 - t) ** 2 * t * c1[i] + 3 * (1 - t) * t * t * c2[i] + t ** 3 * q[i] for i in (0, 1))
             for t in (j / steps for j in range(steps + 1))]
    return yarn(p, q, steps) + curve


def inside(p, n, pad=0):
    return n["x"] - pad < p[0] < n["x"] + n["width"] + pad and n["y"] - pad < p[1] < n["y"] + n["height"] + pad


def check(path):
    board = json.loads(path.read_text(encoding="utf-8"))
    nodes, edges = board.get("nodes", []), board.get("edges", [])
    by_id = {n["id"]: n for n in nodes}
    name = lambda n: re.sub(r"[#*!\[\]]", "", str(n.get("text", "")).split("\n")[0 if not is_print(n) else 1])[:28].strip() or n["id"]
    faults = []
    for n in nodes:
        if is_print(n) and "board-home" not in n["text"]:
            if n["width"] < PRINT_MIN[0] or n["height"] < PRINT_MIN[1]:
                faults.append(f"{name(n)}: a print should be at least {PRINT_MIN[0]} x {PRINT_MIN[1]} (is {n['width']} x {n['height']})")
        elif not is_print(n):
            need = 28 + 24 * card_lines(n["text"], n["width"], 9.5) + (30 if n["text"].startswith("###") else 0)
            if n["width"] < CARD_MIN_W and not n.get("color"):
                faults.append(f"{name(n)}: an index card should be at least {CARD_MIN_W} wide (is {n['width']})")
            if need > n["height"]:
                faults.append(f"{name(n)}: text needs about {need} high; the card is {n['height']}")
    for i, a in enumerate(nodes):
        for b in nodes[i + 1:]:
            if (a["x"] - CARD_GAP < b["x"] + b["width"] and b["x"] - CARD_GAP < a["x"] + a["width"]
                    and a["y"] - CARD_GAP < b["y"] + b["height"] and b["y"] - CARD_GAP < a["y"] + a["height"]):
                faults.append(f"{name(a)} and {name(b)}: less than {CARD_GAP} of cork between them")
    pairs = {}
    for e in edges:
        a, b = by_id[e["fromNode"]], by_id[e["toNode"]]
        key = frozenset((a["id"], b["id"]))
        pairs.setdefault(key, []).append(e.get("label", ""))
        p, q = side_point(a, e.get("fromSide", "right")), side_point(b, e.get("toSide", "left"))
        what = f"string {name(a)} -> {name(b)}"
        line = route(a, e.get("fromSide", "right"), b, e.get("toSide", "left"))
        crossed = [name(n) for n in nodes if n is not a and n is not b and any(inside(pt, n, CLEAR) for pt in line)]
        if crossed:
            faults.append(f"{what}: runs across {', '.join(crossed)}")
        label = e.get("label", "")
        if label:
            length = math.hypot(q[0] - p[0], q[1] - p[1]) or 1
            room = length - 40
            # the tag is level, so a string needs its width when it runs across, only its height when it drops
            need = abs(q[0] - p[0]) / length * (len(label) * TAG_CHAR + TAG_PAD) + abs(q[1] - p[1]) / length * 34
            if need > room:
                faults.append(f"{what}: tag \"{label}\" needs about {need:.0f} of string; there is {max(room, 0):.0f}")
    for key, labels in pairs.items():
        if len(labels) > 1:
            a, b = (by_id[k] for k in key)
            faults.append(f"{name(a)} and {name(b)}: {len(labels)} strings ({' / '.join(labels)}); use one, with one tag")
    return faults


def best_sides(a, b, nodes, used=None):
    """Where a string should leave and arrive: facing sides when the cards share a row or column, so it runs
    straight; otherwise one level side and one upright side, so it turns a single smooth corner. Failing that
    (it would cross a card), over the top or under the bottom of both."""
    (ax, ay), (bx, by) = (a["x"] + a["width"] / 2, a["y"] + a["height"] / 2), (b["x"] + b["width"] / 2, b["y"] + b["height"] / 2)
    dx, dy = bx - ax, by - ay
    h = ("right", "left") if dx > 0 else ("left", "right")
    v = ("bottom", "top") if dy > 0 else ("top", "bottom")
    level = abs(dy) < (a["height"] + b["height"]) / 4
    upright = abs(dx) < (a["width"] + b["width"]) / 4
    tries = [h] if level else [v] if upright else ([(h[0], v[1]), (v[0], h[1])] if abs(dx) >= abs(dy) else [(v[0], h[1]), (h[0], v[1])])
    fallback = [h, v, ("top", "top"), ("bottom", "bottom")]
    used = used or {}
    def is_clear(s):
        line = route(a, s[0], b, s[1])
        return not any(inside(pt, n, CLEAR) for n in nodes if n is not a and n is not b for pt in line)
    clear = [s for s in tries if is_clear(s)]
    if clear:  # of the preferred routes, the one landing on the fewest pins other strings already use
        return min(clear, key=lambda s: used.get((a["id"], s[0]), 0) + used.get((b["id"], s[1]), 0))
    return next((s for s in fallback if is_clear(s)), tries[0])


def fix_sides(path):
    board = json.loads(path.read_text(encoding="utf-8"))
    by_id = {n["id"]: n for n in board["nodes"]}
    used = {}
    for e in board.get("edges", []):
        fs, ts = best_sides(by_id[e["fromNode"]], by_id[e["toNode"]], board["nodes"], used)
        e["fromSide"], e["toSide"] = fs, ts
        used[(e["fromNode"], fs)] = used.get((e["fromNode"], fs), 0) + 1
        used[(e["toNode"], ts)] = used.get((e["toNode"], ts), 0) + 1
    path.write_text(json.dumps(board, indent="\t", ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")


if __name__ == "__main__":
    wanted = [a for a in sys.argv[1:] if a != "--fix-sides"]
    total = 0
    for path in sorted(BOARDS.glob("*.canvas")):
        if wanted and path.stem not in wanted:
            continue
        if "--fix-sides" in sys.argv:
            fix_sides(path)
        faults = check(path)
        total += len(faults)
        print(f"{path.stem}: {'clean' if not faults else f'{len(faults)} to fix'}")
        for f in faults:
            print("  - " + f)
    sys.exit(1 if total else 0)
