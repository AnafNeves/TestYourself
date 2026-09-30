// How long a level's card says it takes, read out of content/timeline.js rather
// than written on the card, so that a card photographed again after the pilot's
// timings are rewritten carries the new number. A card marks where it goes with
// data-minutes="<level key>"; the words written there are what it says if the
// level has no minutes, or if the timeline did not load.
for (const place of document.querySelectorAll("[data-minutes]")) {
    const level = typeof BATTERIES === "undefined" ? null : BATTERIES.all.find((each) => each.key === place.dataset.minutes)
    if (level && level.minutes) place.textContent = `${level.minutes} minutes`
}
