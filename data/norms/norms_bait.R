# The BAIT's norms (`content/block_bait.js`), worked out from the raw answers
# of the eight studies that have asked it, item by item and dimension by
# dimension, and scored the way the app scores them.
#
# Run it, and paste the number lines it prints over the ones already in the
# block file. It prints the numbers and nothing else: the readings the app
# gives back are its own prose. See `make_norms.R` for the folder as a whole.
#
# It prints more than the MINT's script does, on purpose. The BAIT's section is
# being redrawn, and what it could say depends on what the data can back — so
# as well as the paste lines it prints every item's distribution, the
# dimensions' quantiles, how they differ by sex and age and how they hang
# together — and, for the robot the section is drawn as
# (`js/figures/archetype.js`), the two blocks that figure holds: the SD of
# its Menace axis with the share of people in each of its four corners, and
# the spread of answers to every statement its crowd cards are set against.

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

rule("BAIT  ->  content/block_bait.js")

# WHERE THE DATA COME FROM. The pooled validation of the BAIT
# (github.com/RealityBending — the BAIT repository's `study1/analysis.qmd`)
# streams every study's raw file from its own repository and keeps a copy in a
# git-ignored `data/` folder beside it. That copy is read first, since it is
# the exact set of files the validation was run on; a file missing from it is
# fetched from the study's own repository instead. `BAIT_DATA` in the
# environment points at a copy somewhere else.
BAIT_DATA <- Sys.getenv("BAIT_DATA", "C:/Users/domma/Dropbox/RECHERCHE/Studies/BAIT/study1/data")

# THE STUDIES, oldest first, each with the columns that hold an item the app
# asks, under the app's own key. Every mapping below is copied from the
# validation's loading code, which is the mapping of record, and two things in
# it are deliberate:
#
#   - In FictionEro1, FakeNewsValidation, FakeFace2 and FakeChat the column
#     named for *VideosRealistic* holds the *VideosIssues* item and the other
#     way about: the experiments' item and name vectors are misaligned at
#     positions 3 and 4. The crossing is undone here, and must not be "fixed"
#     back.
#   - An item is only mapped where its wording is the app's, give or take
#     "Artificial Intelligence" for "AI" and FakeFace1's leading "I think".
#     FakeFace1's `FaceErrors` ("will contain errors") is not the app's
#     `ImagesIssues` ("always contain errors and artifacts"), FictionEro2's
#     `InnovativeAI` ("media… in terms of innovation") is not the app's
#     `ArtAIBest` ("art… and artistic value"), and FictionEro1's knowledge
#     question sits in its demographics with a wording nobody has checked, so
#     none of those three is mapped. FictionEro2's `EmotionalHuman` is the
#     app's `ArtHumanBest` but for "Human-generated" in place of "Human-made",
#     and is.
#
# `range` is the response scale. Three of the studies answered on an analog
# slider from 0 to 1 rather than the app's seven circles, and a slider is not
# the same instrument however it is rescaled — people stop on a circle and
# glide on a line — so those three are read, rescaled onto 0-6 and shown
# beside the others for comparison, and **not pooled into the norms** unless
# `BAIT_POOL_SLIDERS` is set.
BAIT_POOL_SLIDERS <- FALSE

