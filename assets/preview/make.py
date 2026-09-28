"""Photograph each card in this folder into a JPEG of the same name, the picture a
link is unfurled with: card.html into card.jpg for the test as a whole, and a
card per level (opinions.html into opinions.jpg) for the entry pages under
start/, which carry their level's picture instead.

Run by hand when a card changes (python assets/preview/make.py), like
assets/icar/source/cut.py, and commit the picture with it. It needs Edge or
Chrome, for the browser's own headless screenshot at the size social previews
are cut to, and Pillow, to make a JPEG of it: the PNG is 400 KB, and WhatsApp
leaves out a preview image much over 300. Naming cards photographs only those
(python assets/preview/make.py opinions).
"""

import os
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
WIDTH, HEIGHT = 1200, 630

# Where Edge and Chrome live on Windows, then whatever is on the path elsewhere.
CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "google-chrome",
    "chromium",
    "microsoft-edge",
]


def browser():
    for candidate in CANDIDATES:
        found = candidate if os.path.isfile(candidate) else shutil.which(candidate)
        if found:
            return found
    sys.exit("No Edge or Chrome found to take the picture with.")


def photograph(name):
    # A profile of its own: handed the user's, an Edge already open takes the
    # call over and returns at once without taking any picture.
    profile = tempfile.mkdtemp(prefix="card-")
    shot = Path(profile) / "card.png"
    subprocess.run(
        [
            browser(),
            "--headless=new",
            f"--user-data-dir={profile}",
            "--disable-gpu",
            "--hide-scrollbars",
            "--force-device-scale-factor=1",
            f"--window-size={WIDTH},{HEIGHT}",
            # The logos are files beside the page; a file:// page may read them.
            "--allow-file-access-from-files",
            # Long enough for the fonts and the logos to be in before the shot.
            "--virtual-time-budget=2000",
            f"--screenshot={shot}",
            (HERE / f"{name}.html").as_uri(),
        ],
        check=True,
        capture_output=True,
    )
    # Edge's launcher can return before the headless browser it started has
    # written the picture, so it is waited for rather than expected.
    for _ in range(30):
        if shot.exists():
            break
        time.sleep(0.5)
    if not shot.exists():
        sys.exit(f"The browser ran but wrote no picture of {name}.html.")
    out = HERE / f"{name}.jpg"
    # No chroma subsampling: the gradient in the name bands without it.
    Image.open(shot).convert("RGB").save(out, quality=90, optimize=True, progressive=True, subsampling=0)
    shutil.rmtree(profile, ignore_errors=True)
    print(f"Wrote {out.relative_to(HERE.parent.parent)}")


def main():
    names = sys.argv[1:] or sorted(page.stem for page in HERE.glob("*.html"))
    for name in names:
        if not (HERE / f"{name}.html").exists():
            sys.exit(f"No {name}.html in {HERE}.")
        photograph(name)


if __name__ == "__main__":
    main()
