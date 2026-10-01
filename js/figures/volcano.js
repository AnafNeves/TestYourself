/* =========================================================================
   How hot is your volcano — what the SIS/SES-SF (`sisses`, the Desire items
   of the `sex` block) feeds back: the dual control model's accelerator and
   its two brakes, drawn as a volcano in cross-section. A PROTOTYPE
   (September 2026); NOTES, DESIRE, in content/block_sex.js, holds the
   thinking it came out of.

   An island volcano rising out of the sea at dusk, cut through so that its
   insides show: the magma chamber in the crust under the seabed, the conduit
   up through the cone, and a cleft at the summit it comes out of. Above the
   water rather than under it, for clarity: lava reads against a sky, and the
   sea at its foot keeps it in the descent.

   ONE CHANNEL, ONE THING, and nothing else moves:

     Sexual Excitation                 the colour of the magma, dull red to
                                       white-hot — in the chamber, the
                                       conduit and whatever spills
     Sexual Inhibition: Performance    the width of the conduit, wide open to
                                       a thread
     Sexual Inhibition: Consequences   how far lava spills down the slopes,
                                       from reaching the sea to none at all

   Everything else is fixed — above all the volcano's SIZE AND SHAPE, the
   cleft included, which is the same for everybody: a shape that grew or
   shrank with the answers would be read as a body, and ranked. Each channel
   is a standing against the SIS/SES-SF's published norms, pooled over the
   sexes (the block file says whose), rather than a reach along the scale:
   the Consequences scale sits high for nearly everybody, and as a reach
   nearly every volcano would spill nothing.

   What spills is a tongue of lava lying on each flank, thick at the lip and
   tapering to a round toe, and its range is spent on the flank rather than
   on the lip: a little reach is lava brimming over, all of it lava reaching
   the sea and steaming there. Spatter goes with it, part of the same
   channel: a low jet over the vent throwing drops that arc out and land on
   the lava already down, more of them and a little higher the further it
   spills — a fountain playing over the vent, never a blast.

   THE SCENERY IS THE SAME FOR EVERYBODY and says nothing: a crescent moon
   and its glitter on the water, low clouds lit by the sunset, three birds, a
   boat with its lantern lit far out, the beds of old eruptions in the cut
   face of the cone, the crust in beds under the seabed, and a thin plume of
   steam leaning off the cleft — a quiet volcano breathes too, so the cool
   end is dormant and not dead. What looks warmer or cooler in the scene (the
   warmth round the chamber, the light over the cleft) is the magma's colour
   and nothing else. The loops (steam, the melt rising and turning over, a
   few stars, the glitter, the surf, the boat) are held at their first frame
   by a sealed card, as the sea's are.

   The picture and the strips under it are one thing in two places: a part
   of the volcano hovered or tapped lights itself and its strip, and a strip
   hovered lights its part (`link`). The parts are found through invisible
   bands (`hits`), since the conduit can be a thread and a held spill
   nothing at all.

   The words keep the brakes from reading as faults: a brake that holds when
   somebody might walk in is working. Nothing on screen names the double
   meaning of the shape, and nothing about the figure should; for anybody
   reading the code it is a cross-section of a volcano.

   It is kept off the taste of the level that the way on and the fork cards
   carry (`renderResults` skips it for a teaser): a blurred suggestive shape
   is more suggestive than a sharp one, and would be shown to people who
   have not chosen to take the level.
   ========================================================================= */

