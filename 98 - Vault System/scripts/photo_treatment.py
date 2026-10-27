"""Standard treatment for period photographs used in the vault.

Crops to 3:4, resizes to 720x960, darkens, vignettes the backdrop to near-black
and applies the slight warm tint the painted NPC portraits carry.
See "Photograph Treatment" in 00 Campaign Home/Vault Standards.md.

Usage:
    python photo_treatment.py SOURCE OUTPUT [--crop LEFT TOP RIGHT BOTTOM]
    python photo_treatment.py --new [--dry-run] [--only NAME] [--crop L T R B]
    python photo_treatment.py --exempt FILE [FILE ...]

One file (SOURCE OUTPUT)
    --crop is in source pixels and should be 3:4 (head and shoulders, face in
    the upper middle). Without it the largest 3:4 area is used, centred left to
    right and kept towards the top so the face stays in the upper part.

New portraits (--new)
    Looks through assets/NPCs and assets/PCs and treats, in place, every
    portrait that has not been treated yet. Run it from anywhere; the vault is
    found from the script's own location (or pass --vault PATH).
    --dry-run   list what would happen to each file and change nothing
    --only NAME limit the run to one file name, e.g. --only Edith_Crane.jpg
    --crop      with --only, use this crop instead of the automatic one
    Before a file is changed its untouched original is copied to
    assets/originals/<same subfolder>/<name>.orig. To revert, copy that file
    back over the portrait and drop the ".orig". (The suffix stops Obsidian
    seeing two images with the same name.)
    A portrait counts as treated, and is left alone, when it carries the marker
    this script writes into the file, or when it is already 720x960 in exactly
    the standard tint (portraits treated before the marker existed).

Exempt files (handouts, painted artwork)
    Listed one per line in photo_treatment_exempt.txt beside this script, as
    paths from the vault root (wildcards allowed), e.g.
        assets/NPCs/Jackson_Elias.jpg
    Add lines by hand or with --exempt FILE. Exempt files are never touched.

Requires Pillow.
"""
import argparse
import fnmatch
import os
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
from PIL.PngImagePlugin import PngInfo

SIZE = (720, 960)
GAMMA = 1.7            # darkens midtones
GAIN = 0.95
EDGE_LEVEL = 0.10      # brightness left at the vignetted edges
TINT = (1.04, 1.00, 0.84)  # R, G, B multipliers; matches the existing portraits

MARKER = "vault-photo-treatment"       # written into every treated file
PORTRAIT_DIRS = ("assets/NPCs", "assets/PCs")
ORIGINALS_DIR = "assets/originals"
EXTENSIONS = {".jpg", ".jpeg", ".png"}
EXEMPT_FILE = Path(__file__).with_name("photo_treatment_exempt.txt")
TOP_BIAS = 0.15        # share of spare height cropped off the top (0.5 = centred)
TINT_TOLERANCE = 0.06  # mean distance from TINT that still counts as treated


