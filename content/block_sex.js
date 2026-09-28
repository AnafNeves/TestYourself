/* ==========================================================================
   content/block_sex.js — a level on sexuality, being looked into and not yet
   decided on. ASKED ONLY BY `?battery=all`: it is on the timeline, as a level
   of its own (`Sexuality`) in the second fork, but it is in WORK_IN_PROGRESS in
   content/timeline.js, so the `default` battery — what a link naming none
   asks — leaves it out. It is not in the ethics application, and no link a
   participant is sent may name `all`. Moving it into `default` takes THE
   BLOCKERS, below, first.

   The file is in three parts: what is asked (this header, then the block),
   then NOTES — the thinking so far, kept beside the block it is about rather
   than in a conversation nobody can find again — then SHELVED, the items
   written and taken out, kept whole so that any of them can come back.

   WHAT IS ASKED (September 2026), in order:

     Briefing_Sexuality  LOCKED IN. Why a test of the person asks about sex
                         at all: a large part of a life and a small part of
                         the science, too often studied as a problem.
     sexuality           LOCKED IN. Orientation (and, after "Something
                         else", in their own words); the number of women and of
                         men somebody has had sex with, asked by the
                         orientation as a behavioural check on it; and
                         masculine-feminine on a slider. Scored nowhere.
     Briefing_Kinks      ACTIVE. What the list is, before its first item, so
                         that it does not come out of the blue.
     kinks               ACTIVE. Twenty-two items — fourteen kinks, eight of
                         them asked as their two sides — one screen each,
                         answered as one cell of a grid: does it turn you on
                         (Not for me / I'm fine with it / Turns me on) across,
                         and have you done it (Never / not yet, Once or twice,
                         Many times, Part of my sex life) down. Scored as how
                         many turn somebody on: Kinkiness, vanilla to kinky.
                         Everything else a cell says — done without wanting,
                         wanted and never done, which side — is in the words,
                         for the figure and the analysis.

   The level closes on one figure (js/figures/kinks.js): the crowd as a
   violin, stood on end, of how many of the items turn people on, with the
   person's band lit and where they stand among those people, how many of their
   turn-ons they have lived out, and one sentence naming the rarest that
   turns them on and how many people share it. Everything on the level is
   `profile: false`. Why kinks at all, what else measures them, what was
   weighed and why this — under THE KINKS in NOTES.

   `liking` (Sexual Liking, erotophilia-erotophobia as the affect ten ordinary
   cues meet with) was asked here until September 2026 and is PARKED under
   SHELVED. The one PLACEHOLDER item that stood in for Desire (libido) went
   with the plane it drove.

   THE BLOCKERS, before `default` may ask it:

     1. IT CANNOT BE MADE OPTIONAL YET. A fork orders the levels in it but
        every one is walked in the end, so somebody who does not want to be
        asked about sex has no way past the level but closing the tab. It
        wants a way to decline a whole level, which the engine does not have.
     2. ARTICLE 9. Sex life and sexual orientation are special-category data
        under UK GDPR Article 9, like the opinions level's political opinions,
        and explicit items want an amendment (A5/A6). Anything whose extremes a
        committee would not pass — incest, animals, ages, gore — is out, and
        `askable` in data/norms/norms_bks.R marks which. Unwanted attention is
        asked, if at all, only as a consensual game: asked straight, its
        experience would be a question about assault.
     3. NO WAY TO DECLINE AN ITEM without leaving its dimension unfinished. A
        `custom` answer ("I'd rather not say") holds the dimension unscored.
        The kinks get round it by scoring "I'd rather not say" as not a
        turn-on (`score: 0`, see KINK_GRID) rather than as custom, so a skip
        costs the count one and not the result; the file keeps the words, so
        an analysis can tell a skip from a no. Anything else scored on the
        level would want the same thought.
     4. WHETHER SOMEBODY'S OWN RESULTS MAY BE SHARED. Every level carries
        "Share these results", a link and an image; this one's carries a
        person's sex life to whoever it is sent to, and on from there.

   ========================================================================== */

// The field the two partner counts are typed into, one for both so that they
// cannot drift apart. Free text rather than a number, since what is asked for
// is an estimate and people give one as "about 10" or "20-30"; optional, so
// it can be skipped (a blank is saved as "", not as the null of never asked).
// `max` is the field's length in characters, not a cap on the count.
const SEX_PARTNERS = { input: "text", max: 30, optional: true, placeholder: "An approximate number" }

// A way out of an item somebody would rather not answer. It holds the
// dimension unfinished (THE BLOCKERS, 3).
const SEX_RATHER_NOT = { value: 98, text: "I'd rather not say", small: true, custom: true }

// THE KINKS. Each item is one kink, or one side of one, answered as a cell
// of a grid (`type: "grid"`): across, whether it turns somebody on — Not for
// me / I'm fine with it / Turns me on — and down, whether they have done it —
// Never / not yet, Once or twice, Many times, Part of my sex life. Two scales
// at one press, so that the cells a single line of steps cannot reach are
// answers: fine with it and done regularly (the accommodating partner, the
// commonest answer to some of these), turned on and never done (the
// fantasy), not for me and done (tried and disliked — or done for somebody
// else, which the analysis reads off the "many times" row of that column and
// nothing on screen names). Three columns rather than four because a phone
// fits three; three lifetime rows and one present-tense one, so a habit given
// up is "many times".
//
// The cells are written out as options (`gridOf`), one a pair, each carrying
// the `across` and `down` value it stands at, so that the file, the codebook
// and test mode see an ordinary choice; only renderGrid() in app.js reads the
// table. A cell's text is its two headers, which is what `said()` saves
// ("Turns me on · Once or twice"). What is scored is the column alone
// (`score:`, read by counted() in app.js in place of the value): 1 for a
// turn-on and 0 otherwise, so the dimension's mean is the share of the items
// that turn somebody on and the figure draws it as a count. The row is in the
// words.
//
// "I'd rather not say" is a way out under the table, scored 0 and NOT custom:
// custom would hold the dimension unfinished (THE BLOCKERS, 3) and one skip
// would cost the whole result. The file keeps the words, so a skip can be
// told from a no.
const KINK_COLOUR = "#c2417a"
const KINK_ACROSS = [
    { value: 0, text: "Not for me", score: 0 },
    { value: 1, text: "I'm fine with it", score: 0 },
    { value: 2, text: "Turns me on", score: 1 },
]
const KINK_DOWN = [
    { value: 0, text: "Never / not yet" },
    { value: 1, text: "Once or twice" },
    { value: 2, text: "Many times" },
    { value: 3, text: "Part of my sex life" },
]
const KINK_RATHER_NOT = { value: 98, text: "I'd rather not say", small: true, score: 0 }

// A grid format out of its two scales: the table for the renderer, and the
// cells as options for everything else. A cell's value is its row and column
// (10 × down + across), legible in the file's values though nothing reads it
// back that way; its score is its column's.
function gridOf(across, down, ways) {
    const options = []
    for (const row of down)
        for (const column of across)
            options.push({
                value: 10 * row.value + column.value,
                text: column.text + " · " + row.text,
                score: column.score,
                across: column.value,
                down: row.value,
            })
    return { grid: { across: across, down: down }, options: options.concat(ways), color: KINK_COLOUR }
}
const KINK_GRID = gridOf(KINK_ACROSS, KINK_DOWN, [KINK_RATHER_NOT])