function makeVolcano(shared) {
    "use strict"

    const score = shared.score
    const known = shared.known
    const normOf = shared.normOf
    const percentile = shared.percentile
    const teaseReach = shared.teaseReach
    const pickButtons = shared.pickButtons
    const figureHolder = shared.figureHolder
    const showTip = shared.showTip
    const hideTip = shared.hideTip
    const VOTES = shared.VOTES

    const VOLCANO_OF = "sisses"
    const VOLCANO_KEY = "Desire" // the vote on the figure

    // The three dimensions, each with the channel it drives and the words on
    // its bar. `key` names the value in a scene; the colour is the bar's own.
    const CHANNELS = [
        {
            key: "heat",
            dimension: "Sexual Excitation",
            name: "Heat",
            colour: "#f08a3c",
            what: "How readily you are turned on. It is the colour of the magma: dull red for a slow warm-up, white-hot for a quick one.",
            // The part of the picture it drives, said on hovering that part.
            part: "The colour of the magma: your Heat",
            // How the standing is said, above the average and below it.
            above: ["Heats up faster than ", " of people"],
            below: ["Heats up more slowly than ", " of people"],
        },
        {
            key: "narrow",
            dimension: "Sexual Inhibition: Performance",
            name: "Focus",
            colour: "#9fb8d0",
            what: "How much your arousal needs your full attention: how easily it fades when something else takes it. It is the width of the channel the magma rises through.",
            part: "The width of the channel the magma rises through: your Focus",
            above: ["Needs more focus than ", " of people"],
            below: ["Needs less focus than ", " of people"],
        },
        {
            key: "hold",
            dimension: "Sexual Inhibition: Consequences",
            name: "Caution",
            colour: "#b7a6d8",
            what: "How much the chance of being seen or caught, or a risk to your health, holds your arousal back. It is how far the lava spills down the slopes.",
            part: "How far the lava spills down the slopes: your Caution",
            above: ["More cautious than ", " of people"],
            below: ["Less cautious than ", " of people"],
        },
    ]

    // The two ends drawn small under the person's own volcano.
    const COOL = { heat: 0.06, narrow: 0.92, hold: 0.95 }
    const HOT = { heat: 0.96, narrow: 0.06, hold: 0.04 }

    // The magma, cool to hot.
    const EMBER = "#5a1712"
    const LAVA = "#e3541c"
    const WHITE = "#ffe7a3"

    // The scene in its own units. The badge crops against these.
    const W = 640
    const H = 400
    const WATER = 210 // the sea's surface
    const SEABED = 300
    const VENT = [320, 114] // the bottom of the cleft
    const WIDEST = 30 // the conduit, fully open
    const NARROWEST = 4

    // The cone, one shape for everybody: two flanks rising to a crest with a
    // cleft in it, standing on the seabed. Symmetric about x = 320.
    const CONE =
        "M 60 300 C 180 292, 236 160, 286 110 C 296 100, 308 98, 320 114 C 332 98, 344 100, 354 110 C 404 160, 460 292, 580 300 Z"
    // The conduit, from the top of the chamber to the cleft.
    const CONDUIT = "M 320 326 C 312 262, 330 190, 320 116"
    // The chamber, a body of melt rather than a disc: one shape for everybody,
    // like the cone, with a lobe either side where it has pushed into the
    // crust.
    const CHAMBER =
        "M 206 356 C 196 340, 226 330, 256 332 C 276 322, 300 320, 320 320 C 344 320, 372 324, 390 332 " +
        "C 420 330, 446 340, 436 358 C 428 374, 390 384, 336 384 C 300 386, 262 384, 236 376 C 218 370, 210 364, 206 356 Z"
    // The right flank, as the two cubics it is drawn with: over the lip of
    // the cleft, then down to the foot. The left is its mirror.
    const LIP = [[320, 114], [332, 98], [344, 100], [354, 110]]
    const FLANK = [[354, 110], [404, 160], [460, 292], [580, 300]]
    // How thick a flow is where it leaves the cleft and where it stops.
    const THICKEST = 13
    const THINNEST = 6

    let count = 0

    // Lehmer's generator, for the stars, which are the same in every scene.
    function seeded(seed) {
        let state = Math.floor(seed) % 2147483647
        if (state <= 0) state += 2147483646
        return () => {
            state = (state * 16807) % 2147483647
            return (state - 1) / 2147483646
        }
    }

    /* ------------------------------ the values ----------------------------- */

    // Where somebody stands on a dimension, or nothing while it is unanswered.
    function standing(dimension) {
        if (!known(dimension)) return undefined
        const norm = normOf(dimension)
        const value = score(dimension)
        return norm && value !== undefined ? percentile(value, norm) : undefined
    }

    function scene(locked) {
        const now = {}
        for (const channel of CHANNELS) now[channel.key] = locked ? teaseReach(channel.dimension, 0, 1) : standing(channel.dimension)
        return now
    }

    function ready() {
        const now = scene(false)
        return CHANNELS.every((channel) => now[channel.key] !== undefined)
    }

    // Whether the questions were answered and too many of a channel's
    // declined to draw it: the volcano wants all three, so one is enough.
    function declined() {
        return CHANNELS.some((channel) => known(channel.dimension) && shared.declined(channel.dimension))
    }

    // The magma where it has begun to cool: its own colour, darker and
    // redder. Hot lava glows from inside a crust, which is what gives it an
    // edge at the white-hot end, where the colour alone would be pale.
    function rim(colour) {
        return mix(colour, "#7a1a08", 0.4)
    }

    function magma(heat) {
        return heat < 0.5 ? mix(EMBER, LAVA, heat * 2) : mix(LAVA, WHITE, (heat - 0.5) * 2)
    }

    /* ------------------------------- geometry ------------------------------ */

    function bezier(points, t) {
        const [a, b, c, d] = points
        const u = 1 - t
        return [0, 1].map((i) => u * u * u * a[i] + 3 * u * u * t * b[i] + 3 * u * t * t * c[i] + t * t * t * d[i])
    }

    // The right flank walked from just inside the cleft down to the sea, as
    // points a few units apart. Worked out once: it is the same for everybody.
    const COURSE = (() => {
        const points = []
        for (let t = 0.3; t <= 1.0001; t += 0.05) points.push(bezier(LIP, t))
        for (let t = 0.02; t <= 1.0001; t += 0.005) {
            const point = bezier(FLANK, t)
            if (point[1] > WATER - 1) break
            points.push(point)
        }
        return points
    })()

    function lengthOf(points) {
        let length = 0
        for (let i = 1; i < points.length; i++) length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1])
        return length
    }

    // How far along the course the lip ends, so that the flow always gets
    // over it and the range is spent on the flank, not on the lip.
    const OVER = lengthOf(COURSE.slice(0, 15))
    const WHOLE = lengthOf(COURSE)

    // The course as far as `reach` of the flank takes it.
    function courseTo(reach) {
        const wanted = OVER + reach * (WHOLE - OVER)
        const out = [COURSE[0]]
        let gone = 0
        for (let i = 1; i < COURSE.length; i++) {
            const step = Math.hypot(COURSE[i][0] - COURSE[i - 1][0], COURSE[i][1] - COURSE[i - 1][1])
            if (gone + step >= wanted) {
                const share = (wanted - gone) / step
                out.push([COURSE[i - 1][0] + share * (COURSE[i][0] - COURSE[i - 1][0]), COURSE[i - 1][1] + share * (COURSE[i][1] - COURSE[i - 1][1])])
                return out
            }
            gone += step
            out.push(COURSE[i])
        }
        return out
    }

    // A tongue of lava lying on the right flank: thick where it leaves the
    // cleft, thinner towards its toe, which is round. Mostly outside the rock,
    // a little into it, so that it sits on the slope rather than floating
    // off. Handed back as its outline and the line down its middle, for the
    // hot heart of it; the left flank's is the same, mirrored.
    function tongue(points) {
        const outer = []
        const inner = []
        const middle = []
        const last = points.length - 1
        for (let i = 0; i <= last; i++) {
            const before = points[Math.max(0, i - 1)]
            const after = points[Math.min(last, i + 1)]
            const dx = after[0] - before[0]
            const dy = after[1] - before[1]
            const size = Math.hypot(dx, dy) || 1
            const normal = [dy / size, -dx / size]
            // A little lumpy along its length, the way lava piles up as it goes.
            const thick = (THICKEST + (THINNEST - THICKEST) * (i / Math.max(1, last))) * (1 + 0.07 * Math.sin(i * 0.23) + 0.05 * Math.sin(i * 0.61 + 1))
            outer.push([points[i][0] + normal[0] * thick * 0.8, points[i][1] + normal[1] * thick * 0.8])
            inner.push([points[i][0] - normal[0] * thick * 0.2, points[i][1] - normal[1] * thick * 0.2])
            middle.push([points[i][0] + normal[0] * thick * 0.3, points[i][1] + normal[1] * thick * 0.3])
        }
        const toe = outer[last]
        const back = inner[last]
        const radius = Math.hypot(toe[0] - back[0], toe[1] - back[1]) / 2
        return { outer: outer, radius: radius, inner: inner.reverse(), middle: middle }
    }

    // The tongue's outline, on the side it is drawn on: mirrored, the arc
    // round its toe turns the other way.
    function outline(flow, left) {
        const place = (point) => (left ? W - point[0] : point[0]).toFixed(1) + " " + point[1].toFixed(1)
        return (
            "M " + flow.outer.map(place).join(" L ") + " A " + flow.radius.toFixed(1) + " " + flow.radius.toFixed(1) + " 0 0 " + (left ? 0 : 1) + " " +
            place(flow.inner[0]) + " L " + flow.inner.map(place).join(" L ") + " Z"
        )
    }

    // A course moved out from the rock by `distance`, for the trace that says
    // where lava would run.
    function outside(points, distance) {
        const last = points.length - 1
        return points.map((point, i) => {
            const before = points[Math.max(0, i - 1)]
            const after = points[Math.min(last, i + 1)]
            const dx = after[0] - before[0]
            const dy = after[1] - before[1]
            const size = Math.hypot(dx, dy) || 1
            return [point[0] + (dy / size) * distance, point[1] - (dx / size) * distance]
        })
    }

    const line = (points) => "M " + points.map((point) => point[0].toFixed(1) + " " + point[1].toFixed(1)).join(" L ")
    const mirrored = (points) => points.map((point) => [W - point[0], point[1]])

    /* ------------------------------- the scene ----------------------------- */

    function stops(gradient, list) {
        for (const [offset, colour, opacity] of list) {
            gradient.appendChild(draw("stop", { offset: offset, "stop-color": colour, "stop-opacity": opacity === undefined ? 1 : opacity }))
        }
        return gradient
    }

    function defs(id, colour) {
        const holder = draw("defs", {})
        const linear = (name, list) => holder.appendChild(stops(draw("linearGradient", { id: id + "-" + name, x1: 0, y1: 0, x2: 0, y2: 1 }), list))
        const radial = (name, list, at) => holder.appendChild(stops(draw("radialGradient", Object.assign({ id: id + "-" + name }, at)), list))

        // Dusk, the sun just down behind the right of the frame.
        linear("sky", [
            [0, "#0a0e2a"],
            [0.4, "#221d4a"],
            [0.75, "#5b3560"],
            [0.93, "#a0506a"],
            [1, "#d27a6c"],
        ])
        radial("sun", [[0, "#ffb27a", 0.55], [1, "#ffb27a", 0]], { cx: 0.92, cy: 1, r: 0.5, fx: 0.92, fy: 1 })
        linear("sea", [
            [0, "#3a5e80"],
            [0.08, "#1f4a6c"],
            [0.5, "#123452"],
            [1, "#0a1b2e"],
        ])
        linear("crust", [
            [0, "#35251d"],
            [1, "#150e0b"],
        ])
        linear("rock", [
            [0, "#6a4a38"],
            [0.5, "#4f3629"],
            [1, "#2e1f19"],
        ])
        // The chamber, lit from its middle: the one colour, lighter and
        // darker, so that it reads as a body of melt and not a flat shape.
        radial("melt", [[0, mix(colour, "#ffffff", 0.35)], [0.55, colour], [1, mix(colour, "#000000", 0.4)]], { cx: 0.5, cy: 0.4, r: 0.62 })
        // What the melt warms round it, and the light over the cleft. Both
        // are the magma's colour and nothing else, so they say only what the
        // colour says.
        radial("warmth", [[0, colour, 0.45], [0.6, colour, 0.12], [1, colour, 0]], { cx: 0.5, cy: 0.5, r: 0.5 })
        radial("halo", [[0, colour, 0.55], [0.5, colour, 0.16], [1, colour, 0]], { cx: 0.5, cy: 0.5, r: 0.5 })
        radial("vignette", [[0.6, "#000000", 0], [1, "#000000", 0.38]], { cx: 0.5, cy: 0.5, r: 0.72 })
        // The moon, a crescent cut out of a disc.
        const moon = holder.appendChild(draw("mask", { id: id + "-moon", maskUnits: "userSpaceOnUse", x: 0, y: 0, width: W, height: H }))
        moon.appendChild(draw("circle", { cx: 96, cy: 60, r: 13, fill: "#ffffff" }))
        moon.appendChild(draw("circle", { cx: 102, cy: 55, r: 12, fill: "#000000" }))

        for (const [name, deviation] of [["glow", 7], ["soft", 2.4], ["haze", 5]]) {
            const blur = holder.appendChild(draw("filter", { id: id + "-" + name, x: "-50%", y: "-50%", width: "200%", height: "200%" }))
            blur.appendChild(draw("feGaussianBlur", { stdDeviation: deviation }))
        }
        const clip = holder.appendChild(draw("clipPath", { id: id + "-clip" }))
        clip.appendChild(draw("rect", { x: 0, y: 0, width: W, height: H, rx: 12 }))
        const cone = holder.appendChild(draw("clipPath", { id: id + "-cone" }))
        cone.appendChild(draw("path", { d: CONE }))
        return holder
    }

    // The sky, the sea and the crust: everything that is the same for
    // everybody, with a little life in it that is also the same for everybody.
    function backdrop(into, id) {
        into.appendChild(draw("rect", { x: 0, y: 0, width: W, height: WATER, fill: "url(#" + id + "-sky)" }))
        into.appendChild(draw("rect", { x: 320, y: 60, width: 320, height: WATER - 60, fill: "url(#" + id + "-sun)" }))

        const random = seeded(4271)
        for (let k = 0; k < 46; k++) {
            const y = Math.pow(random(), 1.6) * 150
            into.appendChild(
                draw("circle", {
                    class: k % 5 === 0 ? "volcano__star" : "",
                    cx: (random() * W).toFixed(1),
                    cy: y.toFixed(1),
                    r: (0.4 + random() * 0.9).toFixed(2),
                    fill: "#fff6e8",
                    opacity: ((0.2 + random() * 0.6) * (1 - y / 190)).toFixed(2),
                    style: "--beat: " + (2.5 + random() * 3).toFixed(1) + "s; --phase: -" + (random() * 5).toFixed(1) + "s",
                }),
            )
        }
        into.appendChild(draw("circle", { cx: 96, cy: 60, r: 22, fill: "#fff1d2", opacity: 0.08, filter: "url(#" + id + "-haze)" }))
        into.appendChild(draw("rect", { x: 70, y: 34, width: 52, height: 52, fill: "#fff1d2", mask: "url(#" + id + "-moon)" }))

        // Long clouds low over the horizon, lit from under by the sunset.
        const clouds = into.appendChild(draw("g", { class: "volcano__clouds", filter: "url(#" + id + "-soft)" }))
        for (const [x, y, width, tint] of [[18, 150, 170, 0.5], [120, 172, 120, 0.4], [450, 132, 210, 0.55], [500, 164, 150, 0.45]]) {
            clouds.appendChild(draw("ellipse", { cx: x + width / 2, cy: y, rx: width / 2, ry: 4.5, fill: "#3c2850", opacity: 0.7 }))
            clouds.appendChild(draw("ellipse", { cx: x + width / 2 + 6, cy: y + 3, rx: width / 2 - 14, ry: 1.6, fill: "#f0a08a", opacity: tint }))
        }

        // Two seabirds going home.
        for (const [x, y, size] of [[468, 74, 6], [486, 66, 4.5], [455, 88, 3.5]]) {
            into.appendChild(
                draw("path", {
                    d: "M " + (x - size) + " " + y + " q " + size / 2 + " " + -size / 2 + " " + size + " 0 q " + size / 2 + " " + -size / 2 + " " + size + " 0",
                    fill: "none",
                    stroke: "#1a1330",
                    "stroke-width": 1.2,
                    "stroke-linecap": "round",
                }),
            )
        }

        // The sea, with the sunset laid along its surface and the moon's
        // glitter under the moon.
        into.appendChild(draw("rect", { x: 0, y: WATER, width: W, height: SEABED - WATER, fill: "url(#" + id + "-sea)" }))
        for (let k = 0; k < 34; k++) {
            const depth = Math.pow(random(), 2.2)
            const y = WATER + 3 + depth * 60
            const width = 6 + random() * 18 * (1 - depth)
            const x = random() * W
            into.appendChild(
                draw("line", { x1: x.toFixed(1), y1: y.toFixed(1), x2: (x + width).toFixed(1), y2: y.toFixed(1), stroke: "#cfe6ff", "stroke-width": 0.8, opacity: (0.18 * (1 - depth)).toFixed(2) }),
            )
        }
        for (let k = 0; k < 9; k++) {
            const y = WATER + 4 + k * 5 + random() * 2
            const width = (16 - k * 1.4) * (0.6 + random() * 0.6)
            into.appendChild(
                draw("line", { class: "volcano__glint", x1: (96 - width / 2).toFixed(1), y1: y.toFixed(1), x2: (96 + width / 2).toFixed(1), y2: y.toFixed(1), stroke: "#fff1d2", "stroke-width": 1.1, opacity: (0.5 - k * 0.05).toFixed(2), style: "--phase: -" + (k * 0.4).toFixed(1) + "s" }),
            )
        }
        boat(into)

        // Sand and silt on the seabed, and the crust under it in beds.
        into.appendChild(draw("path", { d: "M 0 296 C 80 292, 140 298, 220 296 L 420 296 C 500 294, 560 299, 640 295 L 640 300 L 0 300 Z", fill: "#2b3a45", opacity: 0.8 }))
        into.appendChild(draw("rect", { x: 0, y: SEABED, width: W, height: H - SEABED, fill: "url(#" + id + "-crust)" }))
        const beds = [
            [318, "#3b2a21"],
            [342, "#31231c"],
            [370, "#281c16"],
        ]
        for (const [y, fill] of beds) {
            into.appendChild(draw("path", { d: "M 0 " + y + " C 160 " + (y - 6) + ", 320 " + (y + 6) + ", 480 " + (y - 2) + " S 600 " + (y + 2) + ", 640 " + y + " L 640 400 L 0 400 Z", fill: fill }))
            into.appendChild(draw("path", { d: "M 0 " + y + " C 160 " + (y - 6) + ", 320 " + (y + 6) + ", 480 " + (y - 2) + " S 600 " + (y + 2) + ", 640 " + y, fill: "none", stroke: "rgba(255, 220, 190, 0.07)", "stroke-width": 1 }))
        }
        for (let k = 0; k < 70; k++) {
            into.appendChild(
                draw("circle", { cx: (random() * W).toFixed(1), cy: (SEABED + 4 + random() * 94).toFixed(1), r: (0.6 + random() * 1.4).toFixed(2), fill: random() < 0.5 ? "#4a372c" : "#120c09", opacity: 0.7 }),
            )
        }
        into.appendChild(draw("line", { x1: 0, y1: SEABED, x2: W, y2: SEABED, stroke: "rgba(255, 255, 255, 0.10)", "stroke-width": 1 }))
    }

    // A small boat out on the water with a lantern lit, the one sign of
    // anybody in the scene, and too far off to be watching.
    function boat(into) {
        const at = into.appendChild(draw("g", { class: "volcano__boat", transform: "translate(150 " + WATER + ")" }))
        const bob = at.appendChild(draw("g", { class: "volcano__bob" }))
        bob.appendChild(draw("path", { d: "M -13 -3 L 13 -3 L 9 2 L -9 2 Z", fill: "#0c1024" }))
        bob.appendChild(draw("line", { x1: 0, y1: -3, x2: 0, y2: -26, stroke: "#0c1024", "stroke-width": 1.2 }))
        bob.appendChild(draw("path", { d: "M 1 -25 L 12 -5 L 1 -5 Z", fill: "#1a1a36" }))
        bob.appendChild(draw("path", { d: "M -1 -21 L -9 -5 L -1 -5 Z", fill: "#15152e" }))
        bob.appendChild(draw("circle", { cx: -10, cy: -6, r: 1.3, fill: "#ffd28a" }))
        bob.appendChild(draw("circle", { cx: -10, cy: -6, r: 4, fill: "#ffd28a", opacity: 0.25 }))
        at.appendChild(draw("line", { x1: -14, y1: 2.5, x2: 14, y2: 2.5, stroke: "#cfe6ff", "stroke-width": 0.8, opacity: 0.25 }))
    }

    // The cone, cut through: its rock in the beds old eruptions laid down (the
    // outline again, shrunk towards the foot of the conduit, each a shade of
    // its own), a weathered skin, the part under the sea a little in the
    // water's colour, and its outline.
    function cone(into, id) {
        const inside = into.appendChild(draw("g", { "clip-path": "url(#" + id + "-cone)" }))
        inside.appendChild(draw("path", { d: CONE, fill: "url(#" + id + "-rock)" }))
        const beds = ["#5c3f2f", "#6b4a36", "#523729", "#634433", "#4a3226", "#5a3d2e", "#43302a"]
        const scales = [0.9, 0.79, 0.68, 0.57, 0.46, 0.35, 0.24]
        scales.forEach((scale, i) => {
            inside.appendChild(
                draw("path", {
                    d: CONE,
                    fill: beds[i],
                    opacity: 0.85,
                    stroke: "rgba(20, 10, 6, 0.35)",
                    "stroke-width": 1 / scale,
                    transform: "translate(320 300) scale(" + scale + ") translate(-320 -300)",
                }),
            )
        })
        // Ash and cinders through the beds.
        const random = seeded(911)
        for (let k = 0; k < 90; k++) {
            inside.appendChild(
                draw("circle", { cx: (100 + random() * 440).toFixed(1), cy: (100 + random() * 200).toFixed(1), r: (0.5 + random() * 1.2).toFixed(2), fill: random() < 0.6 ? "#2a1c15" : "#8a664e", opacity: 0.55 }),
            )
        }
        // The skin of the cone, darker where it has weathered, lighter along
        // the ridge where the last light catches it.
        inside.appendChild(draw("path", { d: CONE, fill: "none", stroke: "#2a1a13", "stroke-width": 7, opacity: 0.7 }))
        inside.appendChild(draw("rect", { x: 0, y: WATER, width: W, height: SEABED - WATER, fill: "#5f93c0", opacity: 0.5, style: "mix-blend-mode: multiply" }))
        inside.appendChild(draw("line", { x1: 0, y1: WATER, x2: W, y2: WATER, stroke: "rgba(190, 225, 255, 0.22)", "stroke-width": 1 }))
        into.appendChild(draw("path", { d: CONE, fill: "none", stroke: "#a67c5e", "stroke-width": 1.3, "stroke-linejoin": "round" }))

        // Surf where the sea meets the rock either side.
        for (const x of [208, 432]) {
            const out = x < 320 ? -1 : 1
            into.appendChild(
                draw("path", { class: "volcano__surf", d: "M " + (x + out * 1) + " " + (WATER - 0.5) + " q " + out * 6 + " -2.5 " + out * 13 + " 0 q " + out * 5 + " 1.5 " + out * 9 + " 0", fill: "none", stroke: "#e8f4ff", "stroke-width": 1.1, "stroke-linecap": "round", opacity: 0.55 }),
            )
        }
    }

    // The magma: the warmth it gives the crust round it, the chamber, the
    // conduit as wide as the Performance brake leaves it, running up in a
    // slow current, the pool in the cleft and the light over it — all the one
    // colour.
    function melt(into, id, colour, narrow) {
        const width = NARROWEST + (1 - narrow) * (WIDEST - NARROWEST)
        into.appendChild(draw("ellipse", { cx: 320, cy: 354, rx: 190, ry: 62, fill: "url(#" + id + "-warmth)" }))
        into.appendChild(draw("ellipse", { cx: VENT[0], cy: VENT[1] - 8, rx: 70, ry: 44, fill: "url(#" + id + "-halo)" }))

        // The conduit's trace, lit when its strip or the conduit is hovered:
        // under the magma, so that only a rim of it shows round the melt.
        into.appendChild(draw("path", { class: "volcano__trace volcano__trace--narrow", d: CONDUIT, fill: "none", stroke: "#fff3d6", "stroke-width": width + 9, "stroke-linecap": "round" }))
        // The rock round the conduit, chilled dark where the melt touches it.
        into.appendChild(draw("path", { d: CONDUIT, fill: "none", stroke: "#1b100c", "stroke-width": width + 5, "stroke-linecap": "round", opacity: 0.9 }))

        const glow = into.appendChild(draw("g", { class: "volcano__glow", filter: "url(#" + id + "-glow)", opacity: 0.7 }))
        glow.appendChild(draw("path", { d: CHAMBER, fill: colour }))
        glow.appendChild(draw("path", { d: CONDUIT, fill: "none", stroke: colour, "stroke-width": width + 6, "stroke-linecap": "round" }))

        // Darker at the walls, where it cools against the rock, hottest
        // down the middle.
        into.appendChild(draw("path", { class: "volcano__conduit", d: CONDUIT, fill: "none", stroke: rim(colour), "stroke-width": width, "stroke-linecap": "round" }))
        into.appendChild(draw("path", { d: CONDUIT, fill: "none", stroke: colour, "stroke-width": Math.max(1.5, width * 0.62), "stroke-linecap": "round" }))
        into.appendChild(draw("path", { d: CONDUIT, fill: "none", stroke: mix(colour, "#ffffff", 0.35), "stroke-width": Math.max(0.8, Math.min(3, width * 0.16)), "stroke-linecap": "round", opacity: 0.8 }))
        into.appendChild(
            draw("path", {
                class: "volcano__rising",
                d: CONDUIT,
                fill: "none",
                stroke: mix(colour, "#ffffff", 0.55),
                "stroke-width": Math.max(1, Math.min(3.2, width * 0.18)),
                "stroke-linecap": "round",
                "stroke-dasharray": "0.1 24",
                opacity: 0.8,
            }),
        )
        // The chamber over the foot of the conduit, which rises out of it.
        into.appendChild(draw("path", { d: CHAMBER, fill: "url(#" + id + "-melt)", stroke: mix(colour, "#000000", 0.45), "stroke-width": 1.2 }))
        // Currents turning in the chamber, lighter than the melt.
        for (const d of ["M 236 360 C 262 344, 300 346, 316 358", "M 330 350 C 356 340, 392 342, 414 356", "M 270 372 C 300 366, 344 366, 372 374"]) {
            into.appendChild(draw("path", { class: "volcano__current", d: d, fill: "none", stroke: mix(colour, "#ffffff", 0.45), "stroke-width": 1.2, "stroke-linecap": "round", "stroke-dasharray": "18 10", opacity: 0.3 }))
        }
        into.appendChild(draw("ellipse", { cx: VENT[0], cy: VENT[1] - 1, rx: 12, ry: 3.8, fill: colour }))
        into.appendChild(draw("ellipse", { cx: VENT[0], cy: VENT[1] - 1.8, rx: 6, ry: 1.3, fill: mix(colour, "#ffffff", 0.5), opacity: 0.8 }))
    }

    // The steam that every volcano breathes out, hot or quiet: the same for
    // everybody, a thin plume leaning away on the wind.
    function steam(into, id) {
        const plume = into.appendChild(draw("g", { filter: "url(#" + id + "-soft)" }))
        const puffs = [
            [322, 104, 5, 0.5],
            [328, 92, 7, 0.42],
            [338, 78, 9, 0.34],
            [352, 64, 11, 0.26],
            [370, 50, 13, 0.18],
            [392, 38, 15, 0.1],
        ]
        puffs.forEach(([x, y, r, opacity], i) => {
            const puff = plume.appendChild(draw("g", { class: "volcano__puff", style: "--phase: -" + (i * 1.1).toFixed(1) + "s" }))
            puff.appendChild(draw("ellipse", { cx: x, cy: y, rx: r * 1.3, ry: r, fill: "#c9bcd6", opacity: opacity }))
        })
    }

    // What spills: a tongue of lava over each lip and down the flank, as far
    // as the Consequences brake lets it — to the sea when it barely holds,
    // brimming at the lip when it mostly holds, none at all when it holds
    // fast. Where it reaches the sea it steams. It pours on arrival, through
    // a mask drawn along its course.
    function spill(into, id, colour, hold) {
        const reach = 1 - hold
        if (reach < 0.08) return
        const course = courseTo(reach)
        const flow = tongue(course)
        for (const left of [false, true]) {
            const side = left ? mirrored(course) : course
            const middle = left ? mirrored(flow.middle) : flow.middle
            const mask = into.appendChild(draw("mask", { id: id + "-pour" + (left ? "l" : "r"), maskUnits: "userSpaceOnUse", x: 0, y: 0, width: W, height: H }))
            mask.appendChild(
                draw("path", {
                    class: "volcano__flow",
                    d: line(side),
                    pathLength: 100,
                    fill: "none",
                    stroke: "#ffffff",
                    "stroke-width": 28,
                    "stroke-dasharray": "101 200",
                    style: "--pour: 101",
                }),
            )
            const poured = into.appendChild(draw("g", { mask: "url(#" + mask.id + ")" }))
            const shape = outline(flow, left)
            poured.appendChild(draw("path", { d: shape, fill: colour, opacity: 0.6, filter: "url(#" + id + "-glow)" }))
            poured.appendChild(draw("path", { d: shape, fill: rim(colour), stroke: mix(colour, "#000000", 0.55), "stroke-width": 1, "stroke-linejoin": "round" }))
            poured.appendChild(draw("path", { d: line(middle), fill: "none", stroke: colour, "stroke-width": THINNEST * 0.9, "stroke-linecap": "round" }))
            // The hot heart of the flow, which crusts over towards the toe.
            const core = middle.slice(0, Math.max(2, Math.round(middle.length * 0.8)))
            poured.appendChild(draw("path", { d: line(core), fill: "none", stroke: mix(colour, "#ffffff", 0.45), "stroke-width": 1.6, "stroke-linecap": "round", opacity: 0.85 }))
        }
        if (reach > 0.93) {
            for (const x of [431, 209]) {
                const hiss = into.appendChild(draw("g", { class: "volcano__hiss", filter: "url(#" + id + "-soft)" }))
                hiss.appendChild(draw("ellipse", { cx: x, cy: WATER - 7, rx: 9, ry: 5, fill: "#e6e0ee", opacity: 0.45 }))
                hiss.appendChild(draw("ellipse", { cx: x + (x > 320 ? 5 : -5), cy: WATER - 16, rx: 7, ry: 4, fill: "#e6e0ee", opacity: 0.25 }))
            }
        }
        spray(into, id, colour, reach, course)
    }

    // Spatter thrown up out of the cleft with the spill and landing on the
    // flanks as far as the lava has got: part of the same channel, more of
    // it and a little higher the less the risk brake holds. A low fountain
    // of drops, the way lava on Hawaii plays over its vent, and never a
    // blast — the one thing the figure is written never to show. Each drop
    // flies an arc of its own (across at a steady pace in one group, up and
    // down again in the one inside it), and some have already landed.
    function spray(into, id, colour, reach, course) {
        const random = seeded(3301)
        const hot = mix(colour, "#ffffff", 0.35)
        const drops = into.appendChild(draw("g", { class: "volcano__spray" }))
        // The jet the drops are thrown from, playing over the vent: a little
        // taller as more comes out.
        drops.appendChild(
            draw("ellipse", { class: "volcano__jet", cx: VENT[0], cy: (VENT[1] - 6 - reach * 7).toFixed(1), rx: (4 + reach * 4).toFixed(1), ry: (5 + reach * 10).toFixed(1), fill: colour, opacity: 0.55, filter: "url(#" + id + "-soft)" }),
        )
        drops.appendChild(draw("ellipse", { cx: VENT[0], cy: (VENT[1] - 3 - reach * 3).toFixed(1), rx: 2.4, ry: (2.5 + reach * 5).toFixed(1), fill: hot, opacity: 0.85 }))
        const flying = Math.round(6 + reach * 20)
        for (let k = 0; k < flying; k++) {
            const left = k % 2 === 1
            // Somewhere on the lava already down, most near the top.
            const at = course[Math.min(course.length - 1, Math.floor(Math.pow(random(), 1.6) * course.length))]
            const land = [left ? W - at[0] : at[0], at[1] - 3]
            const start = [VENT[0] + (random() - 0.5) * 8, VENT[1] - 2]
            const across = drops.appendChild(
                draw("g", {
                    class: "volcano__drop",
                    style:
                        "--dx: " + (land[0] - start[0]).toFixed(1) + "px; --up: " + (12 + random() * 32 * (0.4 + reach)).toFixed(1) + "px; --down: " +
                        (land[1] - start[1]).toFixed(1) + "px; --beat: " + (1.3 + random() * 0.9).toFixed(2) + "s; --phase: -" + (random() * 2.2).toFixed(2) + "s",
                }),
            )
            const arc = across.appendChild(draw("g", { class: "volcano__arc" }))
            const size = 1.3 + random() * 1.7
            arc.appendChild(draw("circle", { cx: start[0].toFixed(1), cy: start[1].toFixed(1), r: (size * 2.6).toFixed(2), fill: colour, opacity: 0.5, filter: "url(#" + id + "-soft)" }))
            arc.appendChild(draw("circle", { cx: start[0].toFixed(1), cy: start[1].toFixed(1), r: size.toFixed(2), fill: hot }))
        }
        // What has landed: blobs of spatter along the lava, crusting over.
        const landed = Math.round(reach * 12)
        for (let k = 0; k < landed; k++) {
            const at = course[Math.min(course.length - 1, Math.floor(random() * course.length))]
            const side = k % 2 === 1 ? -1 : 1
            const x = side < 0 ? W - at[0] : at[0]
            drops.appendChild(
                draw("ellipse", { cx: (x + side * (4 + random() * 8)).toFixed(1), cy: (at[1] - 5 - random() * 6).toFixed(1), rx: (1.2 + random() * 1.6).toFixed(2), ry: (0.9 + random()).toFixed(2), fill: rim(colour), opacity: 0.9 }),
            )
        }
    }

    // What lights a part when it or its strip is hovered: the chamber's
    // outline, and the whole course the lava could run down each flank, just
    // outside it, so that a volcano with nothing spilling still shows what
    // the channel is. Held at nothing until `data-lit` names it.
    function traces(into) {
        into.appendChild(draw("path", { class: "volcano__trace volcano__trace--heat", d: CHAMBER, fill: "none", stroke: "#fff3d6", "stroke-width": 1.6, "stroke-dasharray": "5 4" }))
        const course = outside(COURSE, 12)
        for (const side of [course, mirrored(course)]) {
            into.appendChild(draw("path", { class: "volcano__trace volcano__trace--hold", d: line(side), fill: "none", stroke: "#fff3d6", "stroke-width": 1.6, "stroke-dasharray": "5 4", "stroke-linecap": "round" }))
        }
    }

    // What the pointer finds: a wide invisible band over each part, since
    // the parts themselves can be a thread (the conduit at its narrowest) or
    // nothing at all (a spill the brake holds back). The conduit is on top,
    // where it crosses the chamber.
    function hits(into) {
        const layer = into.appendChild(draw("g", { class: "volcano__hits" }))
        const band = (key, attributes) => {
            const shape = layer.appendChild(draw("path", Object.assign({ class: "volcano__hit", "data-key": key, fill: "none", stroke: "rgba(0, 0, 0, 0)" }, attributes)))
            shape.style.pointerEvents = attributes.fill ? "all" : "stroke"
            return shape
        }
        for (const side of [COURSE, mirrored(COURSE)]) band("hold", { d: line(side), "stroke-width": 34, "stroke-linecap": "round" })
        band("heat", { d: CHAMBER, fill: "rgba(0, 0, 0, 0)", "stroke-width": 12 })
        band("narrow", { d: CONDUIT, "stroke-width": 34, "stroke-linecap": "round" })
    }

    function drawVolcano(chart, now, interactive) {
        const id = "volcano" + count++
        const colour = magma(now.heat)

        chart.setAttribute("viewBox", "0 0 " + W + " " + H)
        chart.classList.add("volcano")
        chart.innerHTML = ""
        chart.appendChild(defs(id, colour))

        const scene = chart.appendChild(draw("g", { "clip-path": "url(#" + id + "-clip)" }))
        backdrop(scene, id)
        steam(scene, id)
        cone(scene, id)
        melt(scene, id, colour, now.narrow)
        traces(scene)
        spill(scene, id, colour, now.hold)

        scene.appendChild(draw("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#" + id + "-vignette)" }))
        chart.appendChild(draw("rect", { x: 0.5, y: 0.5, width: W - 1, height: H - 1, rx: 12, fill: "none", stroke: "rgba(255, 255, 255, 0.10)" }))
        // Last, over the vignette and the frame, or they would take the pointer.
        if (interactive) hits(scene)
        return chart
    }

    /* ------------------------------ the section ---------------------------- */

    function text(tag, className, words) {
        const element = document.createElement(tag)
        element.className = className
        element.textContent = words
        return element
    }

    function end(now, name, caption, told) {
        const figure = document.createElement("figure")
        figure.className = "climbview__end"
        const svg = document.createElementNS(SVG, "svg")
        svg.setAttribute("role", "img")
        svg.setAttribute("aria-label", told)
        drawVolcano(svg, now)
        figure.appendChild(svg)

        const said = document.createElement("figcaption")
        said.innerHTML = "<b></b><span></span>"
        said.firstChild.textContent = name
        said.lastChild.textContent = caption
        figure.appendChild(said)
        return figure
    }

    // Who the crowd is, said under the strips. The norms are Carpenter et
    // al.'s (2010) students, pooled over the sexes (the block file says more).
    const CROWD = "Compared with {n} university students who answered the same questions"

    // Where a share of people falls on the standard normal: the curve's
    // cumulative, turned back by halving. Precise enough to place a line.
    function cumulative(z) {
        const t = 1 / (1 + 0.2316419 * Math.abs(z))
        const tail = 0.3989423 * Math.exp((-z * z) / 2) * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
        return z > 0 ? 1 - tail : tail
    }

    function probit(share) {
        let low = -4
        let high = 4
        for (let i = 0; i < 40; i++) {
            const middle = (low + high) / 2
            if (cumulative(middle) < share) low = middle
            else high = middle
        }
        return (low + high) / 2
    }

    // The crowd a channel is read against, as the bell of the sample three
    // SDs either side of its mean: shaded as far as the person stands, so
    // the shaded part is the share the words give, the average ticked, and
    // the person a gold line. The accelerator's crowd shades through the
    // magma's own colours, cool to white-hot; each brake's is its colour.
    const SPAN = 3
    const CW = 300
    const CH = 54

    function bell(channel, standing, id) {
        const z = Math.max(-SPAN + 0.05, Math.min(SPAN - 0.05, probit(standing)))
        const xOf = (value) => ((value + SPAN) / (2 * SPAN)) * CW
        const yOf = (value) => CH - 3 - (CH - 10) * Math.exp((-value * value) / 2)
        const points = []
        for (let value = -SPAN; value <= SPAN + 0.001; value += 0.1) points.push(xOf(value).toFixed(1) + " " + yOf(value).toFixed(1))
        const area = "M 0 " + (CH - 3) + " L " + points.join(" L ") + " L " + CW + " " + (CH - 3) + " Z"
        const ridge = "M " + points.join(" L ")

        const svg = document.createElementNS(SVG, "svg")
        svg.setAttribute("viewBox", "0 0 " + CW + " " + CH)
        svg.setAttribute("preserveAspectRatio", "none")
        svg.setAttribute("aria-hidden", "true")
        svg.classList.add("volcanoview__bell")
        const defs = svg.appendChild(draw("defs", {}))
        const fill = defs.appendChild(draw("linearGradient", { id: id + "-fill", x1: 0, y1: 0, x2: 1, y2: 0 }))
        const shades = channel.key === "heat" ? [EMBER, LAVA, WHITE] : [mix(channel.colour, "#0b1020", 0.55), channel.colour]
        shades.forEach((colour, i) => fill.appendChild(draw("stop", { offset: i / (shades.length - 1), "stop-color": colour })))
        const upTo = defs.appendChild(draw("clipPath", { id: id + "-upto" }))
        upTo.appendChild(draw("rect", { class: "volcanoview__upto", x: 0, y: 0, width: xOf(z).toFixed(1), height: CH }))

        svg.appendChild(draw("path", { d: area, fill: "rgba(255, 255, 255, 0.06)" }))
        svg.appendChild(draw("path", { d: area, fill: "url(#" + id + "-fill)", "clip-path": "url(#" + id + "-upto)", opacity: 0.85 }))
        svg.appendChild(draw("path", { d: ridge, fill: "none", stroke: "rgba(255, 255, 255, 0.28)", "stroke-width": 1, "vector-effect": "non-scaling-stroke" }))
        svg.appendChild(
            draw("line", { x1: CW / 2, y1: yOf(0) - 2, x2: CW / 2, y2: CH - 3, stroke: "rgba(255, 255, 255, 0.45)", "stroke-dasharray": "3 3", "vector-effect": "non-scaling-stroke" }),
        )
        svg.appendChild(draw("line", { x1: 0, y1: CH - 3, x2: CW, y2: CH - 3, stroke: "rgba(255, 255, 255, 0.18)", "vector-effect": "non-scaling-stroke" }))
        return { svg: svg, at: xOf(z) / CW }
    }

    // One strip a channel under the volcano: its name, where the person
    // stands in words, and the crowd that standing is read against, with
    // what the channel is on hover. Each is the standing the scene is drawn
    // from, so the words, the curve and the picture cannot disagree.
    function crowds(now) {
        const list = document.createElement("div")
        list.className = "volcanoview__crowds"
        const rows = list.appendChild(document.createElement("div"))
        rows.setAttribute("role", "list")
        let n = 0
        for (const channel of CHANNELS) {
            const norm = normOf(channel.dimension)
            if (norm && norm.n) n = norm.n
            const centile = Math.min(99, Math.max(1, Math.round(now[channel.key] * 100)))
            const [lead, tail] = centile < 50 ? channel.below : channel.above
            const share = centile < 50 ? 100 - centile : centile

            const row = rows.appendChild(document.createElement("div"))
            row.className = "volcanoview__crowd"
            row.setAttribute("role", "listitem")
            row.tabIndex = 0
            row.style.setProperty("--key", channel.colour)
            row.dataset.key = channel.key
            row.setAttribute("aria-label", channel.name + ": " + (centile === 50 ? "right in the middle of people" : lead + share + "%" + tail) + ". " + channel.what)

            const head = row.appendChild(document.createElement("p"))
            head.className = "volcanoview__said"
            head.appendChild(text("b", "volcanoview__name", channel.name))
            const standing = head.appendChild(document.createElement("span"))
            if (centile === 50) standing.textContent = "Right in the middle of people"
            else {
                standing.append(lead)
                standing.appendChild(document.createElement("strong")).textContent = share + "%"
                standing.append(tail)
            }

            const drawn = bell(channel, now[channel.key], "volcanocrowd" + count++)
            const stage = row.appendChild(document.createElement("span"))
            stage.className = "volcanoview__stage"
            stage.appendChild(drawn.svg)
            const you = stage.appendChild(document.createElement("b"))
            you.className = "volcanoview__you"
            you.style.left = (drawn.at * 100).toFixed(1) + "%"
            you.appendChild(document.createElement("span")).textContent = "You"
            stage.appendChild(text("i", "volcanoview__mean", "Average"))

            const tip = () => showTip(stage, channel.what)
            row.addEventListener("mouseenter", tip)
            row.addEventListener("focus", tip)
            row.addEventListener("mouseleave", hideTip)
            row.addEventListener("blur", hideTip)
        }
        if (n) list.appendChild(text("p", "volcanoview__who", CROWD.replace("{n}", n.toLocaleString("en-GB"))))
        return list
    }

    // The picture and the strips as one thing in two places: hovering a part
    // of the volcano lights it and its strip and says what it is, hovering or
    // focusing a strip lights its part. A tap on a part keeps it lit until
    // the next tap anywhere, since a touch has no hover to leave.
    function link(figure, list) {
        const rows = {}
        for (const row of list.querySelectorAll(".volcanoview__crowd")) rows[row.dataset.key] = row
        const words = {}
        for (const channel of CHANNELS) words[channel.key] = channel.part
        let held = null

        function light(key) {
            if (key) figure.dataset.lit = key
            else delete figure.dataset.lit
            for (const name of Object.keys(rows)) rows[name].classList.toggle("volcanoview__crowd--lit", name === key)
        }

        for (const shape of figure.querySelectorAll(".volcano__hit")) {
            const key = shape.dataset.key
            shape.addEventListener("mouseenter", () => {
                light(key)
                showTip(shape, words[key])
            })
            shape.addEventListener("mouseleave", () => {
                light(held)
                hideTip()
            })
            shape.addEventListener("click", (event) => {
                event.stopPropagation()
                held = key
                light(key)
                showTip(shape, words[key])
                document.addEventListener(
                    "click",
                    () => {
                        held = null
                        light(null)
                        hideTip()
                    },
                    { once: true },
                )
            })
        }
        for (const key of Object.keys(rows)) {
            const row = rows[key]
            row.addEventListener("mouseenter", () => light(key))
            row.addEventListener("focus", () => light(key))
            row.addEventListener("mouseleave", () => light(held))
            row.addEventListener("blur", () => light(held))
        }
    }

    // A title, the person's own volcano at the width of the card, a line
    // saying what it was drawn from, the three channels against the crowd, the two ends
    // under a line of their own, and one question. Locked, the title and the
    // scene alone.
    function renderVolcano(locked) {
        const all = document.createDocumentFragment()
        const now = scene(locked)

        const head = document.createElement("header")
        head.className = "climbview__head volcanoview__head"
        head.appendChild(text("h3", "climbview__title", "How hot is your volcano?"))
        all.appendChild(head)

        const stage = figureHolder(
            locked
                ? "Blurred preview of the volcano your answers will draw"
                : "A volcano in cross-section: the colour of its magma, the width of the channel it rises through, and how far lava spills down its slopes",
            "result__chart--wide climbview__stage",
            locked,
        )
        drawVolcano(stage.figure, now, !locked)
        all.appendChild(stage.holder)
        if (locked) return all

        all.appendChild(
            text(
                "p",
                "climbview__note",
                "This volcano is drawn from three dimensions that emerged through your answers: Heat, which is how readily you are turned on, and Focus and Caution, which are what can hold it back. There is no right or wrong profile, only different ones.",
            ),
        )
        const strips = crowds(now)
        link(stage.figure, strips)
        all.appendChild(strips)

        const others = document.createElement("div")
        others.className = "climbview__others"
        others.appendChild(text("p", "climbview__aside", "Other people carry other fires"))
        others.appendChild(text("p", "climbview__note", "The same volcano drawn for two people with opposite answers. Most people are somewhere between them."))
        const ends = document.createElement("div")
        ends.className = "climbview__ends"
        ends.appendChild(end(COOL, "Slow to warm, quick to hold back", "Low Heat, high Focus and Caution", "The same volcano drawn from low Heat and high Focus and Caution"))
        ends.appendChild(end(HOT, "Quick to heat, slow to hold back", "High Heat, low Focus and Caution", "The same volcano drawn from high Heat and low Focus and Caution"))
        others.appendChild(ends)
        all.appendChild(others)

        const vote = document.createElement("div")
        vote.className = "climbview__vote"
        vote.appendChild(text("p", "climbview__ask", "Does this match how your desire works?"))
        vote.appendChild(pickButtons(VOLCANO_KEY, VOTES))
        all.appendChild(vote)

        return all
    }

    return {
        VOLCANO_OF: VOLCANO_OF,
        VOLCANO_KEY: VOLCANO_KEY,
        DIMENSION: CHANNELS[0].dimension,
        VENT: VENT,
        ready: ready,
        declined: declined,
        renderVolcano: renderVolcano,
    }
}