def auto_crop(w, h):
    cw = min(w, h * 3 // 4)
    ch = cw * 4 // 3
    left, top = (w - cw) // 2, int((h - ch) * TOP_BIAS)
    return (left, top, left + cw, top + ch)


def treat(src, out, crop=None):
    im = Image.open(src).convert("L")
    if crop is None:
        crop = auto_crop(*im.size)
    im = im.crop(crop).resize(SIZE, Image.LANCZOS)
    im = im.filter(ImageFilter.MedianFilter(3))  # knocks back dust and scratches
    im = im.point(lambda v: int(255 * ((v / 255) ** GAMMA) * GAIN))

    w, h = SIZE
    mask = Image.new("L", SIZE, 0)
    ImageDraw.Draw(mask).ellipse((90, 60, w - 90, h + 200), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(110))
    edges = im.point(lambda v: int(v * EDGE_LEVEL))
    im = Image.composite(im, edges, mask)

    r, g, b = (im.point(lambda v, m=m: min(255, int(v * m))) for m in TINT)
    im = Image.merge("RGB", (r, g, b))
    if Path(out).suffix.lower() == ".png":
        info = PngInfo()
        info.add_text("Comment", MARKER)
        im.save(out, format="PNG", pnginfo=info)
    else:
        im.save(out, format="JPEG", quality=92, comment=MARKER.encode())


def treated_reason(path):
    """Why PATH counts as already treated, or None if it does not."""
    with Image.open(path) as im:
        for key in ("comment", "Comment"):
            c = im.info.get(key)
            if isinstance(c, bytes):
                c = c.decode("latin-1")
            if c and MARKER in c:
                return "marker"
        if im.size != SIZE:
            return None
        # No marker: recognise the look itself. Treated pixels are a grey scaled
        # by TINT, so R/G and B/G sit on the tint ratios across the whole image.
        data = im.convert("RGB").resize((90, 120), Image.BOX).tobytes()
    devs = [abs(data[i] / data[i + 1] - TINT[0]) + abs(data[i + 2] / data[i + 1] - TINT[2])
            for i in range(0, len(data), 3) if data[i + 1] >= 40]
    if len(devs) >= 50 and sum(devs) / len(devs) < TINT_TOLERANCE:
        return "720x960 in the standard tint"
    return None


def read_exempt():
    if not EXEMPT_FILE.exists():
        return []
    lines = (l.strip() for l in EXEMPT_FILE.read_text(encoding="utf-8").splitlines())
    return [l.replace("\\", "/") for l in lines if l and not l.startswith("#")]


def is_exempt(rel, patterns):
    return any(fnmatch.fnmatch(rel.lower(), p.lower()) for p in patterns)


def add_exempt(vault, files):
    patterns = read_exempt()
    for f in files:
        rel = Path(f).resolve().relative_to(vault).as_posix()
        if is_exempt(rel, patterns):
            print(f"already exempt  {rel}")
            continue
        with EXEMPT_FILE.open("a", encoding="utf-8") as fh:
            fh.write(rel + "\n")
        patterns.append(rel)
        print(f"exempt          {rel}")


def backup(vault, path, rel):
    """Copy PATH to assets/originals, never overwriting an earlier original."""
    sub = Path(rel).relative_to("assets")
    dest = vault / ORIGINALS_DIR / sub.parent / (sub.name + ".orig")
    n = 1
    while dest.exists():
        n += 1
        dest = dest.with_name(f"{sub.name}.{n}.orig")
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, dest)
    return dest


def process_new(vault, dry_run=False, only=None, crop=None):
    patterns = read_exempt()
    todo = []
    for d in PORTRAIT_DIRS:
        for path in sorted((vault / d).glob("*")):
            if path.suffix.lower() not in EXTENSIONS:
                continue
            if only and path.name.lower() != only.lower():
                continue
            rel = path.relative_to(vault).as_posix()
            if is_exempt(rel, patterns):
                print(f"skip   {rel}  (exempt)")
                continue
            try:
                reason = treated_reason(path)
                with Image.open(path) as im:
                    size = im.size
            except OSError as e:
                print(f"skip   {rel}  (cannot read: {e})")
                continue
            if reason:
                print(f"skip   {rel}  (already treated: {reason})")
            else:
                todo.append((path, rel, size))

    if crop and len(todo) > 1:
        sys.exit("--crop applies to one file; add --only NAME")
    for path, rel, size in todo:
        box = crop or auto_crop(*size)
        detail = f"{size[0]}x{size[1]}, crop {box} -> {SIZE[0]}x{SIZE[1]}"
        if dry_run:
            print(f"TREAT  {rel}  ({detail})  [dry run, not changed]")
            continue
        saved = backup(vault, path, rel)
        tmp = path.with_name(path.stem + ".tmp" + path.suffix)
        treat(path, tmp, box)
        os.replace(tmp, path)
        print(f"TREAT  {rel}  ({detail})  original kept at {saved.relative_to(vault).as_posix()}")
    verb = "would be treated" if dry_run else "treated"
    print(f"{len(todo)} file(s) {verb}.")


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("source", nargs="?")
    p.add_argument("output", nargs="?")
    p.add_argument("--crop", nargs=4, type=int, metavar=("LEFT", "TOP", "RIGHT", "BOTTOM"))
    p.add_argument("--new", action="store_true", help="treat untreated portraits in assets/NPCs and assets/PCs")
    p.add_argument("--dry-run", action="store_true", help="with --new: list what would change, change nothing")
    p.add_argument("--only", metavar="NAME", help="with --new: limit to one file name")
    p.add_argument("--exempt", nargs="+", metavar="FILE", help="add files to the exempt list")
    p.add_argument("--vault", type=Path, default=Path(__file__).resolve().parents[2],
                   help="vault root (default: found from this script's location)")
    a = p.parse_args()
    crop = tuple(a.crop) if a.crop else None
    vault = a.vault.resolve()
    if a.exempt:
        add_exempt(vault, a.exempt)
    elif a.new:
        process_new(vault, a.dry_run, a.only, crop)
    elif a.source and a.output:
        treat(a.source, a.output, crop)
    else:
        p.error("give SOURCE OUTPUT, or --new, or --exempt FILE")
