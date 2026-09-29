/* =========================================================================
   The Hyborian Age, as a hand of two cards: which of Howard's heroes the
   person would have been, the hero's painted card, and beside it the card's
   back, which carries the person's own stats — the three dimensions the hero
   was read from — with what the hero is said to be and who it is modelled
   on, the way a trading card's back does.

   The hero is the nearest corner of a cube: each of its three dimensions
   (Burning, the Code, Barbarism) is a reach along its own scale, high or
   low, and all eight corners have a face. Nothing is read against other
   people, so the questionnaire carries no norms and goes through
   `dimensionsIn`, the wheel's exception: what is compared is the person's
   answers with a handful of fictional lives.

   THE GOD IS NOT SHOWN, FOR NOW. The other four dimensions (Indifference,
   Afterlife, the Gift at Birth, Sacred Pleasure) are still asked and saved,
   and GODS and `god()` below still read which of five would claim somebody,
   but nothing draws it and nothing files a vote on it (`GOD_KEY` is out of
   `feedbackKeys`). Bringing it back is a second pair of cards in
   `renderHyborian` and the key back in `feedbackKeys`.

   The pictures are generated paintings, cut for the page by
   assets/hyborian/source/cut.py (`picture` on each of HEROES). No hero is
   named after a character: "Conan" is a live trademark and every likeness
   since Howard is somebody's copyright. A hero with no picture yet is drawn
   as its emblem on a card of the same shape, so a missing picture costs the
   painting and nothing else.
   ========================================================================= */

