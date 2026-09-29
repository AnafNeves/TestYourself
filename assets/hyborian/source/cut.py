"""The Hyborian Age's hero cards, cut down for the page.

The originals in this folder are generated pictures (the prompts are at the
foot of content/block_hyborian.js), four to five megabytes each and
git-ignored; nothing fetches them again, so they live in Dropbox alone. This
writes one JPEG a hero into assets/hyborian/, named for the hero rather than
the character the prompt was written after, at a width that stays sharp on a
card 260 pixels wide on a screen of twice the density. Run it by hand when a
picture is added or replaced, and commit what it writes.

A hero with no picture here is drawn by js/figures/hyborian.js as its emblem
on a card of its own, so a missing one is not an error. The gods' pictures
(crom*) are kept but not cut: the god's card is not shown for now.
"""

from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
OUT = HERE.parent

# Source file (without .jpg) -> the hero it is the card of.
HEROES = {
    "conan1": "barbarian",
    "valeria1": "free-blade",
    "belit1": "pirate-queen",
    "thief1": "thief",
    "king1": "king",
    "sorcerer1": "sorcerer",
    "witch1": "witch",
}

WIDTH = 640

for source, hero in HEROES.items():
    path = HERE / (source + ".jpg")
    if not path.exists():
        print("missing", path.name, "- the", hero, "is drawn as its emblem")
        continue
    image = Image.open(path).convert("RGB")
    height = round(image.height * WIDTH / image.width)
    image = image.resize((WIDTH, height), Image.LANCZOS)
    target = OUT / (hero + ".jpg")
    image.save(target, quality=84, optimize=True, progressive=True)
    print(target.name, image.size, target.stat().st_size // 1024, "KB")
