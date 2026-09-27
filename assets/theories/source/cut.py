# Cuts four old pictures into what level 1's two old theories are drawn with
# (js/figures/theories.js). All four are public domain and come off Wikimedia
# Commons; each is fetched into this folder the first time the script needs it
# (`SOURCES`), and none of them is committed — they are sixteen megabytes
# between them and can always be fetched again. What they are cut into, in the
# folder above, is committed.
#
#   thurneysser_1574.jpg      Leonhard Thurneysser, Quinta Essentia (1574): the
#                             four humours as one figure quartered, with the
#                             zodiac round it. Becomes woodcut.jpg, the
#                             temperament's plane.
#   lavater_temperaments.jpg  Johann Kaspar Lavater's four temperaments as four
#                             heads in ovals, from his physiognomy (1775-78 in
#                             German, 1789-98 in English; Commons dates the
#                             plate neither way). Becomes faces/<temperament>.jpg,
#                             what a quarter of the plane shows when hovered.
#   durer_northern_sky_1515.jpg  Albrecht Duerer, the northern celestial
#                             hemisphere "with the twelve images of the zodiac"
#                             (1515), the National Gallery of Art's scan (CC0).
#                             Becomes sky.jpg, the star card's figure.
#   zodiac_german_woodcut.jpg A German woodcut of the twelve signs, hand
#                             coloured (16th century). Becomes signs/<sign>.jpg,
#                             what a sign on the sky shows when hovered.
#
# The two the page uses as masks — the woodcut and the sky — are written out
# **inverted**, white ink on black: the ink shows through in whatever colour
# the page paints it, and the paper is nothing.
#
# Nothing is positioned by hand but one thing. The woodcut's frame is the solid
# edge of the scan and its cross is the longest straight run of ink through the
# middle band either way; Lavater's heads are the largest clearings of paper in
# the four cells his plate's gutters make; the sky is cut round the point its
# twelve lines of ecliptic longitude meet at, as far out as its ecliptic, the
# ring of heaviest ink round that point, and a margin more for the figures that
# straddle it; the signs are the cells the zodiac sheet's gutters make. The
# numbers the page needs back — the woodcut's cross, the ecliptic's radius on
# the sky — are printed, to be copied into theories.js. **The one thing not
# found is where each zodiac figure stands on Duerer's ring**, which is
# `SKY_SIGNS` in theories.js, read off by eye against a drawn scale: Duerer drew
# the constellations where they stood, a good way off the thirty-degree signs
# his lines mark, so the lines say nothing about where the figures are. Run from
# the repository root:
#
#     python assets/theories/source/cut.py
#
# Needs Pillow and numpy; neither is a dependency of anything that runs.
import os
import urllib.request
from collections import deque

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)

COMMONS = "https://upload.wikimedia.org/wikipedia/commons/"
SOURCES = {
    "thurneysser_1574.jpg": COMMONS
    + "c/cf/Quinta_Essentia_%28Thurneisse%29_illustration_Alchemic_approach_to_four_humors_in_relation_to_the_four_elements_and_zodiacal_signs.jpg",
    "lavater_temperaments.jpg": COMMONS + "5/59/Lavater1792.jpg",
    "durer_northern_sky_1515.jpg": COMMONS + "8/85/Albrecht_D%C3%BCrer%2C_The_Northern_Celestial_Hemisphere%2C_1515%2C_NGA_43181.jpg",
    "zodiac_german_woodcut.jpg": COMMONS + "0/0d/Zodiac_German_Woodcut.jpg",
}
AGENT = "TestYourself cut.py (https://github.com/RealityBending/TestYourself)"  # Wikimedia refuses a request without one


def source(name):
    path = os.path.join(HERE, name)
    if not os.path.exists(path):
        print("fetching " + name)
        request = urllib.request.Request(SOURCES[name], headers={"User-Agent": AGENT})
        with urllib.request.urlopen(request) as response, open(path, "wb") as out:
            out.write(response.read())
    return Image.open(path)


