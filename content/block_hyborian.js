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

   WHAT IS ASKED: one briefing and one questionnaire of twenty-four custom
   statements, unvalidated, on a seven-point agreement scale, under eight
   dimensions. Four say how somebody would live in that world and four say
   what they take the world to be. The level closes on the first four
   (js/figures/hyborian.js): which HERO they make somebody, out of eleven,
   shown as the hero's painted card with the person's four stats on a card
   beside it. The other four were written to read which GOD would claim
   them, out of five, from dimensions disjoint from the hero's so that the
   pair would say something — a Thief claimed by Mitra is news — and THE GOD
   IS NOT SHOWN FOR NOW (September 2026): the four are still asked and saved,
   and the reading is kept in the figure file, drawn by nothing.

     The hero, four dimensions, the nearest of eleven written profiles:
       Burning     intensity over safety; vitalism. After Conan's creed in
                   Queen of the Black Coast: "let me live deep while I live".
                   Nothing else in the run measures it
       The Code    faith kept and plain dealing against guile, one bipolar
                   scale: two items keep one's word at a cost, one (reversed)
                   is the thief's — honour as a luxury with a price. Honour, not
                   lawfulness: nothing in it asks about rules, which the
                   barbarian scorns (see the items). Hook: HEXACO
                   Honesty-Humility
       Barbarism   civilisation as soft, unnatural and passing — the thesis
                   of Beyond the Black River. Declinism. Hook: the opinions
                   level's Enhancement, the other way
       Splendour   the appetite for rank and fine things: to stand above
                   others with silk and gold about you — "the jeweled
                   thrones of the Earth". Not bodily pleasure, which is
                   Sacred Pleasure's, and not wildness. Added (September
                   2026) for the Princess, after Yasmina of The People of
                   the Black Circle, whose ending is this choice. Hook:
                   HEXACO Honesty-Humility (greed avoidance, modesty), the
                   other way, and Barbarism, which it likely runs against

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
   of eleven profiles to the four reaches and the god the nearest of five
   written profiles, so nothing is read against other people and no invented
   mean is needed. `profile: false`, since the whole-run web is where
   somebody stands against others and none of this is that. No attention
   check: three minutes is too short a level to seed one in.

   RIGHTS. Howard died in 1936, so his texts and the characters as he wrote
   them are public domain in the UK and EU. "Conan" is a live trademark, so
   the name is on no screen: the heroes are archetypes (the Barbarian, not
   Conan) and the level is named for the hero in the person, not for Conan
   (Your Hyborian Hero; The Hyborian Age until October 2026). Later
   likenesses — Frazetta,
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
            "<p>The next statements are about attitudes and beliefs that might hold now just as they did in some bygone age. There " +
            "is no right answer. At the end you will find out which of its heroes you would have been.</p>",
    },

    {
        key: "hyborian",
        name: "Your Hyborian Hero",
        // Nothing here is placed against other people, and a person's
        // metaphysics has no business on a card made to be shared.
        profile: false,
        instructions:
            "Please indicate the extent to which you agree or disagree with each statement",
        format: {
            options: [1, 2, 3, 4, 5, 6, 7],
            anchors: ["Strongly disagree", "Strongly agree"],
            // No hovercolors: there is no good end of any of these.
            color: "#c0873a",
        },

        items: [
            // HOW THE ITEMS ARE WRITTEN (third draft, September 2026). Three
            // rules, and the reasons for them.
            //
            // EVERY ITEM IS CONTESTED, forward or reversed. The hero is read
            // off a cut at a half — a mean of 4 on the 1–7 scale — so a
            // dimension tells people apart only if the room splits over its
            // items. The first draft's were ones nearly everybody agrees
            // with ("I keep my word even when nobody would know") or nearly
            // everybody rejects, so most people landed on one corner of the
            // box and the same two heroes. The second draft's rule was one
            // reversed item easy to agree with against forward items that
            // cost something, and that does not centre the scale either:
            // agreeing with everything scores (7 + 7 + 1) / 3 = 5, a reach
            // of two thirds, and lands high, so a soft reversed item is a
            // floor and not a counterweight. Now each item is written so
            // that people plausibly split over it — the long careful life
            // is given its due rather than sneered at ("lived carefully",
            // not "playing safe"), and the cautious or civilised end is
            // never the silly answer, since an item that tells the person
            // which answer is the foolish one is answered on that alone.
            // Where the earlier wording was a memory ("the best moments of
            // my life…"), a word that confounds the scale ("holy", which
            // a secular hedonist rejects and lands as an ascetic) or a
            // claim so strong that nearly everybody rejects it ("anyone can
            // become anything", "a clever lie is a weapon"), it went.
            //
            // ONE PERSPECTIVE, THE CREED'S. Every item is a maxim, in the
            // impersonal or the generic "we", and none says "I". A maxim
            // asks whether you endorse a philosophy; "I would rather…" asks
            // you to report on yourself, and the two are answered
            // differently in good faith — somebody can hold that a short
            // blazing life is the better one and know they would not live
            // it. Mixed inside a three-item scale, that gap is error. The
            // Code's guile pole in the first person ("I would lie to win")
            // also carries a social cost the maxim does not, and the four
            // god dimensions are beliefs about the world, which cannot be
            // put in the first person at all. The briefing frames the items
            // as statements of the age's philosophy and the reading is which
            // hero somebody WOULD HAVE BEEN, so endorsement is the task
            // being set. The cost, accepted: a creed lets people answer as
            // the hero they admire rather than as themselves. On this level
            // that is the game, and it is the same game on every item.
            //
            // PLAIN WORDS, ONE CLAIM AN ITEM, IN HOWARD'S REGISTER. His
            // "better … than", walls and gods and feasts and thrones, two
            // items his own lines — but nothing archaic enough to be misread
            // ("befalls", "lived deep", "to the hilt", "hearth" were tried
            // and read awkwardly or old), no item that is two claims, and no
            // joke: a witty line ("whatever comes after death can wait
            // until I get there") is answered on its tone. The wit is in
            // the choice an item forces, not in its phrasing.
            //
            // A "better X than Y" item is worth having where it fits:
            // agreeing with one is taking a side, which blunts yea-saying in
            // a scale too short to balance by keying. Two forward and one
            // reversed is the shape throughout, so the scale is centred by
            // content rather than by keying; two and two would put a
            // yea-sayer exactly on the cut and halve the exact ties a mean
            // of 4 makes, at the price of a fourth item a dimension and a
            // fourth minute, and is the change to make first if the data say
            // the cut is off. The keys are the first draft's, the level
            // being asked by no battery and nothing yet pooled on them.

            // The hero ---------------------------------------------------

            // Burning: intensity over safety. The first item is the
            // Barbarian's creed in Queen of the Black Coast ("let me live
            // deep while I live") set against its opposite. The second asks
            // the value and not the memory. The reversed one is the
            // Frontiersman's: a fire against an adventure is a real trade,
            // where "the wiser choice" was one everybody agreed with.
            {
                key: "Hyborian_Burning_1",
                dimension: "Burning",
                text: "Better a short life lived to the full than a long one lived carefully",
            },
            {
                key: "Hyborian_Burning_2",
                dimension: "Burning",
                text: "Danger is part of what makes life worth living",
            },
            {
                key: "Hyborian_Burning_3",
                dimension: "Burning",
                text: "A warm fire at home is worth more than any adventure",
                reverse: true,
            },

            // The Code: faith kept and plain dealing at one end, guile at the
            // other. It is NOT respect for the law, which the first draft's
            // reversed item ("Rules are for people who aren't clever enough
            // to get around them") made it: Howard's barbarian scorns every
            // law the cities write and keeps his word, so an item about rules
            // set the Code against Barbarism and took points off the
            // Barbarian for being one. Nothing here mentions a rule. The
            // guile pole is the Thief's and the Sorcerer's real position —
            // honour as a luxury with a price — which people split over,
            // where "a clever lie is a weapon like any other" was rejected
            // by almost everybody and told nobody apart. It is stated flat:
            // "Honour is a fine thing until it gets you killed" was read as
            // a quip by some and as a claim by others, and a maxim answered
            // on its tone tells nobody apart (the no-joke rule above). A
            // promise rather than honour, so that it is concrete and sits
            // against the first item's promise to an enemy.
            {
                key: "Hyborian_Code_1",
                dimension: "The Code",
                text: "A promise made to an enemy is still a promise",
            },
            {
                key: "Hyborian_Code_2",
                dimension: "The Code",
                text: "Better to lose a fair fight than to win by a trick",
            },
            {
                key: "Hyborian_Code_3",
                dimension: "The Code",
                text: "No promise is worth dying for",
                reverse: true,
            },

            // Barbarism: civilisation as soft, unnatural and passing. The
            // first item is the "soft" facet and the second the "passing"
            // one — the borderer's closing line in Beyond the Black River
            // ("barbarism must always ultimately triumph"), cut to one
            // claim; the second draft's "whim of circumstance" was opaque
            // out of context. The reversed item answers the first directly
            // and keeps the three nouns — but not the word: "better, not
            // softer" two items after "grown soft" read as the same item
            // asked twice, so it answers softness with strength instead —
            // where "the finest things humankind has ever made" was agreed
            // with by nearly everyone.
            {
                key: "Hyborian_Barbarism_1",
                dimension: "Barbarism",
                text: "Safe behind their walls, civilised people have grown soft",
            },
            {
                key: "Hyborian_Barbarism_2",
                dimension: "Barbarism",
                text: "In the end, barbarism always triumphs over civilisation",
            },
            {
                key: "Hyborian_Barbarism_3",
                dimension: "Barbarism",
                text: "Cities, laws and learning have made people stronger, not weaker",
                reverse: true,
            },

            // Splendour: rank and fine things. One item for rank — a throne
            // against the crowd, which costs something to agree with, where
            // "rather rule than be ruled" was agreed with by anybody who
            // would rather not be ruled — one for taste, and the reversed
            // one a fan will know: the Barbarian's answer to Yasmina in The
            // People of the Black Circle ("To chafe your rump on gold
            // thrones…?"), a claim strong enough that the room splits.
            {
                key: "Hyborian_Splendour_1",
                dimension: "Splendour",
                text: "Better to sit on the throne than to stand in the crowd",
            },
            {
                key: "Hyborian_Splendour_2",
                dimension: "Splendour",
                text: "Silk, gold and fine wine are worth every coin they cost",
            },
            {
                key: "Hyborian_Splendour_3",
                dimension: "Splendour",
                text: "A gold throne is a cage, not a prize",
                reverse: true,
            },

            // The god ----------------------------------------------------

            // Indifference: no god or fate is watching. The second item is
            // Crom's own line in Queen of the Black Coast ("Little he cares
            // if men live or die") and what makes the dimension his — an
            // indifferent god is still a god. The third is Asking No One's,
            // prayer as inaction, which people split over; "better to trust
            // your own strength than to pray" was agreed with by the devout
            // too, strength not excluding prayer.
            {
                key: "Hyborian_Indifference_1",
                dimension: "Indifference",
                text: "Everything that happens to us happens for a reason",
                reverse: true,
            },
            {
                key: "Hyborian_Indifference_2",
                dimension: "Indifference",
                text: "If there are gods, they care little whether we live or die",
            },
            {
                key: "Hyborian_Indifference_3",
                dimension: "Indifference",
                text: "Praying for something is a way of doing nothing about it",
            },

            // Afterlife: something comes after death (the second item), and
            // it matters to how one lives (the first). The reversed item is
            // the grey realm's shrug on the second facet — this life as the
            // only one worth the worry — which an unbeliever and a believer
            // who lives as if it made no difference both agree with; "death
            // is the end, and nothing waits beyond it" only mirrored the
            // belief item, and the first draft's "This life does not need
            // an afterlife to be worth living" was agreed with by believers
            // and unbelievers alike.
            {
                key: "Hyborian_Afterlife_1",
                dimension: "Afterlife",
                text: "What comes after death should shape how we live now",
            },
            {
                key: "Hyborian_Afterlife_2",
                dimension: "Afterlife",
                text: "Some part of us goes on after death",
            },
            {
                key: "Hyborian_Afterlife_3",
                dimension: "Afterlife",
                text: "This life is the only one worth worrying about",
                reverse: true,
            },

            // The Gift at Birth: what you have was given, and the rest is
            // what you do with it. The first item is Crom's gift. The
            // reversed one is the self-made claim, which people split over
            // and which mirrors neither forward item; "with enough will,
            // anyone can become anything" was strong enough that most
            // rejected it.
            {
                key: "Hyborian_Gift_1",
                dimension: "The Gift at Birth",
                text: "Courage is something you are born with, not something you learn",
            },
            {
                key: "Hyborian_Gift_2",
                dimension: "The Gift at Birth",
                text: "What a person is made of shows early and changes little",
            },
            {
                key: "Hyborian_Gift_3",
                dimension: "The Gift at Birth",
                text: "A person is made by their choices, not by their birth",
                reverse: true,
            },

            // Sacred Pleasure: the body and its pleasures as holy rather
            // than base — but not in those words. "Holy" and "worship"
            // confounded the scale with religiosity, a secular hedonist
            // rejecting the word and landing as an ascetic; "nothing to be
            // ashamed of" met near-universal agreement. So the anti-ascetic
            // claim stated plainly — and concretely: "There is no virtue in
            // self-denial" left what was being denied to the reader, who
            // could take it for thrift or for modesty, so it names the body
            // and its pleasures, which is what the dimension is about —
            // Howard's feasts kept with the soul in them and a real opposite
            // beside them, and the reversed item the ascetic's.
            {
                key: "Hyborian_Pleasure_1",
                dimension: "Sacred Pleasure",
                text: "There is nothing noble in denying the body its pleasures",
            },
            {
                key: "Hyborian_Pleasure_2",
                dimension: "Sacred Pleasure",
                text: "Feasting does more for the soul than fasting",
            },
            {
                key: "Hyborian_Pleasure_3",
                dimension: "Sacred Pleasure",
                text: "The body's appetites are there to be mastered, not indulged",
                reverse: true,
            },
        ],
    },
])

