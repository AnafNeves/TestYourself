/* =========================================================================
   The Hyborian Age, as two cards side by side on level 1's pattern: which of
   Howard's heroes the person would have been, and which of his gods would
   have claimed them. The two are read from disjoint dimensions — the hero
   from how somebody would live (Burning, the Code, Barbarism), the god from
   what they take the world to be (Indifference, Afterlife, the Gift at
   Birth, Sacred Pleasure) — so the pair says something the cards alone do
   not: a Thief claimed by Mitra, a King who answers to Crom.

   The hero is the nearest corner of a cube: each of its three dimensions is
   a reach along its own scale, high or low, and all eight corners have a
   face. The god is the nearest of five written profiles on the other four.
   Nothing is read against other people, so the questionnaire carries no
   norms and goes through `dimensionsIn`, the wheel's exception: what is
   compared is the person's answers with a handful of fictional lives.

   The pictures are emblems and not faces, on purpose: "Conan" is a live
   trademark and every likeness since Howard is somebody's copyright, so the
   heroes are archetypes drawn as what they carry (a sword, a key, a crown)
   and the gods as what they are (a mountain, a sun, a serpent).
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

    // The colour each card votes and draws in: bronze for the hero, the
    // questionnaire's own, and a cold blue for the gods.
    const HERO_COLOUR = "#c0873a"
    const GOD_COLOUR = "#8aa7d6"

    // The eight heroes, one a corner of the cube (`at`, in the order of
    // HERO_ON: Burning, the Code, Barbarism; 1 is high). `keys` is what the
    // card says it predicts; `story` is who the archetype is modelled on,
    // said in the tooltip in the third person and claiming nothing about the
    // person. No hero is named after a character on screen.
    const HEROES = [
        {
            name: "The Barbarian",
            emblem: "sword",
            at: [1, 1, 1],
            keys: ["fierce", "straightforward", "untamed", "loyal to your own"],
            story: "The northern swordsman come down out of the hills: burning, plain-dealing, and sure that the cities have gone soft.",
        },
        {
            name: "The Free Blade",
            emblem: "blades",
            at: [1, 1, 0],
            keys: ["bold", "honourable", "your own master", "at home anywhere"],
            story: "The mercenary who sells her sword and keeps her word, and is at home in any city that will have her.",
        },
        {
            name: "The Pirate Queen",
            emblem: "sail",
            at: [1, 0, 1],
            keys: ["burning", "ruthless", "devoted", "wild"],
            story: "The queen of the Black Coast: no law but her own, a love that would drive her back from the dead, and the sea for a kingdom.",
        },
        {
            name: "The Thief",
            emblem: "key",
            at: [1, 0, 0],
            keys: ["quick", "cunning", "restless", "at home in the crowd"],
            story: "The prince of thieves in a city of towers: what the clever take, the strong cannot hold.",
        },
        {
            name: "The King",
            emblem: "crown",
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
            at: [0, 0, 0],
            keys: ["patient", "calculating", "learned", "hungry for more"],
            story: "The priest of the serpent: patient, learned, bound by nothing, and after more than a life can hold.",
        },
        {
            name: "The Witch",
            emblem: "moon",
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
    // the god is borrowed from.
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

    function ready() {
        return HERO_ON.concat(GOD_ON).every((dimension) => known(dimension) && score(dimension) !== undefined)
    }

    // Each dimension as a reach along its own scale, hashed stand-ins when
    // the level is locked.
    function reaches(list, locked) {
        return list.map((dimension) => reachOf(dimension, locked ? teaseValue(dimension) : score(dimension)))
    }

    // Everything tied nearest to the point, on the wheel's rule: a tie names
    // every one of them rather than picking, and is rare, wanting the point
    // exactly as far from two profiles.
    function nearest(list, point) {
        let best = Infinity
        let found = []
        for (const one of list) {
            const gap = one.at.reduce((sum, value, index) => sum + (value - point[index]) * (value - point[index]), 0)
            if (gap < best - 1e-9) {
                best = gap
                found = [one]
            } else if (Math.abs(gap - best) < 1e-9) found.push(one)
        }
        return found
    }

    function heroes(locked) {
        return nearest(HEROES, reaches(HERO_ON, locked))
    }

    function gods(locked) {
        return nearest(GODS, reaches(GOD_ON, locked))
    }

    /* ------------------------------ drawing -------------------------------- */

    // Each emblem is a few strokes on a round plate, 120 across, in
    // currentColor, so a card and a badge draw it in their own colour.
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
        none: [],
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

    /* ------------------------------ the section ---------------------------- */

    function text(tag, className, words) {
        const node = document.createElement(tag)
        node.className = className
        node.textContent = words
        return node
    }

    // One of the two cards, on level 1's rows: what is being read, the
    // emblem, the name, "It predicts…" over a few words, and the vote. Two
    // tied at the top are named together and predict nothing, the star
    // card's rule where the day was not given; more than two — answers in
    // the middle of everything — name nobody, on an empty plate.
    function card(kind, found, colour, ask, key, locked) {
        const many = found.length > 2
        const one = document.createElement("div")
        one.className = "theory hyborian__card"
        one.style.setProperty("--chart", colour)

        one.appendChild(text("p", "theory__kind", kind))

        const figure = document.createElementNS(SVG, "svg")
        figure.setAttribute("role", "img")
        figure.setAttribute("aria-label", locked ? kind + " still locked" : many ? "No one in particular" : found.map((it) => it.name).join(" or "))
        figure.classList.add("theory__figure")
        if (locked) figure.classList.add("blank")
        drawEmblem(figure, many ? "none" : found[0].emblem)
        if (!locked && !many) {
            const told = found.map((it) => it.story).join(" ")
            figure.tabIndex = 0
            figure.addEventListener("mouseenter", () => showTip(figure, told))
            figure.addEventListener("mouseleave", hideTip)
            figure.addEventListener("focus", () => showTip(figure, told))
            figure.addEventListener("blur", hideTip)
        }
        one.appendChild(figure)

        const name = text("p", "theory__name" + (locked ? " blank" : ""), many ? "No one in particular" : found.map((it) => it.name).join(" or "))
        one.appendChild(name)

        if (found.length === 1) {
            one.appendChild(text("p", "theory__predicts", key === HERO_KEY ? "It predicts that you are…" : "It predicts that you believe…"))
            const list = document.createElement("ul")
            list.className = "theory__keys" + (locked ? " blank" : "")
            for (const word of found[0].keys) list.appendChild(text("li", "", word))
            one.appendChild(list)
        } else {
            one.appendChild(text("p", "theory__why", many ? "Your answers sit in the middle of them all, and none can claim you." : "Your answers sit exactly between them."))
        }

        if (!locked) {
            const vote = document.createElement("div")
            vote.className = "hyborian__vote"
            vote.appendChild(text("p", "climbview__ask", ask))
            vote.appendChild(pickButtons(key, VOTES))
            one.appendChild(vote)
        }
        return one
    }

    // The seven dimensions as bars under the cards, on the climb's pattern:
    // the hero's three in its colour and the god's four in theirs, each
    // filled to the reach the card was read from, so the bars and the cards
    // cannot disagree. The tooltip says what the dimension is, never a
    // standing, since there is none.
    const ABOUT = {
        Burning: "intensity over safety: a short blazing life over a long careful one",
        "The Code": "honour and plain dealing over guile: keeping your word against getting round the rules",
        Barbarism: "civilisation as soft and passing: people were stronger when life was harder",
        Indifference: "no god or fate is watching, and asking one is a way of doing nothing",
        Afterlife: "something comes after death, and it matters to how you live",
        "The Gift at Birth": "what you have was given at birth; the rest is what you do with it",
        "Sacred Pleasure": "the body and its pleasures as holy rather than base",
    }

    function bars(locked) {
        const chart = document.createElement("div")
        chart.className = "climbview__bars hyborian__bars"
        chart.setAttribute("role", "list")
        const groups = [
            [HERO_ON, HERO_COLOUR],
            [GOD_ON, GOD_COLOUR],
        ]
        for (const group of groups) {
            const values = reaches(group[0], locked)
            group[0].forEach((dimension, index) => {
                const told = dimension + ": " + ABOUT[dimension]
                const column = document.createElement("div")
                column.className = "climbview__col"
                column.setAttribute("role", "listitem")
                column.setAttribute("aria-label", told)
                column.tabIndex = 0
                column.style.setProperty("--key", group[1])
                column.innerHTML = '<span class="climbview__track" aria-hidden="true"><i class="climbview__fill"></i></span><b class="climbview__name"></b>'
                column.querySelector(".climbview__fill").style.height = Math.round(values[index] * 100) + "%"
                column.lastChild.textContent = dimension.replace(/^The /, "")
                column.addEventListener("mouseenter", () => showTip(column.firstChild, told))
                column.addEventListener("mouseleave", hideTip)
                column.addEventListener("focus", () => showTip(column.firstChild, told))
                column.addEventListener("blur", hideTip)
                chart.appendChild(column)
            })
        }
        return chart
    }

    // Two sentences, the two cards, the bars they were read from and a line
    // on what the bars are. Locked, the cards alone, with stand-in names and
    // the emblems blurred and no votes: bars drawn from stand-in values would
    // be seven readable numbers nobody earned.
    function renderHyborian(locked) {
        const holder = document.createElement("div")
        holder.className = "theories hyborian"

        const intro = document.createElement("p")
        intro.className = "theories__intro"
        intro.textContent =
            "The Hyborian Age had a philosophy of its own: gods who mostly did not listen, heroes who trusted their own " +
            "strength, and cities softer than the wilds around them. Read from your answers, here is who you would have been " +
            "in it, and who would have claimed you."
        holder.appendChild(intro)

        const pair = document.createElement("div")
        pair.className = "theories__pair"
        pair.appendChild(card("Your hero is", heroes(locked), HERO_COLOUR, "Does this match you?", HERO_KEY, locked))
        pair.appendChild(card("The god who would claim you is", gods(locked), GOD_COLOUR, "Does this match what you believe?", GOD_KEY, locked))
        holder.appendChild(pair)

        if (locked) return holder

        holder.appendChild(bars(false))
        holder.appendChild(
            text(
                "p",
                "climbview__note hyborian__note",
                "The hero is read from the first three, the god from the other four. Each bar is how far along its own scale " +
                    "your answers reach. Nothing here is compared with other people, only with a handful of lives that were never lived.",
            ),
        )
        return holder
    }

    // The badge is the god's emblem, in the god's colour, on the heads'
    // pattern: a level with no drawing to crop hands back an emblem.
    function badge() {
        const token = document.createElement("span")
        token.className = "shelf__badge-emblem"
        const figure = document.createElementNS(SVG, "svg")
        figure.setAttribute("aria-hidden", "true")
        drawEmblem(figure, gods(false)[0].emblem)
        figure.style.setProperty("--half", GOD_COLOUR)
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
