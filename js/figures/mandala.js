/* =========================================================================
   NOT LOADED (October 2026). A prototype, kept on disk with no <script> tag
   in index.html, the way faces.js is. Nothing reaches it, nothing in it is
   reachable, and the page is the same with it deleted.

   THE IDEA. A reward for finishing the whole run, beside the whole-run web:
   one picture made from the person's own scores, unique to them, that they
   would want to keep and to share. A mandala — Jung is already the creed on
   the landing page, and Jung had his patients paint mandalas as pictures of
   the Self, which gives the picture its story in one sentence. Rings out
   from the centre, one per level finished, each ring's motif borrowed from
   the figure that level closed on, so the picture is legible to the person
   who saw the figures and decorative to everybody else; the landing page's
   hero, a dimmed made-up wheel falling into a black hole, would be answered
   at the end by the person's own, fully lit. It would be drawn from the
   first level on, a ring arriving as each level is minted, dim and
   incomplete until the last, so that it is the reason to keep going.

   WHAT WAS WEIGHED AND SET ASIDE (the brainstorm, October 2026): a deep-sea
   specimen on a naturalist's plate with a generated Latin name, the thing
   brought up from the Moho; a coat of arms, a charge per level; coral grown
   by an L-system; a planet seen from outside; a tartan; a sigil pressed in
   wax; a constellation (the spider chart in a hat). And a region of the
   Mandelbrot set chosen by the scores — the metaphor is perfect, the deeper
   you look the more there is, but a region is two coordinates and a zoom,
   so sixteen standings collapse into three numbers and a palette; most of
   the plane is black or flat, so in practice a curated catalogue of good
   places is looked up; nothing in a spiral of seahorses reads back to a
   trait; and a zoom into a set that exists whether or not you answered
   anything is a reward revealed, not one built. What was kept of it:
   self-similarity inside the mandala (a petal inside each petal, nerves
   that fork to a depth) and a Julia set for the centre, whose whole
   silhouette changes with its one parameter.

   WHAT THE CONSTRAINTS SETTLE. (1) It is a pure function of the scores —
   one generator seeded from them, the sea's rule, no Math.random — so the
   `?card=` link, which already carries every PROFILE value, redraws it
   exactly, and nobody gets to reroll, so every variant has to look finished.
   (2) Only the shareable set may drive it: the PROFILE dimensions, the
   twelve archetypes, the four styles, the temperament. Not politics, not the
   kinks, not the HiTOP spectra or the fortnight, for the Article 9 and A4
   reasons that keep them off the card; a darker sky for a darker fortnight
   is still a score readable over a shoulder. (3) Neither end of any axis may
   be the ugly one: somebody at the floor of every scale must still want
   theirs. (4) Standings rather than reaches where there are norms, since
   percentiles are uniform across the population by construction and so
   spread people evenly over a parameter's range, where reaches pile up.
   (5) A viewer reads five to seven strong features, so a few discrete,
   structural choices take the most legible facts and the rest is texture.

   THE MAPPING AS PROTOTYPED (`drawMandala`, below; P is the fake person
   `mandalaSample` makes, standings in [0, 1]):
     centre      a Julia set, its parameter a point on the main cardioid's
                 boundary turned by one standing (every such c gives a
                 connected, richly branched set, never dust or a blob),
                 clipped to a disc ringed in gold with the symmetry's beads;
                 coloured in the temperament's palette
     wheel ring  twelve petals to each archetype's reach, the wheel's own
                 colours, the leading one gold, a smaller petal inside each
     body ring   nerves forking outwards: count from Bodily Sensitivity,
                 reach from Bodily Awareness, brightness from Bodily Clarity
     sea band    two waves, smooth where the world is Safe and toothed where
                 it is not, greyed or coloured by Enticing, motes by Alive
     structure   the symmetry order from the leading cognitive style (5, 8,
                 6, 7 for Verbal, Logical, Visual, Spatial), dashed arms to
                 each style's reach, a rosette of that symmetry under the
                 nerves, faint alternating sectors as the ground
     HEXACO      texture rather than a ring: Honesty-Humility the line
                 weight, Emotionality the glow, Sociability the density,
                 Patience how smoothly the forks open, Diligence the
                 regularity (its lack, the jitter) and Curiosity how many
                 levels deep the self-similar detail goes — a curious
                 person's mandala has more in it the closer you look
     palette     the temperament's humour (red, amber, teal, violet)

   WHAT THE PROTOTYPE SHOWED (six fake people, all-low and all-high among
   them): low came out sparse and calm and high dense and ornate, neither
   worse; the Julia centre carries the infinite-detail promise on its own
   and its two-fold symmetry sits fine in an n-fold frame; six people were
   six different pictures at thumbnail size, which the web never managed.

   WHAT TO CHANGE NEXT. The band between the wheel and the sea is too empty
   and wants one more motif ring (the BAIT or the compass could take it);
   the sea's teeth come out lumpy and want fewer, sharper lobes; the nerves
   are thin against the filled rings and should be filled shapes too; a
   legend on hover (the sea's LINES pattern) and a rarity line under it
   ("a pattern shared by fewer than 1 in 50,000 people", from the
   standings — cheap, and earned without ranking anybody); square for a
   phone and a print, 1200×630 inside the card, a crop for the profile badge.
   Not decided: denser and more ornamental, or sparer and more like an
   engraving in the register of level 1's prints.

   WHAT WIRING IT IN WOULD TAKE. The usual: a <script> tag before results.js,
   a makeMandala(shared) factory (this file is not yet one — it draws from a
   bag of plain numbers so that it can be tried from the console), a place
   in renderProfile beside the web and on the last screen, the `?card=` link
   and drawCard extended, snapshot() for the image. The standings would come
   through `standFrom` so that the picture and the hover sentence agree; the
   wheel's reaches through `reachOf`; the temperament through
   theories.js's `temperamentOf`, which would want handing across in
   `shared`. It would be the first figure drawn from several levels at once
   and the first in `js/figures/` that is not a level's own, so `renderResults`
   is not where it goes.

   TO SEE IT: add `<script src="js/figures/mandala.js"></script>` after
   draw.js for the length of the look, open the console on the page and run
       drawMandala(document.body, mandalaSample(11))
   with any seed, or `mandalaSample(11, { temperament: "Sanguine", style:
   "Verbal" })` to force a palette and a symmetry. The standalone page this
   was first drawn on, six at a time, is not kept; this is the same code.
   ========================================================================= */

