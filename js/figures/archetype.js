/* =========================================================================
   The AI archetype, drawn as a robot. What somebody makes of AI is drawn as
   the machine they picture, on two axes, so the same robot is bent by two
   numbers and never jumps:

     Human-likeness   AI Realism. A riveted tin head with an antenna and
                      screens for eyes at one end, a smooth face with whites
                      to its eyes at the other — always with one seam left
                      showing, since it is still a machine.
     Menace           the two attitudes as one axis: the mean of the AI
                      Apprehension and AI Enthusiasm z scores, the second
                      turned over. At the friendly end teal eyes, a smile, a
                      tilt of the head, a wave and a few sparks; at the
                      menacing end red eyes narrowed under a lowered brow,
                      the head dropped and looming, teeth, cracks.

   The attitudes are one axis on screen and two dimensions everywhere else.
   They correlate at about -0.5, so most people sit along that line anyway,
   and a robot that could be warm and menacing at once read as a
   contradiction. The validation scored them as two facets for good reason —
   they behave differently against the tasks — and the saved file, the norms
   and the analysis keep them apart; only the picture joins them.

   Each axis is the person's standing: Realism against its norm in
   `content/block_bait.js`, Menace against its own SD (`ATTITUDE_SD`), since
   the mean of two correlated z scores is narrower than either. Both are out
   of `data/norms/norms_bait.R`, so the robot of somebody at the average of
   both is a neutral one.

   The profile is the quadrant: which side of the average each axis falls
   on, four corners of the same plane, each drawn small as a robot of its
   own. A person's robot is therefore always a milder version of the corner
   robot marked as theirs, which a nearest-centroid profile could not
   promise. The shares are what the pooled samples give, printed by the same
   script. The profile is a region and not a type — the validation found the
   answers one continuous cloud — which is why the robot above it is drawn
   from where the person actually is rather than from the corner.

   Under that, "you and the crowd": the two statements on which the person's
   answer was the least common and the one on which it was the most, each set
   against the spread of answers in the pooled samples (`CROWD`, printed by
   the same script).
   ========================================================================= */