BAIT_SOURCES <- list(
  FakeFace1 = list(
    file = "FakeFace1.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FakeFace/refs/heads/main/data/data.csv",
    range = c(0, 1), sex = "Sex", date = "Date",
    # One row a face rather than a person: a trial-level file.
    trials = TRUE,
    items = c(
      BAIT_ImagesRealistic = "AI_1_RealisticImages",
      BAIT_ImitatingReality = "AI_5_ImitatingReality",
      BAIT_Dangerous = "AI_6_Dangerous",
      BAIT_VideosRealistic = "AI_7_RealisticVideos",
      BAIT_Exciting = "AI_8_Exciting"
    )
  ),
  FictionEro1 = list(
    file = "FictionEro1.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FictionEro/refs/heads/main/study1/data/data_participants.csv",
    range = c(0, 1), sex = "Sex", date = "Date",
    items = c(
      BAIT_ImagesRealistic = "BAIT_1_ImagesRealistic",
      BAIT_ImagesIssues = "BAIT_2_ImagesIssues",
      BAIT_VideosIssues = "BAIT_3_VideosRealistic", # crossed in the data
      BAIT_VideosRealistic = "BAIT_4_VideosIssues", # crossed in the data
      BAIT_ImitatingReality = "BAIT_5_ImitatingReality",
      BAIT_EnvironmentReal = "BAIT_6_EnvironmentReal",
      BAIT_TextRealistic = "BAIT_7_TextRealistic",
      BAIT_TextIssues = "BAIT_8_TextIssues",
      BAIT_Dangerous = "GAAIS_Negative_10",
      BAIT_Worry = "GAAIS_Negative_15",
      BAIT_Exciting = "GAAIS_Positive_12",
      BAIT_Benefit = "GAAIS_Positive_17"
    )
  ),
  FakeNewsValidation = list(
    file = "FakeNewsValidation.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FakeNewsValidation/refs/heads/main/data/rawdata_participant.csv",
    range = c(0, 1), sex = "Gender", date = "Experiment_StartDate",
    items = c(
      BAIT_ImagesRealistic = "BAIT_1_ImagesRealistic",
      BAIT_ImagesIssues = "BAIT_2_ImagesIssues",
      BAIT_VideosIssues = "BAIT_3_VideosRealistic", # crossed in the data
      BAIT_VideosRealistic = "BAIT_4_VideosIssues", # crossed in the data
      BAIT_ImitatingReality = "BAIT_5_ImitatingReality",
      BAIT_EnvironmentReal = "BAIT_6_EnvironmentReal",
      BAIT_TextRealistic = "BAIT_7_TextRealistic",
      BAIT_TextIssues = "BAIT_8_TextIssues",
      BAIT_Dangerous = "GAAIS_Negative_10",
      BAIT_Worry = "GAAIS_Negative_15",
      BAIT_Exciting = "GAAIS_Positive_12",
      BAIT_Benefit = "GAAIS_Positive_17"
    )
  ),
  FakeFace2 = list(
    file = "FakeFace2.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FakeFace2/refs/heads/main/data/data_participants.csv",
    range = c(0, 6), sex = "Gender", date = "Date",
    items = c(
      BAIT_ImagesRealistic = "BAIT_1_ImagesRealistic",
      BAIT_ImagesIssues = "BAIT_2_ImagesIssues",
      BAIT_VideosIssues = "BAIT_3_VideosRealistic", # crossed in the data
      BAIT_VideosRealistic = "BAIT_4_VideosIssues", # crossed in the data
      BAIT_ImitatingReality = "BAIT_5_ImitatingReality",
      BAIT_EnvironmentReal = "BAIT_6_EnvironmentReal",
      BAIT_TextRealistic = "BAIT_7_TextRealistic",
      BAIT_TextIssues = "BAIT_8_TextIssues",
      BAIT_Dangerous = "BAIT_9_NegativeAttitutes",
      BAIT_Worry = "BAIT_10_NegativeAttitutes",
      BAIT_Exciting = "BAIT_11_PositiveAttitutes",
      BAIT_Benefit = "BAIT_12_PositiveAttitutes",
      BAIT_Knowledge = "BAIT_AI_Knowledge"
    )
  ),
  FictionEro2 = list(
    file = "FictionEro2.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FictionEro/refs/heads/main/study2/data/data_participants.csv",
    range = c(0, 6), sex = "Gender", date = "Date",
    # Already under the app's names, being the study the exploratory blocks
    # were written for.
    items = c(
      BAIT_ImagesRealistic = "BAIT_ImagesRealistic",
      BAIT_ImagesIssues = "BAIT_ImagesIssues",
      BAIT_VideosIssues = "BAIT_VideosIssues",
      BAIT_VideosRealistic = "BAIT_VideosRealistic",
      BAIT_ImitatingReality = "BAIT_ImitatingReality",
      BAIT_EnvironmentReal = "BAIT_EnvironmentReal",
      BAIT_TextRealistic = "BAIT_TextRealistic",
      BAIT_TextIssues = "BAIT_TextIssues",
      BAIT_Dangerous = "BAIT_Dangerous",
      BAIT_Worry = "BAIT_Worry",
      BAIT_Exciting = "BAIT_Exciting",
      BAIT_Benefit = "BAIT_Benefit",
      BAIT_ImageDistinctionEasy = "BAIT_ImageDistinctionEasy",
      BAIT_ImageDistinctionBad = "BAIT_ImageDistinctionBad",
      BAIT_TextDifferentiation = "BAIT_TextDifferentiation",
      BAIT_ContentDetection = "BAIT_ContentDetection",
      BAIT_UniqueHuman = "BAIT_UniqueHuman",
      BAIT_ImpersonalAI = "BAIT_ImpersonalAI",
      BAIT_InterestingAI = "BAIT_InterestingAI",
      BAIT_ArtHumanBest = "BAIT_EmotionalHuman",
      BAIT_PreferenceHuman = "BAIT_PreferenceHuman",
      BAIT_TrustHuman = "BAIT_TrustHuman"
    )
  ),
  FakeArt = list(
    file = "FakeArt.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FakeArt/refs/heads/main/data/rawdata_participants.csv",
    range = c(0, 6), sex = "Gender", date = "Experiment_StartDate", check = "BAIT_AttentionCheck",
    items = c(
      BAIT_ImagesRealistic = "BAIT_1_ImagesRealistic",
      BAIT_ImagesIssues = "BAIT_2_ImagesIssues",
      BAIT_VideosIssues = "BAIT_3_VideosIssues",
      BAIT_VideosRealistic = "BAIT_4_VideosRealistic",
      BAIT_ImitatingReality = "BAIT_5_ImitatingReality",
      BAIT_EnvironmentReal = "BAIT_6_EnvironmentReal",
      BAIT_TextRealistic = "BAIT_7_TextRealistic",
      BAIT_TextIssues = "BAIT_8_TextIssues",
      BAIT_Dangerous = "BAIT_9_Dangerous",
      BAIT_Worry = "BAIT_10_Worry",
      BAIT_Exciting = "BAIT_11_Exciting",
      BAIT_Benefit = "BAIT_12_Benefit",
      BAIT_ArtHumanBest = "BAIT_13_ArtIssues",
      BAIT_ArtAIBest = "BAIT_14_ArtRealistic",
      BAIT_Knowledge = "BAIT_AI_Knowledge",
      BAIT_Usage = "BAIT_AI_Use"
    )
  ),
  FakeFace3 = list(
    file = "FakeFace3.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FakeFace3/refs/heads/main/data/rawdata_participants.csv",
    range = c(0, 6), sex = "Gender", date = "Experiment_StartDate", check = "BAIT_AttentionCheck",
    items = c(
      BAIT_ImagesRealistic = "BAIT_1_ImagesRealistic",
      BAIT_ImagesIssues = "BAIT_2_ImagesIssues",
      BAIT_VideosIssues = "BAIT_3_VideosIssues",
      BAIT_VideosRealistic = "BAIT_4_VideosRealistic",
      BAIT_ImitatingReality = "BAIT_5_ImitatingReality",
      BAIT_EnvironmentReal = "BAIT_6_EnvironmentReal",
      BAIT_TextRealistic = "BAIT_7_TextRealistic",
      BAIT_TextIssues = "BAIT_8_TextIssues",
      BAIT_Dangerous = "BAIT_9_Dangerous",
      BAIT_Worry = "BAIT_10_Worry",
      BAIT_Exciting = "BAIT_11_Exciting",
      BAIT_Benefit = "BAIT_12_Benefit",
      BAIT_ArtHumanBest = "BAIT_13_ArtIssues",
      BAIT_ArtAIBest = "BAIT_14_ArtRealistic",
      BAIT_Knowledge = "BAIT_AI_Knowledge",
      BAIT_Usage = "BAIT_AI_Use"
    )
  ),
  FakeChat = list(
    file = "FakeChat.csv",
    url = "https://raw.githubusercontent.com/RealityBending/FakeChat/refs/heads/main/data/rawdata_participants.csv",
    range = c(0, 6), sex = "Gender", date = "Experiment_StartDate", check = "BAIT_AttentionCheck",
    items = c(
      BAIT_ImagesRealistic = "BAIT_ImagesRealistic_1",
      BAIT_ImagesIssues = "BAIT_ImagesIssues_2",
      BAIT_VideosIssues = "BAIT_VideosRealistic_3", # crossed in the data
      BAIT_VideosRealistic = "BAIT_VideosIssues_4", # crossed in the data
      BAIT_ImitatingReality = "BAIT_ImitatingReality_5",
      BAIT_EnvironmentReal = "BAIT_EnvironmentReal_6",
      BAIT_TextRealistic = "BAIT_TextRealistic_7",
      BAIT_TextIssues = "BAIT_TextIssues_8",
      BAIT_Dangerous = "BAIT_NegativeAttitutes_9",
      BAIT_Worry = "BAIT_NegativeAttitutes_10",
      BAIT_Exciting = "BAIT_PositiveAttitutes_11",
      BAIT_Benefit = "BAIT_PositiveAttitutes_12",
      BAIT_Knowledge = "BAIT_AI_Knowledge",
      BAIT_Usage = "BAIT_AI_Use"
    )
  )
)

