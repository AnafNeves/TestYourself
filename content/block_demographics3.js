defineBlock("demographics3", [
    {
        key: "demographics3",
        name: "Socioeconomic position",
        instructions: "",
        shuffle: false,
        items: [
            // ESS-FIN ==============================================================
            // Subjective Financial Well-Being (European Social Survey / OECD standard):
            // Validated 4- or 5-point ordinal indicator of financial strain vs. comfort.
            // The gloss under it says whose household, since a student's own
            // finances and their family's can be very different: what is asked
            // is the money somebody lives on now, not the family they come from.
            {
                key: "Demographics_FinancialComfort",
                text:
                    "Which of these descriptions comes closest to how you feel about your household's financial situation today?" +
                    "<br /><br /><small><b>Household</b>, here, means you and anyone you share money with day to day.</small>",
                format: {
                    options: [
                        { value: 1, text: "Living very comfortably on present income" },
                        { value: 2, text: "Living comfortably on present income" },
                        { value: 3, text: "Coping on present income" },
                        { value: 4, text: "Finding it difficult on present income" },
                        { value: 5, text: "Finding it very difficult on present income" },
                    ],
                    color: "#0e7490",
                    hovercolors: ["#22c55e", "#ef4444"],
                },
            },

            // MSSS =================================================================
            // MacArthur Scale of Subjective Social Status (Adler et al., 2000):
            {
                key: "Demographics_SocialStatus",
                text:
                    "Think of the ladder below as showing where people stand relative to other people in your country. At the top are people who have the most money, the most " +
                    "education and the most respected jobs. At the bottom are people who have the least money, the least " +
                    "education and the least respected jobs. Where would you place yourself on this ladder?",
                format: {
                    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    vertical: true,
                    anchors: ["Lowest standing", "Highest standing"],
                    color: "#0e7490",
                    hovercolors: ["#ef4444", "#22c55e"],
                },
            },
        ],
    },
])
