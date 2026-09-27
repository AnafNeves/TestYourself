# The HiTOP-BR's norms (`content/block_hitop.js`): the means and SDs of the
# instrument's own development sample, printed in Table 1 of Simms et al.
# (2026) and shipped in the {hitop} package as `hitopbr_devstats`.
#
# Run it, and paste the number lines it prints over the ones already in the
# block file. It prints the numbers and nothing else: the `interpretations`
# beside them are the app's own prose. See `make_norms.R` for the folder as a
# whole.

# The helpers every norms script prints with, out of `common.R` beside this
# file, whether it was run with Rscript, source()d, or source()d by
# `make_norms.R`.
if (!exists("paste_lines")) {
  local({
    run <- sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE))
    here <- if (length(run) > 0) dirname(run[1]) else tryCatch(dirname(sys.frame(1)$ofile), error = function(e) ".")
    source(file.path(here, "common.R"))
  })
}

rule("HiTOP-BR  ->  content/block_hitop.js")

# Installing a package behind somebody's back is worse than telling them, so
# this says the one line that fixes it and stops there.
if (!requireNamespace("hitop", quietly = TRUE)) {
  cat("SKIPPED: the {hitop} package is not installed. Install it with\n\n")
  cat('    pak::pak("jmgirard/hitop")\n\n')
  cat("(or remotes::install_github(\"jmgirard/hitop\")) and run this again.\n")
} else {
  devstats <- as.data.frame(hitop::hitopbr_devstats)

  for (column in c("Scale", "nItems", "mean", "sd")) {
    if (!column %in% names(devstats)) {
      stop(
        "hitopbr_devstats has no `", column, "` column any more — the package's ",
        "table has been restructured, and this script wants rewriting against it.",
        call. = FALSE
      )
    }
  }

  # The app renames the six spectra for the people answering them: the HiTOP's
  # own names are clinical jargon, and two of them read as verdicts handed back
  # to somebody who has just described themselves. The mapping is one for one,
  # so nothing about the scoring changes — see the comment above the norms in
  # `content/block_hitop.js`, which this has to agree with. In the app's own
  # order, which is the order they are written in that file.
  renamed <- c(
    "Somatoform" = "Bodily Complaints",
    "Internalizing" = "Emotional Intensity",
    "Thought Disorder" = "Unusual Experiences",
    "Detachment" = "Solitude",
    "Disinhibition" = "Impulsivity",
    "Antagonism" = "Dominance"
  )

  cat("Development-sample statistics, from {hitop} ", as.character(utils::packageVersion("hitop")), "\n", sep = "")
  cat("(Simms et al., 2026, Table 1 — N = 780, scores are item means on the 1-4 coding)\n\n")

  # Every scale the package prints, not only the six the app uses: a number that
  # has quietly changed between versions is easier to notice beside the others.
  cat(sprintf("  %-18s %6s %8s %8s\n", "SCALE", "ITEMS", "MEAN", "SD"))
  for (at in order(devstats$Scale)) {
    cat(sprintf(
      "  %-18s %6d %8.2f %8.2f\n",
      devstats$Scale[at], as.integer(devstats$nItems[at]), devstats$mean[at], devstats$sd[at]
    ))
  }
  cat("\n")

  # A scale the package has renamed would otherwise be dropped in silence, and
  # the app would keep whatever numbers it already had under the old name.
  missing <- setdiff(names(renamed), devstats$Scale)
  if (length(missing) > 0) {
    stop(
      "These scales are not in hitopbr_devstats: ", paste(missing, collapse = ", "), ".\n",
      "The package's names are: ", paste(sort(devstats$Scale), collapse = ", "), ".\n",
      "Fix the mapping in this script and in content/block_hitop.js together.",
      call. = FALSE
    )
  }

  cat("Paste into the `norms` of `hitopbr` in content/block_hitop.js\n")
  cat("(the two number lines only — leave each `interpretations` where it is):\n\n")

  for (scale in names(renamed)) {
    at <- match(scale, devstats$Scale)
    paste_lines(renamed[[scale]], devstats$mean[at], devstats$sd[at], paste0("HiTOP: ", scale))
  }

  # Two of the eight cut across the six rather than sitting beside them, and an
  # item in the app carries one dimension, so both are left to analysis time —
  # the way the SSS-8's sum is. They are printed in the table above for
  # provenance and have no norms to paste anywhere.
  spare <- setdiff(devstats$Scale, names(renamed))
  if (length(spare) > 0) {
    cat("Not asked as dimensions in the app (they cut across the six, and are\n")
    cat("left to analysis time): ", paste(sort(spare), collapse = ", "), "\n", sep = "")
  }
}

# ---------------------------------------------------------------------------
# Norms of our own, once this study has run.
#
# The HiTOP-BR's numbers above are a *development* sample, not a norming one,
# and every spectrum piles up near its floor of 1 — which is why the app's
# comment says the percentiles it reads them through are coarse at the low end.
# Once the study has run, the same figures can be worked out from its own
# answers: the saved files carry the items under the package's own numbers
# with the app's prefix (`HITOP_01`..`HITOP_45`; `HBR_nn` in files written
# before September 2026), in instrument order, so they go into
# `score_hitopbr()` once the columns are renamed `HBR_nn`.
#
#   answers <- ...                     # one row per participant, renamed to HBR_01..HBR_45
#   scores <- hitop::score_hitopbr(answers, items = 1:45, append = FALSE)
#   round(sapply(scores, mean, na.rm = TRUE), 2)
#   round(sapply(scores, stats::sd, na.rm = TRUE), 2)
#
# TO DO — QUANTILES RATHER THAN A MEAN AND AN SD (September 2026). The app
# turns a HiTOP-BR score into a standing through a normal curve, and these
# spectra are nothing like normal: they pile up at the floor, so a run of
# "Not at all" lands near the 30th percentile and the whole low end is read
# coarsely. The climb figure (js/figures/climb.js) is drawn from those
# standings, so this matters on screen. The better norm is a table of
# empirical quantiles per spectrum — say the 1st to the 99th — read by
# interpolation. `hitopbr_devstats` carries means and SDs only; if the
# package or the paper's supplement ever ships the development sample's
# quantiles or raw scores, print them here in that shape:
#
#   round(sapply(scores, stats::quantile, probs = seq(0.01, 0.99, 0.01), na.rm = TRUE), 2)
#
# and once this study's own answers are in, the same line on them. Reading a
# quantile table is not written yet: `norms` in content/ take `{ mean, sd }`
# and `percentile()` in app.js is the normal CDF, so the engine wants a
# `quantiles: [...]` form beside `mean`/`sd` and a lookup in `percentile()`
# that prefers it when present. AGENTS.md carries the same note.
#
# Those columns come out named `hbr_` plus the scale's camelCase name, not the
# app's dimension names, so `renamed` above is still what maps one to the other.