const MANDALA_PALETTES = {
    Sanguine: ["#5a1020", "#ef7382", "#ffd2c8"],
    Choleric: ["#5a2e00", "#f2b24c", "#ffe9b0"],
    Phlegmatic: ["#003a40", "#6fd3d9", "#d2fbff"],
    Melancholic: ["#1e1452", "#a291ff", "#e4dcff"],
}
const MANDALA_WHEEL = ["#79bc43", "#40a75b", "#009a93", "#009fe3", "#3b429f", "#5d399c", "#9e299a", "#e41b6c", "#ea3f35", "#f68d1e", "#fab913", "#e8d21a"]
const MANDALA_SYMMETRY = { Verbal: 5, Logical: 8, Visual: 6, Spatial: 7 }
const MANDALA_GOLD = "#d9a441"

// The one generator everything scattered in the picture is placed from, so the same scores draw the same mandala
function mandalaSeeded(seed) {
    let a = seed >>> 0
    return () => {
        a |= 0
        a = a + 0x6D2B79F5 | 0
        let t = Math.imul(a ^ a >>> 15, 1 | a)
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
        return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
}

// A Julia set on a canvas, handed back as a data URL for an SVG <image>. c sits on the boundary of the Mandelbrot
// set's main cardioid, c = e^{iθ}/2 − e^{2iθ}/4, so every θ gives a connected set with structure all the way in.
function mandalaJulia(theta, palette, size, turn) {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const context = canvas.getContext("2d")
    const image = context.createImageData(size, size)
    const data = image.data
    const cr = Math.cos(theta) / 2 - Math.cos(2 * theta) / 4
    const ci = Math.sin(theta) / 2 - Math.sin(2 * theta) / 4
    const MAX = 200
    const scale = 3.0 / size
    const channels = (colour) => [1, 3, 5].map((at) => parseInt(colour.substr(at, 2), 16))
    const deep = channels(palette[0]), mid = channels(palette[1]), light = channels(palette[2]), dark = [5, 7, 13]
    const between = (a, b, t) => a.map((v, k) => v + (b[k] - v) * t)
    const cos = Math.cos(turn), sin = Math.sin(turn)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const ox = (x - size / 2) * scale, oy = (y - size / 2) * scale
            let zx = ox * cos - oy * sin, zy = ox * sin + oy * cos
            let n = 0
            while (n < MAX && zx * zx + zy * zy < 16) {
                const t = zx * zx - zy * zy + cr
                zy = 2 * zx * zy + ci
                zx = t
                n++
            }
            let colour
            if (n === MAX) colour = deep.map((v) => v * 0.55)
            else {
                // smooth iteration count, so the bands blend instead of stepping
                const s = n + 1 - Math.log(Math.log(zx * zx + zy * zy)) / Math.LN2
                const t = Math.pow(Math.min(1, s / 14), 0.7)
                colour = t < 0.35 ? between(dark, deep, t / 0.35) : t < 0.75 ? between(deep, mid, (t - 0.35) / 0.4) : between(mid, light, (t - 0.75) / 0.25)
            }
            const i = (y * size + x) * 4
            data[i] = colour[0]
            data[i + 1] = colour[1]
            data[i + 2] = colour[2]
            data[i + 3] = 255
        }
    }
    context.putImageData(image, 0, 0)
    return canvas.toDataURL("image/png")
}