/* ==========================================================================
   PICTURES — prompts for the cards, being tried out and not decided on.

   The hero cards are these pictures, cut for the page by
   assets/hyborian/source/cut.py, all eight heroes now; a hero without one
   would be drawn as its emblem on a card of the same shape. These are the prompts (Gemini, Grok
   Imagine), one a hero and one a god, thirteen in the end — each drawn as a
   vintage collectible card, the way a fantasy trading card or a character
   card of an old fantasy board game looks, but all picture: an ornate border
   round a painting that fills it, and none of the name bar, text box, cost
   or numbers such a card would carry. The name, "It predicts…" and the vote
   stay the page's own, under the card. Two are written, the Pirate Queen and
   Crom — a hero and a god, a figure and a place — so that styles can be
   compared on a pair before the other eleven are written.

   A prompt is three parts put together: a STYLE, then the SUBJECT, then the
   FRAME. Only the style changes between tries, so two pictures of one
   subject differ in the thing being judged; the frame is what the card needs
   whatever the style. Neither generator takes a negative prompt, so what to
   avoid is written into the subject as words.

   Named in no prompt, on purpose: Conan (a live trademark), Bêlit herself
   (the name pulls a generator towards the comics' drawing of her), and every
   later likeness — Frazetta, Buscema, Brundage's covers, the films. That is
   the rights note at the head of this file, and it is why the cards' own
   emblems are not faces. Painters dead more than seventy years may be named.
   A generated face is still worth looking at for somebody's likeness before
   it goes on a card.

     PROMPT:
     -------

     BELIT

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A pirate queen of an ancient sea stands at the prow of her long,
     sleek black galley, seen full length, one foot on the rail
     and one hand resting near a jeweled dagger sheathed at her hip.
     She is young, tall, and fierce, formed like a goddess: lithe, alluring,
     with ivory-white skin and a mass of midnight-black hair blown back by the hot wind.
     Her dark eyes burn with untamed intensity. In true Shemite reaver fashion,
     she wears a wide, jeweled girdle of heavy crimson silk, heavy gold armlets, and bare feet.
     Beyond the low-waisted war vessel lies a sinister jungle coastline where a black, sluggish river empties into the sea under a copper, hazy sunset.
     Ancient Near Eastern antiquity, not a seventeenth-century pirate: no tricornes, no cutlasses, no eye patches.

     -----
     CONAN (the young swordsman of The Tower of the Elephant)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A young barbarian from the northern hills stands full length on a
     windswept ridge of grey-green heather, the point of a long straight
     broadsword resting on the rock in front of him, both hands on the hilt.
     He is tall and rangy rather than bulky, built like a hunting cat, with a
     square-cut mane of black hair, sun-darkened skin marked with old scars
     and smouldering blue eyes under a heavy brow. He wears a plain shirt of
     dark ring-mail over a rough wool kilt, a wide leather belt with a long
     knife, and worn fur-lined boots. Far below and behind him, on a hazy
     golden plain, lies a walled city of domes and towers that he looks at
     with contempt. Low grey clouds over the hills behind, sunlight on the
     plain ahead. Ancient, not Viking and not medieval: no horned helmet, no
     fur loincloth, no bodybuilder muscles, no pile of skulls or bodies at
     his feet, no likeness of any actor.

    -----
     Valeria (after Valeria of the Red Brotherhood, in Red Nails)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A woman mercenary stands full length in the shade of a great stone
     gateway of a crowded caravan city, one shoulder against a carved
     pillar, one hand resting easily on the hilt of a straight sword, a
     heavy purse of coin at her belt. She is tall, lean and strong, in her early thirties,
     with wild fair hair tied back and
     cool, steady grey eyes that miss nothing. She is free and independent. Still beautiful and attractive.
     She wears a plain loose white tunic with a leather belt and a light chainmail, and a travelling cloak thrown
     back. Legs gleaming in the heat, with high laced sandals. Behind her, through the gate, a noon-bright bazaar of striped
     awnings, camels, merchants and guards of a dozen lands. At ease
     anywhere, owned by nobody. Ancient Near Eastern antiquity, not
     medieval: no red hair, no plate armour.

    -----
     THE THIEF (after Taurus of Nemedia, the prince of thieves, in The
     Tower of the Elephant: "tall as the Cimmerian, and heavier; he was
     big-bellied and fat, but his every movement betokened a subtle dynamic
     magnetism", barefoot, a knotted rope over his shoulder; he killed the
     tower's lions with a powder blown from a tube. Save the original as
     source/taurus1.jpg)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A master thief crouches full length in the dark of a moonlit garden at
     the foot of a high wall, one hand raised for silence, a knotted silk
     rope coiled over his shoulder. He is tall and heavy in the prime of
     middle age, big-bellied and powerful rather than comic, yet poised on
     the balls of his bare feet as lightly as a cat; a sly, good-humoured
     face of a rogue with a short dark beard, and keen eyes that glint in the
     starlight. He wears a dark sleeveless tunic belted under his belly, and
     at the belt a slim hollow tube of copper and a short knife. Behind him,
     rising out of the garden into the stars, stands one tall, slender tower
     of pale stone gleaming like frosted silver, its rim crusted with jewels,
     a single red jewel glowing at its top. Among the dark shrubs, half-seen,
     the shape of a crouching lion. Deep blue night, silver starlight on the
     tower. Ancient Near Eastern antiquity, not medieval: no hood, no mask, no
     bow or crossbow, no modern assassin, not a young acrobat.


     -----
     THE KING (the barbarian on the throne of The Phoenix on the Sword)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A barbarian who became a king sits full length on a massive throne of
     dark carved wood in a vast pillared hall, a long plain broadsword laid
     across his knees and one scarred fist resting on it. He is broad and
     powerful in late middle age, his square-cut black hair and short beard
     going grey, his face lined and weathered, his blue eyes hard and
     watchful. He wears plain black mail under a heavy crimson cloak and a
     simple narrow band of gold on his brow, nothing more. Behind the
     throne hangs a great banner with a golden lion on black; in the shadows
     between the pillars, courtiers in rich silks whisper among themselves,
     and he pays them no mind. Torchlight, deep reds and golds. Ancient, not
     medieval and not Viking: no horned helmet or crown of spikes, no
     ornate fantasy plate armour, no likeness of any actor.

     -----
     THE SORCERER (the priest of the serpent, after Thoth-Amon in The
     Phoenix on the Sword)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A sorcerer-priest stands full length in a temple of black stone,
     between columns carved as coiling serpents, a great serpent coiled at
     his feet with its head raised beside his hand. He is tall and gaunt,
     shaven-headed, of no fixed age, with a still, clever face and eyes that
     glitter in the dark; he wears long black robes worked with faint
     silver, and on one finger a copper ring shaped like a coiled snake. A
     single green lamp burns on an altar behind him, and through a high
     doorway the black shape of a pyramid stands against a starless sky.
     Patient, learned, bound by nothing. Colours of black, bronze and a
     sickly green. Antiquity older than Egypt. No white beard,
     no staff with a crystal, no glowing magic effects.

     -----
     THE WITCH (after Zelata, the wise-woman of the hills, in The Hour of
     the Dragon)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     An old wise-woman stands full length at the door of a low stone hut
     high on a snowy mountainside at night, a tall staff of dark wood in one
     hand, a great grey wolf sitting at her side. She is tall and straight
     for her age, still magnetic and alluring, with long iron-grey hair, a strong lined face and calm,
     dark, knowing eyes; she wears a plain robe of dark undyed wool and a
     heavy shawl, a string of bones and amber at her neck. A small fire
     glows inside the doorway behind her. Far below, in the valley, lie the
     scattered lights of a kingdom's towns, and above the peaks hangs a thin
     crescent moon. Unhurried, watchful, outside every law. Deep blues and
     firelight. Ancient, not a fairy-tale witch: no pointed hat, no
     broomstick, no cauldron, no green skin, no cackling crone.

     -----
     THE FRONTIERSMAN (after Balthus and his dog, in Beyond the Black River)


     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A young settler stands full length at the edge of a forest clearing at
     dusk, an axe on his shoulder, a great shaggy grey hound at his side
     with its hackles up. He is sturdy, sandy-haired and open-faced, not a
     warrior by trade but steady and brave, looking out into the trees with
     wary respect. He wears a homespun wool tunic, leather leggings and
     moccasin-like shoes, a hunting knife and a horn at his belt. Behind him
     stands a stockade fort of sharpened logs with a thread of smoke rising;
     in front of him a dark, sluggish river, and beyond it an endless
     primeval forest, black and silent, where something is watching. Deep
     green and amber light fading to night. Ancient antiquity, not colonial
     America: no muskets, no coonskin cap, no tricorne.

     -----
     THE PRINCESS (after Yasmina, the Devi of Vendhya, in The People of the
     Black Circle: "the suppleness and beauty of her tall, slender figure.
     A filmy veil fell below her breasts, supported by a flowing head-dress
     bound about with a triple gold braid and adorned with a golden
     crescent", a jeweled dagger in her girdle; at the end she goes back
     to her throne rather than into the hills.)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A young queen lies on a sofa next to the arched window of a mountain
     fortress at dusk, one hand lifting a filmy veil from her face, the
     other resting on a jewelled dagger. She is tall and
     slender, proud and imperious, and beautiful and alluring, with dark, commanding eyes and long black
     hair; she wears gossamer robes of pale silk over rich transparent garments of
     crimson and gold, and a flowing head-dress bound with a triple braid of
     gold and set with a golden crescent. Behind her, a chamber of carved
     ivory, silk cushions and brass lamps; through the window in front of
     her, the wild blue peaks of great mountains and, very small on the pass
     far below, a lone rider. Splendour at her back and the wilds before
     her. Warm gold lamplight inside, cold blue dusk outside. Early Indian
     antiquity, older than any empire in the history books: not Mughal, not
     a film costume, no tiara, not a fairy-tale princess, no pink.

     -----
     THE EXILE (after Yag-Kosha, the being from Yag in The Tower of the
     Elephant: "the image had the body of a man, naked, and
     green in color; but the head was one of nightmare and madness … the
     wide flaring ears, the curling proboscis, on either side of which
     stood white tusks tipped with round golden balls"; blind, topaz-eyed,
     on a marble couch under a domed golden ceiling, the walls green jade,
     the floor ivory, incense rising from a brazier on a golden tripod. He
     came to earth outcast from the green planet Yag, watched the ages
     pass, was a god to jungle-folk, and would not teach Yara the magic to
     enslave kings.)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     An ancient, sorrowful alien being sits full length on a marble couch in a
     round chamber high in a tower: a man-like tall and lanky body, naked but for a
     cloth about the loins, smooth and green in colour, and the great head reminiscent of
     an elephant, with wide flaring ears, a long curling trunk-like nose and white
     tusks tipped with round golden balls. His eyes are topaz and blind,
     tears on his cheeks, and his limbs bear the old marks of torment; yet
     he sits upright, dignified and patient, his trunk raised gently towards
     the viewer as a blind man reaches out. Above him a domed golden
     ceiling, around him walls of green jade and a floor of ivory with thick
     rugs; smoke of incense rising from a brazier on a golden tripod, and
     through a narrow window a sky full of stars, one of them faintly green.
     Greens, golds and warm incense haze. Grave, tender and very old, not a
     monster and not a Hindu god: no many arms, no crown, no jewels on the
     body, no chains, no blood.


     -----
     THE SHAMAN (after Zogar Sag, the Pictish wizard of Beyond the Black
     River: "a lean figure of middle height, almost hidden in ostrich plumes
     set on a harness of leather and copper. From amidst the plumes peered a
     hideous and malevolent face"; his eyes "shone red as blood in the
     firelight" as he called leopards and pythons out of the forest, in front
     of a hut "decorated by human skulls dangling from the eaves". The
     plumes are Kushite, traded up the coast, which is why they are ostrich
     and not any bird of that forest. Save the original as
     source/shaman1.jpg)

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple warm bronze border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     A forest shaman stands full length before a long hut of logs and bark
     at night, arms raised as he calls something out of the forest, a ring of
     fires throwing red light up across him. He is lean and of middle
     height, with a long neck and a thin, cruel, clever face, his eyes
     glinting red in the firelight; he is almost hidden in a great mass of
     black and white ostrich plumes set on a harness of leather and copper,
     his face and chest painted with pale clay patterns, copper bands on his
     arms. Human skulls hang from the eaves of the hut behind him. At the
     edge of the clearing, where the black forest crowds in, a leopard's eyes
     shine green and the coils of a great python slide out of the dark.
     Drums, smoke and sparks rising into the night. Deep reds and blacks,
     firelight and green eyes. Ancient and primeval, the magic real and
     frightening: not a Native American costume — no war bonnet, no eagle
     feathers, no tipi, no totem pole, no tomahawk — and not a comic witch
     doctor, no bone through the nose.

     ------- GODS -----------------------------------
     CROM

     Don't use memory. Start fresh.

     A single vintage fantasy collectible card, seen straight on and filling
     the image, 5:7. The painting runs the full height and width
     of the card. No border, No title bar, no text
     box, no name, no numbers, no symbols, no lettering or runes anywhere, no
     signature, no watermark. Old printed card stock: slightly faded colour,
     faint print grain, a little wear at the edges. One clear silhouette that
     still reads when the card is small.

     Simple cold pale silver-blue border decoration.

     STYLE:
     An early-1990s fantasy trading card painting: oil and
     gouache, rich but slightly muddy colour, dramatic lighting,
     a painterly background that stays readable behind the
     figure, the look of the first years of the hobby.
     Pulp, dramatic, mature. Obviously hand-painted.

     SUBJECT:
     No figure. A vast grey
     mountain fills the height of the card, rising out of dark, pine-covered
     hills under a low sky of storm cloud, its summit lost in mist. High in
     its rock, so large it could be taken for the mountain itself, the
     very faint suggestion, almost not visible, of a stern, bearded face
     with its eyes closed, turned a little away, paying no attention to
     anything below. On a shoulder of the mountain, very small, a ring of
     twelve standing stones round one taller stone. Grey mist fills the
     valleys. Cold, sunless light in greys and cold blue. The mood is
     indifference, not menace: no glowing eyes, no lightning from the sky, no
     worshippers, no throne, no horned helmet.



   STYLES, one at the front of the prompt, for the painting inside the
   border. The first two are the cards' own; the rest are the looks
   written first, which a card can carry as well:

     Card        An early-1990s fantasy trading card painting: oil and
                 gouache, rich but slightly muddy colour, dramatic lighting,
                 a painterly background that stays readable behind the
                 figure, the look of the first years of the hobby.
     Board game  A 1980s fantasy board game character card painting: bright
                 flat gouache, crisp outlines, a sunlit storybook landscape
                 behind a figure standing full length, the whole figure
                 clear at a glance across a table.
     Woodcut     A hand-coloured sixteenth-century German woodcut: bold black
                 lines and cross-hatching, flat washes of a few watercolours,
                 on aged, browning paper. Level 1's pictures are prints of
                 this kind, so the run would share one look.
     Engraving   A copperplate engraving printed in white ink on black paper,
                 fine line and stipple, one accent colour — warm bronze for a
                 hero, pale cold blue for a god. Level 1's night side, and the
                 card's own two colours.
     Pulp        A 1930s pulp magazine cover painting in gouache: saturated
                 colour, hard rim light, a low dramatic angle, the brush
                 visible. Where the stories were first printed.
     Symbolist   A late nineteenth-century Symbolist oil painting in the
                 manner of Arnold Böcklin: muted, brooding, luminous dusk,
                 very still.
     Ancient     The subject as the art of its own world would have made it:
                 for the Pirate Queen a Minoan fresco (flat ochre, red and
                 blue on cracked plaster, the figure in profile); for Crom a
                 weathered Pictish standing stone carved in low relief, lit
                 from the side. Nearest the real ancient art the gods were
                 meant to have.
     Tarot       An early twentieth-century tarot card illustration: clean ink
                 outlines, flat colour, symbolic props, the figure posed
                 frontally, as in the Rider-Waite deck, without its title.


   ========================================================================== */
