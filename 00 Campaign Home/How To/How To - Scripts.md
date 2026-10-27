---
type: structure-note
dg-publish: false
---

# How To - Scripts

The two Python scripts in `98 - Vault System/scripts`. Both find the vault from their own location, so I can run them from anywhere, but the commands below assume a terminal open in the vault's root folder.

## Installing Python (once per machine)

Windows:

1. Download the current Python 3 installer from python.org (Downloads, Windows). Anything 3.9 or newer works.
2. Run it and tick **Add python.exe to PATH** on the first screen, then Install Now.
3. Open a new terminal (PowerShell or the VS Code terminal) and check:
   ```
   python --version
   ```
   If that opens the Microsoft Store instead, use `py` in place of `python` in every command below, or turn off the "App execution aliases" for python in Windows Settings, Apps, Advanced app settings.
4. Install Pillow (the image library the photo script needs):
   ```
   python -m pip install --upgrade pillow
   ```
   Check it worked:
   ```
   python -c "import PIL; print(PIL.__version__)"
   ```

Mac or Linux: Python 3 is usually there already as `python3`. Use `python3` and `python3 -m pip install --upgrade pillow`.

`check_boards.py` needs nothing beyond Python itself.

## photo_treatment.py

Gives every real photograph the vault's standard look (see Photograph Treatment in [[Vault Standards]]): crop to 3:4, resize to 720 x 960, black and white, darker midtones, a vignette fading to near-black, and the fixed warm tint (R x1.04, G x1.00, B x0.84). It also knocks back dust and scratches with a light median filter.

### Treat one file into a new file

```
python "98 - Vault System/scripts/photo_treatment.py" "C:\Downloads\photo.jpg" "assets/NPCs/Edith_Crane.jpg"
```

Without `--crop` it takes the largest 3:4 area, centred left to right and kept near the top so the face stays in the upper part. To choose the crop myself, give the box in pixels of the source image (left, top, right, bottom), and keep it 3:4:

```
python "98 - Vault System/scripts/photo_treatment.py" source.jpg "assets/NPCs/Edith_Crane.jpg" --crop 120 40 720 840
```

To find the numbers I open the photo in any editor that shows the cursor position (Paint shows it bottom left), note the top-left and bottom-right corners of a head-and-shoulders box, and adjust so width : height is 3 : 4.

### Treat every new portrait in place

```
python "98 - Vault System/scripts/photo_treatment.py" --new --dry-run
python "98 - Vault System/scripts/photo_treatment.py" --new
```

- Looks at every `.jpg`, `.jpeg` and `.png` in `assets/NPCs` and `assets/PCs`.
- Skips anything already treated: files it treated before carry a marker in their metadata, and older files that are already 720 x 960 in exactly the standard tint are recognised by their colours.
- Skips anything on the exempt list (below).
- Before changing a file it copies the untouched original to `assets/originals/<NPCs or PCs>/<name>.orig`. The `.orig` ending stops Obsidian seeing two images with the same name. To undo, copy the `.orig` back over the portrait and drop the `.orig`.
- `--dry-run` lists what it would do and changes nothing. I always run that first.
- `--only Edith_Crane.jpg` limits it to one file; add `--crop L T R B` to that to set the crop for that one file.
- `--vault PATH` if the script has been moved out of the vault.

### Exempt files

Painted artwork, handouts and anything that should keep its own look go in `98 - Vault System/scripts/photo_treatment_exempt.txt`, one path per line from the vault root, wildcards allowed (`assets/NPCs/Painted_*.jpg`). Lines starting with `#` are comments. Add them by hand, or:

```
python "98 - Vault System/scripts/photo_treatment.py" --exempt "assets/NPCs/Painted_Portrait.jpg"
```

After treating a photo, I add its row to [[Image Attributions]] with "standard photograph treatment" under Changes made.

## check_boards.py

Checks every string board (`09 Dashboards/Boards/*.canvas`) against [[String Board Standard]] and prints what breaks it.

```
python "98 - Vault System/scripts/check_boards.py"
python "98 - Vault System/scripts/check_boards.py" "Relationship Web"
python "98 - Vault System/scripts/check_boards.py" --fix-sides
```

- With no arguments it checks every board; with a name (the file name without `.canvas`) only that one.
- Each board prints "clean" or a numbered list: photo prints or index cards that are too small, text that won't fit, cards with less than 60 of cork between them, strings that cross a card they don't belong to, tags too long for their string, and pairs of cards joined by more than one string.
- `--fix-sides` rewrites the board file, re-picking which side of each card every string leaves and lands on (facing sides for cards in a row or column, one level and one upright side on a diagonal), avoiding pins other strings already use. Close the board in Obsidian first, run it, then reopen.
- Text widths are estimates for the site's typewriter fonts, so a near miss is worth a look rather than a certain fault.

I run it before publishing any board.
