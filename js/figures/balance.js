/* =========================================================================
   The balance — what the Light & Dark level (the `dark` block) closes on: a
   pair of scales with the dark side in the left pan and the light side in
   the right, each drawn as the crowd it is read against, stood on end and
   filled from the foot as far as the person's own side reaches. The beam
   tips towards whichever side is the heavier.

   TWO STRENGTHS, NOT ONE AXIS. The frame the level is built on (the head of
   content/block_dark.js) is that a light side and a dark side vary
   separately, so each pan carries a standing of its own and the corner the
   stories are about, strong in both, is a real place: laden pans hanging
   level. The tilt is only the difference between the two, which is why the
   pans' fills carry the levels and the beam carries nothing else. A pan's
   weight is its standing against its own crowd, the one quantity the two
   sides share a scale on; the filled part of each crowd is that standing,
   near enough, since the outline is smoothed through the norm's bins.

   WHAT IS WEIGHED is not the figure's business: `SIDES` names the two
   dimensions, which are the deeds (the share of the wrongs done and the
   share of the good deeds done; content/block_dark.js). Changing them is
   changing the names in `SIDES` and the words said on hover, and nothing
   else here; the crowd is drawn from whatever norm the dimension carries, a
   `distribution` where it has one and otherwise a normal curve through its
   mean and SD.

   NOTHING ON IT SAYS WHICH DEEDS, the kinks' rule: two standings travel, a
   named act does not.
   ========================================================================= */