function makeHyborian(shared) {
    "use strict"

    const score = shared.score
    const known = shared.known
    const reachOf = shared.reachOf
    const teaseValue = shared.teaseValue
    const pickButtons = shared.pickButtons
    const VOTES = shared.VOTES
    const showTip = shared.showTip
    const hideTip = shared.hideTip

    const HYBORIAN_OF = "hyborian"
    const HERO_KEY = "Hero"
    const GOD_KEY = "God"
    const HERO_ON = ["Burning", "The Code", "Barbarism"]
    const GOD_ON = ["Indifference", "Afterlife", "The Gift at Birth", "Sacred Pleasure"]

    // The colour the hero votes and draws in, the questionnaire's own; and
    // a cold blue for the gods, drawn nowhere for now.
    const HERO_COLOUR = "#c0873a"
    const GOD_COLOUR = "#8aa7d6"

    const PICTURES = "assets/hyborian/"

    // The eight heroes, one a corner of the cube (`at`, in the order of
    // HERO_ON: Burning, the Code, Barbarism; 1 is high). `keys` is what the
    // card says it predicts; `story` is who the archetype is modelled on,
    // in the third person and claiming nothing about the person, which is
    // the flavour text on the card's back. `picture` is the painting, where
    // there is one.
    const HEROES = [
        {
            name: "The Barbarian",
            emblem: "sword",
            picture: "barbarian.jpg",
            at: [1, 1, 1],
            keys: ["fierce", "straightforward", "untamed", "loyal to your own"],
            story: "The northern swordsman come down out of the hills: burning, plain-dealing, and sure that the cities have gone soft.",
        },
        {
            name: "The Free Blade",
            emblem: "blades",
            picture: "free-blade.jpg",
            at: [1, 1, 0],
            keys: ["bold", "honourable", "your own master", "at home anywhere"],
            story: "The mercenary who sells her sword and keeps her word, and is at home in any city that will have her.",
        },
        {
            name: "The Pirate Queen",
            emblem: "sail",
            picture: "pirate-queen.jpg",
            at: [1, 0, 1],
            keys: ["burning", "ruthless", "devoted", "wild"],
            story: "The queen of the Black Coast: no law but her own, a love that would drive her back from the dead, and the sea for a kingdom.",
        },
        {
            name: "The Thief",
            emblem: "key",
            picture: "thief.jpg",
            at: [1, 0, 0],
            keys: ["quick", "cunning", "restless", "at home in the crowd"],
            story: "The prince of thieves in a city of towers: what the clever take, the strong cannot hold.",
        },
        {
            name: "The King",
            emblem: "crown",
            picture: "king.jpg",
            at: [0, 1, 1],
            keys: ["steadfast", "just", "hard to move", "of the old ways"],
            story: "The barbarian who stayed: a throne won with a sword and kept with a code, and no love for the court around it.",
        },
        {
            name: "The Frontiersman",
            emblem: "axe",
            at: [0, 1, 0],
            keys: ["decent", "patient", "brave when it counts", "civilised"],
            story: "The settler on the last river, with a dog and an axe: the ordinary civilised man who admires the wild and does not belong to it.",
        },
        {
            name: "The Sorcerer",
            emblem: "eye",
            picture: "sorcerer.jpg",
            at: [0, 0, 0],
            keys: ["patient", "calculating", "learned", "hungry for more"],
            story: "The priest of the serpent: patient, learned, bound by nothing, and after more than a life can hold.",
        },
        {
            name: "The Witch",
            emblem: "moon",
            picture: "witch.jpg",
            at: [0, 0, 1],
            keys: ["watchful", "wily", "of the wild", "unhurried"],
            story: "The wise-woman of the hills with a wolf at her side: outside the law, unhurried, and older than the kingdom below her.",
        },
    ]

    // The five gods, each a profile on the four (`at`, in the order of
    // GOD_ON: Indifference, Afterlife, the Gift at Birth, Sacred Pleasure;
    // Afterlife is high where something comes after death, so Crom's grey
    // mist is its foot). `keys` is what believing in that god comes to, worded so
    // that the card's list reads as beliefs and not traits; `story` is who
    // the god is borrowed from. Not drawn for now (see the head of the file).
    const GODS = [
        {
            name: "Crom",
            emblem: "mountain",
            at: [1, 0, 1, 0],
            keys: ["nobody is watching", "nothing comes after", "you have what you were born with", "pleasure is beside the point"],
            story: "The god of the northern hills, who gives courage at birth and nothing after, and scorns anyone who prays to him. Borrowed from the Irish Crom Cruach.",
        },
        {
            name: "Mitra",
            emblem: "sun",
            at: [0, 1, 0, 0],
            keys: ["somebody is watching", "there is more to come", "anyone can change", "restraint is a virtue"],
            story: "The one god of the civilised west, of mercy, law and a heaven for the just. Borrowed from the Roman Mithras.",
        },
        {
            name: "Ishtar",
            emblem: "star",
            at: [0, 0, 0, 1],
            keys: ["somebody is watching", "this life is all there is", "anyone can bloom", "pleasure is holy"],
            story: "The goddess of the southern cities, of love and war, who is here and asks for nothing later. Borrowed from the Babylonian Ishtar.",
        },
        {
            name: "Ymir",
            emblem: "frost",
            at: [1, 1, 1, 1],
            keys: ["nobody is watching", "a hall waits for the brave", "the strong are born strong", "the feast is holy"],
            story: "The frost giant of the far north, who cares for nobody and keeps a hall for the fallen all the same. Borrowed from the Norse Ymir.",
        },
        {
            name: "Set",
            emblem: "serpent",
            at: [0, 1, 1, 0],
            keys: ["somebody is listening", "death can be cheated", "the blood tells", "appetite is weakness"],
            story: "The old serpent of the south, who answers his priests at a price and promises them they need never die. Borrowed from the Egyptian Set.",
        },
    ]

    /* ------------------------------ reading -------------------------------- */

    // The hero's three are what the section waits on; the god's four are
    // asked but read by nothing on screen.
    function ready() {
        return HERO_ON.every((dimension) => known(dimension) && score(dimension) !== undefined)
    }

    // Each dimension as a reach along its own scale, hashed stand-ins when
    // the level is locked.
    function reaches(list, locked) {
        return list.map((dimension) => reachOf(dimension, locked ? teaseValue(dimension) : score(dimension)))
    }

    // The nearest of a list of profiles to the point, the first written
    // where two are as near: a reading always names one.
    function nearest(list, point) {
        let best = Infinity
        let found = null
        for (const one of list) {
            const gap = one.at.reduce((sum, value, index) => sum + (value - point[index]) * (value - point[index]), 0)
            if (gap < best - 1e-9) {
                best = gap
                found = one
            }
        }
        return found
    }

    // The hero is the nearest corner of the cube, which is each reach taken
    // as high or low. A reach of exactly a half — a mean of 4 on the seven
    // points, which is not rare — is as near either corner, and counts as
    // high, so that there is never a tie and always one hero.
    function hero(locked) {
        const corner = reaches(HERO_ON, locked).map((reach) => (reach >= 0.5 ? 1 : 0))
        return HEROES.find((one) => one.at.every((value, index) => value === corner[index]))
    }

    function god(locked) {
        return nearest(GODS, reaches(GOD_ON, locked))
    }

    /* ------------------------------ drawing -------------------------------- */

    // Each emblem is a few strokes on a round plate, 120 across, in
    // currentColor, so a card and a badge draw it in their own colour. It is
    // what a hero without a painting is drawn as, and the badge of one.
    const EMBLEMS = {
        sword: [["path", { d: "M60 12 L67 26 L66 74 L54 74 L53 26 Z", fill: "currentColor" }], ["path", { d: "M42 76 H78", "stroke-width": 6 }], ["path", { d: "M60 78 V98", "stroke-width": 7 }], ["circle", { cx: 60, cy: 103, r: 5, fill: "currentColor" }]],
        blades: [
            ["g", { transform: "rotate(-32 60 60)" }, [["path", { d: "M60 14 L66 26 L65 72 L55 72 L54 26 Z", fill: "currentColor" }], ["path", { d: "M46 74 H74", "stroke-width": 5 }], ["path", { d: "M60 76 V94", "stroke-width": 6 }]]],
            ["g", { transform: "rotate(32 60 60)" }, [["path", { d: "M60 14 L66 26 L65 72 L55 72 L54 26 Z", fill: "currentColor" }], ["path", { d: "M46 74 H74", "stroke-width": 5 }], ["path", { d: "M60 76 V94", "stroke-width": 6 }]]],
        ],
        sail: [["path", { d: "M22 74 Q60 88 98 74 L90 88 Q60 98 30 88 Z", fill: "currentColor" }], ["path", { d: "M58 20 V74", "stroke-width": 4 }], ["path", { d: "M62 24 L92 68 H62 Z", fill: "currentColor" }], ["path", { d: "M54 30 L30 64 H54 Z", fill: "currentColor", opacity: 0.55 }]],
        key: [["circle", { cx: 42, cy: 42, r: 13, "stroke-width": 7 }], ["path", { d: "M52 52 L90 90", "stroke-width": 8 }], ["path", { d: "M84 84 L92 76 M75 75 L83 67", "stroke-width": 7 }]],
        crown: [["path", { d: "M24 84 V46 L43 62 L60 32 L77 62 L96 46 V84 Z", fill: "currentColor" }], ["path", { d: "M24 92 H96", "stroke-width": 6 }], ["circle", { cx: 60, cy: 26, r: 4, fill: "currentColor" }]],
        axe: [["path", { d: "M36 98 L82 32", "stroke-width": 7 }], ["path", { d: "M74 20 Q100 28 98 56 Q82 46 66 50 Z", fill: "currentColor" }]],
        eye: [["path", { d: "M18 60 Q60 20 102 60 Q60 100 18 60 Z", "stroke-width": 6 }], ["circle", { cx: 60, cy: 60, r: 13, fill: "currentColor" }], ["circle", { cx: 60, cy: 60, r: 5, fill: "var(--plate, #0b1020)" }]],
        moon: [["path", { d: "M72 20 A40 40 0 1 0 72 100 A30 30 0 1 1 72 20 Z", fill: "currentColor" }]],
        mountain: [["path", { d: "M14 90 L46 30 L60 54 L72 40 L106 90 Z", fill: "currentColor" }], ["path", { d: "M40 42 L46 30 L52 42 L48 40 L46 46 L44 40 Z", fill: "var(--plate, #0b1020)" }]],
        sun: [["circle", { cx: 60, cy: 60, r: 16, fill: "currentColor" }], ["path", { d: "M60 14 V30 M60 90 V106 M14 60 H30 M90 60 H106 M28 28 L39 39 M81 81 L92 92 M92 28 L81 39 M39 81 L28 92", "stroke-width": 6 }]],
        star: [["path", { d: "M60 14 L66 46 L92 28 L74 54 L106 60 L74 66 L92 92 L66 74 L60 106 L54 74 L28 92 L46 66 L14 60 L46 54 L28 28 L54 46 Z", fill: "currentColor" }]],
        frost: [["path", { d: "M60 14 V106 M20 37 L100 83 M100 37 L20 83", "stroke-width": 6 }], ["path", { d: "M50 24 L60 34 L70 24 M50 96 L60 86 L70 96 M22 52 L36 46 L34 32 M98 52 L84 46 L86 32 M22 68 L36 74 L34 88 M98 68 L84 74 L86 88", "stroke-width": 5 }]],
        serpent: [["path", { d: "M32 92 C14 78 34 60 56 62 C80 64 96 48 76 32 C68 26 58 30 54 40", "stroke-width": 8 }], ["circle", { cx: 52, cy: 44, r: 7, fill: "currentColor" }]],
    }

    function place(parent, spec) {
        const node = draw(spec[0], spec[1])
        if (spec[2]) for (const child of spec[2]) place(node, child)
        parent.appendChild(node)
        return node
    }

    function drawEmblem(figure, name) {
        figure.setAttribute("viewBox", "0 0 120 120")
        figure.classList.add("hyborian__emblem")
        place(figure, ["circle", { cx: 60, cy: 60, r: 55, fill: "var(--plate, #0b1020)", stroke: "currentColor", "stroke-width": 2.5, opacity: 0.9 }])
        place(figure, ["circle", { cx: 60, cy: 60, r: 48, fill: "none", stroke: "currentColor", "stroke-width": 1, opacity: 0.45 }])
        const marks = place(figure, ["g", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }])
        for (const spec of EMBLEMS[name]) place(marks, spec)
        return figure
    }

    function emblem(name) {
        const figure = document.createElementNS(SVG, "svg")
        figure.setAttribute("aria-hidden", "true")
        return drawEmblem(figure, name)
    }

    /* ------------------------------ the section ---------------------------- */

    function text(tag, className, words) {
        const node = document.createElement(tag)
        node.className = className
        node.textContent = words
        return node
    }

    // The hero's painted card: the picture, or, where there is none yet, its
    // emblem on a card of the same shape.
    function front(hero, locked) {
        const card = document.createElement("div")
        card.className = "hyborian__front" + (locked ? " blank" : "")
        card.setAttribute("role", "img")
        card.setAttribute("aria-label", locked ? "Your hero, still locked" : hero.name)
        const painting = document.createElement("div")
        painting.className = "hyborian__painting"
        if (hero.picture) {
            const picture = document.createElement("img")
            picture.src = PICTURES + hero.picture
            picture.alt = ""
            picture.decoding = "async"
            painting.appendChild(picture)
        } else {
            painting.classList.add("hyborian__painting--drawn")
            painting.appendChild(emblem(hero.emblem))
        }
        card.appendChild(painting)
        return card
    }

    // What each stat is, on hover or focus. Never a standing, since there is
    // none.
    const ABOUT = {
        Burning: "intensity over safety: a short blazing life over a long careful one",
        "The Code": "honour and plain dealing over guile: keeping your word against getting round the rules",
        Barbarism: "civilisation as soft and passing: people were stronger when life was harder",
    }

    const PIPS = 10

    // A stat out of ten, as a trading card writes it: the reach along its own
    // scale, rounded, and a row of pips filled that far. The number is the
    // person's own position and no comparison with anybody.
    function stat(dimension, reach, locked) {
        const worth = Math.round(reach * PIPS)
        const told = dimension + ": " + ABOUT[dimension]
        const row = document.createElement("li")
        row.className = "hyborian__stat"
        row.tabIndex = 0
        row.setAttribute("aria-label", locked ? dimension : told + ". " + worth + " out of " + PIPS)
        row.appendChild(text("span", "hyborian__stat-name", dimension.replace(/^The /, "")))
        const pips = document.createElement("span")
        pips.className = "hyborian__pips" + (locked ? " blank" : "")
        pips.setAttribute("aria-hidden", "true")
        for (let at = 0; at < PIPS; at++) {
            const pip = document.createElement("i")
            if (at < worth) {
                pip.className = "hyborian__pip--on"
                pip.style.setProperty("--beat", at)
            }
            pips.appendChild(pip)
        }
        row.appendChild(pips)
        row.appendChild(text("b", "hyborian__stat-worth" + (locked ? " blank" : ""), locked ? "0" : String(worth)))
        if (!locked) {
            row.addEventListener("mouseenter", () => showTip(row, told))
            row.addEventListener("mouseleave", hideTip)
            row.addEventListener("focus", () => showTip(row, told))
            row.addEventListener("blur", hideTip)
        }
        return row
    }

    // The back: who the hero is, the person's three stats, what the hero is
    // said to be, and the flavour text.
    function back(hero, locked) {
        const card = document.createElement("div")
        card.className = "hyborian__back"

        card.appendChild(text("p", "hyborian__kind", "In the Hyborian Age, you would be"))
        card.appendChild(text("h3", "hyborian__name" + (locked ? " blank" : ""), hero.name))

        card.appendChild(text("p", "hyborian__label", "Your stats"))
        const stats = document.createElement("ul")
        stats.className = "hyborian__stats"
        const values = reaches(HERO_ON, locked)
        HERO_ON.forEach((dimension, index) => stats.appendChild(stat(dimension, values[index], locked)))
        card.appendChild(stats)

        card.appendChild(text("p", "hyborian__label", "It predicts that you are…"))
        card.appendChild(text("p", "hyborian__traits" + (locked ? " blank" : ""), hero.keys.join(" · ")))
        card.appendChild(text("p", "hyborian__flavour" + (locked ? " blank" : ""), hero.story))
        return card
    }

    // A line, the two cards, the vote, and a line on what the stats are.
    // Locked, the cards drawn from stand-in values with everything earned on
    // them blurred, and no vote.
    function renderHyborian(locked) {
        const holder = document.createElement("div")
        holder.className = "hyborian"
        holder.style.setProperty("--chart", HERO_COLOUR)

        holder.appendChild(
            text(
                "p",
                "theories__intro hyborian__intro",
                "The Hyborian Age had a philosophy of its own: gods who mostly did not listen, heroes who trusted their own " +
                    "strength, and cities softer than the wilds around them. Here is where your answers would have put you.",
            ),
        )

        const drawn = hero(locked)
        const hand = document.createElement("div")
        hand.className = "hyborian__hand"
        hand.appendChild(front(drawn, locked))
        hand.appendChild(back(drawn, locked))
        holder.appendChild(hand)

        if (locked) return holder

        const vote = document.createElement("div")
        vote.className = "hyborian__vote"
        vote.appendChild(text("p", "climbview__ask", "Does this match you?"))
        vote.appendChild(pickButtons(HERO_KEY, VOTES))
        holder.appendChild(vote)

        holder.appendChild(
            text(
                "p",
                "climbview__note hyborian__note",
                "Each stat is how far along its own scale your answers reach, out of ten. Nothing here is compared with other " +
                    "people, only with a handful of lives that were never lived.",
            ),
        )
        return holder
    }

    // The badge is the top of the hero's card, the whole width of it cut to
    // a square, border and all, so it reads as the card itself on the shelf;
    // a hero with no painting is its emblem, on the heads' pattern.
    function badge() {
        const drawn = hero(false)
        const token = document.createElement("span")
        token.className = "shelf__badge-emblem"
        if (drawn.picture) {
            const picture = document.createElement("img")
            picture.className = "hyborian__badge"
            picture.src = PICTURES + drawn.picture
            picture.alt = ""
            token.appendChild(picture)
            return token
        }
        const figure = emblem(drawn.emblem)
        figure.style.setProperty("--half", HERO_COLOUR)
        token.appendChild(figure)
        return token
    }

    return {
        HYBORIAN_OF: HYBORIAN_OF,
        HERO_KEY: HERO_KEY,
        GOD_KEY: GOD_KEY,
        HERO_ON: HERO_ON,
        ready: ready,
        renderHyborian: renderHyborian,
        badge: badge,
    }
}
