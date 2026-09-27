/* =========================================================================
   Interoception, as the inside of a body. One drawing and three readings
   beside it: a slice of a real brain (the MNI152 template, cut by
   assets/mint/source/cut.py) glowing over the insula as far as bodily clarity
   goes; nerves running out of its brainstem into the lungs, the heart, the
   stomach and the gut, as many and as finely branched as bodily sensitivity
   goes; and the organs themselves, from grey to vivid as bodily awareness goes.
   Each reading is the dimension's name, where it stands, the crowd it stands
   in (how many people score at each point of the scale, shaded as far as the
   person), the interpretation and the vote, and a dashed lead
   joins it to the part of the drawing it is about — so the section is the
   figure and nothing else, and takes no rows underneath.
   ========================================================================= */

function makeSoma(shared) {
    "use strict"

    const score = shared.score
    const tercile = shared.tercile
    const normOf = shared.normOf
    const reachOf = shared.reachOf
    const comparison = shared.comparison
    const teaseValue = shared.teaseValue
    const sentence = shared.sentence
    const voteButtons = shared.voteButtons
    const figureHolder = shared.figureHolder
    const showTip = shared.showTip
    const hideTip = shared.hideTip

    const SOMA = "mint"

    // The slice and where things fall on it, as shares across and down the
    // picture: printed by assets/mint/source/cut.py, and copied back here
    // whenever the picture is cut again.
    const BRAIN = "assets/mint/brain.png"
    const ASPECT = 0.9211
    const INSULA = [
        [0.25, 0.5786],
        [0.75, 0.5786],
    ]
    const STEM = [0.5, 0.9643]

    const W = 400
    const H = 700
    const BX = 69 // where the brain sits on the drawing
    const BY = 10
    const BW = 262
    const BH = BW * ASPECT
    const onBrain = (share) => [BX + share[0] * BW, BY + share[1] * BH]
    const STEM_AT = onBrain(STEM)

    // The square the shelf's badge keeps: the brain, glow and all.
    const BADGE = [200, BY + BH * 0.5, BW * 0.92]

    // The three readings, top to bottom in the order their parts of the
    // drawing are, each with what that part stands for — which the crowd
    // under it says on hover rather than the reading saying it again — and
    // the colours of that part, which the crowd is shaded in from left to right.
    const READINGS = [
        {
            dimension: "Bodily Clarity",
            kind: "glow",
            what: "The glow in the brain: how easily you can tell what your body's signals mean.",
            colours: ["#7a5a1c", "#ffd66b"],
        },
        {
            dimension: "Bodily Sensitivity",
            kind: "nerve",
            what: "The amount of connecting nerves: how finely you feel small changes in your heartbeat, breathing and stomach.",
            colours: ["#34e39a", "#d6e04a", "#ff9a3c", "#ff4d6d"],
        },
        {
            dimension: "Bodily Awareness",
            kind: "vivid",
            what: "The colour of the organs: how much you notice what your body is doing.",
            colours: ["#38bdf8", "#a78bfa", "#f472b6"],
        },
    ]


    // Each organ is drawn as itself, and a nerve ends somewhere inside one:
    // `core` and its reach either way are where. The lungs are the person's,
    // so the right lung (three lobes) is on the viewer's left and the left
    // lung is notched for the heart.
    const ORGANS = [
        {
            name: "right lung",
            colour: "#f28aa8",
            core: [156, 392],
            rx: 26,
            ry: 52,
            lane: -1,
            d: "M188 318 C170 310 148 318 136 342 C122 370 116 410 116 446 C116 468 130 476 152 470 C170 466 184 458 192 448 C195 410 195 360 188 318 Z",
            lines: ["M190 372 C170 378 146 384 124 392", "M191 408 C172 420 150 432 120 440"],
        },
        {
            name: "left lung",
            colour: "#f28aa8",
            core: [248, 380],
            rx: 22,
            ry: 48,
            lane: 1,
            d: "M212 318 C230 310 252 318 264 342 C278 370 284 410 284 446 C284 468 270 476 250 472 C238 470 230 464 226 456 C234 440 234 422 224 412 C216 402 212 376 212 318 Z",
            lines: ["M211 360 C232 380 256 404 280 424"],
        },
        {
            name: "heart",
            colour: "#ff5470",
            core: [214, 424],
            rx: 14,
            ry: 14,
            lane: 1,
            d: "M198 394 C206 382 228 382 238 394 C250 408 248 434 234 450 C226 459 216 464 210 470 C205 456 196 446 192 432 C187 416 189 402 198 394 Z",
            lines: ["M207 394 C203 374 222 364 234 376", "M200 404 C212 424 222 440 212 462"],
        },
        {
            name: "stomach",
            colour: "#ffb35c",
            core: [246, 512],
            rx: 18,
            ry: 14,
            lane: 1,
            d: "M230 486 C246 476 274 484 280 506 C286 530 268 552 240 557 C218 561 198 554 190 540 C198 533 214 536 226 531 C242 524 246 508 236 500 C230 496 226 492 230 486 Z",
            lines: ["M240 528 C252 526 262 518 266 508"],
        },
        { name: "gut", colour: "#ffcf8f", core: [200, 612], rx: 34, ry: 22, lane: -1 },
    ]
    // The gut is the colon as a frame and the small intestine coiled inside
    // it; the windpipe comes down between the nerves and forks into the lungs.
    const COLON =
        "M150 668 C140 668 136 660 136 650 L136 594 C136 580 144 572 158 572 L242 572 C256 572 264 580 264 594 L264 650 C264 662 256 668 244 668 C232 668 226 676 214 676"
    const WINDPIPE = "M200 262 L200 312 C200 318 196 322 190 326 M200 312 C200 318 204 322 210 326"
    const SMALL_GUT = (() => {
        const points = []
        for (let row = 0; row < 5; row++) {
            const y = 590 + row * 15
            const way = row % 2 ? -1 : 1
            for (let k = 0; k <= 6; k++) points.push([200 + way * (-46 + k * 15.3), y + (k % 2 ? 5 : -5)])
        }
        return pathThrough(points, 5)
    })()

    const NERVES = 90 // the most there can be
    const INK = "#0b1122" // the lines drawn into an organ
    let drawn = 0 // ids for gradients and filters: the showcase, a badge and the results can share a page

    // Every scattered thing is placed from one seeded generator, so the same
    // answers draw the same nerves however often the section is opened.
    function seeded(seed) {
        let t = seed >>> 0
        return () => {
            t += 0x6d2b79f5
            let r = Math.imul(t ^ (t >>> 15), 1 | t)
            r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
            return ((r ^ (r >>> 14)) >>> 0) / 4294967296
        }
    }

    // A smooth line through the points (Catmull-Rom), as the points along it.
    function curve(points, per) {
        const out = []
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[Math.max(0, i - 1)]
            const p1 = points[i]
            const p2 = points[i + 1]
            const p3 = points[Math.min(points.length - 1, i + 2)]
            for (let k = 0; k < per; k++) {
                const t = k / per
                out.push(
                    [0, 1].map(
                        (d) =>
                            0.5 *
                            (2 * p1[d] +
                                (p2[d] - p0[d]) * t +
                                (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t * t +
                                (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * t * t * t),
                    ),
                )
            }
        }
        out.push(points[points.length - 1].slice())
        return out
    }

    function pathThrough(points, per) {
        return "M" + curve(points, per).map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L")
    }

    // An organ's colour at a given vividness: grey at nothing, itself at all.
    function vivid(colour, grey, amount) {
        return mix(grey, colour, amount)
    }

    // A colour a share of the way along a run of them.
    function along(colours, share) {
        const at = Math.min(0.9999, Math.max(0, share)) * (colours.length - 1)
        const from = Math.floor(at)
        return mix(colours[from], colours[Math.min(colours.length - 1, from + 1)], at - from)
    }

    function valueOf(dimension, tease) {
        return tease ? teaseValue(dimension) : score(dimension)
    }

    function reach(dimension, tease) {
        const value = valueOf(dimension, tease)
        return value === undefined ? 0 : Math.min(1, Math.max(0, reachOf(dimension, value)))
    }

    // The drawing alone, which is also what the showcase and the badge take.
    // `still` leaves the signals out, for a badge too small to watch them in.
    function drawSoma(chart, tease, still) {
        const id = "soma" + drawn++
        chart.setAttribute("viewBox", "0 0 " + W + " " + H)
        chart.classList.add("soma")
        chart.innerHTML = ""
        const defs = chart.appendChild(draw("defs", {}))
        const blur = (name, deviation) => {
            const filter = defs.appendChild(draw("filter", { id: id + name, x: "-60%", y: "-60%", width: "220%", height: "220%" }))
            filter.appendChild(draw("feGaussianBlur", { stdDeviation: deviation.toFixed(2) }))
            return "url(#" + id + name + ")"
        }

        organs(chart, defs, id, blur, reach("Bodily Awareness", tease))
        nerves(chart, defs, id, reach("Bodily Sensitivity", tease), still)
        brain(chart, defs, id, reach("Bodily Clarity", tease))
    }

    // Bodily awareness: how vivid the organs are, from grey shapes to colour
    // with a glow round them.
    function organs(chart, defs, id, blur, a) {
        const group = chart.appendChild(draw("g", { class: "soma__organs" }))
        const halo = blur("halo", 6 + 8 * a)
        const body = (0.28 + 0.62 * a).toFixed(2)
        const edge = (colour) => vivid(colour, "#4a5270", 0.35 + 0.65 * a)
        const shade = (name, colour) => {
            const gradient = defs.appendChild(draw("radialGradient", { id: id + name, cx: 0.38, cy: 0.32, r: 0.8 }))
            gradient.appendChild(draw("stop", { offset: 0, "stop-color": vivid(colour, "#5a6070", a) }))
            gradient.appendChild(draw("stop", { offset: 1, "stop-color": vivid(colour, "#1c2030", a * 0.55) }))
            return "url(#" + id + name + ")"
        }

        group.appendChild(draw("path", { d: WINDPIPE, class: "soma__tube", stroke: edge("#9fd4ff"), "stroke-width": 8, opacity: body * 0.7 }))
        group.appendChild(draw("path", { d: WINDPIPE, class: "soma__tube", stroke: INK, "stroke-width": 2.6, "stroke-dasharray": "1.4 3.6", opacity: 0.7 }))

        ORGANS.forEach((organ, at) => {
            if (!organ.d) return
            group.appendChild(draw("path", { d: organ.d, fill: organ.colour, opacity: (0.05 + 0.45 * a * a).toFixed(2), filter: halo }))
            group.appendChild(draw("path", { d: organ.d, fill: shade("organ" + at, organ.colour), opacity: body }))
            for (const line of organ.lines) group.appendChild(draw("path", { d: line, class: "soma__tube", stroke: INK, "stroke-width": 1.1, opacity: 0.55 }))
            group.appendChild(draw("path", { d: organ.d, fill: "none", stroke: edge(organ.colour), "stroke-width": 1.2, opacity: (0.5 + 0.5 * a).toFixed(2) }))
        })

        const gut = ORGANS[ORGANS.length - 1].colour
        group.appendChild(draw("path", { d: COLON, class: "soma__tube", stroke: gut, "stroke-width": 20, opacity: (0.05 + 0.4 * a * a).toFixed(2), filter: halo }))
        group.appendChild(draw("path", { d: COLON, class: "soma__tube", stroke: edge(gut), "stroke-width": 15, opacity: body }))
        group.appendChild(draw("path", { d: COLON, class: "soma__tube", stroke: INK, "stroke-width": 15, "stroke-dasharray": "1.2 7", opacity: 0.45 }))
        group.appendChild(draw("path", { d: SMALL_GUT, class: "soma__tube", stroke: vivid("#f7a8a0", "#5a6070", a), "stroke-width": 7, opacity: body }))
        group.appendChild(draw("path", { d: SMALL_GUT, class: "soma__tube", stroke: INK, "stroke-width": 0.8, opacity: 0.4, transform: "translate(0 2.6)" }))
    }

    // Bodily sensitivity: the nerves out of the brainstem, green where they
    // leave it and red where they reach the body, as many as it goes and
    // reaching as far into their organs and as finely branched at the end.
    // Signals run up a few of them — a dash along the path, moved by the
    // stylesheet, so a sealed card holds them still like every other loop.
    function nerves(chart, defs, id, s, still) {
        const tone = defs.appendChild(
            draw("linearGradient", { id: id + "tone", gradientUnits: "userSpaceOnUse", x1: 0, y1: STEM_AT[1], x2: 0, y2: 640 }),
        )
        for (const [offset, colour] of [
            [0, "#34e39a"],
            [0.35, "#d6e04a"],
            [0.65, "#ff9a3c"],
            [1, "#ff4d6d"],
        ]) {
            tone.appendChild(draw("stop", { offset: offset, "stop-color": colour }))
        }
        const glow = defs.appendChild(draw("filter", { id: id + "glow", x: "-60%", y: "-60%", width: "220%", height: "220%" }))
        glow.appendChild(draw("feGaussianBlur", { stdDeviation: 1.2, result: "soft" }))
        const merge = glow.appendChild(draw("feMerge", {}))
        merge.appendChild(draw("feMergeNode", { in: "soft" }))
        merge.appendChild(draw("feMergeNode", { in: "SourceGraphic" }))

        const group = chart.appendChild(draw("g", { class: "soma__nerves", stroke: "url(#" + id + "tone)", filter: "url(#" + id + "glow)" }))
        const random = seeded(17)
        const count = Math.round(8 + (NERVES - 8) * s)
        const kept = []
        // A nerve stops at the edge of its organ when little is felt, and
        // reaches into it when much is.
        const into = 0.5 + 0.5 * s
        for (let i = 0; i < NERVES; i++) {
            // Everything a nerve is drawn with is drawn whether or not it is
            // shown, so the one the score adds is the same nerve every time.
            const organ = ORGANS[Math.floor(random() * ORGANS.length)]
            const spread = random() * 2 - 1
            const target = [organ.core[0] + (random() * 2 - 1) * organ.rx, organ.core[1] + (random() * 2 - 1) * organ.ry]
            const bend = random() * 2 - 1
            const twigs = [0, 1, 2, 3, 4].map(() => [random() * Math.PI * 2, random()])
            if (i >= count) continue

            const entry = [organ.core[0], organ.core[1] - organ.ry * 1.25]
            const end = [entry[0] + (target[0] - entry[0]) * into, entry[1] + (target[1] - entry[1]) * into]
            const route = pathThrough(
                [
                    [STEM_AT[0] + spread * 5, STEM_AT[1] - 6],
                    [STEM_AT[0] + organ.lane * 11 + spread * 2.5, STEM_AT[1] + 40],
                    [STEM_AT[0] + organ.lane * 13 + spread * 3.5, 318],
                    [(STEM_AT[0] + organ.lane * 14 + end[0]) / 2 + bend * 8, (318 + end[1]) / 2],
                    end,
                ],
                10,
            )
            kept.push(route)
            group.appendChild(draw("path", { d: route, "stroke-width": (0.7 + 0.6 * s).toFixed(2), opacity: (0.45 + 0.5 * s).toFixed(2) }))
            for (const [angle, length] of twigs.slice(0, Math.round(s * 5))) {
                const far = 5 + length * 12 * s
                const tip = [end[0] + Math.cos(angle) * far, end[1] + Math.sin(angle) * far]
                const half = [end[0] + Math.cos(angle) * far * 0.5 + Math.sin(angle) * 2, end[1] + Math.sin(angle) * far * 0.5]
                group.appendChild(
                    draw("path", {
                        d: "M" + end.map((n) => n.toFixed(1)).join(" ") + " Q" + half.map((n) => n.toFixed(1)).join(" ") + " " + tip.map((n) => n.toFixed(1)).join(" "),
                        "stroke-width": 0.6,
                        opacity: 0.8,
                    }),
                )
            }
        }

        if (still) return
        const beat = seeded(3)
        const signals = Math.round(2 + 9 * s)
        for (let j = 0; j < signals && kept.length; j++) {
            const route = kept[Math.floor(beat() * kept.length)]
            chart.appendChild(
                draw("path", {
                    d: route,
                    class: "soma__signal",
                    pathLength: 100,
                    filter: "url(#" + id + "glow)",
                    style: "--beat: " + (2.2 + beat() * 1.8).toFixed(2) + "s; --phase: " + (-beat() * 4).toFixed(2) + "s",
                }),
            )
        }
    }

    // Bodily clarity: the slice of brain, and a glow over each insula as
    // large and as bright as it goes. The slice is transparent round the
    // brain, and given a cool cast rather than any darkening.
    function brain(chart, defs, id, c) {
        const cool = defs.appendChild(draw("filter", { id: id + "cool", "color-interpolation-filters": "sRGB" }))
        cool.appendChild(draw("feColorMatrix", { values: "0.94 0 0 0 0  0 1 0 0 0  0 0 1.08 0 0  0 0 0 1 0" }))
        chart.appendChild(
            draw("image", { class: "soma__brain", href: BRAIN, x: BX, y: BY, width: BW, height: BH, preserveAspectRatio: "none", filter: "url(#" + id + "cool)" }),
        )

        const hot = defs.appendChild(draw("radialGradient", { id: id + "hot" }))
        for (const [offset, colour, opacity] of [
            [0, "#fffbe8", 1],
            [0.25, "#ffd66b", 0.95],
            [0.6, "#ff8a2a", 0.55],
            [1, "#ff7a1a", 0],
        ]) {
            hot.appendChild(draw("stop", { offset: offset, "stop-color": colour, "stop-opacity": opacity }))
        }
        const radius = 7 + 40 * c
        for (const share of INSULA) {
            const [x, y] = onBrain(share)
            const lit = chart.appendChild(draw("g", { opacity: (0.35 + 0.65 * c).toFixed(2) }))
            lit.appendChild(draw("ellipse", { class: "soma__glow", cx: x, cy: y, rx: radius * 0.72, ry: radius, fill: "url(#" + id + "hot)" }))
        }
    }

    // Where each reading's lead starts, on the drawing.
    const ANCHORS = {
        "Bodily Clarity": [onBrain(INSULA[1])[0] + 14, onBrain(INSULA[1])[1]],
        "Bodily Sensitivity": [STEM_AT[0] + 16, STEM_AT[1] + 44],
        "Bodily Awareness": [284, 440],
    }

    // The people the standing is read against, as columns: how many of them
    // score in each half point of the scale (`distribution` on the norm,
    // printed by data/norms/norms_mint.R), with everybody below the person
    // shaded in the reading's colours and the rest left dim — so the shaded
    // part of the crowd is the share the words above it give, the column the
    // person is in shaded as far as they reach into it. The person is a gold
    // line; the average is left off, the crowd's own shape saying where most
    // people are. A norm with no distribution is drawn
    // as one column the width of the scale, which is a bar.
    function crowd(one, value, norm) {
        const question = shared.dimensions[one.dimension][0]
        const spread = (norm && norm.distribution) || { from: question.lowest, step: question.highest - question.lowest, shares: [1] }
        const span = spread.step * spread.shares.length
        const shareOf = (score) => Math.min(1, Math.max(0, (score - spread.from) / span))
        const tallest = Math.max.apply(null, spread.shares)

        const chart = document.createElement("span")
        chart.className = "soma__crowd"
        chart.tabIndex = 0
        chart.setAttribute("aria-label", one.what)
        spread.shares.forEach((share, at) => {
            const column = chart.appendChild(document.createElement("span"))
            column.className = "soma__column"
            column.style.setProperty("--tall", (share / tallest) * 100 + "%")
            column.style.setProperty("--beat", at * 35 + "ms")
            const lower = spread.from + at * spread.step
            const inside = Math.min(1, Math.max(0, (value - lower) / spread.step))
            if (inside > 0) {
                const shade = column.appendChild(document.createElement("i"))
                shade.style.width = inside * 100 + "%"
                shade.style.background = along(one.colours, (at + 0.5) / spread.shares.length)
            }
        })
        const you = chart.appendChild(document.createElement("b"))
        you.className = "soma__you"
        you.style.left = shareOf(value) * 100 + "%"
        you.appendChild(document.createElement("span")).textContent = "You"
        return chart
    }

    function reading(one) {
        const dimension = one.dimension
        const box = document.createElement("div")
        box.className = "soma__reading soma__reading--" + one.kind
        box.dataset.dimension = dimension

        const name = box.appendChild(document.createElement("b"))
        name.className = "soma__name"
        name.textContent = dimension

        const value = score(dimension)
        if (value === undefined) {
            const waiting = box.appendChild(document.createElement("p"))
            waiting.className = "soma__standing"
            waiting.textContent = "Not yet answered"
            return box
        }

        const standing = comparison(dimension)
        const norm = normOf(dimension)
        const said = box.appendChild(document.createElement("p"))
        said.className = "soma__standing"
        if (standing) {
            said.append(standing.direction.charAt(0).toUpperCase() + standing.direction.slice(1) + " than ")
            said.appendChild(document.createElement("strong")).textContent = standing.share + "%"
            said.append(" of people")
        }

        const chart = box.appendChild(crowd(one, value, norm))
        const tip = () => showTip(chart, one.what)
        chart.addEventListener("mouseenter", tip)
        chart.addEventListener("focus", tip)
        chart.addEventListener("mouseleave", hideTip)
        chart.addEventListener("blur", hideTip)

        const told = norm && norm.interpretations && norm.interpretations[tercile(standing ? standing.proportion : 0.5)]
        if (told) {
            const words = box.appendChild(document.createElement("p"))
            words.className = "soma__told"
            words.textContent = sentence(told)
        }
        box.appendChild(voteButtons(dimension))
        return box
    }

    // The leads are measured off the page once both columns are laid out, from
    // layout offsets rather than from the screen, since a panel still growing
    // out of its badge is scaled and the screen would be the scaled size. A
    // stage that is resized — a window narrowed, a panel opening — is
    // measured again.
    function lead(stage, holder, lines) {
        const width = stage.offsetWidth
        const height = stage.offsetHeight
        if (!width || !holder.offsetWidth) return
        lines.setAttribute("viewBox", "0 0 " + width + " " + height)
        lines.innerHTML = ""
        const k = holder.offsetWidth / W
        for (const box of stage.querySelectorAll(".soma__reading")) {
            const [ax, ay] = ANCHORS[box.dataset.dimension]
            const from = [holder.offsetLeft + ax * k, holder.offsetTop + ay * k]
            // The column is not positioned, so a reading's offsets are the stage's.
            const to = [box.offsetLeft, box.offsetTop + 20]
            const middle = (from[0] + to[0]) / 2
            lines.appendChild(
                draw("path", {
                    class: "soma__lead",
                    d: "M" + from.join(" ") + " C" + middle + " " + from[1] + " " + middle + " " + to[1] + " " + to.join(" "),
                }),
            )
            lines.appendChild(draw("circle", { class: "soma__knot", cx: from[0], cy: from[1], r: 2.6 }))
        }
    }

    // The section: the drawing, and beside it the three readings — or, while
    // the level is locked, the drawing alone, from stand-ins and blurred.
    function renderSoma(locked) {
        const stage = document.createElement("div")
        stage.className = "soma__stage" + (locked ? " soma__stage--locked" : "")

        const chart = figureHolder(
            locked
                ? "Blurred preview of your body from the inside, still locked"
                : "A slice of a brain glowing over the insula, nerves running from its brainstem into the lungs, heart, stomach and gut, and the organs themselves in colour",
            "soma__figure",
            locked,
        )
        drawSoma(chart.figure, locked)
        stage.appendChild(chart.holder)
        if (locked) return stage

        const column = stage.appendChild(document.createElement("div"))
        column.className = "soma__readings"
        for (const one of READINGS) column.appendChild(reading(one))

        const lines = stage.appendChild(draw("svg", { class: "soma__leads", "aria-hidden": "true" }))
        if (window.ResizeObserver) new ResizeObserver(() => lead(stage, chart.holder, lines)).observe(stage)
        return stage
    }

    return { SOMA: SOMA, BADGE: BADGE, drawSoma: drawSoma, renderSoma: renderSoma }
}
