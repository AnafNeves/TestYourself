/* =========================================================================
   Two old theories, side by side, as the whole of the FIPI's reading: the star
   sign, read from the birthday and nothing the person said about themselves,
   and Galen's four temperaments on the two axes Eysenck laid them over —
   extraversion across, stability up — which are exactly the two FIPI
   dimensions with norms. Each takes the ordinary agree/disagree, and that pair
   of votes is the point: one reading came from the answers and one from a
   birthday, and agreeing with the second as readily as the first is the Barnum
   effect caught in the act.

   The star sign is drawn on Dürer's map of the northern sky (1515), turned so
   the sign stands at the top and lit there, and hovering a figure on it shows
   that sign out of a German woodcut with a line on where the signs came from.
   The plane is drawn on Thurneysser's woodcut of the four humours (1574), each
   quarter in its humour's colour, and hovering a quarter shows the face Lavater
   engraved for that temperament with a line saying there is nothing in it. All
   four pictures are public domain and are cut for the page by
   assets/theories/source/cut.py.
   ========================================================================= */

function makeTheories(shared) {
    "use strict"

    const score = shared.score
    const percentile = shared.percentile
    const answer = shared.answer
    const known = shared.known
    const normOf = shared.normOf
    const teaseValue = shared.teaseValue
    const voteButtons = shared.voteButtons
    const showTip = shared.showTip
    const hideTip = shared.hideTip

    const OLD_THEORIES_OF = "fipi"
    const TEMPERAMENT_KEY = "Temperament"
    const STARS_KEY = "StarSign"
    const STARS_FROM = "demographics1" // the questionnaire the birthday is read out of; without it there is no star card
    const TEMPERAMENT_ON = ["Extraversion", "Emotional Stability"] // across, then up

    // Each with the words it predicts and how its quarter of the plane is
    // drawn: which quarter (`right` is outgoing, `top` steady), the colour of
    // the humour behind it — blood, yellow bile, black bile and phlegm, as the
    // old medicine had them — its turn when the light goes round a locked
    // plane (clockwise from the top left), and the name Lavater engraved over
    // the face he drew for it.
    const TEMPERAMENTS = {
        sanguine: {
            name: "Sanguine",
            keys: ["warm", "sociable", "easy-going", "quick to recover"],
            right: true,
            top: true,
            colour: "#ef7382",
            turn: 1,
            latin: "Sanguineus",
        },
        choleric: {
            name: "Choleric",
            keys: ["driven", "quick-tempered", "decisive", "restless"],
            right: true,
            top: false,
            colour: "#f2b24c",
            turn: 2,
            latin: "Cholericus",
        },
        phlegmatic: {
            name: "Phlegmatic",
            keys: ["calm", "steady", "unflappable", "private"],
            right: false,
            top: true,
            colour: "#6fd3d9",
            turn: 0,
            latin: "Phlegmaticus",
        },
        melancholic: {
            name: "Melancholic",
            keys: ["thoughtful", "sensitive", "inward", "exacting"],
            right: false,
            top: false,
            colour: "#a291ff",
            turn: 3,
            latin: "Melancholicus",
        },
    }

    // In cusp order from the sign January opens in: month m's first part is
    // SIGNS[m - 1], its second SIGNS[m % 12]. `expects` is the stereotype
    // written on the FIPI's dimensions, for a later level to check the stars
    // against what was measured; nothing reads it yet. `sky` is where the
    // sign's figure stands on Dürer's map (below), in degrees clockwise from
    // the top of the cut picture, and `babylon` what the astronomers who drew
    // the signs up called it, which is what hovering it says.
    const SIGNS = [
        {
            name: "Capricorn",
            sky: 95,
            babylon: "the Goat-Fish",
            glyph: "♑",
            keys: ["disciplined", "patient", "ambitious", "reserved"],
            expects: { Conscientiousness: "high", Extraversion: "low" },
        },
        {
            name: "Aquarius",
            sky: 75,
            babylon: "the Great One",
            glyph: "♒",
            keys: ["original", "independent", "idealistic", "detached"],
            expects: { Openness: "high", Agreeableness: "low" },
        },
        {
            name: "Pisces",
            sky: 42,
            babylon: "the Tails",
            glyph: "♓",
            keys: ["dreamy", "compassionate", "intuitive", "easily hurt"],
            expects: { Agreeableness: "high", "Emotional Stability": "low", Openness: "high" },
        },
        {
            name: "Aries",
            sky: 12,
            babylon: "the Hired Man",
            glyph: "♈",
            keys: ["bold", "impatient", "competitive", "quick to move on"],
            expects: { Extraversion: "high", Agreeableness: "low", Conscientiousness: "low" },
        },
        {
            name: "Taurus",
            sky: 335,
            babylon: "the Bull of Heaven",
            glyph: "♉",
            keys: ["steady", "sensual", "stubborn", "reliable"],
            expects: { Conscientiousness: "high", Openness: "low" },
        },
        {
            name: "Gemini",
            sky: 303,
            babylon: "the Great Twins",
            glyph: "♊",
            keys: ["curious", "quick-witted", "talkative", "changeable"],
            expects: { Extraversion: "high", Openness: "high", Conscientiousness: "low" },
        },
        {
            name: "Cancer",
            sky: 283,
            babylon: "the Crab",
            glyph: "♋",
            keys: ["loyal", "protective", "tender", "guarded"],
            expects: { Agreeableness: "high", "Emotional Stability": "low" },
        },
        {
            name: "Leo",
            sky: 258,
            babylon: "the Lion",
            glyph: "♌",
            keys: ["confident", "generous", "proud", "made for the spotlight"],
            expects: { Extraversion: "high", "Emotional Stability": "high" },
        },
        {
            name: "Virgo",
            sky: 220,
            babylon: "the Furrow",
            glyph: "♍",
            keys: ["precise", "modest", "self-critical", "a worrier"],
            expects: { Conscientiousness: "high", "Emotional Stability": "low", Extraversion: "low" },
        },
        {
            name: "Libra",
            sky: 183,
            babylon: "the Scales",
            glyph: "♎",
            keys: ["charming", "fair-minded", "peace-seeking", "indecisive"],
            expects: { Agreeableness: "high", Extraversion: "high" },
        },
        {
            name: "Scorpio",
            sky: 155,
            babylon: "the Scorpion",
            glyph: "♏",
            keys: ["intense", "private", "unforgiving", "all or nothing"],
            expects: { Extraversion: "low", Agreeableness: "low", "Emotional Stability": "low" },
        },
        {
            name: "Sagittarius",
            sky: 122,
            babylon: "Pabilsag, the archer god",
            glyph: "♐",
            keys: ["restless", "optimistic", "frank", "light-hearted"],
            expects: { Extraversion: "high", Openness: "high", "Emotional Stability": "high" },
        },
    ]

    // The two standings as percentiles — the same a row reads — or nothing
    // while either is unscored. Locked, the same shape from the stand-ins.
    function temperamentAt(tease) {
        const at = TEMPERAMENT_ON.map((dimension) => {
            if (!known(dimension)) return undefined
            const norm = normOf(dimension)
            const value = tease ? teaseValue(dimension) : score(dimension)
            return norm && value !== undefined ? percentile(value, norm) : undefined
        })
        return at.some((one) => one === undefined) ? undefined : at
    }

    function temperamentOf(at) {
        const outgoing = at[0] >= 0.5
        const steady = at[1] >= 0.5
        return TEMPERAMENTS[outgoing ? (steady ? "sanguine" : "choleric") : steady ? "phlegmatic" : "melancholic"]
    }

    // The day of each month the second of its two signs begins on, January
    // first: the cusp, which falls between the 19th and the 23rd, not on the
    // 15th. Month m's first sign is SIGNS[m - 1], its second SIGNS[m % 12].
    const CUSPS = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22]

    // The sign if the day was given, the two it could be if only the month
    // was ("I'd rather not say" is 99, no day), nothing without even that.
    function starSign() {
        const month = answer("Demographics_BirthMonth")
        if (!month) return undefined
        const day = answer("Demographics_BirthDay")
        const first = SIGNS[month - 1]
        const second = SIGNS[month % 12]
        if (day >= 1 && day <= 31) return { sign: day < CUSPS[month - 1] ? first : second }
        return { between: [first, second] }
    }

    // What a shared link carries for the birthday: the month, and a day that
    // falls on the same side of that month's cusp as the real one — the 1st or
    // the 28th — so the same sign is read back and the day itself, which with
    // the month and the age is most of a date of birth, never leaves the page.
    // Null where there is no month to go on.
    function birthdayStandIn() {
        const month = answer("Demographics_BirthMonth")
        if (!month) return null
        const day = answer("Demographics_BirthDay")
        const side = day >= 1 && day <= 31 ? (day < CUSPS[month - 1] ? 1 : 28) : day === undefined ? undefined : 99
        return { month: month, day: side }
    }

    // The star card is drawn on Dürer's map of the northern sky (1515), which
    // sets the twelve figures of the zodiac round the ecliptic, cut to a disc
    // round its pole by assets/theories/source/cut.py and drawn as a mask the
    // way the woodcut is. **Where each figure stands was read off by eye**
    // (`sky` on each of SIGNS): Dürer drew the constellations where they stood,
    // a good way off the thirty-degree signs his own lines mark, so nothing in
    // the picture says where a figure is but the figure. `SKY_RING` is the
    // ecliptic's radius as a share of the disc's, printed by the script.
    const SKY = "assets/theories/sky.jpg"
    const SKY_RING = 0.8333
    const SIGN_ART = "assets/theories/signs/" // <sign>.jpg, cut out of a German woodcut of the twelve
    const SKY_SIZE = 240
    const SKY_DISC = 118 // the disc's radius on the drawing
    const SKY_SPOT = 0.36 // how far round a lit figure the light reaches, as a share of the disc

    // The text-presentation selector keeps a zodiac character a plain glyph
    // rather than the emoji face most systems default to.
    const plain = (sign) => sign.glyph + "\ufe0e"

    // Both figures are drawn twice over. **The print** is the picture as it
    // was printed, dark ink on old paper, and is what shows: it says the two
    // theories are old before a word is read. **The night** is the same
    // picture inverted, its lines in colour on the dark, and is shown only
    // through the part hovered, focused or tapped — a quarter of the plane, a
    // sign's stretch of the sky — as a lantern held over the page. What marks the person is drawn
    // over both, in the red old printers kept for what mattered most on a
    // page. The paper is a gradient, lighter in the middle and browner to the
    // edge, found by id like the masks.
    function paperIn(defs, id, cx, cy, r) {
        const paper = draw("radialGradient", { id: id + "-paper", gradientUnits: "userSpaceOnUse", cx: cx, cy: cy, r: r })
        paper.appendChild(draw("stop", { class: "print__paper print__paper--in", offset: 0.35 }))
        paper.appendChild(draw("stop", { class: "print__paper print__paper--out", offset: 1 }))
        defs.appendChild(paper)
        return "url(#" + id + "-paper)"
    }

    // Where a sign's figure is on the drawing, before the sky is turned.
    function skyPoint(sign) {
        const turn = (sign.sky * Math.PI) / 180
        const reach = SKY_DISC * SKY_RING
        return [SKY_SIZE / 2 + reach * Math.sin(turn), SKY_SIZE / 2 - reach * Math.cos(turn)]
    }

    // What hovering a figure on the sky says: that sign out of a sixteenth-
    // century German woodcut, and where the signs came from. It says nothing
    // about whether astrology works, on purpose: the vote under this card is
    // the Barnum probe, and a line beside it saying the stars have been tested
    // and failed would be answering the question it asks.
    function signOf(sign) {
        const card = document.createElement("div")
        card.className = "lore"
        const art = document.createElement("img")
        art.className = "lore__art"
        art.src = SIGN_ART + sign.name.toLowerCase() + ".jpg"
        art.alt = ""
        card.appendChild(art)
        const note = document.createElement("p")
        note.className = "lore__note"
        note.textContent =
            "Did you know? The twelve signs were drawn up by Babylonian astronomers some 2,500 years ago, who split the " +
            "Sun's yearly path through the stars into twelve equal parts. To them, " + sign.name + " was \u201c" + sign.babylon + "\u201d."
        card.appendChild(note)
        return card
    }

    let skies = 0 // a mask is found by id, and there can be several skies on a page

    // A sign's stretch of the zodiac on the sky, as a path: from halfway to
    // the figure before it round to halfway to the one after, across the band
    // the figures stand in. The figures are spaced as the constellations are,
    // unevenly, so a stretch is as wide as its figure has room for.
    function areaOf(sign) {
        const mid = SKY_SIZE / 2
        const around = SIGNS.map((one) => one.sky).sort((a, b) => a - b)
        const at = around.indexOf(sign.sky)
        const gap = (a, b) => (b - a + 360) % 360
        const from = sign.sky - gap(around[(at + 11) % 12], sign.sky) / 2
        const to = sign.sky + gap(sign.sky, around[(at + 1) % 12]) / 2
        const inner = SKY_DISC * (SKY_RING - 0.26)
        const outer = SKY_DISC - 2.5
        const point = (angle, r) => {
            const turn = (angle * Math.PI) / 180
            return (mid + r * Math.sin(turn)).toFixed(2) + " " + (mid - r * Math.cos(turn)).toFixed(2)
        }
        const large = to - from > 180 ? 1 : 0
        return (
            "M" + point(from, outer) +
            " A" + outer + " " + outer + " 0 " + large + " 1 " + point(to, outer) +
            " L" + point(to, inner) +
            " A" + inner + " " + inner + " 0 " + large + " 0 " + point(from, inner) +
            " Z"
        )
    }

    // The sky, turned so that the person's sign stands at the top, its stretch
    // of the zodiac drawn round in red and its glyph in a red seal at the pole;
    // in the night, its figure is lit gold as well. `lit` is the signs to mark
    // — one, or the two it could be where the day was not given — and with
    // none, a locked card, the sky turns slowly with nothing marked, the
    // plane's light going round the other way.
    function drawSky(figure, lit) {
        const id = "sky-" + skies++
        const mid = SKY_SIZE / 2
        figure.setAttribute("viewBox", "0 0 " + SKY_SIZE + " " + SKY_SIZE)
        figure.classList.add("sky")
        if (!lit.length) figure.classList.add("sky--turning")

        const disc = { x: mid - SKY_DISC, y: mid - SKY_DISC, width: 2 * SKY_DISC, height: 2 * SKY_DISC }
        const defs = draw("defs", {})
        const mask = draw("mask", Object.assign({ id: id, maskUnits: "userSpaceOnUse" }, disc))
        mask.appendChild(draw("image", Object.assign({ href: SKY, preserveAspectRatio: "none" }, disc)))
        defs.appendChild(mask)
        // The ink fades out towards the edge of the disc, where the corner
        // figures of the print begin, rather than stopping at a line — the
        // print's dark and the night's colour alike.
        for (const kind of ["print", "night"]) {
            const fade = draw("radialGradient", { id: id + "-" + kind, gradientUnits: "userSpaceOnUse", cx: mid, cy: mid, r: SKY_DISC })
            for (const [offset, alpha] of [[0, 1], [0.86, 1], [1, 0]]) {
                fade.appendChild(draw("stop", { class: "sky__stop sky__stop--" + kind, offset: offset, "stop-opacity": alpha }))
            }
            defs.appendChild(fade)
        }
        const paper = paperIn(defs, id, mid, mid, SKY_DISC)
        // Everything on the sky stays inside its disc, a figure on the ring's
        // edge included.
        const clip = draw("clipPath", { id: id + "-disc" })
        clip.appendChild(draw("circle", { cx: mid, cy: mid, r: SKY_DISC }))
        defs.appendChild(clip)
        // Each sign's stretch as a clip, the night being shown through the one
        // hovered and nowhere else.
        if (lit.length) {
            SIGNS.forEach((sign, at) => {
                const stretch = draw("clipPath", { id: id + "-area-" + at })
                stretch.appendChild(draw("path", { d: areaOf(sign) }))
                defs.appendChild(stretch)
            })
        }
        lit.forEach((sign, at) => {
            const [x, y] = skyPoint(sign)
            const spot = draw("radialGradient", { id: id + "-spot-" + at, gradientUnits: "userSpaceOnUse", cx: x, cy: y, r: SKY_DISC * SKY_SPOT })
            for (const [offset, alpha] of [[0, 1], [0.55, 0.85], [1, 0]]) spot.appendChild(draw("stop", { class: "sky__glint", offset: offset, "stop-opacity": alpha }))
            defs.appendChild(spot)
        })
        figure.appendChild(defs)

        // Turned so the sign (or the middle of the two) is at the top.
        const heading = lit.length
            ? (Math.atan2(
                  lit.reduce((sum, sign) => sum + Math.sin((sign.sky * Math.PI) / 180), 0),
                  lit.reduce((sum, sign) => sum + Math.cos((sign.sky * Math.PI) / 180), 0),
              ) * 180) / Math.PI
            : 0
        const turned = draw("g", { class: "sky__turn", transform: "rotate(" + -heading + " " + mid + " " + mid + ")", "clip-path": "url(#" + id + "-disc)" })

        const print = draw("g", { class: "sky__print" })
        print.appendChild(draw("circle", { class: "sky__paper", cx: mid, cy: mid, r: SKY_DISC, fill: paper }))
        print.appendChild(draw("rect", Object.assign({ class: "sky__ink", fill: "url(#" + id + "-print)", mask: "url(#" + id + ")" }, disc)))
        turned.appendChild(print)

        const night = draw("g", { class: "sky__night" })
        night.appendChild(draw("circle", { class: "sky__dark", cx: mid, cy: mid, r: SKY_DISC }))
        // A glow on the night behind a lit figure, which a sparse one — the
        // water-bearer is a few lines — would not throw by its ink alone.
        lit.forEach((sign, at) => {
            const [x, y] = skyPoint(sign)
            night.appendChild(draw("circle", { class: "sky__glow", cx: x, cy: y, r: SKY_DISC * SKY_SPOT, fill: "url(#" + id + "-spot-" + at + ")" }))
        })
        night.appendChild(draw("rect", Object.assign({ class: "sky__ink sky__ink--night", fill: "url(#" + id + "-night)", mask: "url(#" + id + ")" }, disc)))
        lit.forEach((sign, at) => {
            night.appendChild(draw("rect", Object.assign({ class: "sky__lit", fill: "url(#" + id + "-spot-" + at + ")", mask: "url(#" + id + ")" }, disc)))
        })
        turned.appendChild(night)

        for (const sign of lit) turned.appendChild(draw("path", { class: "sky__area", d: areaOf(sign) }))

        // A card that is not locked says, when a sign's stretch is hovered,
        // focused or tapped, which sign it is and where the signs came from,
        // and turns that stretch, and only that one, to the night.
        if (lit.length) {
            SIGNS.forEach((sign, at) => {
                const hit = draw("path", { class: "sky__hit", d: areaOf(sign), tabindex: "0", role: "img", "aria-label": sign.name + ", on Dürer's map of the sky" })
                const card = signOf(sign)
                const show = () => {
                    night.setAttribute("clip-path", "url(#" + id + "-area-" + at + ")")
                    night.classList.add("sky__night--on")
                    showTip(hit, card)
                }
                const hide = () => {
                    night.classList.remove("sky__night--on")
                    hideTip()
                }
                hit.addEventListener("mouseenter", show)
                hit.addEventListener("focus", show)
                hit.addEventListener("click", show)
                hit.addEventListener("mouseleave", hide)
                hit.addEventListener("blur", hide)
                turned.appendChild(hit)
            })
        }
        figure.appendChild(turned)
        figure.appendChild(draw("circle", { class: "sky__rim", cx: mid, cy: mid, r: SKY_DISC - 0.5 }))

        // The seal at the pole, with the glyph in it; the badge on the shelf
        // is read off `data-glyph`.
        if (lit.length) {
            const glyphs = lit.map(plain).join(" ")
            figure.dataset.glyph = glyphs
            // One sign for certain, and the badge is its woodcut (`badge`);
            // two it could be, and the badge is their two glyphs.
            if (lit.length === 1) figure.dataset.sign = lit[0].name.toLowerCase()
            figure.appendChild(draw("circle", { class: "sky__seal", cx: mid, cy: mid, r: 23 }))
            figure.appendChild(draw("circle", { class: "sky__ring", cx: mid, cy: mid, r: 19.5 }))
            const glyph = draw("text", { class: "sky__glyph" + (lit.length > 1 ? " sky__glyph--two" : ""), x: mid, y: mid, "text-anchor": "middle", "dominant-baseline": "central" })
            glyph.textContent = glyphs
            figure.appendChild(glyph)
        }
    }

    // The plane is Thurneysser's woodcut of the four humours (Quinta Essentia,
    // 1574), whose own cross already puts them where Eysenck's axes do:
    // phlegmatic top left, sanguine top right, melancholic bottom left,
    // choleric bottom right. It is cut by assets/theories/source/cut.py,
    // white ink on black, and drawn as a **mask** — the ink shows through in
    // whatever each quarter is painted, the paper is nothing — so one picture
    // takes four colours and the card's dark shows between its lines. `CROSS`
    // is where that cross falls, as shares across and down, and is printed by
    // the script: re-cut the picture and it wants copying back.
    const WOODCUT = "assets/theories/woodcut.jpg"
    const WOODCUT_SIZE = [800, 1070]
    const CROSS = [0.5019, 0.4472]
    const FACES = "assets/theories/faces/" // <temperament>.jpg, the heads Lavater drew

    const PLANE = 200 // the woodcut's width on the drawing; its height follows
    const DEPTH = (PLANE * WOODCUT_SIZE[1]) / WOODCUT_SIZE[0]
    const ROOM = { left: 16, top: 3, right: 3, bottom: 16 } // round the woodcut, for the axis words
    const EDGE = 9 // how far inside the frame a standing at either extreme is put

    const x0 = ROOM.left
    const y0 = ROOM.top
    const middle = [x0 + CROSS[0] * PLANE, y0 + CROSS[1] * DEPTH]

    let drawn = 0 // a mask is found by id, and there can be several planes on a page

    // A standing's place on the plane. The woodcut's cross is not at its
    // middle — the upper quarters are shallower than the lower — so each half
    // of an axis is a stretch of its own: the average person falls on the
    // cross, and either extreme just inside the frame.
    function placeOn(at) {
        const along = (share, low, mid, high) => (share < 0.5 ? low + (share / 0.5) * (mid - low) : mid + ((share - 0.5) / 0.5) * (high - mid))
        return [along(at[0], x0 + EDGE, middle[0], x0 + PLANE - EDGE), along(at[1], y0 + DEPTH - EDGE, middle[1], y0 + EDGE)]
    }

    // Where a badge on the shelf crops the plane: a square round the point,
    // kept inside the woodcut so a point near its edge does not crop into
    // the axis words. Nothing where there is no point.
    function badgeCrop(figure) {
        const you = figure.querySelector(".quadrant__you")
        if (!you) return null
        const half = 55
        const keep = (value, low, high) => Math.min(high - half, Math.max(low + half, value))
        return [keep(Number(you.getAttribute("cx")), x0, x0 + PLANE), keep(Number(you.getAttribute("cy")), y0, y0 + DEPTH), 2 * half]
    }

    // The badge on the shelf for a sign read for certain: that sign out of
    // the German woodcut, the picture its stretch of the sky shows on hover,
    // filling the square with its caption cropped off the top (`.sky__badge`).
    // Nothing where the sky names two signs, and the glyphs stand instead.
    function badge(sky) {
        if (!sky.dataset.sign) return null
        const token = document.createElement("span")
        token.className = "shelf__badge-emblem"
        const picture = document.createElement("img")
        picture.className = "sky__badge"
        picture.src = SIGN_ART + sky.dataset.sign + ".jpg"
        picture.alt = ""
        token.appendChild(picture)
        return token
    }

    // A quarter of the woodcut, as a box.
    function quarterOf(type) {
        return {
            x: type.right ? middle[0] : x0,
            y: type.top ? y0 : middle[1],
            width: type.right ? x0 + PLANE - middle[0] : middle[0] - x0,
            height: type.top ? middle[1] - y0 : y0 + DEPTH - middle[1],
        }
    }

    // What hovering a quarter says: the face Lavater gave that temperament,
    // and that there is nothing in it. Physiognomy is the one idea on the
    // level that was taken for science in its day and is now known to be
    // false, which is worth a line — and the heads are too good to leave out.
    function faceOf(type) {
        const card = document.createElement("div")
        card.className = "lore"
        const head = document.createElement("img")
        head.className = "lore__art lore__art--oval"
        head.src = FACES + type.name.toLowerCase() + ".jpg"
        head.alt = ""
        card.appendChild(head)
        const name = document.createElement("p")
        name.className = "lore__name"
        name.textContent = type.latin
        card.appendChild(name)
        const note = document.createElement("p")
        note.className = "lore__note"
        note.textContent =
            "Did you know? In the 1700s, physiognomists such as Lavater claimed that each temperament showed in the face: " +
            "this is the " + type.name.toLowerCase() + " one he drew. The idea has since been debunked, and you can't read somebody's character from their face."
        card.appendChild(note)
        return card
    }

    // The plane, with the person on it where `at` puts them: a red pin, tied
    // by a red line to the cross, where the average person is, and their
    // quarter washed in its humour's colour on the print and lit in the night.
    // With no `at` — a locked plane, which has nothing earned to show — the
    // colour goes round the four quarters in turn instead, so the preview asks
    // which of them it will be rather than answering with a stand-in.
    function drawQuadrant(figure, at) {
        const id = "humours-" + drawn++
        figure.setAttribute("viewBox", "0 0 " + (ROOM.left + PLANE + ROOM.right) + " " + (ROOM.top + DEPTH + ROOM.bottom))
        figure.classList.add("quadrant")
        if (!at) figure.classList.add("quadrant--turning")

        const frame = { x: x0, y: y0, width: PLANE, height: DEPTH }
        const defs = draw("defs", {})
        const mask = draw("mask", Object.assign({ id: id, maskUnits: "userSpaceOnUse" }, frame))
        mask.appendChild(draw("image", Object.assign({ href: WOODCUT, preserveAspectRatio: "none" }, frame)))
        defs.appendChild(mask)
        const paper = paperIn(defs, id, x0 + PLANE / 2, y0 + DEPTH / 2, Math.hypot(PLANE, DEPTH) / 2)
        figure.appendChild(defs)

        const lit = at ? temperamentOf(at) : null
        const types = Object.values(TEMPERAMENTS)

        const print = draw("g", { class: "quadrant__print" })
        print.appendChild(draw("rect", Object.assign({ class: "quadrant__paper", fill: paper }, frame)))
        for (const type of types) {
            print.appendChild(
                draw("rect", Object.assign({ class: "quadrant__wash" + (type === lit ? " quadrant__wash--lit" : ""), style: "--humour: " + type.colour + "; --turn: " + type.turn }, quarterOf(type))),
            )
        }
        print.appendChild(draw("rect", Object.assign({ class: "quadrant__inked", mask: "url(#" + id + ")" }, frame)))
        figure.appendChild(print)

        // The night is a quarter at a time: each carries its own dark, and is
        // shown only while it is hovered.
        const night = draw("g", { class: "quadrant__night" })
        const quarters = new Map()
        for (const type of types) {
            const box = quarterOf(type)
            const quarter = draw("g", {
                class: "quadrant__quarter" + (type === lit ? " quadrant__quarter--lit" : ""),
                style: "--humour: " + type.colour + "; --turn: " + type.turn,
            })
            quarter.appendChild(draw("rect", Object.assign({ class: "quadrant__page" }, box)))
            quarter.appendChild(draw("rect", Object.assign({ class: "quadrant__glow" }, box)))
            // The ink in a group of its own, so that the glow a lit quarter
            // throws is drawn round its lines after the mask, not round a box
            // the mask then cuts away.
            const lines = draw("g", { class: "quadrant__lines" })
            lines.appendChild(draw("rect", Object.assign({ class: "quadrant__ink", mask: "url(#" + id + ")" }, box)))
            quarter.appendChild(lines)
            night.appendChild(quarter)
            quarters.set(type, quarter)
        }
        figure.appendChild(night)
        figure.appendChild(draw("rect", Object.assign({ class: "quadrant__frame" }, frame)))

        const foot = y0 + DEPTH + 11
        for (const one of [
            { text: "reserved", x: x0, anchor: "start" },
            { text: "outgoing", x: x0 + PLANE, anchor: "end" },
        ]) {
            const label = draw("text", { class: "quadrant__axis", x: one.x, y: foot, "text-anchor": one.anchor })
            label.textContent = one.text
            figure.appendChild(label)
        }
        for (const one of [
            { text: "steady", y: y0, anchor: "end" },
            { text: "reactive", y: y0 + DEPTH, anchor: "start" },
        ]) {
            const label = draw("text", {
                class: "quadrant__axis",
                "text-anchor": one.anchor,
                transform: "translate(11 " + one.y + ") rotate(-90)",
            })
            label.textContent = one.text
            figure.appendChild(label)
        }

        if (at) {
            const [x, y] = placeOn(at)
            figure.appendChild(draw("line", { class: "quadrant__link", x1: middle[0], y1: middle[1], x2: x, y2: y }))
            figure.appendChild(draw("circle", { class: "quadrant__mean", cx: middle[0], cy: middle[1], r: 2.4 }))
            figure.appendChild(draw("circle", { class: "quadrant__halo", cx: x, cy: y, r: 13 }))
            figure.appendChild(draw("circle", { class: "quadrant__pulse", cx: x, cy: y, r: 7.5 }))
            figure.appendChild(draw("circle", { class: "quadrant__ring", cx: x, cy: y, r: 8.2 }))
            figure.appendChild(draw("circle", { class: "quadrant__you", cx: x, cy: y, r: 6.2 }))

            // A plane that is not locked says, when a quarter is hovered,
            // focused or tapped, what Lavater thought that temperament looked
            // like, and the quarter is brought up in the night.
            for (const type of types) {
                const hit = draw("rect", Object.assign({ class: "quadrant__hit", tabindex: "0", role: "img", "aria-label": type.name + ": the face an eighteenth-century physiognomist drew for it" }, quarterOf(type)))
                const face = faceOf(type)
                const show = () => {
                    quarters.get(type).classList.add("quadrant__quarter--hovered")
                    showTip(hit, face)
                }
                const hide = () => {
                    quarters.get(type).classList.remove("quadrant__quarter--hovered")
                    hideTip()
                }
                hit.addEventListener("mouseenter", show)
                hit.addEventListener("focus", show)
                // A phone has no hover, and a tap does not always focus an
                // SVG element, so a tap asks for the face too.
                hit.addEventListener("click", show)
                hit.addEventListener("mouseleave", hide)
                hit.addEventListener("blur", hide)
                figure.appendChild(hit)
            }
        }
    }

    // One card: what is being read, its figure, the name it comes out as, then
    // what that name predicts and the vote on it. The heading says what the
    // card *is* and the line under the name what it *predicts*, so the two are
    // told apart on sight. A card with no words to give — a sign that could be
    // one of two — says why instead, and takes no vote.
    function theoryCard(kind, figure, name, keys, why, key, locked) {
        const card = document.createElement("div")
        card.className = "theory"

        const piece = (className, text, blank) => {
            const line = document.createElement("p")
            line.className = className + (blank && locked ? " blank" : "")
            line.textContent = text
            card.appendChild(line)
        }

        piece("theory__kind", kind)
        card.appendChild(figure)
        piece("theory__name", name, true)

        if (keys) {
            piece("theory__predicts", "It predicts that you are…")
            const list = document.createElement("ul")
            list.className = "theory__keys" + (locked ? " blank" : "")
            for (const word of keys) {
                const item = document.createElement("li")
                item.textContent = word
                list.appendChild(item)
            }
            card.appendChild(list)
            if (!locked) card.appendChild(voteButtons(key))
        } else {
            piece("theory__why", why)
        }

        return card
    }

    // The level's figure. As the taste of the level to come — which it is only
    // when a link has started the run somewhere else, since level 1 is
    // otherwise where the run begins — it is the plane alone under a line of
    // its own: that the stars have a reading too is no news to anybody, and
    // four temperaments nobody has heard of since school are.
    function renderOldTheories(locked, teaser) {
        const holder = document.createElement("div")
        holder.className = "theories" + (teaser ? " theories--teaser" : "")

        const intro = document.createElement("p")
        intro.className = "theories__intro"
        if (teaser) {
            intro.textContent =
                "Find out what the physicians of ancient Greece would have said about your temperament: " +
                "are you phlegmatic, sanguine, choleric or melancholic?"
            holder.appendChild(intro)
            const figure = document.createElementNS(SVG, "svg")
            figure.setAttribute("role", "img")
            figure.setAttribute("aria-label", "The four temperaments, on a woodcut of 1574")
            figure.classList.add("theory__figure")
            drawQuadrant(figure, null)
            holder.appendChild(figure)
            return holder
        }
        // Written as HTML — the words are the file's own — so the line break
        // before the last sentence is a break and not four characters.
        intro.innerHTML =
            "Two of the oldest ways of describing a person were the sign you were born under, and the " +
            "four temperaments of the ancient Greeks. Based on your answers so far, here is what an astrologer and an early physician " +
            "would have said about you.<br />Finish the test and see how well either of them holds up!"
        holder.appendChild(intro)

        const pair = document.createElement("div")
        pair.className = "theories__pair"
        holder.appendChild(pair)

        const stars = locked ? { sign: SIGNS[0] } : starSign()
        if (stars) {
            const glyph = document.createElementNS(SVG, "svg")
            glyph.setAttribute("role", "img")
            glyph.setAttribute(
                "aria-label",
                locked
                    ? "Dürer's map of the northern sky, 1515: your sign is still locked"
                    : "Your star sign, " + (stars.sign ? stars.sign.name : stars.between.map((sign) => sign.name).join(" or ")) + ", on Dürer's map of the northern sky",
            )
            glyph.classList.add("theory__figure")
            drawSky(glyph, locked ? [] : stars.sign ? [stars.sign] : stars.between)
            pair.appendChild(
                stars.sign
                    ? theoryCard("Your star sign is", glyph, stars.sign.name, stars.sign.keys, "", STARS_KEY, locked)
                    : theoryCard(
                          "Your star sign is",
                          glyph,
                          stars.between[0].name + " or " + stars.between[1].name,
                          undefined,
                          "Without the day, the stars can't say which.",
                          STARS_KEY,
                          locked,
                      ),
            )
        }

        const at = temperamentAt(locked)
        const type = at ? temperamentOf(at) : undefined
        if (type) {
            const figure = document.createElementNS(SVG, "svg")
            figure.setAttribute("role", "img")
            figure.setAttribute(
                "aria-label",
                locked
                    ? "The four temperaments, on a woodcut of 1574: yours is still locked"
                    : "Your temperament: " + type.name + ", on the plane of extraversion and stability",
            )
            figure.classList.add("theory__figure")
            drawQuadrant(figure, locked ? null : at)
            pair.appendChild(theoryCard("Your temperament is", figure, type.name, type.keys, "", TEMPERAMENT_KEY, locked))
        }

        return holder
    }

    return {
        OLD_THEORIES_OF: OLD_THEORIES_OF,
        STARS_KEY: STARS_KEY,
        STARS_FROM: STARS_FROM,
        TEMPERAMENT_KEY: TEMPERAMENT_KEY,
        renderOldTheories: renderOldTheories,
        badgeCrop: badgeCrop,
        badge: badge,
        birthdayStandIn: birthdayStandIn,
    }
}
