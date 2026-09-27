# Prints the norms that can be worked out from data, in the shape `content/`
# wants them, so that the app's numbers can always be traced to a source rather
# than to somebody's transcription of a PDF.
#
# Almost every `norms` block in `content/` is an invented placeholder, flagged
# as such where it is written. The ones that are not each come from a script of
# their own in this folder, `norms_<questionnaire>.R`, which says where its
# numbers come from and which block file they go into:
#
#   norms_hitop.R   THE HiTOP-BR (`content/block_hitop.js`), from the {hitop}
#                   package's development-sample statistics
#   norms_mint.R    THE MINT (`content/block_mint.js`), from the raw answers of
#                   the studies that have asked it
#
# Each runs on its own (`Rscript data/norms/norms_mint.R`), and this file runs
# all of them, one after another, so a new questionnaire's norms are a new
# `norms_*.R` and nothing here changes. Each is run in an environment of its
# own and an error in one is reported and passed over, so that a missing
# package or a dropped connection costs that questionnaire and not the rest.
# The printing helpers they share are in `common.R`.
#
# Every script prints the number lines and nothing else: the `interpretations`
# beside them are the app's own prose, and a script that carried them would
# sooner or later paste an old one back over a newer one.
#
# Nothing in the app reaches for this folder, or for R at all — it is a
# workbench, not part of the page.

here <- local({
  run <- sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE))
  if (length(run) > 0) dirname(run[1]) else tryCatch(dirname(sys.frame(1)$ofile), error = function(e) ".")
})

source(file.path(here, "common.R"))

for (script in sort(list.files(here, pattern = "^norms_.*[.]R$", full.names = TRUE))) {
  tryCatch(
    sys.source(script, envir = new.env(parent = globalenv())),
    error = function(e) cat("\nSTOPPED in ", basename(script), ": ", conditionMessage(e), "\n", sep = "")
  )
}
