# Cuts the brain the MINT's level is drawn with (js/figures/soma.js) out of the
# MNI152 template: one frontal (coronal) slice at y = -24 mm, which passes
# through the back of the insula, the part of the cortex the body's signals
# reach first, and through the brainstem, which the drawing's nerves leave from.
# The template and its brain mask come off TemplateFlow and are fetched into
# this folder the first time the script needs them (`SOURCES`); neither is
# committed — they are fourteen megabytes and can always be fetched again. What
# they are cut into, `brain.png` in the folder above, is committed.
#
#   tpl-MNI152NLin2009cAsym_res-01_T1w.nii.gz          the 1 mm T1-weighted template
#   tpl-MNI152NLin2009cAsym_res-01_desc-brain_mask.nii.gz  what of it is brain
#
# The slice is the brain alone, grey as the template gives it, cropped to the
# brain and scaled three times, and the mask is its alpha: round the brain the
# picture is not black but nothing, so it sits on whatever is under it however
# it is drawn — blurred, copied into an image — which blending away a black
# ground could not promise.
#
# The numbers the page needs back are printed, to be copied into soma.js: the
# slice's height over its width (`ASPECT`), where each insula falls on it
# (`INSULA`, at x = +-38 mm, z = 4 mm) and where the brainstem leaves the bottom
# of it (`STEM`), each as shares across and down the picture.
#
# The template is (C) McConnell Brain Imaging Centre, Montreal Neurological
# Institute, McGill University, under a licence that asks for that notice in all
# copies; it is here, and is to go wherever the picture is described in print.
#
#     Copyright (C) 1993-2004 Louis Collins, McConnell Brain Imaging Centre,
#     Montreal Neurological Institute, McGill University. Permission to use,
#     copy, modify, and distribute this software and its documentation for any
#     purpose and without fee is hereby granted, provided that the above
#     copyright notice appear in all copies. The authors and McGill University
#     make no representations about the suitability of this software for any
#     purpose. It is provided "as is" without express or implied warranty.
#
# A NIfTI-1 file is a 348-byte header and the voxels after it, so numpy reads it
# without a neuroimaging package. Run from the repository root:
#
#     python assets/mint/source/cut.py
#
# Needs Pillow and numpy; neither is a dependency of anything that runs.
import gzip
import os
import struct
import urllib.request

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)

STORE = "https://templateflow.s3.amazonaws.com/tpl-MNI152NLin2009cAsym/"
T1 = "tpl-MNI152NLin2009cAsym_res-01_T1w.nii.gz"
MASK = "tpl-MNI152NLin2009cAsym_res-01_desc-brain_mask.nii.gz"
SOURCES = {T1: STORE + T1, MASK: STORE + MASK}

Y = -24  # the slice, in millimetres of MNI space
INSULAE = [(-38, 4), (38, 4)]  # x and z of each insula on it
SCALE = 3


def fetched(name):
    path = os.path.join(HERE, name)
    if not os.path.exists(path):
        print("fetching", name)
        urllib.request.urlretrieve(SOURCES[name], path)
    return path


def load(name):
    raw = gzip.open(fetched(name)).read()
    dim = struct.unpack("<8h", raw[40:56])
    kind = struct.unpack("<h", raw[70:72])[0]
    dtype = {2: np.uint8, 4: np.int16, 8: np.int32, 16: np.float32, 64: np.float64}[kind]
    offset = int(struct.unpack("<f", raw[108:112])[0])
    slope, inter = struct.unpack("<2f", raw[112:120])
    srow = np.array(struct.unpack("<12f", raw[280:328])).reshape(3, 4)
    n = dim[1:4]
    vol = np.frombuffer(raw, dtype=dtype, count=n[0] * n[1] * n[2], offset=offset)
    vol = vol.reshape(n[::-1]).transpose(2, 1, 0).astype(np.float32)
    if slope:
        vol = vol * slope + inter
    return vol, srow


t1, srow = load(T1)
mask, _ = load(MASK)
inv = np.linalg.inv(np.vstack([srow, [0, 0, 0, 1]]))
j = int(round((inv @ [0, Y, 0, 1])[1]))


# Rows are z with the top of the head at the top; columns are x, as the
# template stores it.
def slice_of(vol):
    return np.flipud(vol[:, j, :].T)


brain = slice_of(mask) > 0.5
grey = slice_of(t1)
lo, hi = np.percentile(grey[brain], [1, 99.5])
shade = np.clip((grey - lo) / (hi - lo), 0, 1) ** 0.9
shade[~brain] = 0

rows, cols = np.where(brain.any(axis=1))[0], np.where(brain.any(axis=0))[0]
pad = 4
r0, c0 = rows[0] - pad, cols[0] - pad
window = (slice(r0, rows[-1] + pad + 1), slice(c0, cols[-1] + pad + 1))
cut = shade[window]
h, w = cut.shape
size = (w * SCALE, h * SCALE)
grey = Image.fromarray((cut * 255).astype(np.uint8)).resize(size, Image.LANCZOS)
alpha = Image.fromarray((brain[window] * 255).astype(np.uint8)).resize(size, Image.BILINEAR)
picture = Image.merge("LA", (grey, alpha))
picture.save(os.path.join(OUT, "brain.png"), optimize=True)


def share(x, z):
    v = inv @ [x, Y, z, 1]
    return round(float(v[0] - c0) / w, 4), round(float((t1.shape[2] - 1 - v[2]) - r0) / h, 4)


middle = int(round((inv @ [0, Y, 0, 1])[0])) - c0
foot = max(r for r in range(h) if brain[r0 + r, c0 + middle])
print("wrote", os.path.join(OUT, "brain.png"), picture.size)
print("ASPECT =", round(h / w, 4))
print("INSULA =", [list(share(x, z)) for x, z in INSULAE])
print("STEM =", [round(float(middle) / w, 4), round(float(foot) / h, 4)])