# What the app asks, in the order `content/block_bait.js` writes it, with the
# words beside each so that what is printed can be read without the block file
# open. It has to agree with that file: a key here that the app does not ask
# is a norm for nothing.
BAIT_ITEMS <- c(
  BAIT_Knowledge = "How knowledgeable about AI (0 not at all - 6 expert)",
  BAIT_Usage = "How often AI tools are used (see below)",
  BAIT_ImagesRealistic = "AI can generate very realistic images",
  BAIT_ImagesIssues = "AI faces always contain errors and artifacts",
  BAIT_VideosIssues = "AI videos are easy to spot as fake",
  BAIT_VideosRealistic = "AI can generate very realistic videos",
  BAIT_ImitatingReality = "CGI can perfectly imitate reality",
  BAIT_EnvironmentReal = "Technology makes environments as real as reality",
  BAIT_TextRealistic = "AI texts are indistinguishable from human ones",
  BAIT_TextIssues = "AI texts read differently from human ones",
  BAIT_Dangerous = "AI is dangerous",
  BAIT_Worry = "I am worried about future uses of AI",
  BAIT_Exciting = "AI is exciting",
  BAIT_Benefit = "Society will benefit from a future full of AI",
  BAIT_ImageDistinctionEasy = "I easily tell real from AI images",
  BAIT_ImageDistinctionBad = "I am bad at telling real from AI images",
  BAIT_TextDifferentiation = "I find it hard to tell AI from human text",
  BAIT_ContentDetection = "I detect subtle AI/human differences",
  BAIT_UniqueHuman = "Human creators bring what AI cannot",
  BAIT_ArtAIBest = "AI art can surpass human creativity",
  BAIT_ImpersonalAI = "AI content feels impersonal",
  BAIT_InterestingAI = "AI content is more engaging than human",
  BAIT_ArtHumanBest = "Human art moves people more than AI art",
  BAIT_PreferenceHuman = "I appreciate content more if human-made",
  BAIT_TrustHuman = "I trust content more if human-made"
)

