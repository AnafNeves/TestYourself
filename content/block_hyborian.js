/* ==========================================================================
   content/block_hyborian.js — a level on the philosophy of Robert E.
   Howard's Hyborian Age, being tried out and not decided on. ASKED BY NO
   BATTERY: it is on the timeline, as a level of its own (`Hyborian`) in the
   second fork, so that it has a place, a key and a name, but it is in ASIDE
   in content/timeline.js, so neither `default` nor `all` asks it. A run
   meets it only through a link naming it — `?start=hyborian`, which asks a
   block whatever the battery says and walks that level first, ahead of
   General. It is not in the ethics application. It is written to be shared
   in the fandom, and to be worth reading beside the rest of the run.

   WHAT IS ASKED: one briefing and one questionnaire of twenty-one custom
   statements, unvalidated, on a seven-point agreement scale, under seven
   dimensions. Three say how somebody would live in that world and four say
   what they take the world to be, and the level closes on two cards read
   from those two sets separately (js/figures/hyborian.js): which HERO the
   first three make them, out of eight, and which GOD the other four would
   have claim them, out of five. The two are read from disjoint dimensions
   on purpose, so that the pair says something — a Thief claimed by Mitra is
   news, where two readings of the same numbers would mostly agree.

     The hero, three dimensions, each a corner of a cube:
       Burning     intensity over safety; vitalism. After Conan's creed in
                   Queen of the Black Coast: "let me live deep while I live".
                   Nothing else in the run measures it
       The Code    honour and plain dealing against guile, one bipolar scale:
                   two items keep one's word, one (reversed) is the thief's —
                   rules are for those not clever enough to get round them. Hook:
                   HEXACO Honesty-Humility, and the opinions level's
                   Order (the law obeyed though thought wrong)
       Barbarism   civilisation as soft, unnatural and passing — the thesis
                   of Beyond the Black River. Declinism. Hook: the opinions
                   level's Enhancement, the other way

     The god, four dimensions:
       Indifference    Crom's: no god or fate is watching, and asking one
                       is a way of doing nothing. Not unbelief — an
                       indifferent god is still a god. Hook: the reverse of
                       the primals' Alive (intentional, interactive)
       Afterlife       that something comes after death, and that it matters
                       to how one lives; at its foot the Cimmerian grey mist,
                       where when it's over, it's over. Nothing else in the
                       run asks about death
       The Gift at Birth  Crom gives courage and strength at birth and
                       nothing after: one's nature is given, and using it is
                       one's own affair. Hook: the opinions level's Heredity,
                       which it overlaps and is kept anyway, being the most
                       Cimmerian thing here
       Sacred Pleasure the body and its pleasures as holy rather than base —
                       Ishtar's and Derketo's ground, the opposite of
                       asceticism. Hook: the sexuality level, and the
                       HEXACO's Diligence the other way

   WHAT WAS WEIGHED AND LEFT OUT, and why, so that it is not written twice:
   the Veil (the world of appearances hides a deeper truth) is the CMQ's
   Suspicion; Kinship with Beasts is the opinions level's Animals; Instinct
   (the body knows before the mind) is the MINT; Steel over Sorcery (wariness
   of hidden power) is spread over the BAIT's Apprehension and Suspicion;
   Pure Evil and the Written Hour (Erlik's fatalism) both overlap
   Indifference — "things happen for a reason" loads on fate as much as on
   providence — and each would want a god of its own to earn its place.
   Asking No One is folded into Indifference through its prayer item.

   NO NORMS, on purpose, like the archetypes' wheel: the hero is the nearest
   corner of the cube of three reaches and the god the nearest of five
   written profiles, so nothing is read against other people and no invented
   mean is needed. `profile: false`, since the whole-run web is where
   somebody stands against others and none of this is that. No attention
   check: three minutes is too short a level to seed one in.

   RIGHTS. Howard died in 1936, so his texts and the characters as he wrote
   them are public domain in the UK and EU. "Conan" is a live trademark, so
   the name is on no screen: the heroes are archetypes (the Barbarian, not
   Conan) and the level is named for the age. Later likenesses — Frazetta,
   the 1982 film — are not drawn on, and the figure draws emblems rather
   than faces for that reason. Howard's peoples are written on racial lines,
   and no hero is a people.
   ========================================================================== */