// A kink with two sides — spanking somebody, being spanked — is two items,
// `Sex_Kink_<Name>_Giving` and `Sex_Kink_<Name>_Receiving`, and not one item
// with a which-side follow-up: the follow-up could only be asked of those the
// kink turned on, so it lost exactly the person who is fine with receiving it
// for a partner, and its one line put a switch and somebody indifferent on
// the same middle point. Two items give Role as two scores — the giving
// items' turn-ons and the receiving items' — which is what NOTES asks for, at
// the cost of eight more screens. A side is an item of its own in Kinkiness:
// being spanked and spanking are different turn-ons. Nothing pairs the two
// on screen; the analysis pairs them by the key.
function sided(name, giving, receiving) {
    return [
        { key: "Sex_Kink_" + name + "_Giving", dimension: "Kinkiness", text: giving },
        { key: "Sex_Kink_" + name + "_Receiving", dimension: "Kinkiness", text: receiving },
    ]
}

defineBlock("sex", [
    // The briefing: why a test of the person asks about this at all. It says
    // where the questions come from — that sexuality is a large part of a
    // life and a small part of the science, and that where it is studied it
    // is too often studied as a problem — and that here it is asked as the
    // ordinary thing it is. Like every briefing it says nothing about where
    // in the run it falls, so the level can move.
    {
        type: "briefing",
        key: "Briefing_Sexuality",
        text:
            "<h2>Sexuality.</h2>" +
            "<p>Few things matter as much to a life and have been studied as little as sexuality. Where psychology has looked at sexuality at all, it has mostly looked at it as a problem: as deviance, dysfunction or addiction. For nearly everybody it is none of these. It is a normal, natural and important part of being alive, and it deserves to be measured as such.</p>" +
            "<p><em>There are no right answers, and nothing here is judged. Answer as honestly as you can.</em></p>",
    },

    {
        key: "sexuality",
        name: "Sexuality",
        instructions: "",
        // Held in the order written, as the demographics are: the partner
        // counts branch off the orientation and have to come after it.
        shuffle: false,

        // Nothing here carries a dimension: these are saved as given and
        // scored nowhere. The level is scored through `kinks` below, which
        // the figure reads, as a fork's slots must be (the next
        // choice is offered from the results screen of the one just
        // finished).
        items: [
            // Sexual orientation, after the Kinsey scale (Kinsey et al., 1948)
            // but written in terms of women and men rather than of the
            // "opposite" and "same" sex, so that it means the same thing
            // whatever somebody answered to `Demographics_Gender` — including
            // "It's more complex than that". Kinsey's X, attracted to nobody,
            // is an answer outside the scale rather than a point on it.
            //
            // "Something else" is for somebody the line between women and men
            // does not describe — attraction to people outside the two, or not
            // turning on gender at all — for whom "equally" would be a wrong
            // answer rather than an approximate one. It opens a typed follow-up
            // (the `Demographics_GenderIdentity` pattern), whose words ("pan",
            // "queer", "demi") want coding at analysis time. Like the other two
            // ways out it is outside the scale. This item is attraction, not
            // the label somebody goes by; an identity item (straight, gay,
            // bisexual…, as the ONS asks it) would be a second item, not a
            // longer list here.
            {
                key: "Sex_Orientation",
                text: "I am sexually attracted to...",
                format: {
                    options: [
                        { value: 1, text: "Only women" },
                        { value: 2, text: "Mostly women" },
                        { value: 3, text: "More women than men" },
                        { value: 4, text: "Women and men equally" },
                        { value: 5, text: "More men than women" },
                        { value: 6, text: "Mostly men" },
                        { value: 7, text: "Only men" },
                        { value: 8, text: "Something else", small: true, custom: true },
                        { value: 99, text: "Nobody, or hardly anybody", small: true, custom: true },
                        { value: 98, text: "I'd rather not say", small: true, custom: true },
                    ],
                    color: "#c2417a",
                },
            },
            {
                key: "Sex_OrientationOther",
                text: "I would describe it as...",
                showIf: { key: "Sex_Orientation", is: 8 },
                format: { input: "text", max: 60, optional: true, placeholder: "In your own words", color: "#c2417a" },
            },

            // Body count, as a behavioural check on the orientation above:
            // asked of the sex or sexes somebody is attracted to, so "only
            // women" is asked about women alone, "only men" about men alone,
            // and everything else — the five in between, something else,
            // nobody, rather not say — about both. A gap between the two answers is then a
            // gap between attraction and behaviour, which is the point of
            // asking it this way.
            {
                key: "Sex_PartnersWomen",
                text: "How many women have you had sex with, in your life so far?<br /><br /><small>Count everyone you have had any kind of sex with, not only intercourse.</small>",
                showIf: { key: "Sex_Orientation", is: [1, 2, 3, 4, 5, 6, 8, 98, 99] },
                format: SEX_PARTNERS,
            },
            {
                key: "Sex_PartnersMen",
                text: "How many men have you had sex with, in your life so far?<br /><br /><small>Count everyone you have had any kind of sex with, not only intercourse.</small>",
                showIf: { key: "Sex_Orientation", is: [2, 3, 4, 5, 6, 7, 8, 98, 99] },
                format: SEX_PARTNERS,
            },

            // Masculine-feminine, custom: one bipolar self-placement of gender
            // expression, not of sex or of identity. It is one axis on purpose,
            // for a single item, although Bem (1974) measured masculinity and
            // femininity as two scales that need not trade off; if the level is
            // written it may want the two. About gender rather than sexuality,
            // so if no level is ever written here it belongs with the
            // demographics instead.
            {
                key: "Sex_MasculineFeminine",
                text: "In general, I see myself as...",
                type: "slider",
                format: {
                    min: 0,
                    max: 100,
                    anchors: ["Very masculine", "Very feminine"],
                    options: [{ value: 999, text: "This doesn't apply to me", small: true, custom: true }],
                    color: "#c2417a",
                },
            },
        ],
    },

    // The briefing before the kinks, so that the first of them does not
    // arrive out of the blue straight after the orientation and the counts.
    // It says what the list is, that it runs from the common to the rare and
    // that not everything on it is meant to appeal, what the steps ask, and
    // that there is always a way out; and it promises the figure, which is
    // the reason to answer honestly. Like every briefing it says nothing about
    // where in the run it falls.
    {
        type: "briefing",
        key: "Briefing_Kinks",
        text:
            "<h2>Kinks.</h2>" +
            "<p>What follows is a list of kinks: things that turn some people on and leave others cold, from the very common to the rare. Some will be familiar and some may surprise you. Nobody likes all of them, and most of them are not for most people. That is the point: everybody's list is different, and at the end you will see where yours falls among other people's.</p>" +
            "<p><em>For each one, say whether it turns you on and whether you have done it, with one press. You can always answer “I'd rather not say”.</em></p>",
    },

    // THE KINKS: fourteen, on a LADDER of prevalence — from rough sex, which
    // turns on most people, down to objectification, which turns on almost
    // nobody, a rung or two in every band between (dirty talk, at 94%, was
    // the top rung and came off as too near the floor to tell anybody apart;
    // sexting holds the common end with rough sex and anal) — so that the count
    // tells people apart at both ends and not only in the middle; eight of
    // them asked as their two sides (`sided`), which makes twenty-two items. Acts and
    // scenarios only: no fetish objects (feet, outfits, crossdressing), which
    // are attractions rather than things done and a construct of their own,
    // and no fantastical items (creatures, transformation, hypnosis), taken
    // out September 2026 as too specific, hypnosis reading as a cover for
    // being controlled, which the power pair asks straight. Each beside the
    // BKS interest it stands nearest and that interest's share of the BKS's
    // adults finding it arousing at all, which is what the figure's
    // rarest-kink sentence reads (`SHARES` in js/figures/kinks.js, which has
    // to move with this list; a `~` is an estimate where the BKS has no such
    // item, to be replaced by the app's own data); adapted, not the BKS's
    // words, so the shares are a guide and not norms. Oral sex is left out as
    // turning on 99% of people, which tells nobody apart. Everything here is
    // `askable` in data/norms/norms_bks.R or not in the BKS at all.
    //
    // THE NORM IS A PLACEHOLDER, loosely the BKS's: its histogram of how many
    // of nineteen earlier kinks turned its 12,123 adults on (BKSPublic.csv,
    // September 2026), stretched over the twenty-two items — a side is an item
    // here and part of a kink there, so the two do not count the same thing —
    // until the app has a crowd of its own; the mean and SD are the BKS's
    // shares, unstretched. Written on the scale the dimension is scored on,
    // the share of the items, a bin an item centred on its count. It is
    // worked out again whenever an item comes or goes.
    {
        key: "kinks",
        name: "Kinks",
        profile: false,
        type: "grid",
        instructions: "Does it turn you on, and have you done it?",
        format: KINK_GRID,
        norms: {
            Kinkiness: {
                key: "Kinkiness",
                // How many people the standing is read against, said beside
                // it on the figure: the BKS adults the histogram is stretched
                // from, until the app's own crowd replaces both.
                n: 12123,
                mean: 0.408,
                sd: 0.213,
                distribution: {
                    from: -0.5 / 22,
                    step: 1 / 22,
                    shares: [0.3, 2.0, 4.0, 5.6, 6.8, 7.5, 8.0, 8.3, 7.9, 7.3, 7.1, 6.5, 5.7, 5.0, 4.1, 3.3, 2.9, 2.4, 1.8, 1.3, 1.0, 0.7, 0.4],
                },
            },
        },
        items: [
            // The common rungs. Giving anal sex is glossed so that it is the
            // same item for everybody: a body, a toy or a strap-on. Rough sex
            // is worded as what is done to a body, so that it stays apart
            // from dominating, which is a relation.
            { key: "Sex_Kink_Sexting", dimension: "Kinkiness", text: "Sexting: sending each other explicit messages or pictures" }, // not a BKS category, ~65
            { key: "Sex_Kink_Rough", dimension: "Kinkiness", text: "Rough sex, such as hair-pulling, biting or being pinned down" }, // Primal play, ~75
            ...sided(
                "Anal",
                "Giving anal sex<br /><small>With your body, or with a toy or a strap-on.</small>",
                "Receiving anal sex",
            ), // Anal sex, 73
            ...sided("Power", "Dominating someone", "Being dominated"), // Power dynamics, 58
            ...sided("Bondage", "Tying someone up", "Being tied up"), // Light bondage, 57
            { key: "Sex_Kink_Toys", dimension: "Kinkiness", text: "Using sex toys" }, // Toys, 56

            // The middle. The non-consent pair is a game agreed to, asked no
            // other way (THE BLOCKERS, 2).
            { key: "Sex_Kink_Group", dimension: "Kinkiness", text: "A threesome, or sex with more than two people" }, // Multiple partners, 43
            { key: "Sex_Kink_Public", dimension: "Kinkiness", text: "Sex in public, where you might be seen" }, // Exhibitionism: me, 41
            ...sided(
                "Resisting",
                "Pretending to take someone against their will, as a game you have both agreed to",
                "Pretending to be taken against your will, as a game you have both agreed to",
            ), // Nonconsent, 37
            ...sided("Pain", "Giving pain", "Receiving pain"), // Sadomasochism, 35

            // The tail: rarer, and still things done between people. Orgasm
            // control and objectification are sided like the rest, so a Role
            // reading is eight pairs.
            ...sided("Humiliation", "Humiliating someone", "Being humiliated"), // Humiliation, 22
            ...sided("OrgasmControl", "Denying your partner an orgasm, or making them wait for one", "Being denied an orgasm, or made to wait for one"), // Teasing, frustration (Eagerness), ~25
            { key: "Sex_Kink_PartnerWatched", dimension: "Kinkiness", text: "Watching your partner have sex with someone else" }, // not a BKS category, ~15
            ...sided("Object", "Treating someone as an object", "Being treated as an object"), // Objects, ~8
        ],
    },
])