# The usage question is words in the files, not a number. The app offers the
# same five and one more on top ("A lot of times every day", value 5), which
# none of these studies offered — so the data say nothing about the top of the
# app's scale, and a mean of these values is a mean of a shorter scale than
# the one somebody answers now.
BAIT_USAGE <- c("Never" = 0, "A few times per month" = 1, "A few times per week" = 2, "Once a day" = 3, "A few times per day" = 4)

# How the app scores the BAIT, and the whole of what this script needs to know
# about it: the three dimensions of the validation's BAIT-8, each the mean of
# its items (`score()`, no reversals). The names are the keys of the `norms`
# in the block file.
BAIT_DIMENSIONS <- list(
  "AI Realism" = c("BAIT_ImagesRealistic", "BAIT_VideosRealistic", "BAIT_ImitatingReality", "BAIT_EnvironmentReal"),
  "AI Enthusiasm" = c("BAIT_Exciting", "BAIT_Benefit"),
  "AI Apprehension" = c("BAIT_Dangerous", "BAIT_Worry")
)

# Composites the app asks the items of and scores nothing from, worked out so
# that the redrawing of the section can see what they would say. None of them
# is a norm to paste: Detectability is the three reverse-worded *Issues*
# items the validation found to be a dimension of their own and measured
# badly; Human Preference is the art pair and the FictionEro2 block that
# predicted the AI penalty in the tasks, with the one item worded the other
# way turned; Self-rated Detection is the Discrimination block, which the
# validation found inert against behaviour — which is exactly what makes it
# interesting beside a task.
BAIT_EXPLORATORY <- list(
  "Detectability" = c("BAIT_ImagesIssues", "BAIT_VideosIssues", "BAIT_TextIssues"),
  "Human Preference" = c("BAIT_ArtHumanBest", "-BAIT_ArtAIBest"),
  "Self-rated Detection" = c("BAIT_ImageDistinctionEasy", "-BAIT_ImageDistinctionBad", "-BAIT_TextDifferentiation", "BAIT_ContentDetection")
)

BAIT_RANGE <- c(0, 6)

