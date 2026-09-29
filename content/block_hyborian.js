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
   what they take the world to be. The level closes on the first three
   (js/figures/hyborian.js): which HERO they make somebody, out of eight,
   shown as the hero's painted card with the person's three stats on a card
   beside it. The other four were written to read which GOD would claim
   them, out of five, from dimensions disjoint from the hero's so that the
   pair would say something — a Thief claimed by Mitra is news — and THE GOD
   IS NOT SHOWN FOR NOW (September 2026): the four are still asked and saved,
   and the reading is kept in the figure file, drawn by nothing.

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
            "is no right answer. At the end you will find out which of its heroes you would have been.</p>",
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

/* ==========================================================================
   PICTURES — prompts for the cards, being tried out and not decided on.

   The hero cards are these pictures, cut for the page by
   assets/hyborian/source/cut.py; a hero without one (the Frontiersman) is
   drawn as its emblem on a card of the same shape. These are the prompts (Gemini, Grok
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
     THE THIEF (the thieves' quarter of The Tower of the Elephant)

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
     A thief crouches full length on the edge of a flat rooftop at
     night, poised to jump, above a sprawling ancient city of domes, towers
     and lamp-lit alleys. He is quick, with a sharp, clever
     face half in shadow, a crooked grin and bright dark eyes; The rogue wears
     close-fitting dark cloth, soft leather slippers, a coil of silk rope
     over one shoulder and a slim curved knife at his hip. Across the city,
     rising above everything, stands one tall, slender tower of pale stone
     with a single red jewel glowing at its top, and he is looking at it.
     A thin moon, deep blue night, warm lamplight below. Ancient Near
     Eastern antiquity, not medieval: no hooded modern assassin, no mask, no
     bow or crossbow, no Robin Hood hat.


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


     

     THE FRONTIERSMAN (after Balthus and his dog, in Beyond the Black River)

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