/* ==========================================================================
   NOTES — the thinking so far. Nothing below this line is asked.
   ==========================================================================

   WHY A LEVEL ON THIS. Sexuality is one of the things people most want to
   know where they stand on and have least to compare themselves with, which
   makes it an engaging level. It is also data the rest of the run makes
   unusually interesting: very few samples hold sexual interests beside
   interoception, a full personality inventory, the HiTOP spectra, primal
   world beliefs and politics.

   THE DATA THERE IS. Aella's Big Kink Survey (about 970,000 people) is the
   largest survey of sexual interests there is, and a representative subsample
   of it is open: `BKSPublic.csv`, Zenodo, doi:10.5281/zenodo.18625249 (v2,
   February 2026, CC BY 4.0 / CC BY-SA 4.0), 15,503 people from the US, Canada
   and Europe, balanced on age, sex and politics, 364 columns — about 60
   interests rated 0 (not arousing) to 5 (extremely), a short OCEAN, a
   dominant-submissive self-description, partner count, porn use, upbringing,
   childhood adversity, politics. `data/norms/norms_bks.R` reads it (fetching
   it into a git-ignored folder) and prints its structure. What to know about
   the file:

     - Aella swapped demographics between similar rows and added noise before
       releasing it, shrinking correlations by about a quarter by her estimate.
     - The respondents chose to take a long survey about kinks, so "common"
       means common among them. Other samples will look more vanilla.
     - The record says the sample is capped at 32; it does not say it starts
       at 18, and the file holds 3,197 people aged 14-17. The script drops
       them; any norms taken from it must too.
     - Interests are gated: a category ("Bondage", "Power dynamics") is ticked
       first and only then are its interests rated, so a blank under an
       unticked category means "not arousing". Items sharing a gate therefore
       correlate through the gate alone, which is why the structure is worked
       out on one score a category. An item asked of everybody, as this app
       would ask it, needs no gate: somebody who would not have ticked the
       category answers 0.
     - Four ungated items (ordinary sex, cunnilingus, blowjobs, dirty talk)
       are stored on a negated -8..0 code and are read back to 0-5.

   WHAT THE STRUCTURE IS (norms_bks.R, adults, the interests a level could
   conceivably ask):

     - Three content dimensions (Velicer's MAP; a network analysis finds the
       same three clusters):
         BDSM and power      sadomasochism, bondage, power dynamics,
                             nonconsent, humiliation, toys, objects, sensory
         Fantastical         transformations, unusual bodies, mythical
                             creatures, genderplay, mind control, pregnancy
         Visual & partnered  clothing, roles, exhibitionism, multiple
                             partners, ordinary oral and anal sex. Higher in
                             men, and possibly partly just sex
     - One general factor under them, moderate (omega-h .59): a single breadth
       or "taboo" score is a fair summary, and the three still add to it.
     - One dominant-submissive axis through every category (giving against
       receiving pain, begging against being begged, "me or someone else" in
       bondage, nonconsent and humiliation: first eigenvalue 58%), and it is
       unrelated to breadth (r = .01). How much somebody wants and which side
       of it they want to be on are two axes — a plane, like Where You Stand.
     - Gentleness (caretaking, tenderness) loads on nothing; it is its own thing.
     - People do not come in kinds: a mixture model keeps improving to eight or
       nine and assigns people with a mean certainty of .70, so the kinds are
       slices of one cloud. Read back as dimensions, not types.

   A SHORT FORM (norms_bks.R, section 8): ten items asked of everybody, 0-5,
   recover each dimension well. Sadomasochism, medium bondage, humiliation
   (BDSM and power, three summed r = .87); transformations, unusual bodies,
   mythical creatures (fantastical, .89); clothing, blowjobs, roles (visual &
   partnered, .81); and mental alteration, which with the other nine gives the
   general factor (R² .85). The role axis is the hard one: the self-description
   alone correlates .55 with it, and being dominant and being submissive add
   little. Pairs asked of everybody (giving and receiving pain; "me or someone
   else?" after bondage) are the likely fix, and the survey asked them only
   inside a ticked category, so its data cannot say. The figures are somewhat
   flattering, an item being part of the category its factor was fitted to.
   Items worded as the BKS words them take its norms, which would make this the
   third level whose norms are not invented.

   THE DIMENSIONS BEING CONSIDERED for what the level reads back (September
   2026). Six, none asked now (Liking was, and is parked):

     Libido              How much sexual wanting there is, against a quiet or
                         low libido; "Libido" for the psychoanalytic flavour.
                         Nothing asks it now (the placeholder went). The
                         low end is NOT "asexual": asexuality is little or
                         no attraction to other people, an orientation, which
                         the orientation item's "Nobody, or hardly anybody"
                         already records, and asexual people can have a
                         libido. The SOI-R's Desire is desire for people one is
                         not committed to, which is sociosexuality and not
                         libido; two or three items of the SDI-2 (Spector et
                         al., 1996), partnered and solitary, would measure it
     Liking and Disgust  PARKED, as `liking` under SHELVED. How sexual things feel, warm or
                         aversive: erotophilia-erotophobia (Fisher et al.'s
                         Sexual Opinion Survey, 1988), measured as the TDDS
                         measured sexual disgust, cue by cue, on a scale
                         opened out into appeal
     Vanilla and Taboo   How far interests reach from the ordinary to the
                         forbidden, shamed or extreme: the BKS's general
                         factor. "Vanilla" rather than "Conformity", which is
                         a construct of its own in social psychology and a
                         judgement besides. Worded as the BKS words them, the
                         fantasy half can take its norms; and the BKS says how
                         rare each interest is, so a score weighted towards
                         the rare ones is nearer "taboo" than a plain mean,
                         which is breadth. The engine averages and cannot
                         weight, so that belongs to the analysis or the
                         figure. The shelved scenarios were written for it
     Fantasy and         Not one axis but the relation between two amounts: a
     Behaviour           vivid fantasy life acted on and none at all both sit
                         in the middle of a difference, and difference scores
                         are unreliable besides. NOW THE GRID'S TWO AXES,
                         asked of every kink in one press and read back as
                         the count of turn-ons lived out, never subtracted
     Role                Dominant and submissive, as TWO scores (enjoying being
                         in control, enjoying giving it up), since on one line
                         a switch and somebody indifferent both land in the
                         middle. NOW THE SIDED ITEMS: the giving items' turn-ons
                         and the receiving items', two counts, read by nothing
                         on screen yet
     Function            Sex as closeness or as pleasure: the BSAS (Hendrick
                         et al., 2006), five items of Communion and five of
                         Instrumentality, two scales that can both be high. It
                         overlaps the SOI-R's Attitude, which is nearly an
                         Instrumentality item and could stand in for it. The
                         most SFW of the six, and the one where neither end is
                         more of anything

   All six at once would be 35-40 items, the longest level after the
   HiTOP-BR's. The SIS/SES-SF (Carpenter et al., 2011; 14 items, sexual
   excitation and two inhibitions, the dual-control "accelerator and brakes")
   was considered and is largely Libido and Disgust measured again. Also
   possible: the SOI-R's Behaviour facet (left out as three more counts beside
   the two lifetime ones) and the README's "last sexual activity". Already in
   the run and free to set against the level: the Lover on the archetype wheel,
   and `SelfPlacement_Attractiveness`, which the BKS asks too.

   THE LIKING CUES, what was tried and taken out (September 2026):

     - "Hearing two strangers having sex", the TDDS's sexual item 1, reads as
       annoyance at the noise, and a bed at 2 a.m. is where most people put
       the scene, rather than as disgust at the sex.
     - "Walking in on two people having sex", which replaced it, is
       voyeurism — a kink in its own right (below), not a reaction to sex as
       such — and the awkwardness of intruding, which nearly everybody feels.
     - "The sounds people make during sex" can be heard as porn; it is asked
       as a partner's.
     - "Sex when neither of you has showered" was written as the one cue at
       the disgust end for most people, but a lapse in hygiene is pathogen
       disgust, the TDDS's other domain, as much as sexual. The body cue that
       replaced it keeps the smell and taste, which are part of ordinary sex,
       and drops the lapse; some pathogen disgust will still reach it, as it
       reaches the TDDS's own "Performing oral sex".
     - The Sexual Opinion Survey's own items were considered and left: they
       are statements about erotica rather than reactions to it, dated, and
       several (group sex, "unusual sex practices", worry about being
       homosexual) would measure Taboo or orientation instead.

   VOYEURISM AND EXHIBITIONISM, a kink to explore. Watching others and being
   watched came up twice: "Walking in on two people having sex" was taken out
   of the Liking cues for being voyeurism rather than a reaction to sex, and
   the shelved scenarios ask "Being watched while having sex" (the BKS's
   Exhibitionism: me). The BKS has both sides, gated inside one category, and
   finds them in its visual & partnered cluster. Asked of everybody as a pair —
   watching, being watched — they could be a small Role-like axis of their own,
   or two more scenarios. Worth keeping to: the people watched are
   consenting, so that watching cannot read as intrusion.

   TRIED AND SHELVED, commented out under SHELVED rather than deleted, since
   each was worked out with care and any may come back:

     - `liking`, Sexual Liking: ten ordinary cues on one scale from "Very
       disgusting" to "Very appealing" (`SEX_VALENCE`), asked until September
       2026 and parked for a pair of axes with more pull to them (IMAGINATION
       AND ACTIVITY, below). Sound, and the likeliest to come back as a third
       thing read off the level;

     - the TDDS's seven sexual-disgust items (Tybur et al., 2009), on a scale
       opened out from "Very arousing" to "Very disgusting" (-3 to 3), the two
       items naming "the opposite sex" worded from the orientation instead —
       the form `liking` now takes, with cues of its own;
     - the SOI-R's Attitude and Desire (Penke & Asendorpf, 2008), its Behaviour
       left out, both its scales cut from nine points to seven;
     - twelve scenarios from vanilla to taboo, each asked twice over, as a
       fantasy and as an experience, for Vanilla and Taboo and for Fantasy and
       Behaviour.

   The TDDS and the SOI-R are not the published instruments any more, and
   their comments say how. Neither paper is on the shelf in `literature/`,
   and the item wordings were written from memory: check them against the
   sources before either returns.

   THE KINKS: WHY, WHAT ELSE THERE IS, WHAT WAS WEIGHED AND WHY THIS
   (September 2026).

   Why. Of everything a level on sexuality could ask, what somebody is into
   is the thing people most want to know where they stand on and the thing
   least asked of them straight: sexual interests have been surveyed mostly
   as paraphilia (Joyal & Carpentier, 2017, who asked 1,040 Quebec adults
   both interest and experience and found most "anomalous" interests common)
   or as fantasy alone (Wilson's Sex Fantasy Questionnaire, 1978; Lehmiller's
   4,175 Americans, 2018), and the one large open survey of them, the BKS, is
   self-selected and asks no behaviour. A list of kinks is also the shareable
   reading — a count with a crowd behind it — and, beside the run's
   personality, interoception, world beliefs and politics, data nobody has.

   What else there is, and what they share. The BKS gates: tick a category,
   then rate its interests 0-5 for arousal, sixty-odd items. Joyal asks
   intensity of each fantasy and, in a second pass, whether it was done.
   Wilson and Lehmiller ask how often each is fantasised. Common to all:
   "does it turn you on" and "have you done it" are two instruments or two
   passes, and nothing between wanting and not wanting.

   What was weighed, in order. (1) A plane of Imagination (how many of the
   list appeal) against Activity (how often sex happens), the share acted on
   as a sentence under it — dropped once the count turned out to be the
   whole of the vanilla-to-taboo scale in the BKS (the count against the
   rarity-weighted count r = .97, four people in five in two corners of the
   plane), and because Activity cannot be read off the list at all, nobody
   doing what they do not fancy. (2) Twelve scenarios asked twice over,
   fantasy then experience, as two questionnaires: 22 screens, and nothing
   next to its own pair; SHELVED. (3) One line of six steps a kink — Not for
   me / Turns me on, in my imagination / Tried it, not for me / Done it once
   or twice / Done it many times / It's part of my sex life — one press
   saying both; asked until the grid. A line through two dimensions visits
   some of their cells: it had no place for somebody fine with a thing they
   do regularly for a partner, or for somebody who would if it came up, and
   it read "done" as "wanted". The which-side follow-up after each sided
   kink, asked only of those it turned on, lost the same people. (4) Two rows
   of buttons on one screen, appeal then experience, a Continue under them —
   the grouped items the shelved note over `SEX_SCENARIOS` describes, two
   keys and the most engine. (5) Two tick-lists, what appeals and then, of
   those, what has been done: no intensity, and two new pieces of engine.

   Why this. The grid is (3)'s one press with (4)'s two scales: three
   columns of appeal by four rows of experience, twelve cells, each a
   recognisable person and every one an honest answer. "I'm fine with it" is
   the missing row, and the inconsistent cells — turned on and never done,
   not for me and done many times — are the ones worth having, which is the
   opposite of the scenarios' worry that a pair in view is answered
   consistently. It costs the engine one renderer and one stylesheet block,
   the cells being written out as options, and the file one column an item
   with both words in it. The sided kinks are two items each, so Role comes
   out as two scores rather than one line with the switch and the indifferent
   on the same point. Read back: the count, the crowd, how many of the count
   have been lived, the rarest. In the file for the analysis and nowhere on
   screen: the accommodating count (fine with it, done), done without wanting
   (not for me, many times), Role, and a skip told from a no.

   THE LIST (September 2026) is a ladder: a rung or two in every band of
   prevalence, from rough sex (~75%) to objectification (~8%), so that the
   count tells people apart at the vanilla end and in the tail and not only
   in the middle, which is where a list written for interest alone piles up.
   Dirty talk (94% of the BKS's adults) was the top rung and came off as too
   near the floor to tell anybody apart — the "none of these" band says
   vanilla well enough — and sexting (~65) took its place at the common end,
   an act with no side and little sex difference in it. Twenty-two items, fourteen kinks, eight of them
   as their two sides. Two decisions shape it. Acts and scenarios only: feet,
   outfits and crossdressing are attractions rather than things done — a
   construct of their own, and crossdressing brushes gender identity — so no
   fetish object is on it. And nothing fantastical: creatures, transformation
   and hypnosis were on it for a long tail that was not BDSM, and were taken
   out as too specific — hypnosis in particular reads as a cover for being
   controlled, which the power pair asks straight — so the tail is now the
   power-and-pain extremes and three rarer things done between people
   (orgasm control, watching a partner with someone else, objectification),
   and the count leans BDSM at its top, knowingly. Dominating and rough sex
   overlap and are both kept, on different rungs and worded apart (a
   relation; what is done to a body). The rung between 22 and 8 is thin, and
   the four estimated shares want the app's own data. Not on it, and worth
   weighing if it grows: filming yourselves, sex with somebody just met, an
   open relationship. A shared card shows the crowd and the count, never
   which kinks (THE BLOCKERS, 4); and "kinkier than 90% of people" is the
   likeliest line to travel, so whose crowd it is has to be said once the
   placeholder norm is replaced.

   THE FIGURE: A VOLCANO UNDER THE SEA, not built. A cross-section of the
   seabed at a mid-ocean ridge, where new crust is made: dark water above, the
   seabed, the crust in layers, a magma chamber under it, a pipe up through the
   crust and a dome of lava pushed out onto the seabed. It is on theme twice —
   the level is met in the water by some people and in the rock by others, and
   the descent already passes "the deepest life found in the crust" — and it is
   a real cross-section of a volcano, so the resemblance it can bear to
   genitals (the author's sketch: a dome over a pipe over a chamber) comes out
   of the geology rather than being drawn in, which is what keeps it witty and
   SFW, and shareable. Each dimension does one thing, the sea's and the climb's
   rule, and none switches at a threshold:

     Libido              the chamber, small and dull red to large and
                         white-gold; the magma's colour follows it all the way
                         up
     Liking              the crust, warm and porous to cold black basalt. With
                         the cues, a layer a cue, the pipe widening through a
                         warm one and narrowing through a cold one, so its
                         outline is the answers; hovering a layer names its
                         cue
     Taboo               rare minerals: no exotic crystal in the veins at the
                         vanilla end, a seam of gems at the other
     Fantasy and         where the magma ends up, which is real geology: magma
     Behaviour           cooling underground makes intrusive rock, sheets and
                         bodies branching inside the crust, and magma erupting
                         makes lava on the seabed. A rich fantasy life is a
                         crust full of frozen branches, acting on it is lava
                         outside; both can be large, both small, or either
     Role, Function      two spectra under the figure, as Where You Stand has
                         under its plane, each drawn as its two scores

   With the SOI-R's Desire and Attitude as the two channels, the four corners
   were lava coming out slowly (hot and open: effusive, as on Hawaii, never an
   explosion), heat glowing through the seams of sealed rock (hot and sealed),
   hot springs and shimmer (cool and open) and quiet cold ground (cool and
   sealed) — none of them named on the figure.

   What to watch in it:

     - WHICH READING is not the answers' business. Tying the shape to gender or
       to the masculine-feminine slider confuses expression with anatomy, and
       tying the opening to anything makes "open" feminine and "pushing out"
       masculine. One shape for everybody that reads either way (a crater or a
       cleft in the dome, which domes often have), or two views: the side, and
       the view from above, where a ridge is a long cleft between raised lips,
       that one being the badge.
     - THE PREVIEW is shown before the level is answered, on a fork card and
       in the teaser under "Next", and a blurred suggestive shape is more
       suggestive than a sharp one; it may also change who takes the level and
       how its items are answered. Keep this figure off both and show the
       level's name alone there.
     - THE QUIET END: people high on disgust or low on libido get a small, cold,
       sealed scene, and are the likeliest to take the joke as at their
       expense. It must look calm and whole, not lesser; the two ends drawn
       small under it ("Other people carry other fires") show the range as
       landscape.
     - NO PSYCHOANALYSIS IN THE WORDS: "pressure", "repressed" and "bottled up"
       make a sealed crust a problem to be fixed. "Held" and "kept", never
       "blocked". Libido is a name, not a theory.
     - VENT LIFE (tube worms, crabs) where the heat reaches the water would be
       beautiful and would make more desire look like more life: either none,
       or life of its own at every setting (vents where it is hot, cold seeps
       where it is not).
     - EVERY BAR A REACH along its own scale, never a standing against other
       people.
     - FOR THE COMMITTEE it is a cross-section of a volcano whose shape follows
       the answers, and the double meaning is left out of anything written.

   Earlier ideas, still possible: a map of desire (the BKS categories laid out
   in two dimensions from their correlations, rare ones at the edge, the
   person's lit), or the plane of breadth against dominant-submissive.

   ========================================================================== */