# The one answer the app's own check accepts (`BAIT_AttentionCheck`, `check:
# 6`): all the way to the right. The three studies that ask it asked it in the
# same words, and the files are not filtered on it.
BAIT_CHECK_IS <- 6

# ---------------------------------------------------------------------------
# Reading

read_source <- function(label, source) {
  path <- file.path(BAIT_DATA, source$file)
  where <- if (file.exists(path)) path else source$url
  tryCatch(
    utils::read.csv(where, check.names = FALSE, stringsAsFactors = FALSE),
    error = function(e) {
      cat(sprintf("  %-20s could not be read from %s: %s\n", label, where, conditionMessage(e)))
      NULL
    }
  )
}

# Two date shapes in the wild — dd/mm/yyyy, and a yyyy-mm-dd timestamp — and
# the year is all that is wanted of either.
year_of <- function(x) {
  x <- as.character(x)
  d <- as.Date(x, format = "%d/%m/%Y")
  d[is.na(d)] <- as.Date(substr(x[is.na(d)], 1, 10), format = "%Y-%m-%d")
  d
}

# Male and Female, whatever the file calls them; everything else is Other, and
# nothing below splits on it (there are too few in any one study to say
# anything about).
sex_of <- function(x) {
  x <- tolower(trimws(as.character(x)))
  ifelse(x %in% c("male", "man"), "Male", ifelse(x %in% c("female", "woman"), "Female", ifelse(is.na(x) | x == "", NA, "Other")))
}

people <- list()

for (label in names(BAIT_SOURCES)) {
  source <- BAIT_SOURCES[[label]]
  data <- read_source(label, source)
  if (is.null(data)) next

  if (isTRUE(source$trials)) data <- data[!duplicated(data$Participant), , drop = FALSE]
  everyone <- nrow(data)

  gone <- source$items[!source$items %in% names(data)]
  if (length(gone) > 0) {
    stop(
      label, " no longer has these columns: ", paste(gone, collapse = ", "), ".\n",
      "The mapping in this script is out of date, and a norm off whichever ",
      "items happen to be left would be a wrong number rather than a missing one.",
      call. = FALSE
    )
  }

  if (!is.null(source$check)) {
    passed <- suppressWarnings(as.numeric(data[[source$check]])) == BAIT_CHECK_IS
    data <- data[!is.na(passed) & passed, , drop = FALSE]
  }

  one <- data.frame(
    Source = rep(label, nrow(data)),
    Slider = rep(!identical(source$range, BAIT_RANGE), nrow(data)),
    Age = suppressWarnings(as.numeric(data$Age)),
    Sex = sex_of(data[[source$sex]]),
    Date = year_of(data[[source$date]]),
    stringsAsFactors = FALSE
  )

  for (key in names(source$items)) {
    x <- data[[source$items[[key]]]]
    if (key == "BAIT_Usage") {
      value <- unname(BAIT_USAGE[as.character(x)])
      if (any(is.na(value) & !is.na(x) & x != "")) {
        stop(label, " has a usage answer this script does not know: ",
          paste(unique(x[is.na(value)]), collapse = ", "), call. = FALSE)
      }
    } else {
      # Onto the app's 0-6, which is a no-op for the Likert studies.
      value <- (as.numeric(x) - source$range[1]) / diff(source$range) * diff(BAIT_RANGE) + BAIT_RANGE[1]
      if (any(value < BAIT_RANGE[1] | value > BAIT_RANGE[2], na.rm = TRUE)) {
        stop(label, "'s ", key, " falls outside its stated range; the `range` in this script is wrong.", call. = FALSE)
      }
    }
    one[[key]] <- value
  }

  people[[label]] <- one
  when <- range(one$Date, na.rm = TRUE)
  cat(sprintf(
    "  %-20s n = %-4d of %-4d %-7s %s to %s%s\n", label, nrow(one), everyone,
    if (one$Slider[1]) "slider" else "likert", format(when[1], "%b %Y"), format(when[2], "%b %Y"),
    if (!is.null(source$check)) "   (the rest failed the attention check)" else ""
  ))
}