def save(image, *parts, quality=82):
    path = os.path.join(OUT, *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    image.save(path, quality=quality, optimize=True)
    print("%s %dx%d, %d KB" % ("/".join(parts), image.width, image.height, os.path.getsize(path) // 1024))


def inverted(grey, paper, ink):
    # Lighter than `paper` is paper, darker than `ink` is ink, and between, a
    # shade of both; written out the other way round, ink white.
    shade = np.clip((np.asarray(grey).astype(float) - ink) / (paper - ink), 0, 1)
    return Image.fromarray(((1 - shade) * 255).round().astype(np.uint8))


def blur(grey, k):
    # A box blur by cumulative sums, since there is no scipy here.
    h, w = grey.shape
    padded = np.pad(grey, k, mode="edge")
    sums = padded.cumsum(0).cumsum(1)
    out = (sums[2 * k :, 2 * k :] - sums[: -2 * k, 2 * k :] - sums[2 * k :, : -2 * k] + sums[: -2 * k, : -2 * k]) / (2 * k) ** 2
    return out[:h, :w]


def gutter(profile, around, spread=0.08):
    # The emptiest line near a share of the way across: where one cell of a
    # sheet ends and the next begins.
    n = len(profile)
    low, high = int(n * (around - spread)), int(n * (around + spread))
    return low + int(np.argmin(profile[low:high]))


# ------------------------------- the woodcut ------------------------------- #


def edges(dark, solid=0.8):
    # How many rows or columns at each end of the scan are solid ink: the frame
    # line and the black round the page, both of which the plane draws itself.
    share = dark.mean(axis=0)
    left = 0
    while left < len(share) and share[left] > solid:
        left += 1
    right = len(share)
    while right > 0 and share[right - 1] > solid:
        right -= 1
    return left, right


def longest(line):
    best = run = 0
    for on in line:
        run = run + 1 if on else 0
        best = max(best, run)
    return best


def woodcut(width=800):  # twice the widest it is drawn
    scan = source("thurneysser_1574.jpg").convert("L")
    dark = np.asarray(scan) < 110
    left, right = edges(dark)
    top, bottom = edges(dark.T)
    # A few pixels more off each side, for the grey the frame line fades into.
    cut = scan.crop((left + 6, top + 6 if top else 0, right - 6, bottom - 6))
    cut = cut.resize((width, round(cut.height * width / cut.width)), Image.LANCZOS)
    ink = inverted(cut, 200, 70)
    save(ink, "woodcut.jpg", quality=80)

    # The cross: the row and the column with the longest run of ink through
    # the middle band, which the figure standing across it interrupts but
    # never for long.
    on = np.asarray(ink) > 128
    h, w = on.shape
    y = max(range(int(h * 0.3), int(h * 0.6)), key=lambda row: longest(on[row]))
    x = max(range(int(w * 0.35), int(w * 0.65)), key=lambda col: longest(on[:, col]))
    print("  CROSS = [%.4f, %.4f] // across, down" % ((x + 0.5) / w, (y + 0.5) / h))


# -------------------------------- the heads -------------------------------- #


def largest(paper):
    # The largest connected stretch of paper, as a mask of its own.
    h, w = paper.shape
    seen = np.zeros_like(paper, dtype=bool)
    best = []
    for start in zip(*np.nonzero(paper)):
        if seen[start]:
            continue
        seen[start] = True
        queue, found = deque([start]), []
        while queue:
            r, c = queue.popleft()
            found.append((r, c))
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < h and 0 <= nc < w and paper[nr, nc] and not seen[nr, nc]:
                    seen[nr, nc] = True
                    queue.append((nr, nc))
        if len(found) > len(best):
            best = found
    mask = np.zeros_like(paper, dtype=bool)
    for r, c in best:
        mask[r, c] = True
    return mask


def heads():
    scan = source("lavater_temperaments.jpg").convert("L")
    grey = np.asarray(scan).astype(float)
    h, w = grey.shape
    # The ground is hatched and the ovals are white paper with a drawing in
    # them: blurred, the ground goes grey and an oval stays light, drawing and
    # all. The plate is two by two, parted by gutters of hatching.
    blurred = blur(grey, 9)
    gx, gy = gutter(blurred.mean(axis=0), 0.5, 0.15), gutter(blurred.mean(axis=1), 0.5, 0.15)

    # As Lavater set them: phlegmatic and choleric above, sanguine and
    # melancholic below.
    cells = {
        "phlegmatic": (0, 0, gx, gy),
        "choleric": (gx, 0, w, gy),
        "sanguine": (0, gy, gx, h),
        "melancholic": (gx, gy, w, h),
    }
    # Warmed to an old page: ink a dark brown, paper a cream.
    ink, paper = np.array([42, 31, 20]), np.array([240, 228, 204])
    for name, (x0, y0, x1, y1) in cells.items():
        oval = largest(blurred[y0:y1, x0:x1] > 195)
        ys, xs = np.nonzero(oval)
        # The drawing darkens the foot of an oval more than the rest, so its
        # clearing stops short there; an ellipse is as deep below its widest
        # row as above it, and the widest row is found where the top half is.
        spans = np.array([np.ptp(xs[ys == y]) if (ys == y).any() else 0 for y in range(oval.shape[0])])
        widest = int(np.median(np.nonzero(spans >= 0.97 * spans.max())[0]))
        top, left, right = ys.min(), xs.min(), xs.max()
        bottom = min(widest + (widest - top), oval.shape[0] - 1)
        box = (x0 + max(left - 3, 0), y0 + max(top - 3, 0), x0 + min(right + 4, x1 - x0), y0 + min(bottom + 4, y1 - y0))
        piece = np.asarray(scan.crop(box)).astype(float) / 255
        piece = np.clip((piece - 0.15) / 0.75, 0, 1)[..., None]
        save(Image.fromarray((ink + (paper - ink) * piece).round().astype(np.uint8)), "faces", name + ".jpg", quality=86)


# --------------------------------- the sky --------------------------------- #


def sky(size=640, margin=1.2):
    scan = source("durer_northern_sky_1515.jpg").convert("L")
    # Found on a smaller copy, which is plenty to find lines on.
    k = 1200 / scan.width
    small = np.asarray(scan.resize((1200, round(scan.height * k)), Image.LANCZOS)).astype(float)
    ink = small < 120
    h, w = ink.shape
    angles = np.deg2rad(np.arange(0, 360, 0.5))

    def rays(cx, cy, r0, r1, outside=0.0):
        # Whether each point along each ray out of a point is ink, a ray to an
        # angle a row; off the edge of the scan is `outside`.
        rs = np.arange(r0, r1, 1.0)
        xs = (cx + np.outer(np.sin(angles), rs)).round().astype(int)
        ys = (cy - np.outer(np.cos(angles), rs)).round().astype(int)
        inside = (xs >= 0) & (xs < w) & (ys >= 0) & (ys < h)
        on = np.full(xs.shape, outside)
        on[inside] = ink[ys[inside], xs[inside]]
        return on

    def strongest(profile, n=12, apart=16):
        profile, found = profile.copy(), 0.0
        for _ in range(n):
            at = int(np.argmax(profile))
            found += profile[at]
            profile[[(at + d) % len(profile) for d in range(-apart, apart + 1)]] = -1
        return found

    # The pole is where twelve straight lines meet: the point whose rays have
    # twelve that are nearly all ink. Searched coarsely, then finely.
    score = lambda cx, cy: strongest(rays(cx, cy, 60, 330).mean(axis=1))
    best = max(((cx, cy) for cy in range(int(h * 0.35), int(h * 0.62), 8) for cx in range(int(w * 0.38), int(w * 0.62), 8)), key=lambda at: score(*at))
    best = max(((cx, cy) for cy in range(best[1] - 8, best[1] + 9) for cx in range(best[0] - 8, best[0] + 9)), key=lambda at: score(*at))
    # The ecliptic is the ring of heaviest ink round it.
    ring = 200 + int(np.argmax(np.nanmean(rays(best[0], best[1], 200, 600, np.nan), axis=0)))

    cx, cy, radius = best[0] / k, best[1] / k, ring * margin / k
    # The disc reaches a little past the edge of the print on the left, which
    # is filled with paper rather than the black a crop off the edge gives —
    # black, inverted, would be a band of solid ink.
    paper = int(np.median(np.asarray(scan)))
    box = (round(cx - radius), round(cy - radius), round(cx + radius), round(cy + radius))
    disc = Image.new("L", (box[2] - box[0], box[3] - box[1]), paper)
    disc.paste(scan, (-box[0], -box[1]))
    save(inverted(disc.resize((size, size), Image.LANCZOS), 195, 75), "sky.jpg", quality=80)
    print("  SKY_RING = %.4f // the ecliptic's radius, as a share of the disc's" % (1 / margin))


# -------------------------------- the signs -------------------------------- #


def signs(width=300):
    scan = source("zodiac_german_woodcut.jpg").convert("RGB")
    grey = np.asarray(scan.convert("L")).astype(float)
    lines = grey < 110  # the black of the cut, not the colouring or the speckle
    cols = np.convolve(lines.mean(axis=0), np.ones(35) / 35, mode="same")
    rows = np.convolve(lines.mean(axis=1), np.ones(35) / 35, mode="same")
    xs = [0] + [gutter(cols, share) for share in (0.25, 0.5, 0.75)] + [scan.width]
    ys = [0] + [gutter(rows, share) for share in (1 / 3, 2 / 3)] + [scan.height]
    # As the sheet sets them, from the sign the year opens in.
    order = ["aquarius", "pisces", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn"]
    for at, name in enumerate(order):
        x0, x1, y0, y1 = xs[at % 4], xs[at % 4 + 1], ys[at // 4], ys[at // 4 + 1]
        cell = lines[y0:y1, x0:x1]
        # Trimmed to the lines of the cut, a speckle of foxing not counting:
        # a row or a column is in if a few pixels of it are black.
        busy_rows = np.nonzero(cell.sum(axis=1) > 6)[0]
        busy_cols = np.nonzero(cell.sum(axis=0) > 6)[0]
        pad = 30
        box = (
            x0 + max(busy_cols.min() - pad, 0),
            y0 + max(busy_rows.min() - pad, 0),
            x0 + min(busy_cols.max() + pad, x1 - x0),
            y0 + min(busy_rows.max() + pad, y1 - y0),
        )
        tile = scan.crop(box)
        save(tile.resize((width, round(tile.height * width / tile.width)), Image.LANCZOS), "signs", name + ".jpg", quality=84)


if __name__ == "__main__":
    woodcut()
    heads()
    sky()
    signs()