/* ==========================================================================
   SHELVED — written whole and commented out, to start simple (see TRIED AND
   SHELVED, above). The helpers come first; the questionnaires after them are
   entries of the `defineBlock("sex", [...])` list above, and come back by
   moving them into it (after `sexuality`) with their helpers out of the
   comment. Nothing live refers to any of them. `SEX_RATHER_NOT`, which the
   scenarios and `liking` use, is live above.
   ==========================================================================

// Erotophilia-erotophobia (Fisher et al., 1988), measured as the affect each
// of ten ordinary sexual cues meets with, on one scale from disgust to
// appeal. NOT the Sexual Opinion Survey's items, which are dated statements
// about erotica; the cue-and-reaction form is the TDDS's (Tybur et al.,
// 2009), whose pornography item is kept verbatim and whose oral-sex item is
// adapted, and whose scale is opened out below its floor, as the shelved
// version was (see SHELVED). Every cue is ordinary, partnered or solitary
// sex, and none names a sex, so it reads the same whatever the orientation.
// Cues are chosen to spread: some most people meet warmly, some split, some
// most people recoil from, so the scale has room at both ends. High is
// liking; nothing reverses. The cues tried and taken out, and why, are under
// NOTES.
//
// "Very appealing" rather than "Very arousing" at the top, which the shelved
// TDDS and the BKS have, for four reasons:
//
//   - The construct. Erotophilia is how positive or negative the feeling a
//     sexual cue meets with is (Fisher et al., 1988), and arousal is only one
//     positive feeling: warmth, ease and fondness count too.
//   - The plane. Arousal carries libido, which Desire already measures across:
//     an erotophilic person with a quiet libido would land near "neither" on
//     every cue and read as more erotophobic than they are, and the two axes
//     would go together because of how the scale is worded.
//   - One line. Appeal and disgust are two ends of approach and avoidance;
//     arousal and disgust are partly separate systems, arousal damping disgust
//     (Borg & de Jong, 2012), so a cue can be both — the ardent and wary
//     corner the figure is most for — and a line between them leaves that
//     person no true answer.
//   - The cues. Some are pleasant or off-putting without being arousing (a
//     friend's sex life, told); asked up to arousal they would lose their top
//     half.
//
// What it costs: "appealing" can be answered as an opinion ("fine in
// principle") rather than as a feeling, which the instruction — how the idea
// makes you feel — only partly heads off, and the precedent of the TDDS and
// the BKS, though neither's norms carry over to a bipolar scale anyway. If the
// pilot shows opinion creeping in, the fix is not "arousing" but two unipolar
// ratings a cue, arousal and disgust asked apart: twice the items, and the cue
// that is both becomes an answer rather than a gap.
//
// Oral sex is also one of the shelved scenarios, asked there on a unipolar
// scale of arousal for reach; here the question is whether it meets warmth
// or recoil, and the gap between giving and receiving is the most
// disgust-specific thing on the scale — shown at analysis, not scored, a
// difference of two single items being as unreliable as a score gets.
const SEX_VALENCE = {
    options: [0, 1, 2, 3, 4, 5, 6, SEX_RATHER_NOT],
    labels: ["-3", "-2", "-1", "0", "+1", "+2", "+3"],
    anchors: ["Very disgusting", "Very appealing"],
    // No hovercolors: neither end is the good one.
    color: "#c2417a",
}

// Every answer `Sex_Orientation` can be given, for the items worded from
// it to wait on: they are shown whatever it was, but never before it.
const ORIENTATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 98, 99]

// Which sex somebody is attracted to, for the TDDS items that name one: the
// three answers leaning towards women, the three leaning towards men, and
// nothing for "equally", "nobody" and "rather not say", which are asked about
// nobody in particular.
function attractedTo(answer) {
    const orientation = answer("Sex_Orientation")
    if (orientation >= 1 && orientation <= 3) return "women"
    if (orientation >= 5 && orientation <= 7) return "men"
    return null
}

// The SOI-R's two scales, one a facet, cut from nine points to seven (see the
// SOI-R, below).
const SOIR_AGREE = {
    options: [1, 2, 3, 4, 5, 6, 7],
    anchors: ["Strongly disagree", "Strongly agree"],
    color: "#c2417a",
}
// The published step each is, out of nine, beside it.
const SOIR_OFTEN = {
    options: [
        { value: 1, text: "Never" }, // 1
        { value: 2, text: "Very seldom" }, // 2
        { value: 3, text: "About once a month" }, // 4
        { value: 4, text: "About once a week" }, // 6
        { value: 5, text: "Several times per week" }, // 7
        { value: 6, text: "Nearly every day" }, // 8
        { value: 7, text: "At least once a day" }, // 9
    ],
    color: "#c2417a",
}

// THE SCENARIOS. Twelve things somebody might find arousing, from the vanilla
// to the taboo, each asked twice: how arousing the idea of it is, which is
// the fantasy, and how often it has been done, which is the experience. The
// two are two questionnaires rather than two answers on one screen, which
// the engine cannot do (an item has one answer): the fantasies first, every
// scenario, shuffled; then the experiences of the ten that can be done,
// shuffled again. The idea is rated before the reminder of what has been
// done, and nothing in the second set is next to its own pair in the first.
//
// BOTH ON ONE SCREEN was considered and not built (September 2026). It would
// halve the screens (12 for 22, perhaps half a minute saved) and make
// "imagined, never done" an easy answer to give. Against it: side by side,
// the two read as a pair and are answered consistently, which pulls together
// the very relation the level measures; grids invite straightlining,
// especially on a phone; and six circles over five labelled buttons is a tall
// screen there. If it is ever built, it is as GROUPED ITEMS — a second item
// marked to be drawn with the one before it (`pair:`, say), each keeping its
// own key, answer and times — never one item with two answers, which would
// break the saved file's one entry an item, preprocess.R's column an item and
// the scoring. That touches rendering and advancing (on only once both are
// given), going back, the digit keys (which row they answer), the shuffle
// (a pair moves as one), test mode's thinning, the countdown, where the
// spray comes out, the second answer's reaction time (which includes the
// first) and data/synthetic/, which would have to mirror the grouping. Worth
// it if Role is written as paired items too, if the pilot's minutes
// (data/collected/overview.qmd) show this level dragging, or if consistent
// answers are decided to be an acceptable price.
//
// After the BKS's categories (the one named beside each), reworded as
// scenarios, so its norms are a guide to the fantasies and not their norms.
// The run is chosen to reach beyond the BKS's own ground in three
// directions: the ordinary and partnered (tender sex with somebody loved,
// oral sex, toys), the non-committal (somebody just met, more than one at
// once), and unwanted attention — asked only as a consensual game (THE
// BLOCKERS, 2). The rest is the BKS's three clusters: BDSM and power
// (bondage, pain, humiliation), the visual and partnered (being watched) and
// the fantastical (hypnosis, creatures), the two of which that cannot be done
// being asked as fantasies alone. Nothing a committee would not pass is here
// (`askable` in data/norms/norms_bks.R).
//
// `done: false` is a scenario with no experience to ask about. `name` is the
// last part of both keys, so a fantasy and its experience pair up by it.
const SEX_SCENARIOS = [
    { name: "Tender", text: "Slow, tender sex with someone you love" }, // Gentleness
    { name: "Oral", text: "Oral sex" }, // cunnilingus, blowjobs
    { name: "Toys", text: "Using sex toys" }, // Toys
    { name: "Stranger", text: "Sex with someone you have only just met" }, // not a BKS category
    { name: "Group", text: "Sex with more than one person at once" }, // Multiple partners
    { name: "Watched", text: "Being watched while having sex" }, // Exhibitionism: me
    { name: "Resisting", text: "A partner pretending to take you against your will, as a game you have both agreed to" }, // Nonconsent
    { name: "Bondage", text: "Tying someone up, or being tied up" }, // Bondage
    { name: "Pain", text: "Giving or receiving pain, such as spanking" }, // Sadomasochism
    { name: "Humiliation", text: "Humiliating someone, or being humiliated" }, // Humiliation
    { name: "Hypnosis", text: "Hypnosis or mind control", done: false }, // Mental alteration
    { name: "Creatures", text: "Mythical or fictional creatures", done: false }, // Mythical
]

    // Sexual Liking =========================================================
    // PARKED September 2026: asked on the level until then, over `SEX_VALENCE`.
    // Erotophilia–erotophobia (Fisher et al., 1988), as the affect ten cues meet with (see
    // `SEX_VALENCE`, above, for what it is and why). One face a line, in
    // the comment over its items.
    {
        key: "liking",
        name: "Sexual Liking",
        profile: false,
        instructions: "How does the idea of this make you feel?",
        format: SEX_VALENCE,
        // PLACEHOLDER, invented: on the 0-6 values behind the labels, a
        // little above the middle, as most of the cues are ordinary.
        norms: {
            "Sexual Liking": { key: "SexualLiking", mean: 3.6, sd: 1.1 },
        },
        items: [
            // Being desired, and dirty talk (the BKS's one ungated verbal item).
            {
                key: "Sex_Liking_Desired",
                dimension: "Sexual Liking",
                text: "Someone you find attractive telling you, in detail, what they would like to do to you",
            },
            // Media. Sexting, the everyday cue the 1988 and 2009 scales predate;
            // erotica in words, since porn alone under-reads women's
            // erotophilia; and the TDDS's sexual item 3, verbatim.
            { key: "Sex_Liking_Photo", dimension: "Sexual Liking", text: "Receiving a nude photo from someone you are seeing" },
            { key: "Sex_Liking_Erotica", dimension: "Sexual Liking", text: "An explicit sex scene in a novel" },
            { key: "Sex_Liking_Porn", dimension: "Sexual Liking", text: "Watching a pornographic video" },
            // Own acts. The SOS's "Masturbation can be an exciting experience"
            // as a cue, pinned to a scene with no media in it, which is what
            // masturbation guilt is about; oral sex split, giving being the
            // disgust elicitor (the TDDS's sexual item 2, "Performing oral
            // sex") and receiving near the ceiling for most; and a partner's
            // sounds, a partner's so that they cannot be heard as porn.
            { key: "Sex_Liking_Masturbation", dimension: "Sexual Liking", text: "Masturbating alone, to your own imagination" },
            { key: "Sex_Liking_OralGiving", dimension: "Sexual Liking", text: "Giving oral sex to a partner" },
            { key: "Sex_Liking_OralReceiving", dimension: "Sexual Liking", text: "Receiving oral sex from a partner" },
            { key: "Sex_Liking_Sounds", dimension: "Sexual Liking", text: "The sounds a partner makes during sex" },
            // Others' sex, told: the social face of erotophobia.
            { key: "Sex_Liking_Told", dimension: "Sexual Liking", text: "A friend describing their sex life in detail" },
            // The body: sex as a physical thing that smells and tastes, the cue
            // written to sit furthest towards disgust for most people. The item
            // to watch first when the item-total correlations come in (see
            // NOTES, on the cue it replaced).
            { key: "Sex_Liking_Body", dimension: "Sexual Liking", text: "The smell and taste of a partner's body during sex" },
        ],
    },

    // TDDS, sexual domain ===================================================
    // The seven sexual items of the Three Domain Disgust Scale (Tybur,
    // Lieberman & Griskevicius, 2009, Journal of Personality and Social
    // Psychology, 97, 103-122), whose other fourteen are pathogen and moral
    // disgust. Sexual disgust in its account is what steers somebody away
    // from partners and acts that would cost them as a mate. It is expected
    // to go against the SOI-R below and with the Order end of Where You
    // Stand, the best-known link between disgust and politics.
    //
    // **Adapted, not verbatim**, in two ways.
    //
    // The scale is opened out at its bottom. The TDDS asks how disgusting
    // each thing is, from 0 "not at all disgusting" to 6 "extremely
    // disgusting", so everything that is not disgusting is one point, and
    // somebody who finds a thing arousing and somebody who finds it merely
    // unremarkable give the same answer. Here the scale runs from "Very
    // arousing" to "Very disgusting", seven circles saved as -3 to 3, the
    // middle being neither and the two ends worded alike, so that neither
    // reads as the stronger. High is still disgust, as in the TDDS, but the published
    // 0 falls somewhere between -3 and 0 on this one, so neither the scores
    // nor the norms are the TDDS's, and none is pooled with TDDS data.
    //
    // Two items say "the opposite sex", which asks a gay man about a woman's
    // hand on his thigh — not what the item is about, which is a potential
    // partner taking a liberty. Those two are worded from
    // `Sex_Orientation` instead (`attractedTo`): about women for the
    // three answers leaning towards women, about men for the three leaning
    // towards men, and about nobody in particular for "equally", "nobody"
    // and "rather not say". The wording shown is not saved; it is read back
    // off the orientation. The other five name nobody's sex and are asked as
    // published, without their full stops.
    {
        key: "tdds",
        name: "Sexual Disgust",
        profile: false,
        instructions: "How do you feel about this?",
        format: {
            options: [-3, -2, -1, 0, 1, 2, 3],
            anchors: ["Very arousing", "Very disgusting"],
            // No hovercolors: neither end is the good one.
            color: "#c2417a",
        },
        items: [
            { key: "TDDS_Sexual_1", dimension: "Sexual Disgust", text: "Hearing two strangers having sex" },
            { key: "TDDS_Sexual_2", dimension: "Sexual Disgust", text: "Performing oral sex" },
            { key: "TDDS_Sexual_3", dimension: "Sexual Disgust", text: "Watching a pornographic video" },
            {
                key: "TDDS_Sexual_4",
                dimension: "Sexual Disgust",
                text: "Finding out that someone you don't like has sexual fantasies about you",
            },
            {
                key: "TDDS_Sexual_5",
                dimension: "Sexual Disgust",
                text: "Bringing someone you just met back to your room to have sex",
            },
            {
                key: "TDDS_Sexual_6",
                dimension: "Sexual Disgust",
                // TDDS: "A stranger of the opposite sex intentionally rubbing
                // your thigh in an elevator."
                text: (answer) => {
                    const sex = attractedTo(answer)
                    const who = sex === "women" ? "A female stranger" : sex === "men" ? "A male stranger" : "A stranger"
                    return who + " intentionally rubbing your thigh in an elevator"
                },
                showIf: { key: "Sex_Orientation", is: ORIENTATIONS },
            },
            {
                key: "TDDS_Sexual_7",
                dimension: "Sexual Disgust",
                // TDDS: "Having anal sex with someone of the opposite sex."
                text: (answer) => {
                    const sex = attractedTo(answer)
                    return "Having anal sex" + (sex === "women" ? " with a woman" : sex === "men" ? " with a man" : "")
                },
                showIf: { key: "Sex_Orientation", is: ORIENTATIONS },
            },
        ],
    },

    // SOI-R, Attitude and Desire ============================================
    // The Revised Sociosexual Orientation Inventory (Penke & Asendorpf, 2008,
    // Journal of Personality and Social Psychology, 95, 1113-1135): how
    // willing somebody is to have sex outside a committed relationship, as
    // three facets of three items. **Two of the three are asked.** Behaviour
    // (partners in the last year, partners had once, partners had without
    // wanting anything longer) is left out: it is three more counts beside
    // the two lifetime counts above, and the most identifying thing on the
    // level. Without it there is no SOI-R total, only the two facets, which
    // are the two the paper finds most distinct in what they predict and
    // which carry the largest differences between the sexes.
    //
    // The items are verbatim but for the full stops; **the scales are not**.
    // The SOI-R's are nine points, one a facet, which is why each item
    // carries its own format; here both are seven, the TDDS's length, so the
    // level is answered on one number of points throughout. Attitude keeps
    // its two ends on seven circles. Desire keeps seven of its nine
    // frequencies, dropping "about once every two or three months" and
    // "about once every two weeks", the two that fall between neighbours
    // close enough to stand in for them; `SOIR_OFTEN` says which published
    // step each is. So neither facet's scores or norms are the SOI-R's, and
    // none is pooled with SOI-R data; rescaled, the published norms are a
    // rough guide at best.
    //
    // **Held in the published order** (`shuffle: false`): shuffled, the two
    // formats would come in no order, and the inventory was validated asked
    // in its own. The keys count within the facet; Penke's item numbers are
    // beside each run. Expected to go with low Honesty-Humility and with
    // Impulsivity.
    {
        key: "soir",
        name: "Sociosexuality",
        profile: false,
        shuffle: false,
        items: [
            // Items 4-6, disagree to agree.
            {
                key: "SOIR_Attitude_1",
                dimension: "Sociosexual Attitude",
                text: "Sex without love is OK",
                format: SOIR_AGREE,
            },
            {
                key: "SOIR_Attitude_2",
                dimension: "Sociosexual Attitude",
                text: "I can imagine myself being comfortable and enjoying “casual” sex with different partners",
                format: SOIR_AGREE,
            },
            {
                key: "SOIR_Attitude_3",
                dimension: "Sociosexual Attitude",
                text: "I do not want to have sex with a person until I am sure that we will have a long-term, serious relationship",
                reverse: true,
                format: SOIR_AGREE,
            },
            // Items 7-9, never to at least once a day.
            {
                key: "SOIR_Desire_1",
                dimension: "Sociosexual Desire",
                text: "How often do you have fantasies about having sex with someone you are not in a committed romantic relationship with?",
                format: SOIR_OFTEN,
            },
            {
                key: "SOIR_Desire_2",
                dimension: "Sociosexual Desire",
                text: "How often do you experience sexual arousal when you are in contact with someone you are not in a committed romantic relationship with?",
                format: SOIR_OFTEN,
            },
            {
                key: "SOIR_Desire_3",
                dimension: "Sociosexual Desire",
                text: "In everyday life, how often do you have spontaneous fantasies about having sex with someone you have just met?",
                format: SOIR_OFTEN,
            },
        ],
    },

    // The fantasies: every scenario, on the BKS's own 0-5 scale from "not
    // arousing" to "extremely", asked of everybody rather than inside a
    // category ticked first (the BKS's gate), so a 0 here is the 0 its gate
    // reads a blank as. One dimension over all twelve, which is breadth; the
    // taboo score weighted towards the rare scenarios is the analysis's, the
    // engine being able only to average. No norms, so nothing is read back.
    {
        key: "fantasies",
        name: "Fantasies",
        profile: false,
        instructions: "How arousing do you find the idea of this?",
        format: {
            options: [0, 1, 2, 3, 4, 5, SEX_RATHER_NOT],
            anchors: ["Not arousing", "Extremely arousing"],
            color: "#c2417a",
        },
        items: SEX_SCENARIOS.map((scenario) => ({
            key: "Sex_Fantasy_" + scenario.name,
            dimension: "Sexual Fantasy",
            text: scenario.text,
        })),
    },

    // The experiences: the ten that can be done, how often, in a lifetime,
    // from never to a regular part of somebody's sex life. Counted in words
    // rather than numbers, since nobody knows how many times, and five steps
    // rather than the fantasies' six, there being no fair sixth. One
    // dimension over all ten, and no norms.
    {
        key: "experiences",
        name: "Experiences",
        profile: false,
        instructions: "How often have you done this?",
        format: {
            options: [
                { value: 0, text: "Never" },
                { value: 1, text: "Once" },
                { value: 2, text: "A few times" },
                { value: 3, text: "Many times" },
                { value: 4, text: "Regularly" },
                SEX_RATHER_NOT,
            ],
            color: "#c2417a",
        },
        items: SEX_SCENARIOS.filter((scenario) => scenario.done !== false).map((scenario) => ({
            key: "Sex_Experience_" + scenario.name,
            dimension: "Sexual Experience",
            text: scenario.text,
        })),
    },

   ========================================================================== */