if (length(people) == 0) {
  cat("\nSKIPPED: none of the sources could be read. Check BAIT_DATA, the network,\n")
  cat("or the URLs above if a repository has moved.\n\n")
} else {
  # One frame for everybody, every item a column whether the study asked it or
  # not.
  all <- do.call(rbind, lapply(people, function(one) {
    for (key in names(BAIT_ITEMS)) if (!key %in% names(one)) one[[key]] <- NA_real_
    one[, c("Source", "Slider", "Age", "Sex", "Date", names(BAIT_ITEMS))]
  }))
  row.names(all) <- NULL

  # A composite is the mean of its items, a leading "-" turning one over, and
  # NA wherever any item is missing — the app's rule, which holds a dimension
  # unfinished rather than scoring it off whatever is there.
  composite <- function(frame, items) {
    turned <- startsWith(items, "-")
    keys <- sub("^-", "", items)
    block <- as.matrix(frame[, keys, drop = FALSE])
    block[, turned] <- sum(BAIT_RANGE) - block[, turned]
    rowMeans(block, na.rm = FALSE)
  }
  for (dimension in names(BAIT_DIMENSIONS)) all[[dimension]] <- composite(all, BAIT_DIMENSIONS[[dimension]])
  for (dimension in names(BAIT_EXPLORATORY)) all[[dimension]] <- composite(all, BAIT_EXPLORATORY[[dimension]])

  pooled <- if (BAIT_POOL_SLIDERS) all else all[!all$Slider, , drop = FALSE]
  cat(sprintf(
    "\n  %-20s n = %d pooled (%s)\n", "TOTAL", nrow(pooled),
    if (BAIT_POOL_SLIDERS) "sliders and circles together" else "the circle studies; the sliders are shown beside them, not pooled"
  ))

  sources <- names(people)
  short <- c(FakeFace1 = "FF1*", FictionEro1 = "FE1*", FakeNewsValidation = "FNV*", FakeFace2 = "FF2",
    FictionEro2 = "FE2", FakeArt = "FA", FakeFace3 = "FF3", FakeChat = "FC")

  # -------------------------------------------------------------------------
  # Item by item

  rule("BAIT: every item the app asks (0-6, pooled over the circle studies)")
  cat("  AGREE is 4-6 and DISAGREE 0-2 on the seven circles, the middle being neither.\n")
  cat("  The distribution is the share of people on each circle, 0 on the left.\n\n")
  cat(sprintf("  %-26s %5s %5s %5s %6s %6s   %s\n", "ITEM", "N", "MEAN", "SD", "AGREE", "DISAGR", "0    1    2    3    4    5    6"))

  for (key in names(BAIT_ITEMS)) {
    if (key == "BAIT_Usage") next
    x <- pooled[[key]]
    x <- x[!is.na(x)]
    if (length(x) < 2) {
      cat(sprintf("  %-26s   (no circle study asked it)\n", sub("^BAIT_", "", key)))
      next
    }
    shares <- vapply(0:6, function(v) mean(x == v), numeric(1))
    cat(sprintf(
      "  %-26s %5d %5.2f %5.2f %5.0f%% %5.0f%%   %s\n", sub("^BAIT_", "", key), length(x), mean(x), stats::sd(x),
      100 * mean(x > 3), 100 * mean(x < 3), paste(sprintf("%3.0f%%", 100 * shares), collapse = " ")
    ))
    cat(sprintf("  %-26s %s\n", "", BAIT_ITEMS[[key]]))
  }

  usage <- pooled$BAIT_Usage[!is.na(pooled$BAIT_Usage)]
  if (length(usage) > 0) {
    cat(sprintf("\n  Usage, n = %d (FakeArt, FakeFace3, FakeChat). The app's sixth answer,\n", length(usage)))
    cat("  \"A lot of times every day\", was not offered by any of them.\n")
    for (level in names(BAIT_USAGE)) {
      cat(sprintf("      %-24s %4.0f%%\n", level, 100 * mean(usage == BAIT_USAGE[[level]])))
    }
    cat(sprintf("      %-24s %4s\n", "A lot of times every day", "—"))
  }

  # Per source as well as pooled: a sample sitting well away from the others,
  # or a slider study that disagrees with the circles, is worth knowing about
  # before a number from them goes into the app.
  rule("BAIT: item means by study  (* = slider, rescaled onto 0-6 and not pooled)")
  cat(sprintf("  %-22s%s\n", "ITEM", paste(sprintf("%6s", short[sources]), collapse = "")))
  for (key in c(names(BAIT_ITEMS), names(BAIT_DIMENSIONS), names(BAIT_EXPLORATORY))) {
    means <- vapply(sources, function(s) {
      x <- all[[key]][all$Source == s]
      if (all(is.na(x))) NA_real_ else mean(x, na.rm = TRUE)
    }, numeric(1))
    if (all(is.na(means))) next
    cat(sprintf("  %-22s%s\n", substr(sub("^BAIT_", "", key), 1, 22), paste(ifelse(is.na(means), "     .", sprintf("%6.2f", means)), collapse = "")))
  }

  # Who each study recruited, since a study that differs on the attitudes may
  # simply be a younger or a more female one — both of which the section
  # below finds going with less enthusiasm.
  cat("\n")
  age <- vapply(sources, function(s) stats::median(all$Age[all$Source == s], na.rm = TRUE), numeric(1))
  female <- vapply(sources, function(s) 100 * mean(all$Sex[all$Source == s] %in% "Female"), numeric(1))
  cat(sprintf("  %-22s%s\n", "median age", paste(sprintf("%6.0f", age), collapse = "")))
  cat(sprintf("  %-22s%s\n", "% female", paste(sprintf("%5.0f%%", female), collapse = "")))

  # -------------------------------------------------------------------------
  # The dimensions

  rule("BAIT: the dimensions (pooled over the circle studies)")
  cat("  The app turns a score into a percentile through the normal curve, and\n")
  cat("  these are what that curve is being asked to stand in for. A dimension\n")
  cat("  whose quantiles sit well off mean +/- sd is a skewed one.\n\n")
  probs <- c(0.1, 0.25, 0.5, 0.75, 0.9)
  cat(sprintf("  %-22s %5s %5s %5s %6s   %s\n", "DIMENSION", "N", "MEAN", "SD", "SKEW", paste(sprintf("%5s", paste0("p", 100 * probs)), collapse = " ")))
  for (dimension in c(names(BAIT_DIMENSIONS), names(BAIT_EXPLORATORY))) {
    x <- pooled[[dimension]]
    x <- x[!is.na(x)]
    if (length(x) < 2) next
    skew <- mean((x - mean(x))^3) / stats::sd(x)^3
    cat(sprintf(
      "  %-22s %5d %5.2f %5.2f %6.2f   %s%s\n", dimension, length(x), mean(x), stats::sd(x), skew,
      paste(sprintf("%5.2f", stats::quantile(x, probs, names = FALSE)), collapse = " "),
      if (dimension %in% names(BAIT_EXPLORATORY)) "   (not scored)" else ""
    ))
  }

  # How the three dimensions, and the two singles, go together. The two
  # singles are not on the app's results at all; this is to see what they
  # would add if they were.
  rule("BAIT: how the dimensions go together (Pearson r, circle studies)")
  together <- c(names(BAIT_DIMENSIONS), "Detectability", "BAIT_Knowledge", "BAIT_Usage")
  shown <- c("Realism", "Enthus.", "Apprehen.", "Detect.", "Knowl.", "Usage")
  r <- stats::cor(pooled[, together], use = "pairwise.complete.obs")
  cat(sprintf("  %-12s%s\n", "", paste(sprintf("%10s", shown), collapse = "")))
  for (i in seq_along(together)) {
    cat(sprintf("  %-12s%s\n", shown[i], paste(ifelse(seq_along(together) >= i, "         .", sprintf("%10.2f", r[i, ])), collapse = "")))
  }

  # Who scores where. The validation found the attitude pairs sex-typed and
  # age nearly idle, which bears on any reading written as "people like you".
  # Descriptive, pooled over studies that differ in who they recruited.
  rule("BAIT: by sex and age (means, circle studies)")
  groups <- list(
    "Female" = pooled$Sex %in% "Female",
    "Male" = pooled$Sex %in% "Male",
    "Age 18-24" = !is.na(pooled$Age) & pooled$Age >= 18 & pooled$Age < 25,
    "Age 25-39" = !is.na(pooled$Age) & pooled$Age >= 25 & pooled$Age < 40,
    "Age 40-59" = !is.na(pooled$Age) & pooled$Age >= 40 & pooled$Age < 60,
    "Age 60+" = !is.na(pooled$Age) & pooled$Age >= 60
  )
  cat(sprintf("  %-12s%s\n", "", paste(sprintf("%10s", shown), collapse = "")))
  for (group in names(groups)) {
    sub <- pooled[groups[[group]], , drop = FALSE]
    means <- vapply(together, function(k) if (all(is.na(sub[[k]]))) NA_real_ else mean(sub[[k]], na.rm = TRUE), numeric(1))
    cat(sprintf("  %-12s%s   n = %d\n", group, paste(sprintf("%10.2f", means), collapse = ""), nrow(sub)))
  }

  # -------------------------------------------------------------------------
  # The robot's two axes and its four corners

  # The robot is drawn on two axes (`js/figures/archetype.js`): Human-likeness,
  # which is AI Realism, and Menace, which runs from friendly to menacing and
  # is the mean of the two attitudes' z scores with Enthusiasm turned over —
  # worry pushing one way and enthusiasm the other. The two correlate
  # strongly enough (see above) that most people sit along that line, and a
  # robot that is warm and menacing at once reads as a contradiction.
  #
  # The mean of two z scores is not itself a z score — its SD is under 1 by
  # as much as the two go together — so the figure turns it into a standing
  # against its own SD, printed here as ATTITUDE_SD. The four profiles are the
  # four quadrants either side of the average on each axis, and their shares
  # are what the pooled sample gives.
  dims <- names(BAIT_DIMENSIONS)
  scored <- pooled[stats::complete.cases(pooled[, dims]), dims]
  z <- sapply(dims, function(d) (scored[[d]] - mean(pooled[[d]], na.rm = TRUE)) / stats::sd(pooled[[d]], na.rm = TRUE))
  menace <- (z[, "AI Apprehension"] - z[, "AI Enthusiasm"]) / 2
  attitude_sd <- stats::sd(menace)

  rule("BAIT: the robot's four corners (paste into js/figures/archetype.js)")
  cat(sprintf("  n = %d with all three dimensions\n", nrow(z)))
  cat(sprintf("  Human-likeness and Menace correlate at r = %.2f\n\n", stats::cor(z[, "AI Realism"], menace)))
  cat(sprintf("    const ATTITUDE_SD = %.2f\n\n", attitude_sd))
  human <- z[, "AI Realism"] >= 0
  menacing <- menace >= 0
  corners <- list(
    "Human-like and friendly" = human & !menacing,
    "Human-like and menacing" = human & menacing,
    "Machine-like and friendly" = !human & !menacing,
    "Machine-like and menacing" = !human & menacing
  )
  for (corner in names(corners)) cat(sprintf("  %-28s share: %.0f\n", corner, 100 * mean(corners[[corner]])))

  # -------------------------------------------------------------------------
  # What to paste

  rule("BAIT: paste into the `norms` of `bait` in content/block_bait.js")
  cat("(the two number lines only), and take the PLACEHOLDER comment off them\n")
  cat("while you are there. Every mean and sd is load-bearing: the archetype\n")
  cat("turns answers into z scores by them.\n\n")
  for (dimension in dims) {
    x <- pooled[[dimension]][!is.na(pooled[[dimension]])]
    paste_lines(dimension, mean(x), stats::sd(x), sprintf("n = %d", length(x)))
  }

  # The crowd each statement is set against on the results screen ("You
  # agree — only 30% of people do"), as the share of people on each of the
  # seven circles. It is the one block this script prints for a figure rather
  # than for a `norms`, and it goes into `js/figures/archetype.js`, beside the
  # archetypes it is read with. The singles are left out: they are not
  # statements anybody agrees with.
  rule("BAIT: paste over CROWD in js/figures/archetype.js")
  cat("    const CROWD = {\n")
  for (key in names(BAIT_ITEMS)) {
    if (key %in% c("BAIT_Knowledge", "BAIT_Usage")) next
    x <- pooled[[key]][!is.na(pooled[[key]])]
    if (length(x) < 2) next
    shares <- round(100 * vapply(0:6, function(v) mean(x == v), numeric(1)))
    cat(sprintf("        %s: { n: %d, shares: [%s] },\n", key, length(x), paste(shares, collapse = ", ")))
  }
  cat("    }\n\n")

  when <- format(range(pooled$Date, na.rm = TRUE), "%B %Y")
  cat("These are a pooled convenience sample of online studies run between\n")
  cat(when[1], " and ", when[2], " — not a norming sample of anybody in particular,\n", sep = "")
  cat("and beliefs about AI move quickly (see the attitudes by study, above).\n")
  cat("Better than the invented numbers they replace, and worth saying so\n")
  cat("beside them.\n")
}

# ---------------------------------------------------------------------------
# Norms of our own, once this study has run.
#
# The saved files carry every BAIT item under the app's own key, so this
# study's own answers can go into `BAIT_SOURCES` as one more source whose
# `items` map each key to itself — the usage question on the app's six answers
# rather than five, which `BAIT_USAGE` would then want the sixth of.