function makeArchetype(shared) {
    "use strict"

    const score = shared.score
    const answer = shared.answer
    const known = shared.known
    const normOf = shared.normOf
    const percentile = shared.percentile
    const teaseReach = shared.teaseReach
    const sentence = shared.sentence
    const voteButtons = shared.voteButtons
    const figureHolder = shared.figureHolder
    const showTip = shared.showTip
    const hideTip = shared.hideTip

    const ARCHETYPE_OF = "bait"
    const ARCHETYPE_KEY = "AIArchetype"
    const ARCHETYPE_ON = ["AI Realism", "AI Enthusiasm", "AI Apprehension"]

    // The SD of the Menace axis — the mean of the Apprehension z score and
    // the Enthusiasm z score turned over — in the pooled samples, out of
    // `data/norms/norms_bait.R`.
    const ATTITUDE_SD = 0.88

    // The four corners of the plane, in the order the grid lays them out:
    // friendly along the top, machine-like down the left. Each is named for
    // the robot drawn in it rather than for the person — "The AI you picture
    // is…" — so that the name and the picture say one thing; the reading is
    // what picturing it says about you.
    const ARCHETYPES = [
        {
            name: "The Trusty Gadget",
            human: false,
            menacing: false,
            share: 21,
            reading:
                "you see AI as a clever tool rather than a rival. You expect its seams to show, and it does not keep you up at " +
                "night: to you it is useful, a little exciting and nothing to be afraid of.",
        },
        {
            name: "The Companion",
            human: true,
            menacing: false,
            share: 30,
            reading:
                "you think AI can already make things that pass for real, and you are glad of it. What it can do impresses you " +
                "more than it worries you, and you would rather see where it goes than slow it down.",
        },
        {
            name: "The Rogue Machine",
            human: false,
            menacing: true,
            share: 30,
            reading:
                "you doubt AI can really do what it is said to, and what it does do worries you more than it excites you. To you " +
                "it is a clumsy machine, and a dangerous one.",
        },
        {
            name: "The Impostor",
            human: true,
            menacing: true,
            share: 20,
            reading:
                "you think AI can already make things that pass for real, and that is exactly what unsettles you. What worries " +
                "you is not that it fails but that it passes.",
        },
    ]

    // The share of people on each of the seven circles, 0 on the left, for
    // every statement the level asks — out of `data/norms/norms_bait.R`,
    // which prints this block to paste over it. `n` is how many people
    // answered the statement there: the core twelve were asked in all five
    // studies, the rest in one or two.
    const CROWD = {
        BAIT_ImagesRealistic: { n: 1202, shares: [1, 1, 4, 10, 24, 33, 26] },
        BAIT_ImagesIssues: { n: 1202, shares: [7, 10, 20, 22, 21, 15, 5] },
        BAIT_VideosIssues: { n: 1202, shares: [2, 8, 14, 20, 29, 18, 9] },
        BAIT_VideosRealistic: { n: 1202, shares: [2, 3, 8, 14, 29, 25, 18] },
        BAIT_ImitatingReality: { n: 1202, shares: [5, 7, 13, 17, 27, 20, 10] },
        BAIT_EnvironmentReal: { n: 1202, shares: [2, 4, 11, 18, 30, 23, 12] },
        BAIT_TextRealistic: { n: 1202, shares: [5, 7, 17, 21, 24, 16, 10] },
        BAIT_TextIssues: { n: 1202, shares: [2, 4, 8, 17, 29, 25, 16] },
        BAIT_Dangerous: { n: 1202, shares: [5, 7, 9, 16, 20, 21, 22] },
        BAIT_Worry: { n: 1202, shares: [4, 6, 6, 10, 18, 22, 33] },
        BAIT_Exciting: { n: 1202, shares: [5, 7, 9, 17, 23, 19, 20] },
        BAIT_Benefit: { n: 1202, shares: [8, 9, 14, 23, 22, 13, 10] },
        BAIT_ImageDistinctionEasy: { n: 261, shares: [11, 11, 21, 26, 20, 8, 2] },
        BAIT_ImageDistinctionBad: { n: 261, shares: [3, 11, 17, 25, 20, 12, 11] },
        BAIT_TextDifferentiation: { n: 261, shares: [6, 7, 15, 21, 25, 16, 10] },
        BAIT_ContentDetection: { n: 261, shares: [7, 7, 15, 22, 26, 15, 7] },
        BAIT_UniqueHuman: { n: 261, shares: [1, 2, 7, 14, 22, 25, 29] },
        BAIT_ArtAIBest: { n: 645, shares: [24, 10, 14, 14, 14, 16, 8] },
        BAIT_ImpersonalAI: { n: 261, shares: [3, 6, 11, 20, 23, 18, 19] },
        BAIT_InterestingAI: { n: 261, shares: [15, 11, 18, 26, 15, 9, 5] },
        BAIT_ArtHumanBest: { n: 906, shares: [3, 2, 5, 16, 17, 21, 36] },
        BAIT_PreferenceHuman: { n: 261, shares: [2, 2, 6, 17, 15, 23, 34] },
        BAIT_TrustHuman: { n: 261, shares: [3, 3, 6, 17, 18, 24, 28] },
    }
    const MIDDLE = 3 // the circle that is neither agreeing nor disagreeing

    // The robot's two axes, each lit in a colour of the legend's own, with
    // the words at either end of its line. `what` is said on hovering it.
    const AXES = [
        {
            key: "real",
            name: "Human-likeness",
            colour: "#e8c7a8",
            ends: ["Machine", "Human"],
            what: "How real you believe AI's work can look. The more convincing you think it is, the more human the robot.",
        },
        {
            key: "menace",
            name: "Menace",
            colour: "#fb7185",
            ends: ["Friendly", "Menacing"],
            what:
                "How much AI worries you, against how much it excites you. The more it worries you, the redder its eyes and the " +
                "sharper its teeth; the more it excites you, the brighter its smile.",
        },
    ]

    // Where the robot's corners are drawn: far enough along both axes to be
    // plainly each thing, and short of the very end.
    const CORNER = 0.12

    /* ------------------------------ reading ------------------------------ */

    // Whether all three dimensions are there to be read: unfinished, absent
    // from the run, or without the norm a standing needs, and there is no
    // robot to draw.
    function ready() {
        return ARCHETYPE_ON.every((dimension) => {
            const norm = known(dimension) && normOf(dimension)
            return norm && norm.sd && score(dimension) !== undefined
        })
    }

    function zOf(dimension) {
        const norm = normOf(dimension)
        return (score(dimension) - norm.mean) / norm.sd
    }

    // The person's place on the two axes, each a standing from 0 to 1;
    // locked, a stand-in hashed from the names.
    function placeOf(locked) {
        if (locked) return { real: teaseReach("AI Realism", 0, 1), menace: teaseReach("AI Apprehension", 0, 1) }
        const menace = (zOf("AI Apprehension") - zOf("AI Enthusiasm")) / 2
        return {
            real: percentile(score("AI Realism"), normOf("AI Realism")),
            menace: percentile(menace, { mean: 0, sd: ATTITUDE_SD }),
        }
    }

    // What the drawing is handed: warmth and menace as the two ends of the
    // one axis, so that one only ever grows as the other goes.
    function robotOf(place) {
        return { real: place.real, warm: 1 - place.menace, fear: place.menace }
    }

    function cornerOf(type) {
        return { real: type.human ? 1 - CORNER : CORNER, menace: type.menacing ? 1 - CORNER : CORNER }
    }

    // The corner the person is in, or null while any dimension is
    // unfinished, absent from the run, or without the norm it needs.
    function aiArchetype() {
        if (!ready()) return null
        const place = placeOf(false)
        return ARCHETYPES.find((type) => type.human === place.real >= 0.5 && type.menacing === place.menace >= 0.5)
    }

    /* ------------------------------ drawing ------------------------------ */

    const W = 400
    const H = 380
    const CX = 200 // the middle of the head
    const CY = 150

    const METAL = ["#b5c0cf", "#6b788a"] // the tin head, lit and in shadow
    const SKIN = ["#f0d4bd", "#c99c80"]
    const CLOTH = "#28324a"
    const SCREEN = "#0a0f1a"
    const SCLERA = "#f4efe6"
    const NEUTRAL = "#9cc3f5" // the eyes of a robot nobody feels much about
    const FRIEND = "#5eead4"
    const MENACE = "#f43f5e"

    const lerp = (from, to, t) => from + (to - from) * t
    const clamp = (t) => Math.min(1, Math.max(0, t))
    // 0 below `from`, 1 above `to` and a smooth rise between, for the things
    // that only arrive towards the end of a channel.
    const ramp = (from, to, t) => {
        const x = clamp((t - from) / (to - from))
        return x * x * (3 - 2 * x)
    }

    // Every gradient, clip and filter is addressed by an id off a counter,
    // since four robots share a page and a repeated id would have the second
    // painted with the first one's face.
    let drawn = 0

    function eyeColour(face) {
        return face.fear > face.warm
            ? mix(NEUTRAL, MENACE, clamp((face.fear - face.warm) * 1.6))
            : mix(NEUTRAL, FRIEND, clamp((face.warm - face.fear) * 1.6))
    }

    // A point `t` of the way along a quadratic curve, for putting teeth on the
    // edge of a mouth that is one.
    const along = (a, c, b, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b

    function drawRobot(svg, face, options) {
        const plain = options && options.plain // a badge: no backdrop, no motion
        const id = "robot" + ++drawn
        const real = face.real
        const warm = face.warm
        const fear = face.fear
        const glowing = eyeColour(face)
        // The rivets, bolts, rings and lights of a tin head go sooner than the
        // head's shape does, so the human end is a face and not a face with a
        // robot showing through it.
        const machine = clamp(1 - real * 1.5)

        svg.setAttribute("viewBox", "0 0 " + W + " " + H)
        svg.classList.add("robot")

        const defs = draw("defs", {})
        svg.appendChild(defs)
        const gradient = (name, stops, attributes) => {
            const one = draw(name, Object.assign({ id: id + "-" + (defs.childNodes.length + 1) }, attributes || {}))
            for (const [offset, colour, opacity] of stops) {
                one.appendChild(draw("stop", { offset: offset, "stop-color": colour, "stop-opacity": opacity === undefined ? 1 : opacity }))
            }
            defs.appendChild(one)
            return "url(#" + one.id + ")"
        }

        const glow = draw("filter", { id: id + "-glow", x: "-80%", y: "-80%", width: "260%", height: "260%" })
        glow.appendChild(draw("feGaussianBlur", { stdDeviation: 5, result: "blur" }))
        const merge = draw("feMerge", {})
        merge.appendChild(draw("feMergeNode", { in: "blur" }))
        merge.appendChild(draw("feMergeNode", { in: "SourceGraphic" }))
        glow.appendChild(merge)
        defs.appendChild(glow)

        // The backdrop: dark, with a halo behind the head in the colour of
        // its eyes, stronger the more the person feels either way.
        if (!plain) {
            svg.appendChild(draw("rect", { x: 0, y: 0, width: W, height: H, rx: 14, fill: "#0b1322" }))
            const halo = gradient("radialGradient", [
                ["0%", glowing, 0.55],
                ["60%", glowing, 0.12],
                ["100%", glowing, 0],
            ])
            svg.appendChild(draw("circle", { cx: CX, cy: CY + 10, r: 190, fill: halo, opacity: 0.35 + 0.5 * Math.max(warm, fear) }))
        }

        const shell = mix(METAL[0], SKIN[0], real)
        const shade = mix(METAL[1], SKIN[1], real)
        const body = mix(METAL[1], CLOTH, real)

        // The sparks round a warm robot, drawn behind it so the head is
        // never crossed by one.
        const SPARKS = [
            [86, 70, 1],
            [318, 58, 0.8],
            [58, 170, 0.7],
            [342, 150, 0.9],
            [104, 262, 0.6],
        ]
        const sparks = Math.round(ramp(0.5, 0.95, warm) * SPARKS.length)
        SPARKS.slice(0, sparks).forEach(([x, y, size], i) => {
            const s = 9 * size
            const spark = draw("path", {
                d: `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`,
                fill: FRIEND,
                class: plain ? "" : "robot__spark",
            })
            spark.style.setProperty("--beat", i * 0.45 + "s")
            svg.appendChild(spark)
        })

        // The body: shoulders, the neck, and a light on the chest while it is
        // a machine, a collar once it is dressed as a person.
        svg.appendChild(
            draw("path", {
                d: "M52 380C58 330 84 304 132 296L268 296C316 304 342 330 348 380Z",
                fill: body,
            }),
        )
        const neckTop = 222
        svg.appendChild(draw("rect", { x: CX - 22, y: neckTop, width: 44, height: 82, fill: shade }))
        for (let ring = 0; ring < 4; ring++) {
            svg.appendChild(
                draw("line", {
                    x1: CX - 22, x2: CX + 22, y1: neckTop + 30 + ring * 12, y2: neckTop + 30 + ring * 12,
                    stroke: "#3c4656", "stroke-width": 3, opacity: machine,
                }),
            )
        }
        svg.appendChild(draw("path", { d: `M${CX - 34} 296L${CX} 336L${CX + 34} 296Z`, fill: shade, opacity: real }))
        svg.appendChild(draw("circle", { cx: CX, cy: 344, r: 13, fill: "#101826", stroke: "#8793a4", "stroke-width": 3, opacity: machine }))
        svg.appendChild(
            draw("circle", { cx: CX, cy: 344, r: 7, fill: glowing, opacity: machine * 0.95, filter: "url(#" + glow.id + ")" }),
        )

        // The wave: an arm raised at the robot's side, once it is warm.
        const waving = ramp(0.55, 0.9, warm)
        if (waving > 0) {
            const arm = draw("g", { opacity: waving, class: plain ? "" : "robot__wave" })
            arm.appendChild(draw("path", { d: "M300 318C330 300 342 262 344 232", fill: "none", stroke: body, "stroke-width": 22, "stroke-linecap": "round" }))
            arm.appendChild(draw("circle", { cx: 345, cy: 222, r: 17, fill: shell }))
            for (const [dx, dy] of [[-10, -16], [0, -20], [10, -16]]) {
                arm.appendChild(draw("line", { x1: 345 + dx * 0.4, y1: 214, x2: 345 + dx, y2: 222 + dy, stroke: shell, "stroke-width": 8, "stroke-linecap": "round" }))
            }
            for (const r of [30, 42]) {
                arm.appendChild(
                    draw("path", {
                        d: `M${345 + r * 0.7} ${222 - r * 0.7}A${r} ${r} 0 0 1 ${345 + r} ${222}`,
                        fill: "none", stroke: FRIEND, "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0.7,
                    }),
                )
            }
            svg.appendChild(arm)
        }

        // The head, which carries nearly all of it. Warmth tilts it; menace
        // drops it and brings it closer.
        const tilt = warm * 7 - fear * 2
        const dip = fear * 10
        const loom = 1 + fear * 0.07
        const head = draw("g", {
            transform: `translate(0 ${dip}) rotate(${tilt} ${CX} ${CY + 40}) translate(${CX} ${CY}) scale(${loom}) translate(${-CX} ${-CY})`,
        })
        svg.appendChild(head)

        const w = lerp(172, 134, real)
        const h = lerp(142, 170, real)
        const top = CY - h / 2
        const left = CX - w / 2
        const rx = lerp(10, w / 2, real)
        const ry = lerp(10, h / 2 - 4, real)

        // Ears: bolts on the tin head, ears on the human one.
        for (const side of [-1, 1]) {
            const x = CX + side * (w / 2 + 6)
            head.appendChild(draw("ellipse", { cx: CX + side * (w / 2 - 2), cy: CY + 4, rx: 11, ry: 20, fill: shade, opacity: real }))
            const bolt = draw("g", { opacity: machine })
            bolt.appendChild(draw("rect", { x: x - 10, y: CY - 18, width: 20, height: 36, rx: 5, fill: METAL[1] }))
            bolt.appendChild(draw("circle", { cx: x, cy: CY, r: 7, fill: METAL[0] }))
            bolt.appendChild(draw("line", { x1: x - 4, y1: CY - 4, x2: x + 4, y2: CY + 4, stroke: METAL[1], "stroke-width": 2 }))
            head.appendChild(bolt)
        }

        // The antenna, which goes as the robot becomes a face.
        const antenna = draw("g", { opacity: machine })
        antenna.appendChild(draw("line", { x1: CX, y1: top + 2, x2: CX, y2: top - 36, stroke: METAL[1], "stroke-width": 5 }))
        antenna.appendChild(
            draw("circle", {
                cx: CX, cy: top - 40, r: 8, fill: glowing,
                filter: "url(#" + glow.id + ")", class: plain ? "" : "robot__beacon",
            }),
        )
        head.appendChild(antenna)

        const plate = gradient(
            "linearGradient",
            [
                ["0%", shell],
                ["100%", shade],
            ],
            { x1: 0, y1: 0, x2: 0, y2: 1 },
        )
        const outline = { x: left, y: top, width: w, height: h, rx: rx, ry: ry }
        head.appendChild(draw("rect", Object.assign({ fill: plate }, outline)))

        // A shadow cast down over the brow, which is the whole of looking
        // menacing from below.
        const brood = gradient(
            "linearGradient",
            [
                ["0%", "#05070d", 0.75],
                ["55%", "#05070d", 0],
            ],
            { x1: 0, y1: 0, x2: 0, y2: 1 },
        )
        head.appendChild(draw("rect", Object.assign({ fill: brood, opacity: fear * 0.85 }, outline)))

        // The seams of a tin head, and the one seam a human face keeps.
        head.appendChild(
            draw("line", { x1: left + 8, x2: left + w - 8, y1: top + 26, y2: top + 26, stroke: METAL[1], "stroke-width": 2.5, opacity: machine * 0.9 }),
        )
        for (const [x, y] of [[left + 13, top + 13], [left + w - 13, top + 13], [left + 13, top + h - 13], [left + w - 13, top + h - 13]]) {
            head.appendChild(draw("circle", { cx: x, cy: y, r: 3.5, fill: METAL[1], opacity: machine }))
        }
        head.appendChild(
            draw("path", {
                d: `M${CX + w * 0.36} ${CY - h * 0.3}C${CX + w * 0.44} ${CY - h * 0.05} ${CX + w * 0.42} ${CY + h * 0.2} ${CX + w * 0.26} ${CY + h * 0.4}`,
                fill: "none", stroke: SKIN[1], "stroke-width": 1.6, "stroke-dasharray": "5 3", opacity: real * 0.9,
            }),
        )

        // Cracks, on a robot that alarms.
        const cracked = ramp(0.6, 0.95, fear)
        if (cracked > 0) {
            head.appendChild(
                draw("path", {
                    d: `M${left + 20} ${top + 6}l12 20l-8 10l14 16l-4 12M${left + 32} ${top + 26}l14 -4`,
                    fill: "none", stroke: "#1a1015", "stroke-width": 2, "stroke-linejoin": "round", opacity: cracked,
                }),
            )
        }

        // The eyes: a screen with a light in it, becoming a white with an
        // iris; rounder with warmth, narrowed to a slit with menace.
        const eyeX = lerp(40, 29, real)
        const eyeY = CY - lerp(12, 14, real)
        const eyeW = lerp(40, 32, real)
        const eyeH = lerp(30, 16, real) * (1 - 0.45 * fear) * (1 + 0.12 * warm)
        const iris = lerp(Math.min(eyeW, eyeH) / 2 - 3, eyeH * 0.48, real)
        for (const side of [-1, 1]) {
            const x = CX + side * eyeX
            const eye = draw("g", { class: plain ? "" : "robot__eye" })
            const clip = draw("clipPath", { id: id + "-eye" + side })
            const socket = { x: x - eyeW / 2, y: eyeY - eyeH / 2, width: eyeW, height: eyeH, rx: lerp(6, eyeW / 2, real), ry: lerp(6, eyeH / 2, real) }
            clip.appendChild(draw("rect", socket))
            defs.appendChild(clip)
            eye.appendChild(draw("rect", Object.assign({ fill: mix(SCREEN, SCLERA, real) }, socket)))
            const inside = draw("g", { "clip-path": "url(#" + clip.id + ")" })
            inside.appendChild(draw("circle", { cx: x, cy: eyeY, r: iris, fill: glowing, filter: real < 0.5 ? "url(#" + glow.id + ")" : "" }))
            inside.appendChild(draw("circle", { cx: x, cy: eyeY, r: iris * 0.45, fill: "#0b0b10", opacity: real }))
            inside.appendChild(draw("circle", { cx: x + iris * 0.35, cy: eyeY - iris * 0.4, r: Math.max(1.4, iris * 0.22), fill: "#fff", opacity: 0.85 }))
            eye.appendChild(inside)
            eye.appendChild(
                draw("path", {
                    d: `M${socket.x} ${eyeY}Q${x} ${eyeY - eyeH} ${socket.x + eyeW} ${eyeY}`,
                    fill: "none", stroke: SKIN[1], "stroke-width": 2, opacity: real * 0.8,
                }),
            )
            head.appendChild(eye)

            // The brow over it: raised with warmth, brought down at the inner
            // end with menace.
            const browY = eyeY - eyeH / 2 - lerp(13, 10, real) - warm * 5 + fear * 4
            const angle = side * (warm * 7 - fear * 26)
            const half = lerp(19, 16, real)
            head.appendChild(
                draw("line", {
                    x1: x - half, x2: x + half, y1: browY, y2: browY,
                    stroke: mix("#2c3444", "#4a3224", real), "stroke-width": lerp(7, 4.5, real), "stroke-linecap": "round",
                    transform: `rotate(${angle} ${x} ${browY})`,
                }),
            )
        }

        // A nose, once it is a face, and a warm robot's cheeks.
        head.appendChild(
            draw("path", {
                d: `M${CX + 2} ${CY - 2}Q${CX + 8} ${CY + 18} ${CX - 3} ${CY + 22}`,
                fill: "none", stroke: SKIN[1], "stroke-width": 2.4, "stroke-linecap": "round", opacity: real * 0.8,
            }),
        )
        for (const side of [-1, 1]) {
            head.appendChild(draw("ellipse", { cx: CX + side * (eyeX + 8), cy: CY + 20, rx: 12, ry: 7, fill: "#fb7185", opacity: warm * 0.45 }))
        }

        // The mouth: a speaker grille or a pair of lips, curved up with
        // warmth and down with menace, and open with either — which is a grin
        // one way and a snarl the other.
        const mouthY = CY + lerp(34, 44, real)
        const mouthW = lerp(62, 48, real) * (1 + 0.22 * warm)
        const curve = (warm - fear) * 16
        const open = lerp(9, 3, real) + warm * 6 + fear * 10
        const ends = mouthY - curve * 0.3
        const a = CX - mouthW / 2
        const b = CX + mouthW / 2
        const shape = `M${a} ${ends}Q${CX} ${mouthY + curve} ${b} ${ends}Q${CX} ${mouthY + curve + open * 2} ${a} ${ends}Z`
        const mouthClip = draw("clipPath", { id: id + "-mouth" })
        mouthClip.appendChild(draw("path", { d: shape }))
        defs.appendChild(mouthClip)
        head.appendChild(draw("path", { d: shape, fill: "#1a0d13", stroke: mix("#3a4454", "#b3666a", real), "stroke-width": lerp(2, 3, real), "stroke-linejoin": "round" }))
        const inMouth = draw("g", { "clip-path": "url(#" + mouthClip.id + ")" })
        // The grille runs across rather than down, so that a warm robot's
        // grin is not read as a mouthful of teeth: those are menace's.
        for (let y = mouthY - 30; y < mouthY + 50; y += 5) {
            inMouth.appendChild(draw("line", { x1: a, x2: b, y1: y, y2: y, stroke: glowing, "stroke-width": 1.6, opacity: machine * 0.55 }))
        }
        const bite = ramp(0.45, 0.85, fear)
        if (bite > 0) {
            const teeth = 7
            for (let tooth = 0; tooth < teeth; tooth++) {
                const t0 = tooth / teeth
                const t1 = (tooth + 1) / teeth
                const tm = (t0 + t1) / 2
                const x0 = along(a, CX, b, t0)
                const x1 = along(a, CX, b, t1)
                const y0 = along(ends, mouthY + curve, ends, t0)
                const y1 = along(ends, mouthY + curve, ends, t1)
                const xm = along(a, CX, b, tm)
                const ym = along(ends, mouthY + curve, ends, tm)
                inMouth.appendChild(draw("path", { d: `M${x0} ${y0 - 2}L${x1} ${y1 - 2}L${xm} ${ym + 3 + 8 * fear}Z`, fill: "#ece6da", opacity: bite }))
            }
        }
        head.appendChild(inMouth)

        return svg
    }

    /* ------------------------------ the crowd ----------------------------- */

    // Every statement the person answered off the middle, with the share of
    // people on the same side of it.
    function crowded() {
        const items = QUESTIONNAIRES[ARCHETYPE_OF].items
        const said = []
        for (const key of Object.keys(CROWD)) {
            const value = answer(key)
            if (typeof value !== "number" || value === MIDDLE) continue
            const item = items.find((one) => one.key === key)
            if (!item) continue
            const shares = CROWD[key].shares
            const all = shares.reduce((sum, one) => sum + one, 0)
            const agreeing = value > MIDDLE
            const side = shares.reduce((sum, one, at) => sum + ((agreeing ? at > MIDDLE : at < MIDDLE) ? one : 0), 0)
            said.push({ key: key, item: item, value: value, agreeing: agreeing, share: Math.round((100 * side) / all) })
        }
        return said
    }

    // The two answers the fewest people gave and the one the most did, in
    // that order: two where somebody stands out and one where they do not,
    // so the cards are about the person rather than a list of their oddities.
    function picked() {
        const said = crowded().sort((one, other) => one.share - other.share)
        if (said.length < 3) return said.map((one) => Object.assign({ rare: one.share < 50 }, one))
        const most = said[said.length - 1]
        return said
            .slice(0, 2)
            .map((one) => Object.assign({ rare: one.share < 50 }, one))
            .concat([Object.assign({ rare: false }, most)])
    }

    function text(tag, className, words) {
        const element = document.createElement(tag)
        element.className = className
        element.textContent = words
        return element
    }

    function crowdCard(one) {
        const card = document.createElement("li")
        card.className = "crowd__card" + (one.rare ? " crowd__card--rare" : "")

        card.appendChild(text("p", "crowd__tag", one.rare ? "You stand out" : "With the crowd"))
        const words = document.createElement("div")
        words.innerHTML = one.item.text
        card.appendChild(text("p", "crowd__statement", "“" + words.textContent + "”"))

        // The seven circles as columns, each as tall as the share of people
        // who picked it, the person's own in gold.
        const shares = CROWD[one.key].shares
        const tallest = Math.max.apply(null, shares)
        const chart = document.createElement("div")
        chart.className = "crowd__chart"
        chart.setAttribute("aria-hidden", "true")
        shares.forEach((share, at) => {
            const column = document.createElement("span")
            column.className = "crowd__column" + (at === one.value ? " crowd__column--you" : "") + (at > MIDDLE ? " crowd__column--agree" : at < MIDDLE ? " crowd__column--disagree" : "")
            column.style.setProperty("--tall", (share / tallest) * 100 + "%")
            column.style.setProperty("--beat", at * 40 + "ms")
            if (at === one.value) column.appendChild(text("b", "crowd__you", "You"))
            chart.appendChild(column)
        })
        card.appendChild(chart)
        const ends = document.createElement("div")
        ends.className = "crowd__ends"
        ends.setAttribute("aria-hidden", "true")
        ends.appendChild(text("span", "", "Disagree"))
        ends.appendChild(text("span", "", "Agree"))
        card.appendChild(ends)

        const verb = one.agreeing ? "agree" : "disagree"
        const told =
            one.share < 50 ? "You " + verb + " — only " + one.share + "% of people do." : "You " + verb + ", like " + one.share + "% of people."
        card.appendChild(text("p", "crowd__told", told))
        card.setAttribute("aria-label", words.textContent + ". " + told)
        return card
    }

    function renderCrowd() {
        const cards = picked()
        if (!cards.length) return null
        const crowd = document.createElement("div")
        crowd.className = "crowd"
        crowd.appendChild(text("p", "robotview__aside", "You and the crowd"))
        const list = document.createElement("ul")
        list.className = "crowd__cards"
        for (const one of cards) list.appendChild(crowdCard(one))
        crowd.appendChild(list)
        return crowd
    }

    /* ------------------------------ the section --------------------------- */

    // Locked, the title and a stand-in robot, blurred like every teased
    // figure, and nothing else.
    function renderArchetype(type, locked) {
        const holder = document.createElement("div")
        holder.className = "robotview"

        const head = document.createElement("header")
        head.className = "robotview__head"
        head.appendChild(text("h3", "robotview__title", "This is how AI looks to you"))
        holder.appendChild(head)

        const place = placeOf(locked)
        const stage = figureHolder(
            locked ? "Blurred preview of the robot your answers will draw" : "A robot drawn from your answers: how human and how menacing AI seems to you",
            "result__chart--wide robotview__stage",
            locked,
        )
        drawRobot(stage.figure, robotOf(place))
        holder.appendChild(stage.holder)
        if (locked) return holder

        // The two axes the robot is drawn on, each a line between its two
        // words with the person marked on it: what each does to the robot is
        // said on hovering it.
        const keys = document.createElement("ul")
        keys.className = "robotview__keys"
        for (const axis of AXES) {
            const at = Math.round(place[axis.key] * 100)
            const key = document.createElement("li")
            key.className = "robotview__key"
            key.tabIndex = 0
            key.style.setProperty("--key", axis.colour)
            key.innerHTML =
                '<b></b><span class="robotview__track" aria-hidden="true"><i></i></span>' +
                '<span class="robotview__ends" aria-hidden="true"><span></span><span></span></span>'
            key.firstChild.textContent = axis.name
            key.querySelector("i").style.left = at + "%"
            key.querySelector(".robotview__ends").firstChild.textContent = axis.ends[0]
            key.querySelector(".robotview__ends").lastChild.textContent = axis.ends[1]
            key.setAttribute("aria-label", axis.name + ", from " + axis.ends[0].toLowerCase() + " to " + axis.ends[1].toLowerCase() + ". " + axis.what)
            key.addEventListener("mouseenter", () => showTip(key, axis.what))
            key.addEventListener("focus", () => showTip(key, axis.what))
            key.addEventListener("mouseleave", hideTip)
            key.addEventListener("blur", hideTip)
            keys.appendChild(key)
        }
        holder.appendChild(keys)

        const verdict = document.createElement("div")
        verdict.className = "robotview__verdict"
        verdict.appendChild(text("p", "archetype__lead", "The AI you picture is"))
        verdict.appendChild(text("p", "archetype__name", type.name))
        verdict.appendChild(text("p", "archetype__share", "About " + type.share + "% of people picture AI this way"))
        verdict.appendChild(text("p", "archetype__told", sentence(type.reading)))
        holder.appendChild(verdict)

        // The four corners of the plane as a grid of robots, with the two
        // axes written along its top and down its side, and the person's own
        // corner ringed.
        const others = document.createElement("div")
        others.className = "robotview__others"
        others.appendChild(text("p", "robotview__aside", "Other people picture other robots"))
        const grid = document.createElement("div")
        grid.className = "robotview__grid"
        grid.appendChild(document.createElement("span"))
        grid.appendChild(text("span", "robotview__axis", "Machine-like"))
        grid.appendChild(text("span", "robotview__axis", "Human-like"))
        ARCHETYPES.forEach((one, at) => {
            if (at % 2 === 0) grid.appendChild(text("span", "robotview__axis robotview__axis--side", one.menacing ? "Menacing" : "Friendly"))
            const yours = one === type
            const figure = document.createElement("figure")
            figure.className = "robotview__type" + (yours ? " robotview__type--you" : "")
            const small = document.createElementNS(SVG, "svg")
            small.setAttribute("role", "img")
            small.setAttribute(
                "aria-label",
                one.name + ": a " + (one.human ? "human-like" : "machine-like") + ", " + (one.menacing ? "menacing" : "friendly") + " robot",
            )
            drawRobot(small, robotOf(cornerOf(one)))
            figure.appendChild(small)
            const caption = document.createElement("figcaption")
            caption.appendChild(text("b", "", one.name))
            caption.appendChild(text("span", "", (yours ? "You · about " : "About ") + one.share + "% of people"))
            figure.appendChild(caption)
            grid.appendChild(figure)
        })
        others.appendChild(grid)
        holder.appendChild(others)

        const vote = document.createElement("div")
        vote.className = "robotview__vote"
        vote.appendChild(text("p", "robotview__ask", "Does this robot match how you see AI?"))
        vote.appendChild(voteButtons(ARCHETYPE_KEY))
        holder.appendChild(vote)

        const crowd = renderCrowd()
        if (crowd) holder.appendChild(crowd)

        return holder
    }

    // The shelf's badge: the person's own robot, cropped to the head.
    function badge() {
        const svg = document.createElementNS(SVG, "svg")
        drawRobot(svg, robotOf(placeOf(false)), { plain: true })
        svg.setAttribute("viewBox", "92 58 216 216")
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice")
        svg.setAttribute("aria-hidden", "true")
        return svg
    }

    return {
        ARCHETYPE_OF: ARCHETYPE_OF,
        ARCHETYPE_KEY: ARCHETYPE_KEY,
        ARCHETYPE_ON: ARCHETYPE_ON,
        aiArchetype: aiArchetype,
        renderArchetype: renderArchetype,
        badge: badge,
    }
}