function makeBalance(shared) {
    "use strict"

    const score = shared.score
    const known = shared.known
    const normOf = shared.normOf
    const standFrom = shared.standFrom
    const teaseValue = shared.teaseValue
    const pickButtons = shared.pickButtons
    const showTip = shared.showTip
    const hideTip = shared.hideTip
    const VOTES = shared.VOTES

    const BALANCE_OF = "deeds"
    const BALANCE_KEY = "Sides" // the vote on the figure

    // Whose crowd it is: "people", the norms being placeholders, until the
    // app has a crowd of its own to name.
    const CROWD = "people"

    // The two pans, dark on the left and light on the right: the dimension
    // each weighs, its colours (`deep` at the foot of the fill, `colour` at
    // its top) and what the pan is said to hold on hover — which is the
    // connector's to say, and changes with it.
    const SIDES = [
        {
            dimension: "Dark Side",
            name: "Dark side",
            colour: "#e0574c",
            deep: "#5e1410",
            told: "What weighs in this pan: the wrongs you have done.",
        },
        {
            dimension: "Light Side",
            name: "Light side",
            colour: "#6cc8f0",
            deep: "#103c5e",
            told: "What weighs in this pan: the good you have done.",
        },
    ]

    // The figure in its own units. The badge crops against these.
    const WIDE = 640
    const HIGH = 402
    const PIVOT = [WIDE / 2, 66] // where the beam turns
    const ARM = 160 // from the pivot to either hanger, so the pans stand at a quarter and three quarters of the width
    const DROP = 206 // from a hanger down to its pan's rim
    const PAN = 92 // half the width of a pan
    const DISH = 13 // how deep a pan is under its rim
    const CROWD_HIGH = 132 // a crowd from its foot to its top
    const CROWD_HALF = 44 // half the width of a crowd at its widest, which may pass in front of the chains
    const FLOOR = 376 // where the post stands, clear of a pan at its lowest

    // How far the beam turns at one side wholly outweighing the other, and
    // the difference in standing either way of level that still hangs level:
    // a beam a degree off would say more than two standings that close can.
    const MOST = 18
    const LEVEL = 0.1

    // Gradients are found by id, and a page can hold several balances (the
    // level screen, its panel, a badge).
    let drawn = 0

    /* ------------------------------ the values ---------------------------- */

    function ready() {
        return SIDES.every((side) => known(side.dimension) && score(side.dimension) !== undefined)
    }

    // Whether the deeds were answered and too many of them declined to weigh.
    function declined() {
        return SIDES.some((side) => known(side.dimension) && shared.declined(side.dimension))
    }

    // Each side's value, and its weight — its standing against its crowd, or,
    // locked, the share along its scale the stand-in was hashed to, which
    // read against a norm would sit at one end or the other.
    function weighed(locked) {
        return SIDES.map((side) => {
            const value = locked ? teaseValue(side.dimension) : score(side.dimension)
            const norm = normOf(side.dimension)
            const stand = norm && !locked ? standFrom(value, norm) : null
            return { side: side, value: value, stand: stand, weight: stand ? stand.proportion : shared.reachOf(side.dimension, value) }
        })
    }

    // The beam's turn, in degrees clockwise: the right pan, the light side's,
    // goes down as it outweighs the left.
    function tiltOf(sides) {
        const difference = sides[1].weight - sides[0].weight
        if (Math.abs(difference) < LEVEL) return 0
        return Math.sign(difference) * MOST * Math.min(1, (Math.abs(difference) - LEVEL) / (1 - LEVEL))
    }

    // Where a hanger is once the beam has turned: the left one at -1, the
    // right at +1.
    function hangerAt(end, tilt) {
        const turn = (tilt * Math.PI) / 180
        return [PIVOT[0] + end * ARM * Math.cos(turn), PIVOT[1] + end * ARM * Math.sin(turn)]
    }

    // The middle of the heavier pan's crowd, for the badge: the side the
    // scales tip to, or the light one where they hang level.
    function youAt() {
        const sides = weighed(false)
        const tilt = tiltOf(sides)
        const end = tilt < 0 ? -1 : 1
        const hanger = hangerAt(end, tilt)
        return [hanger[0], hanger[1] + DROP - CROWD_HIGH / 2]
    }

    /* ------------------------------- the crowd ---------------------------- */

    // The crowd a dimension is read against, as points up its scale: the
    // middle of each of the norm's bins and the share in it, or, where the
    // norm is a mean and an SD alone, a normal curve through them sampled
    // along the scale. `from` and `to` are the ends of what is drawn.
    function crowdOf(dimension) {
        const question = shared.dimensions[dimension][0]
        const norm = normOf(dimension)
        const spread = norm && norm.distribution
        if (spread) {
            return {
                from: Math.min(question.lowest, spread.from),
                to: Math.max(question.highest, spread.from + spread.shares.length * spread.step),
                points: spread.shares.map((share, at) => ({ at: spread.from + (at + 0.5) * spread.step, share: share })),
            }
        }
        const points = []
        const STEPS = 24
        for (let i = 0; i <= STEPS; i++) {
            const at = question.lowest + (i / STEPS) * (question.highest - question.lowest)
            const z = norm ? (at - norm.mean) / norm.sd : 0
            points.push({ at: at, share: Math.exp((-z * z) / 2) })
        }
        return { from: question.lowest, to: question.highest, points: points }
    }

    // A smooth line through points, as a path: Catmull-Rom turned into
    // cubic Béziers.
    function smooth(points) {
        let path = "M" + points[0][0].toFixed(1) + " " + points[0][1].toFixed(1)
        for (let i = 0; i < points.length - 1; i++) {
            const before = points[Math.max(0, i - 1)]
            const from = points[i]
            const to = points[i + 1]
            const after = points[Math.min(points.length - 1, i + 2)]
            const one = [from[0] + (to[0] - before[0]) / 6, from[1] + (to[1] - before[1]) / 6]
            const two = [to[0] - (after[0] - from[0]) / 6, to[1] - (after[1] - from[1]) / 6]
            path += " C" + [one, two, to].map((point) => point[0].toFixed(1) + " " + point[1].toFixed(1)).join(" ")
        }
        return path
    }

    // The crowd stood on end over a foot at (x, foot): an outline drawn both
    // ways out of a spine, as wide at each height as the share of people
    // there, and closed to the spine half a step past the last height
    // anybody is at, either way. The spine itself is drawn the whole height
    // of the scale, so that a crowd piled at its foot still shows how far up
    // the scale goes. Hands back the outline, where a value on the scale
    // stands on it and how wide the crowd is there.
    function crowdShape(crowd, x, foot) {
        const points = crowd.points
        const widest = Math.max.apply(null, points.map((point) => point.share))
        const yOf = (value) => foot - ((value - crowd.from) / (crowd.to - crowd.from)) * CROWD_HIGH
        const halfOf = (point) => (point.share / widest) * CROWD_HALF

        const somebody = (point) => point.share > widest * 0.02
        const first = points.findIndex(somebody)
        let last = points.length - 1
        while (last > first && !somebody(points[last])) last--
        const below = first > 0 ? (points[first - 1].at + points[first].at) / 2 : crowd.from
        const above = last < points.length - 1 ? (points[last].at + points[last + 1].at) / 2 : crowd.to
        const right = [[x, yOf(below)]]
            .concat(points.slice(first, last + 1).map((point) => [x + halfOf(point), yOf(point.at)]))
            .concat([[x, yOf(above)]])
        const left = right.map((point) => [2 * x - point[0], point[1]]).reverse()
        const outline = smooth(right) + " " + smooth(left).replace(/^M/, "L") + " Z"

        // Between the two points either side of a value, as the outline is
        // near enough.
        const halfAt = (value) => {
            if (value <= points[0].at) return halfOf(points[0])
            for (let i = 1; i < points.length; i++) {
                if (value > points[i].at) continue
                const along = (value - points[i - 1].at) / (points[i].at - points[i - 1].at)
                return halfOf(points[i - 1]) + along * (halfOf(points[i]) - halfOf(points[i - 1]))
            }
            return halfOf(points[points.length - 1])
        }
        return { outline: outline, yOf: yOf, halfAt: halfAt }
    }

    /* ------------------------------- the scales --------------------------- */

    // A gradient across the brass of the post, the beam and the pans.
    function brass(defs, id, vertical) {
        const gradient = defs.appendChild(
            draw("linearGradient", { id: id, x1: "0", y1: "0", x2: vertical ? "0" : "1", y2: vertical ? "1" : "0" }),
        )
        gradient.appendChild(draw("stop", { offset: "0", "stop-color": "#7a5622" }))
        gradient.appendChild(draw("stop", { offset: "0.45", "stop-color": "#f1d89a" }))
        gradient.appendChild(draw("stop", { offset: "0.6", "stop-color": "#d9a441" }))
        gradient.appendChild(draw("stop", { offset: "1", "stop-color": "#6a4818" }))
        return "url(#" + id + ")"
    }

    // The post, standing on its plinth, with the arc the needle reads
    // against at its top. None of it moves.
    function drawPost(figure, metal) {
        const post = figure.appendChild(draw("g", { class: "balance__post" }))
        post.appendChild(draw("path", { d: "M" + (PIVOT[0] - 70) + " " + (FLOOR + 14) + " h140 l-14 -12 h-112 Z", fill: metal.across }))
        post.appendChild(draw("rect", { x: PIVOT[0] - 46, y: FLOOR - 8, width: 92, height: 8, rx: 2, fill: metal.across }))
        post.appendChild(draw("rect", { x: PIVOT[0] - 4.5, y: PIVOT[1] + 6, width: 9, height: FLOOR - PIVOT[1] - 14, rx: 2, fill: metal.across }))
        // The arc over the pivot, with a tick at level and either side.
        post.appendChild(
            draw("path", { class: "balance__arc", d: "M" + (PIVOT[0] - 26) + " " + (PIVOT[1] - 34) + " A44 44 0 0 1 " + (PIVOT[0] + 26) + " " + (PIVOT[1] - 34) }),
        )
        for (const turn of [-MOST, -MOST / 2, 0, MOST / 2, MOST]) {
            const angle = ((turn - 90) * Math.PI) / 180
            const [inner, outer] = turn === 0 ? [38, 49] : [41, 47]
            post.appendChild(
                draw("line", {
                    class: "balance__tick",
                    x1: PIVOT[0] + inner * Math.cos(angle),
                    y1: PIVOT[1] + inner * Math.sin(angle),
                    x2: PIVOT[0] + outer * Math.cos(angle),
                    y2: PIVOT[1] + outer * Math.sin(angle),
                }),
            )
        }
    }

    // The beam, with the needle standing up out of it, turned about the
    // pivot. The turn is a custom property the stylesheet reads, so that the
    // beam swings into place as the card opens rather than being drawn there.
    function drawBeam(figure, metal, tilt) {
        const beam = figure.appendChild(draw("g", { class: "balance__beam", style: "--tilt: " + tilt.toFixed(2) + "deg" }))
        beam.appendChild(draw("path", { class: "balance__needle", d: "M" + (PIVOT[0] - 3) + " " + PIVOT[1] + " L" + PIVOT[0] + " " + (PIVOT[1] - 44) + " L" + (PIVOT[0] + 3) + " " + PIVOT[1] + " Z" }))
        beam.appendChild(
            draw("path", {
                d:
                    "M" + (PIVOT[0] - ARM) + " " + (PIVOT[1] - 2.5) +
                    " Q" + PIVOT[0] + " " + (PIVOT[1] - 9) + " " + (PIVOT[0] + ARM) + " " + (PIVOT[1] - 2.5) +
                    " L" + (PIVOT[0] + ARM) + " " + (PIVOT[1] + 2.5) +
                    " Q" + PIVOT[0] + " " + (PIVOT[1] + 4) + " " + (PIVOT[0] - ARM) + " " + (PIVOT[1] + 2.5) + " Z",
                fill: metal.down,
            }),
        )
        for (const end of [-1, 1]) {
            beam.appendChild(draw("circle", { cx: PIVOT[0] + end * ARM, cy: PIVOT[1], r: 5.5, fill: metal.down }))
            beam.appendChild(draw("circle", { class: "balance__eye", cx: PIVOT[0] + end * ARM, cy: PIVOT[1], r: 2 }))
        }
        beam.appendChild(draw("circle", { cx: PIVOT[0], cy: PIVOT[1], r: 10, fill: metal.down }))
        beam.appendChild(draw("circle", { class: "balance__eye", cx: PIVOT[0], cy: PIVOT[1], r: 3.2 }))
    }

    // A pan hung from its hanger, with the crowd standing in it filled to the
    // person's side. The pan hangs straight whatever the beam does, so it is
    // drawn where it hangs at level and moved down or up by as much as its
    // hanger is (`--dx`, `--dy`), which the stylesheet eases in with the beam.
    function drawPan(figure, defs, metal, weighing, end, tilt, locked) {
        const side = weighing.side
        const level = hangerAt(end, 0)
        const now = hangerAt(end, tilt)
        const x = level[0]
        const rim = level[1] + DROP
        const foot = rim + 3

        const pan = figure.appendChild(
            draw("g", {
                class: "balance__pan balance__pan--" + (end < 0 ? "left" : "right"),
                style: "--dx: " + (now[0] - level[0]).toFixed(1) + "px; --dy: " + (now[1] - level[1]).toFixed(1) + "px",
            }),
        )

        // The chains, from the hanger to either lip of the pan.
        for (const lip of [-1, 1]) pan.appendChild(draw("line", { class: "balance__chain", x1: x, y1: level[1] + 4, x2: x + lip * (PAN - 4), y2: rim }))

        // The crowd, filled from its foot as far as the value reaches.
        const crowd = crowdOf(side.dimension)
        const shape = crowdShape(crowd, x, foot)
        const id = "balance-" + drawn + "-" + (end < 0 ? "l" : "r")
        const fill = defs.appendChild(draw("linearGradient", { id: id + "-fill", x1: "0", y1: "1", x2: "0", y2: "0" }))
        fill.appendChild(draw("stop", { offset: "0", "stop-color": side.deep }))
        fill.appendChild(draw("stop", { offset: "1", "stop-color": side.colour }))

        const reached = Math.max(foot - CROWD_HIGH, Math.min(foot, shape.yOf(weighing.value)))
        const clip = defs.appendChild(draw("clipPath", { id: id + "-reach" }))
        clip.appendChild(
            draw("rect", {
                class: "balance__rise",
                x: x - CROWD_HALF - 4,
                y: reached,
                width: 2 * CROWD_HALF + 8,
                height: foot - reached + 2,
                style: "--rise: " + (foot - reached + 2).toFixed(1) + "px",
            }),
        )

        const held = pan.appendChild(draw("g", { class: "balance__crowd", style: "--side: " + side.colour }))
        held.appendChild(draw("line", { class: "balance__spine", x1: x, y1: foot - CROWD_HIGH, x2: x, y2: foot }))
        held.appendChild(draw("path", { class: "balance__beyond", d: shape.outline }))
        held.appendChild(draw("path", { class: "balance__reached", d: shape.outline, fill: "url(#" + id + "-fill)", "clip-path": "url(#" + id + "-reach)" }))
        // Where the person's side reaches, across the crowd as wide as it is
        // there. Nothing marked on a locked one: the tease stands for a
        // shape, not a standing.
        if (!locked) {
            const across = shape.halfAt(weighing.value) + 7
            held.appendChild(draw("line", { class: "balance__mark", x1: x - across, y1: reached, x2: x + across, y2: reached }))
            const told = () => showTip(held, side.told + " The shape is everybody else's; the part filled in is how many " + CROWD + "'s yours outweighs.")
            held.addEventListener("mouseenter", told)
            held.addEventListener("mouseleave", hideTip)
        }

        // The pan, a dish under its rim, drawn over the foot of the crowd so
        // that the crowd stands in it.
        pan.appendChild(
            draw("path", {
                d: "M" + (x - PAN) + " " + rim + " Q" + x + " " + (rim + DISH * 2.1) + " " + (x + PAN) + " " + rim + " Z",
                fill: metal.down,
            }),
        )
        pan.appendChild(draw("ellipse", { class: "balance__lip", cx: x, cy: rim, rx: PAN, ry: 3.5 }))
        pan.appendChild(draw("circle", { cx: x, cy: level[1] + 2, r: 3.5, fill: metal.down }))
    }

    function drawScales(figure, sides, locked) {
        drawn++
        figure.setAttribute("viewBox", "0 0 " + WIDE + " " + HIGH)
        figure.classList.add("balance__scales")
        const defs = figure.appendChild(draw("defs", {}))
        const metal = { across: brass(defs, "balance-" + drawn + "-across", false), down: brass(defs, "balance-" + drawn + "-down", true) }
        const tilt = tiltOf(sides)

        drawPost(figure, metal)
        drawPan(figure, defs, metal, sides[0], -1, tilt, locked)
        drawPan(figure, defs, metal, sides[1], 1, tilt, locked)
        drawBeam(figure, metal, tilt)
        return tilt
    }

    /* ------------------------------- the words ---------------------------- */

    function text(tag, className, words) {
        const element = document.createElement(tag)
        element.className = className
        if (words) element.textContent = words
        return element
    }

    // Each side's name under its pan and, open, how its weight stands: "Weighs
    // more than 64% of people's".
    function readings(sides, locked) {
        const row = text("div", "balance__readings")
        for (const weighing of sides) {
            const reading = row.appendChild(text("div", "balance__reading"))
            reading.style.setProperty("--side", weighing.side.colour)
            reading.appendChild(text("p", "balance__side", weighing.side.name))
            if (locked || !weighing.stand) continue
            const stand = reading.appendChild(text("p", "balance__stand"))
            stand.append(weighing.stand.direction === "higher" ? "Weighs more than " : "Weighs less than ")
            stand.appendChild(text("strong", "", weighing.stand.share + "%"))
            stand.append(" of " + CROWD + "'s")
            reading.addEventListener("mouseenter", () => showTip(reading, weighing.side.told))
            reading.addEventListener("mouseleave", hideTip)
        }
        return row
    }

    // Which way it tips, in a line. Level is said of two standings closer
    // than `LEVEL`, and how laden the pans are is said with it, since that
    // is what tells a strong-in-both from a weak-in-both.
    function verdict(sides, tilt) {
        if (tilt > 0) return "The scales tip towards your light side"
        if (tilt < 0) return "The scales tip towards your dark side"
        const lightest = Math.min(sides[0].weight, sides[1].weight)
        const heaviest = Math.max(sides[0].weight, sides[1].weight)
        if (lightest >= 2 / 3) return "The scales hang level, heavy on both sides"
        if (heaviest < 1 / 3) return "The scales hang level, with little in either pan"
        return "The scales hang level"
    }

    /* ------------------------------ the section --------------------------- */

    // A title, the scales, each side's standing under its pan, which way they
    // tip and a vote. Locked, the title and the scales from the stand-ins,
    // blurred, with the two sides named and nothing else — the preview is
    // what finishing will show.
    function renderBalance(locked) {
        const all = document.createDocumentFragment()
        const sides = weighed(locked)

        const headline = text("header", "balance__head")
        headline.appendChild(text("h3", "balance__title", "Which way do your scales tip?"))
        all.appendChild(headline)

        const holder = text("div", "result__chart result__chart--wide balance__stage")
        const figure = holder.appendChild(document.createElementNS(SVG, "svg"))
        figure.setAttribute("role", "img")
        const tilt = drawScales(figure, sides, locked)
        figure.setAttribute(
            "aria-label",
            locked
                ? "Blurred preview of a pair of scales weighing your dark side against your light side"
                : "A pair of scales. " +
                      sides.map((one) => one.side.name + ": " + (one.stand ? (one.stand.direction === "higher" ? "more" : "less") + " than " + one.stand.share + "% of " + CROWD : "")).join(". ") +
                      ". " + verdict(sides, tilt),
        )
        holder.appendChild(readings(sides, locked))
        if (locked) holder.appendChild(text("span", "result__lock", "Locked"))
        all.appendChild(holder)
        if (locked) return all

        all.appendChild(text("p", "balance__verdict", verdict(sides, tilt)))

        const vote = text("div", "balance__vote")
        vote.appendChild(text("p", "balance__ask", "Does this match how you see yourself?"))
        vote.appendChild(pickButtons(BALANCE_KEY, VOTES))
        all.appendChild(vote)
        return all
    }

    return {
        BALANCE_OF: BALANCE_OF,
        BALANCE_KEY: BALANCE_KEY,
        DIMENSION: SIDES[0].dimension,
        CROWD_HIGH: CROWD_HIGH,
        ready: ready,
        declined: declined,
        youAt: youAt,
        renderBalance: renderBalance,
    }
}