let mandalasDrawn = 0

// The mandala, appended to `parent` as one <svg>. P is a bag of standings in [0, 1] (see `mandalaSample` for its shape)
function drawMandala(parent, P) {
    const id = "mandala" + (mandalasDrawn++)
    const n = MANDALA_SYMMETRY[P.style]
    const palette = MANDALA_PALETTES[P.temperament]
    const random = mandalaSeeded(Math.floor(P.seed * 1e9))
    const lerp = (a, b, t) => a + (b - a) * t
    const polar = (r, a) => [r * Math.cos(a), r * Math.sin(a)]
    const put = (into, shape, attributes) => into.appendChild(draw(shape, attributes))

    const svg = put(parent, "svg", { viewBox: "-220 -220 440 440", class: "mandala" })
    const defs = put(svg, "defs", {})
    const glow = put(defs, "filter", { id: id + "-glow", x: "-20%", y: "-20%", width: "140%", height: "140%" })
    put(glow, "feGaussianBlur", { stdDeviation: (1 + 4 * P.hexaco.Emotionality).toFixed(1), result: "blur" })
    const merge = put(glow, "feMerge", {})
    put(merge, "feMergeNode", { in: "blur" })
    put(merge, "feMergeNode", { in: "SourceGraphic" })
    const CENTRE = 68
    put(put(defs, "clipPath", { id: id + "-clip" }), "circle", { r: CENTRE })
    const ground = put(defs, "radialGradient", { id: id + "-ground" })
    put(ground, "stop", { offset: "0", "stop-color": palette[0], "stop-opacity": 0.95 })
    put(ground, "stop", { offset: "0.6", "stop-color": palette[0], "stop-opacity": 0.45 })
    put(ground, "stop", { offset: "1", "stop-color": "#05070d", "stop-opacity": 0 })
    put(svg, "circle", { r: 218, fill: "url(#" + id + "-ground)" })

    // the HEXACO as texture
    const weight = lerp(0.7, 2.4, P.hexaco.HonestyHumility)
    const jitter = (1 - P.hexaco.Diligence) * 0.5
    const depth = 1 + Math.round(P.hexaco.Curiosity * 2)
    const density = lerp(0.6, 1.5, P.hexaco.Sociability)
    const smooth = P.hexaco.Patience

    // alternating sectors of the symmetry, very faint, so the whole disc has a body
    for (let i = 0; i < n * 2; i++) {
        const a0 = -Math.PI / 2 + i * Math.PI / n, a1 = a0 + Math.PI / n
        const [x0, y0] = polar(210, a0), [x1, y1] = polar(210, a1)
        put(svg, "path", { d: `M0 0 L${x0} ${y0} A210 210 0 0 1 ${x1} ${y1}Z`, fill: i % 2 ? palette[1] : palette[2], opacity: i % 2 ? 0.05 : 0.025 })
    }

    // a rose curve of the symmetry under the nerves
    const rose = (r0, amplitude, k, phase) => {
        let d = ""
        for (let s = 0; s <= 360; s++) {
            const a = s / 180 * Math.PI
            const [x, y] = polar(r0 + amplitude * Math.cos(k * a + phase), a)
            d += (s ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)
        }
        return d + "Z"
    }
    put(svg, "path", { d: rose(150, 14, n, 0), fill: palette[1], opacity: 0.14 })
    put(svg, "path", { d: rose(150, 14, n, 0), fill: "none", stroke: palette[2], "stroke-width": weight * 0.5, opacity: 0.5 })
    put(svg, "path", { d: rose(150, 14, n, Math.PI), fill: "none", stroke: palette[1], "stroke-width": weight * 0.4, opacity: 0.5 })

    // compass arms of the symmetry, each as long as a style reaches
    const styles = Object.values(P.styles)
    for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + i * 2 * Math.PI / n
        const length = lerp(165, 212, styles[i % 4])
        const [x1, y1] = polar(CENTRE + 4, a), [x2, y2] = polar(length, a)
        put(svg, "line", { x1, y1, x2, y2, stroke: palette[2], "stroke-width": weight * 0.5, "stroke-dasharray": "1.5 4", opacity: 0.55 })
        put(svg, "circle", { cx: x2, cy: y2, r: 2 + 2 * weight, fill: palette[2], filter: "url(#" + id + "-glow)" })
    }

    // the sea: a band between two waves, toothed as Safe falls, coloured by Enticing, with motes by Alive
    const lobes = n * 3, spike = 1 - P.primals.Safe, saturation = P.primals.Enticing
    const wave = (base, amplitude, phase) => {
        let d = ""
        for (let k = 0; k <= 360; k++) {
            const a = k / 180 * Math.PI
            let w = Math.sin(a * lobes + phase)
            w = Math.sign(w) * Math.pow(Math.abs(w), lerp(1, 0.22, spike))
            const [x, y] = polar(base + amplitude * w + (random() - 0.5) * jitter * 3, a)
            d += (k ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)
        }
        return d + "Z"
    }
    const seaColour = mix("#767c92", palette[1], saturation), seaLight = mix("#9aa1b8", palette[2], saturation)
    put(svg, "path", { d: wave(185, 9, 0) + " " + wave(170, 7, Math.PI), fill: seaColour, "fill-rule": "evenodd", opacity: 0.22 })
    put(svg, "path", { d: wave(185, 9, 0), fill: "none", stroke: seaColour, "stroke-width": weight })
    put(svg, "path", { d: wave(170, 7, Math.PI), fill: "none", stroke: seaLight, "stroke-width": weight * 0.6, opacity: 0.8 })
    const motes = Math.round(lerp(10, 220, P.primals.Alive) * density)
    for (let k = 0; k < motes; k++) {
        const [x, y] = polar(lerp(160, 212, random()), random() * 2 * Math.PI)
        put(svg, "circle", { cx: x, cy: y, r: 0.5 + random() * 1.8, fill: seaLight, opacity: 0.35 + random() * 0.6 })
    }

    // the body: nerves out of the wheel's rim, forking to `depth`
    const nerves = put(svg, "g", { filter: "url(#" + id + "-glow)" })
    const count = n * Math.round(lerp(2, 6, P.mint.Sensitivity) * density)
    const reach = lerp(140, 168, P.mint.Awareness)
    const branch = (x, y, a, length, w, level) => {
        const x2 = x + length * Math.cos(a), y2 = y + length * Math.sin(a)
        const bend = (random() - 0.5) * jitter * 1.5
        const cx = x + length * 0.5 * Math.cos(a + bend), cy = y + length * 0.5 * Math.sin(a + bend)
        put(nerves, "path", {
            d: `M${x} ${y} Q${cx} ${cy} ${x2} ${y2}`, fill: "none", stroke: mix(palette[1], palette[2], level / 3),
            "stroke-width": w, "stroke-linecap": "round", opacity: lerp(0.3, 1, P.mint.Clarity),
        })
        if (level < depth) {
            const spread = lerp(0.3, 0.7, 1 - smooth)
            branch(x2, y2, a - spread, length * 0.55, w * 0.65, level + 1)
            branch(x2, y2, a + spread, length * 0.55, w * 0.65, level + 1)
        } else put(nerves, "circle", { cx: x2, cy: y2, r: w * 0.9, fill: palette[2] })
    }
    for (let i = 0; i < count; i++) {
        const a = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / count
        const [x, y] = polar(118, a)
        branch(x, y, a, (reach - 118) * 0.62, weight, 1)
    }

    // the wheel: twelve petals to each archetype's reach, a smaller petal inside each, and a second row between them
    const wheel = put(svg, "g", {})
    const leading = P.wheel.indexOf(Math.max(...P.wheel))
    const petal = (r0, r1, a, width, colour, opacity, level) => {
        const [x0, y0] = polar(r0, a), [x1, y1] = polar(r1, a)
        const [lx, ly] = polar((r0 + r1) / 2, a - width), [rx, ry] = polar((r0 + r1) / 2, a + width)
        put(wheel, "path", { d: `M${x0} ${y0} Q${lx} ${ly} ${x1} ${y1} Q${rx} ${ry} ${x0} ${y0}Z`, fill: colour, opacity, stroke: colour, "stroke-width": 0.5 })
        if (level < depth) petal(r0 + (r1 - r0) * 0.18, r0 + (r1 - r0) * 0.7, a, width * 0.45, mix(colour, "#ffffff", 0.4), opacity, level + 1)
    }
    P.wheel.forEach((value, i) => {
        const a = -Math.PI / 2 + i * Math.PI / 6
        petal(CENTRE + 3, lerp(92, 128, value), a, 0.14, i === leading ? MANDALA_GOLD : MANDALA_WHEEL[i], i === leading ? 0.95 : 0.7, 1)
    })
    for (let i = 0; i < 12; i++) petal(CENTRE + 3, 90, -Math.PI / 2 + (i + 0.5) * Math.PI / 6, 0.07, palette[2], 0.35, depth)
    put(svg, "circle", { r: 118, fill: "none", stroke: palette[2], "stroke-width": 0.5, opacity: 0.4 })

    // the centre: the Julia set, ringed in gold with the symmetry's beads
    put(svg, "image", {
        href: mandalaJulia(lerp(0, 2 * Math.PI, P.julia), palette, 200, random() * Math.PI),
        x: -CENTRE, y: -CENTRE, width: 2 * CENTRE, height: 2 * CENTRE, "clip-path": "url(#" + id + "-clip)",
    })
    put(svg, "circle", { r: CENTRE, fill: "none", stroke: MANDALA_GOLD, "stroke-width": 1.4 })
    put(svg, "circle", { r: CENTRE + 3, fill: "none", stroke: MANDALA_GOLD, "stroke-width": 0.5, opacity: 0.6 })
    for (let i = 0; i < n; i++) {
        const [x, y] = polar(CENTRE + 3, -Math.PI / 2 + i * 2 * Math.PI / n)
        put(svg, "circle", { cx: x, cy: y, r: 2, fill: MANDALA_GOLD })
    }
    return svg
}

// A fake person for the console: every standing drawn from one seed, any field overridden by `over`
// (e.g. `{ temperament: "Sanguine", hexaco: { ...all 0.9 } }`). Not a participant, not anybody's result.
function mandalaSample(seed, over) {
    const u = mandalaSeeded(seed)
    const sample = {
        seed: u(),
        temperament: ["Sanguine", "Choleric", "Phlegmatic", "Melancholic"][Math.floor(u() * 4)],
        style: ["Verbal", "Logical", "Visual", "Spatial"][Math.floor(u() * 4)],
        hexaco: { HonestyHumility: u(), Emotionality: u(), Sociability: u(), Patience: u(), Diligence: u(), Curiosity: u() },
        mint: { Awareness: u(), Sensitivity: u(), Clarity: u() },
        primals: { Safe: u(), Enticing: u(), Alive: u() },
        styles: { Verbal: u(), Logical: u(), Visual: u(), Spatial: u() },
        wheel: Array.from({ length: 12 }, u),
        julia: u(),
    }
    return Object.assign(sample, over || {})
}