defineBlock("hyborian", [
    {
        type: "briefing",
        key: "Briefing_Hyborian",
        text:
            "<h2>An age undreamed of.</h2>" +
            "<p>Nearly a century ago, a young writer in a small Texan town invented a world: an age between the sinking " +
            "of Atlantis and the rise of history, with kingdoms, gods and a philosophy of its own. Its heroes trusted " +
            "their own strength, its gods mostly did not listen, and its cities were softer than the wilds " +
            "around them.</p>" +
            "<p>The next statements are about that philosophy: what the world is, and how to live in it. There " +
            "is no right answer. At the end you will find out which of its heroes you would have been, and which " +
            "of its gods would have claimed you.</p>",
    },

    {
        key: "hyborian",
        name: "The Hyborian Age",
        // Nothing here is placed against other people, and a person's
        // metaphysics has no business on a card made to be shared.
        profile: false,
        instructions: "Please indicate the extent to which you agree or disagree with each statement",
        format: {
            options: [1, 2, 3, 4, 5, 6, 7],
            anchors: ["Strongly disagree", "Strongly agree"],
            // No hovercolors: there is no good end of any of these.
            color: "#c0873a",
        },

        items: [
            // The hero ---------------------------------------------------

            // Burning: intensity over safety, and the dark days as part of a
            // full life rather than a flaw in it.
            {
                key: "Hyborian_Burning_1",
                dimension: "Burning",
                text: "I would rather have a short, blazing life than a long, careful one",
            },
            {
                key: "Hyborian_Burning_2",
                dimension: "Burning",
                text: "I would not trade my darkest days for a flatter life",
            },
            {
                key: "Hyborian_Burning_3",
                dimension: "Burning",
                text: "Playing it safe is a waste of a life",
            },

            // The Code: honour and plain dealing at one end, the thief's
            // guile at the other. The reversed item is the Thief's Luck of
            // the first draft, folded in as the other pole; its second item
            // ("The clever take what the strong cannot hold") went to keep
            // three items a dimension.
            {
                key: "Hyborian_Code_1",
                dimension: "The Code",
                text: "I keep my word even when nobody would know I broke it",
            },
            {
                key: "Hyborian_Code_2",
                dimension: "The Code",
                text: "I say what I mean, even when it costs me",
            },
            {
                key: "Hyborian_Code_3",
                dimension: "The Code",
                text: "Rules are for people who aren't clever enough to get around them",
                reverse: true,
            },

            // Barbarism: civilisation as soft, unnatural and passing.
            {
                key: "Hyborian_Barbarism_1",
                dimension: "Barbarism",
                text: "Modern life has made people soft",
            },
            {
                key: "Hyborian_Barbarism_2",
                dimension: "Barbarism",
                text: "Life today is better than it has ever been",
                reverse: true,
            },
            {
                key: "Hyborian_Barbarism_3",
                dimension: "Barbarism",
                text: "People are stronger when life is harder",
            },

            // The god ----------------------------------------------------

            // Indifference: no god or fate is watching. The third item is
            // Asking No One's, and is what makes the scale Crom's rather
            // than a plain absence of providence.
            {
                key: "Hyborian_Indifference_1",
                dimension: "Indifference",
                text: "Things happen for a reason",
                reverse: true,
            },
            {
                key: "Hyborian_Indifference_2",
                dimension: "Indifference",
                text: "No god or fate is watching over me",
            },
            {
                key: "Hyborian_Indifference_3",
                dimension: "Indifference",
                text: "Praying for something is a way of not doing anything about it",
            },

            // Afterlife: something comes after death, and it matters. The
            // two reversed items are the grey realm's, which is where a low
            // score sits.
            {
                key: "Hyborian_Afterlife_1",
                dimension: "Afterlife",
                text: "What happens after death matters to how I live",
            },
            {
                key: "Hyborian_Afterlife_2",
                dimension: "Afterlife",
                text: "When it's over, it's over, and that's fine",
                reverse: true,
            },
            {
                key: "Hyborian_Afterlife_3",
                dimension: "Afterlife",
                text: "This life does not need an afterlife to be worth living",
                reverse: true,
            },

            // The Gift at Birth: what you have was given, and the rest is
            // what you do with it.
            {
                key: "Hyborian_Gift_1",
                dimension: "The Gift at Birth",
                text: "You are born with what you have; the rest is about what you do with it",
            },
            {
                key: "Hyborian_Gift_2",
                dimension: "The Gift at Birth",
                text: "Nobody can give you courage; you either have it or you don't",
            },
            {
                key: "Hyborian_Gift_3",
                dimension: "The Gift at Birth",
                text: "People can become anything they set their minds to",
                reverse: true,
            },

            // Sacred Pleasure: the body and its pleasures as holy rather
            // than base. The reversed item is the ascetic's.
            {
                key: "Hyborian_Pleasure_1",
                dimension: "Sacred Pleasure",
                text: "Pleasure is a gift, not a temptation",
            },
            {
                key: "Hyborian_Pleasure_2",
                dimension: "Sacred Pleasure",
                text: "Enjoying the body is nothing to be ashamed of",
            },
            {
                key: "Hyborian_Pleasure_3",
                dimension: "Sacred Pleasure",
                text: "The body's appetites are there to be controlled, not indulged",
                reverse: true,
            },
        ],
    },
])
