# The Big Kink Survey's public subsample (Aella, 2026), and what shape the
# space of sexual interests takes in it: how many dimensions, which interests
# cluster together, and whether people fall into kinds.
#
# TENTATIVE. Nothing in the app asks any of this, and it is not settled that
# anything will: a level on sexuality is an idea being looked into, not a plan.
# There is no block file for these norms to go into, so unlike every other
# script in this folder this one prints no paste lines yet — only the
# structure, so that whether there is a level worth writing can be decided
# from the data. `make_norms.R` passes over it for that reason; run it on its
# own (`Rscript data/norms/norms_bks.R`). If a level is written, this is where
# its norms and its short form will come from, and this paragraph goes.
#
# It prints:
#
#   1. how common each interest is, overall and by sex
#   2. how many dimensions the correlations between categories hold (parallel
#      analysis, MAP, BIC)
#   3. an exploratory factor analysis at that number
#   4. whether there is one general factor under them (omega)
#   5. the clusters a network analysis finds, independently of the factoring
#   6. the other axis: whether being the one who does it, or the one it is done
#      to, is one thing across categories
#   7. whether people come in kinds: a Gaussian mixture on the factor scores
#
# and writes a heatmap of the correlations, ordered so that clusters show as
# blocks, into `bks/` beside the data.

# The helpers every norms script prints with, out of `common.R` beside this
# file, whether it was run with Rscript, source()d, or source()d by
# `make_norms.R`.
here <- local({
  run <- sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE))
  if (length(run) > 0) dirname(run[1]) else tryCatch(dirname(sys.frame(1)$ofile), error = function(e) ".")
})
if (!exists("paste_lines")) source(file.path(here, "common.R"))

for (package in c("psych", "GPArotation", "EGAnet", "mclust")) {
  if (!requireNamespace(package, quietly = TRUE)) stop("norms_bks.R wants the ", package, " package")
}
# mclust calls its own functions by name from the caller's frame, so it has to
# be attached rather than reached for with `::`.
suppressPackageStartupMessages(library(mclust))

rule("BKS  ->  nothing yet (tentative: see the head of this file)")

# The tables below are wider than R's default line.
options(width = 160)

# WHERE THE DATA COME FROM. The Big Kink Survey's representative subsample,
# `BKSPublic.csv` on Zenodo (doi:10.5281/zenodo.18625249, v2, CC BY 4.0 /
# CC BY-SA 4.0): 15,503 people out of about 970,000, balanced on age, sex and
# politics, from the US, Canada and Europe. It is fetched into `bks/` if it is
# not already there and checked against the record's checksum; `bks/` is
# git-ignored, since the file is 52 MB and is the deposit's to serve.
#
# Three things about the file are worth knowing before reading anything off it:
#
#   - Aella swapped demographics between similar rows and added noise before
#     releasing it, which by her estimate shrinks correlations by about a
#     quarter. The structure should survive that; the sizes of things will not.
#   - The respondents are self-selected (her audience, then the survey going
#     viral), so "common" here means common among people who chose to take a
#     long survey about kinks.
#   - Despite the record saying the sample is capped at 32 rather than starting
#     at 18, the file holds 3,197 people aged 14-17. They are dropped below, and
#     that is not a setting.
BKS_DIR <- file.path(here, "bks")
BKS_FILE <- file.path(BKS_DIR, "BKSPublic.csv")
BKS_URL <- "https://zenodo.org/records/18625249/files/BKSPublic.csv?download=1"
BKS_MD5 <- "434c21bb41cf92988438c2694748f685"

# Which interests are analysed: those a level of this app could conceivably
# ask (`askable` below) when FALSE, every one of them when TRUE. The default is
# the first, since a dimension defined by items that would never be put in
# front of a participant is no use for a short form — but the whole space is
# worth seeing once, and a factor standing on the unaskable items alone says
# where the edge of what can be asked falls.
BKS_ALL <- FALSE

# How many factors the analysis is run at. NULL takes Velicer's MAP, capped at
# `BKS_MAX_FACTORS` (with twelve thousand people, parallel analysis and BIC
# find more factors than anybody could name); a number overrides it, for
# looking at the solutions either side.
BKS_FACTORS <- NULL
BKS_MAX_FACTORS <- 8

# The mixture is fitted for 1 to this many kinds of person.
BKS_MAX_PROFILES <- 9

# THE ITEMS. One line an interest: a key of our own, the column (a prefix of
# its name, which is matched exactly once or the script stops), how it is
# coded, the category that gates it, what it asks in plain words, and whether a
# level of this app could conceivably ask it.
#
# THE GATE IS THE THING TO UNDERSTAND. The survey asks two check-all questions
# first — "Common things" and "Uncommon things: check all the categories that
# contain a thing that arouses you" — and only then rates the interests inside
# each ticked category, 0 (not arousing) to 5 (extremely). So an interest is
# blank for everybody who did not tick its category, and that blank means
# "not arousing", not "not asked": 100% of those who ticked a category rated
# its items and 0% of those who did not (checked on every gate below). A blank
# under a category that was not ticked is therefore read as 0. The "Uncommon"
# question is itself blank for a third of the file, and that blank means that
# nothing in it was ticked — the fetish count Aella computed matches the
# common categories alone for those people, as often as it matches both for
# everybody else — so it is read as nothing ticked. Somebody blank on the
# "Common" question (170 people) has no gate to read and is left out.
#
# The codings:
#
#   rating   0-5, as rated
#   fib      stored as -8, -5, -3, -2, -1, 0: a 0-5 rating written on the
#            survey's back end as a negated Fibonacci-like code, most arousing
#            at -8. Read back to 0-5. The record warns that two of these
#            (dirty talk and cunnilingus) "may be reversed"; they are read the
#            same way as the other two, which puts most people at "extremely",
#            as for ordinary sex
#   agree    -3 to 3, agreement with a statement, shifted to 0-6
#
# Interests with no gate were asked of everybody.
BKS_ITEMS <- read.csv(text = '
key,column,coding,gate,words,askable
Vanilla,normalsex,fib,,"Ordinary sex",TRUE
Cunnilingus,"""I find cunnilingus:""",fib,,"Cunnilingus",TRUE
Fellatio,"""I find blowjobs:""",fib,,"Blowjobs",TRUE
Anal,"""I find anal sex",rating,,"Anal sex",TRUE
DirtyTalk,"""I find dirtytalking erotic""",fib,,"Dirty talk",TRUE
Dominant,"""I am aroused by being dominant",agree,,"Being dominant",TRUE
Submissive,"""I am aroused by being submissive",agree,,"Being submissive",TRUE
Eagerness,eagerness,rating,Eagerness,"Eagerness (in general)",TRUE
Worshipped,worshipped,rating,Eagerness,"Being worshipped",TRUE
Worshipping,worshipping,rating,Eagerness,"Worshipping someone",TRUE
Teasing,teasing,rating,Eagerness,"Teasing",TRUE
Frustration,frustration,rating,Eagerness,"Sexual frustration, being held back",TRUE
Begging,"""I find scenarios where I eagerly beg",rating,Eagerness,"Begging others",TRUE
Begged,"""I find scenarios where others eagerly beg",rating,Eagerness,"Being begged",TRUE
Appearance,appearance,rating,Appearance states,"Appearance (tattoos, body mods, body types)",TRUE
Gentleness,gentleness,rating,Gentleness,"Gentleness (caretaking, healing, tantra)",TRUE
PowerDynamics,powerdynamic,rating,Power dynamics,"Power dynamics (in general)",TRUE
Primal,"""I find primal play",rating,Power dynamics,"Primal play",TRUE
Obedience,obedience,rating,Power dynamics,"Obedience",TRUE
MindBreak,mindbreak,rating,Power dynamics,"Mind break",TRUE
MasterSlave,masterslave,rating,Power dynamics,"Master/slave",TRUE
PowerExchange,fulltimepower,rating,Power dynamics,"Full-time power exchange",TRUE
BondageLight,lightbondage,rating,Bondage,"Light bondage",TRUE
BondageMedium,mediumbondage,rating,Bondage,"Medium bondage",TRUE
BondageExtreme,extremebondage,rating,Bondage,"Extreme bondage",TRUE
Toys,toys,rating,Toys,"Sex toys",TRUE
Clothing,clothing,rating,Clothing,"Clothing (latex, shoes, lingerie)",TRUE
Roles,roles,rating,Roles,"Roles (professions, types)",TRUE
ExhibitionSelf,exhibitionself,rating,Exhibitionism,"Exhibitionism: me",TRUE
ExhibitionOther,exhibitionother,rating,Exhibitionism,"Exhibitionism: others",TRUE
VoyeurSelf,voyeurself,rating,Exhibitionism,"Voyeurism: me",TRUE
VoyeurOther,voyeurother,rating,Exhibitionism,"Voyeurism: others",TRUE
MultiplePartners,multiplepartners,rating,Multiple partners,"Multiple partners",TRUE
Nonconsent,nonconsent,rating,Nonconsent,"Nonconsent (fantasy)",TRUE
Sadomasochism,sadomasochism,rating,Sadomasochism,"Sadomasochism (in general)",TRUE
PainReceiving,receivepain,rating,Sadomasochism,"Receiving pain",TRUE
PainGiving,givepain,rating,Sadomasochism,"Giving pain",TRUE
Spanking,spanking,rating,Sadomasochism,"Spanking",TRUE
PainPsychological,"""I find psychological pain",rating,Sadomasochism,"Psychological pain",TRUE
PainGenital,"""Scenarios where pain is given to genitals",rating,Sadomasochism,"Genital pain",FALSE
Humiliation,humiliation,rating,Humiliation,"Humiliation",TRUE
Sensory,sensory,rating,Sensory,"Sensory play (tickling, ASMR, electricity)",TRUE
Mythical,mythical,rating,Mythical,"Mythical or fictional creatures",TRUE
Objects,objects,rating,Objects,"Objects",TRUE
Pregnancy,pregnancy,rating,Reproduction,"Pregnancy, breeding",TRUE
MentalAlteration,mentalalteration,rating,Mental Alteration,"Mental alteration (hypnosis, mind control)",TRUE
Genderplay,genderplay,rating,Genderplay,"Genderplay (crossdressing, sissification)",TRUE
Futa,futa,rating,Genderplay,"Futanari",FALSE
AbnormalBodies,abnormalbody,rating,Abnormal bodies,"Unusual bodies (giants, tails, huge parts)",TRUE
Transformation,transform,rating,Transformations,"Transformations (growth, body swaps, furries)",TRUE
Incest,incest,rating,Incest,"Incest",FALSE
Age,"""I find age-related things",rating,Age: nonstandard,"Nonstandard ages",FALSE
AgeGap,agegap,rating,Age: nonstandard,"Age gaps",FALSE
Older,older,rating,Age: nonstandard,"Older partners",FALSE
AgeProgression,progression,rating,Age: nonstandard,"Age progression",FALSE
AgeRegression,regression,rating,Age: nonstandard,"Age regression",FALSE
CaregiverLittle,cgl,rating,Age: nonstandard,"Caregiver/little",FALSE
Secretions,secretions,rating,Bodily secretions,"Bodily secretions",FALSE
Bestiality,bestiality,rating,Bestiality,"Animals",FALSE
Brutality,brutality,rating,Brutal,"Brutality, gore",FALSE
Creepy,creepy,rating,Creepy,"Horror, necrophilia",FALSE
Vore,vore,rating,Vore,"Vore",FALSE
Dirtiness,dirty,rating,Dirtiness,"Dirtiness, disgust",FALSE
', stringsAsFactors = FALSE, na.strings = "")

BKS_COMMON <- "Common things: Check all the following categories that contain a thing that arouses you."
BKS_UNCOMMON <- "Uncommon things: Check all the following categories that contain a thing that arouses you."

# ---------------------------------------------------------------------------
# Reading

if (!file.exists(BKS_FILE) || unname(tools::md5sum(BKS_FILE)) != BKS_MD5) {
  dir.create(BKS_DIR, showWarnings = FALSE)
  cat("  fetching BKSPublic.csv from Zenodo (52 MB)\n")
  utils::download.file(BKS_URL, BKS_FILE, mode = "wb", quiet = TRUE)
  if (unname(tools::md5sum(BKS_FILE)) != BKS_MD5) stop("BKSPublic.csv does not match the record's checksum")
}

raw <- utils::read.csv(BKS_FILE, check.names = FALSE, stringsAsFactors = FALSE, na.strings = "", encoding = "UTF-8")

# A column is named by its whole name where that is short (`gentleness`, not
# `gentleness2most`) and by a prefix where it carries the whole question and a
# code after it; a prefix that matches nothing, or more than one column, is a
# mistake in the table above and stops the script.
column_of <- function(prefix) {
  if (prefix %in% names(raw)) return(prefix)
  hit <- names(raw)[startsWith(names(raw), prefix)]
  if (length(hit) != 1) stop("BKS column '", prefix, "' matches ", length(hit), " columns")
  hit
}

adult <- !is.na(raw$age) & raw$age != "14-17" & !is.na(raw[[BKS_COMMON]])
raw <- raw[adult, ]
ticked_common <- ifelse(is.na(raw[[BKS_COMMON]]), "", raw[[BKS_COMMON]])
ticked_uncommon <- ifelse(is.na(raw[[BKS_UNCOMMON]]), "", raw[[BKS_UNCOMMON]])
ticked <- paste(ticked_common, ticked_uncommon, sep = " | ")

recode <- function(x, coding) {
  switch(coding,
    rating = x,
    fib = match(abs(x), c(0, 1, 2, 3, 5, 8)) - 1,
    agree = x + 3
  )
}

items <- if (BKS_ALL) BKS_ITEMS else BKS_ITEMS[BKS_ITEMS$askable, ]

answers <- as.data.frame(lapply(seq_len(nrow(items)), function(i) {
  item <- items[i, ]
  x <- recode(suppressWarnings(as.numeric(raw[[column_of(item$column)]])), item$coding)
  if (!is.na(item$gate)) x[is.na(x) & !grepl(item$gate, ticked, fixed = TRUE)] <- 0
  x
}), col.names = items$key)

male <- raw$biomale == 1

cat(sprintf(
  "  %d adults (%d women, %d men), %d interests (%s)\n",
  nrow(answers), sum(!male), sum(male), ncol(answers),
  if (BKS_ALL) "all of them" else "those a level could ask"
))

# ---------------------------------------------------------------------------
# 1. How common each interest is

rule("BKS  1. how common each interest is")

# "Any" is anything above "not arousing" (above the middle, for the two agree
# items); "strong" is 4 or 5 of 5 (5 or 6 of 6). Sorted by how many find it
# anything at all, which is the order a list of fantasies would be read in.
top <- ifelse(items$coding == "agree", 6, 5)
mid <- ifelse(items$coding == "agree", 3, 0)
share <- function(x, rows) round(100 * mean(x[rows], na.rm = TRUE))
prevalence <- data.frame(
  interest = items$words,
  any = mapply(function(x, m) share(x > m, TRUE), answers, mid),
  strong = mapply(function(x, t) share(x >= t - 1, TRUE), answers, top),
  women = mapply(function(x, m) share(x > m, !male), answers, mid),
  men = mapply(function(x, m) share(x > m, male), answers, mid),
  missing = round(100 * colMeans(is.na(answers)), 1),
  row.names = items$key
)
prevalence <- prevalence[order(-prevalence$any), ]
cat("  % finding it arousing at all, % strongly, and at all by sex; % with no answer\n\n")
print(prevalence)


# ---------------------------------------------------------------------------
# The unit of analysis

# WHY THE ANALYSIS IS ON CATEGORIES AND NOT ON ITEMS. The gate means that
# every item inside a category is 0 together for everybody who did not tick
# it, which is most people for most categories. Two items sharing a gate
# therefore correlate strongly whatever they ask — the four exhibitionism
# items at about .9 — and a factor analysis of the items does little more
# than recover the survey's own list of categories. That was the first thing
# this script found, and it is a fact about the questionnaire, not about
# people.
#
# So what is analysed from here on is one score a category: the rounded mean
# of its items (one item, for most), 0 for those who did not tick it; and the
# items asked of everybody, which have no gate to share, stand as themselves.
# What the items inside a category add is mostly *who* — giving pain or
# receiving it, begging or being begged — which is not a kind of interest but
# the other axis, and has a section of its own (6).
category_of <- function(gate) gsub("[^A-Za-z]", "", tools::toTitleCase(gate))
items$interest <- ifelse(is.na(items$gate), items$key, category_of(items$gate))
interest_keys <- unique(items$interest)

interests <- as.data.frame(lapply(interest_keys, function(interest) {
  keys <- items$key[items$interest == interest]
  value <- round(rowMeans(answers[, keys, drop = FALSE], na.rm = TRUE))
  value[is.nan(value)] <- NA
  value
}), col.names = interest_keys)

# What a category is called when printed: its gate's label, or the item's own
# words where it is an item asked of everybody.
words_of <- function(interest) {
  row <- items[items$interest == interest, ][1, ]
  if (is.na(row$gate)) row$words else paste(row$gate, "(category)")
}

cat(sprintf("\n  %d categories and ungated items analysed from here on\n", ncol(interests)))

# ---------------------------------------------------------------------------
# 2. How many dimensions

rule("BKS  2. how many dimensions")

# Polychoric correlations, since every score is six or seven ordered answers
# and most of them pile up at 0 — Pearson on data like this understates every
# correlation, and by more the rarer the interest. Pairwise, so a score
# somebody is missing costs that pair and not the person.
cat("  working out the polychoric correlations\n")
R <- suppressWarnings(suppressMessages(psych::polychoric(interests, global = FALSE, correct = 0)$rho))
n_obs <- nrow(interests)

eigen_values <- eigen(R, only.values = TRUE)$values
cat(sprintf(
  "\n  first eigenvalues: %s\n  the first holds %.0f%% of the total variance, the second %.0f%%\n",
  paste(sprintf("%.1f", head(eigen_values, 10)), collapse = ", "),
  100 * eigen_values[1] / sum(eigen_values), 100 * eigen_values[2] / sum(eigen_values)
))

parallel <- suppressWarnings(suppressMessages(
  psych::fa.parallel(R, n.obs = n_obs, fa = "fa", fm = "minres", plot = FALSE, n.iter = 20)
))
vss <- suppressWarnings(suppressMessages(psych::vss(R, n = 10, n.obs = n_obs, fm = "minres", plot = FALSE)))
cat(sprintf(
  "\n  parallel analysis: %d factors\n  Velicer's MAP:     %d factors\n  lowest BIC:        %d factors\n  (with a sample this size parallel analysis and BIC over-extract; MAP is the stricter)\n",
  parallel$nfact, which.min(vss$map), which.min(vss$vss.stats$BIC)
))

k <- if (is.null(BKS_FACTORS)) min(which.min(vss$map), BKS_MAX_FACTORS) else BKS_FACTORS

# ---------------------------------------------------------------------------
# 3. The factors

rule(sprintf("BKS  3. exploratory factor analysis, %d factors (oblimin)", k))

efa <- suppressWarnings(suppressMessages(psych::fa(R, nfactors = k, n.obs = n_obs, rotate = "oblimin", fm = "minres")))
loadings <- unclass(efa$loadings)
colnames(loadings) <- paste0("F", seq_len(k))

# Each score under the factor it loads most on, strongest first, with its
# loading there, its largest other loading (a cross-loading of more than half
# the primary is a score two factors share) and its communality. The factors
# carry no names: naming them is the reading, and it is the next step.
primary <- apply(abs(loadings), 1, which.max)
for (f in seq_len(k)) {
  on <- names(primary)[primary == f]
  on <- on[order(-abs(loadings[on, f]))]
  cat(sprintf("  F%d  (%d)\n", f, length(on)))
  for (interest in on) {
    cat(sprintf(
      "      %6.2f   next %4.2f   h2 %4.2f   %-18s %s\n",
      loadings[interest, f], max(c(0, abs(loadings[interest, -f]))), efa$communality[interest], interest, words_of(interest)
    ))
  }
  cat("\n")
}

# `fa` orders its factors by variance and names them for the order it found
# them in; they are renamed to the F1..Fk printed above.
if (k > 1) {
  phi <- efa$Phi
  dimnames(phi) <- list(colnames(loadings), colnames(loadings))
  cat("  factor correlations\n")
  print(round(phi, 2))
}
cat(sprintf(
  "\n  fit: RMSEA %.3f, TLI %.3f; the factors hold %.0f%% of the variance\n",
  efa$RMSEA[1], efa$TLI, 100 * sum(efa$values[seq_len(k)]) / ncol(interests)
))

# ---------------------------------------------------------------------------
# 4. A general factor?

rule("BKS  4. is there one general factor under them?")

# The survey's own "taboo score" and fetish count assume that liking more
# things is one thing. Omega says how far that holds: omega-h is the share of
# a total score's variance that is one general factor, ECV the share of the
# common variance it takes. A high omega-h would mean a single "breadth" score
# is a fair summary and the group factors add detail; a low one, that there is
# no one dimension of kinkiness to report and the factors have to stand alone.
omega <- suppressWarnings(suppressMessages(
  psych::omega(R, nfactors = max(k, 3), n.obs = n_obs, fm = "minres", plot = FALSE)
))
cat(sprintf(
  "  omega-h %.2f   omega-total %.2f   ECV %.2f   (Schmid-Leiman, %d group factors)\n\n",
  omega$omega_h, omega$omega.tot, omega$ECV, max(k, 3)
))
general <- sort(omega$schmid$sl[, "g"], decreasing = TRUE)
cat("  loadings on the general factor, highest first\n")
for (interest in names(general)) {
  cat(sprintf("      %5.2f   %-18s %s\n", general[interest], interest, words_of(interest)))
}

# ---------------------------------------------------------------------------
# 5. Clusters of interests, by another route

rule("BKS  5. clusters of interests (exploratory graph analysis)")

# A second opinion on the dimensions that owes nothing to factoring: a
# regularised partial-correlation network, split into communities by the
# walktrap algorithm. Where the two agree, a dimension is real; where they
# differ, the difference is worth reading.
ega <- suppressWarnings(suppressMessages(
  EGAnet::EGA(R, n = n_obs, model = "glasso", algorithm = "walktrap", plot.EGA = FALSE)
))
membership <- ega$wc
cat(sprintf("  %d communities\n\n", length(unique(na.omit(membership)))))
for (community in sort(unique(na.omit(membership)))) {
  on <- names(membership)[!is.na(membership) & membership == community]
  factors <- table(paste0("F", primary[on]))
  cat(sprintf(
    "  C%d  %s\n      (factors: %s)\n",
    community, paste(on, collapse = ", "),
    paste(sprintf("%s x%d", names(factors), factors), collapse = ", ")
  ))
}
if (any(is.na(membership))) cat(sprintf("  unassigned: %s\n", paste(names(membership)[is.na(membership)], collapse = ", ")))

# The correlation matrix, ordered by a hierarchical clustering, so that
# clusters show as blocks along the diagonal. It is the one picture this
# script makes, because a table of thirty correlations cannot be read.
picture <- if (BKS_ALL) "correlations_all.png" else "correlations.png"
order <- stats::hclust(stats::as.dist(1 - R), method = "average")$order
shown <- R[order, order]
png(file.path(BKS_DIR, picture), width = 1600, height = 1600, res = 150)
par(mar = c(9, 9, 2, 2))
image(
  seq_len(ncol(shown)), seq_len(ncol(shown)), shown[, rev(seq_len(ncol(shown)))],
  zlim = c(-1, 1), col = grDevices::hcl.colors(41, "Blue-Red 3"), axes = FALSE, xlab = "", ylab = ""
)
axis(1, seq_len(ncol(shown)), colnames(shown), las = 2, cex.axis = 0.7, tick = FALSE)
axis(2, seq_len(ncol(shown)), rev(colnames(shown)), las = 2, cex.axis = 0.7, tick = FALSE)
title("Big Kink Survey: polychoric correlations between categories, clustered")
invisible(dev.off())
cat(sprintf("\n  heatmap written to bks/%s\n", picture))

# ---------------------------------------------------------------------------
# 6. The other axis: who does it to whom

rule("BKS  6. the other axis: doing it, or having it done")

# Across categories the survey asks which side of the scene somebody wants to
# be on, in several ways: a self-description from totally dominant to totally
# submissive, arousal at being dominant and at being submissive, the items that
# come in pairs (giving pain and receiving it, being begged and begging, being
# worshipped and worshipping), and a "me or someone else?" after bondage,
# humiliation, nonconsent and mental alteration. Each is scored here so that
# the doing side is positive. If they all correlate, there is one role axis
# running through what people want, independent of what it is they want — and
# a second axis a figure could be drawn on. Each is read only for the people
# asked it, so the pairs are among those who ticked the category.
side <- function(column, doing, done) {
  x <- raw[[column_of(column)]]
  ifelse(x == doing, 1, ifelse(x == done, -1, ifelse(is.na(x), NA, 0)))
}
identity_levels <- c(
  "Totally submissive", "Moderately submissive", "Slightly submissive", "Switch/equal/no preference",
  "Slightly dominant", "Moderately dominant", "Totally dominant"
)
raw_of <- function(column) suppressWarnings(as.numeric(raw[[column_of(column)]]))
roles <- data.frame(
  Identity = match(raw[[column_of("Which describes you best? (cvc5b81)")]], identity_levels) - 4,
  Arousal = raw_of('"I am aroused by being dominant') - raw_of('"I am aroused by being submissive'),
  Pain = raw_of("givepain") - raw_of("receivepain"),
  Begging = raw_of('"I find scenarios where others eagerly beg') - raw_of('"I find scenarios where I eagerly beg'),
  Worship = raw_of("worshipped") - raw_of("worshipping"),
  Bondage = side("In general, I prefer when the person in bondage is", "Someone else", "Me"),
  Humiliation = side("In general, you find it most erotic when the subject of humiliation is:", "Someone else", "Me"),
  Nonconsent = side("In erotic scenarios involving nonconsent, you generally prefer", "Someone else", "Me"),
  MentalAlteration = side("You prefer it when the mentally altered person is:", "Other people", "Me")
)
cat("  people with each (the pairs and the me-or-someone-else only where the category was ticked)\n")
print(colSums(!is.na(roles)))
cat("\n  correlations (Spearman, pairwise)\n")
role_r <- stats::cor(roles, use = "pairwise.complete.obs", method = "spearman")
print(round(role_r, 2))
role_eigen <- eigen(role_r, only.values = TRUE)$values
cat(sprintf(
  "\n  first eigenvalue %.1f of %d (%.0f%%), second %.1f: one role axis if the first stands well clear\n",
  role_eigen[1], ncol(roles), 100 * role_eigen[1] / ncol(roles), role_eigen[2]
))

cat("\n  the self-description by sex (%)\n")
print(round(100 * prop.table(table(
  sex = ifelse(male, "men", "women"),
  factor(roles$Identity, levels = -3:3, labels = identity_levels)
), 1)))

# Is the side somebody wants on the same axis as how much they want? The role
# indices against the general factor's loadings would be circular, so it is
# read off the scores: the self-description against the sum of the categories.
breadth <- rowSums(interests[, setdiff(names(interests), c("Dominant", "Submissive")), drop = FALSE])
cat(sprintf(
  "\n  self-description against breadth (the sum of the category scores): r = %.2f; |self-description| against breadth: r = %.2f\n",
  stats::cor(roles$Identity, breadth, use = "complete.obs", method = "spearman"),
  stats::cor(abs(roles$Identity), breadth, use = "complete.obs", method = "spearman")
))

# ---------------------------------------------------------------------------
# 7. Kinds of people?

rule("BKS  7. do people come in kinds?")

# Factor scores for everybody (ten Berge, which keeps the factors' own
# correlations), then Gaussian mixtures of one to `BKS_MAX_PROFILES` kinds on
# them. Only people with every score can be scored; with the gate read as 0,
# that is nearly everybody.
complete <- stats::complete.cases(interests)
scores <- psych::factor.scores(interests[complete, ], efa, method = "tenBerge")$scores
colnames(scores) <- colnames(loadings)
z <- scale(scores)
cat(sprintf("  %d people with every score\n", sum(complete)))

mixture <- mclust::Mclust(z, G = seq_len(BKS_MAX_PROFILES), verbose = FALSE)
best_bic <- apply(mixture$BIC, 1, max, na.rm = TRUE)
cat("\n  BIC by number of kinds (mclust's sign: higher is better), the best model shape at each\n")
cat(sprintf("      %d: %.0f\n", seq_along(best_bic), best_bic), sep = "")

# A mixture on continuous scores nearly always finds several kinds in a sample
# this large, so the number alone does not say people are typed: what does is
# whether the kinds are shaped differently or are one cloud cut into slices
# along its length. The centroids say which, read with how cleanly people are
# assigned (a mean certainty near 1 is separate groups; well under it is slices).
profiles <- mixture$classification
cat(sprintf(
  "\n  best: %d kinds (%s); mean certainty of assignment %.2f\n\n",
  mixture$G, mixture$modelName, mean(apply(mixture$z, 1, max))
))
kinds <- sort(unique(profiles))
centroids <- t(sapply(kinds, function(p) colMeans(z[profiles == p, , drop = FALSE])))
identity_of <- roles$Identity[complete]
kind_table <- data.frame(
  kind = paste0("K", kinds),
  share = round(100 * as.numeric(table(profiles)[as.character(kinds)]) / length(profiles)),
  women = round(100 * as.numeric(tapply(!male[complete], profiles, mean)[as.character(kinds)])),
  dom_sub = round(as.numeric(tapply(identity_of, profiles, mean, na.rm = TRUE)[as.character(kinds)]), 2),
  round(centroids, 2),
  check.names = FALSE
)
cat("  each kind's size (%), share of women (%), mean self-description (-3 submissive to 3 dominant)\n  and mean on each factor (SD units)\n\n")
print(kind_table, row.names = FALSE)

cat("\n  factor means by sex (SD units)\n\n")
print(round(rbind(women = colMeans(z[!male[complete], ]), men = colMeans(z[male[complete], ])), 2))

# ---------------------------------------------------------------------------
# 8. The items that tap the dimensions most

rule("BKS  8. which items tap the dimensions most")

# What a short form would be made of. The targets are the dimensions found
# above — the factors (3), the general factor (4) and the role axis (6) — and
# the candidates are the single items, since an app would ask an item of
# everybody rather than ticking a category first (someone who would not have
# ticked it answers 0, which is what the gate recorded). Items are picked one
# at a time, each the one that adds most to what the ones before it already
# predict, so that a second item from the category of the first — which says
# nearly the same thing — is passed over for one that says something new.
#
# One caution when reading it: an item is part of its category's score, and
# the categories are what the factors were fitted to, so an item predicts its
# own factor somewhat better here than it would if the factor had been
# measured separately. The role axis is kept clean of that: its target is made
# only of the category pairs and the me-or-someone-else questions, and the
# candidates for it are the questions asked of everybody.
BKS_SHORT_STEPS <- 5
BKS_SHORT_KEPT <- 3

usable <- stats::complete.cases(answers)
pool <- answers[usable, ]

breadth_fa <- suppressWarnings(suppressMessages(psych::fa(R, nfactors = 1, n.obs = n_obs, fm = "minres")))
general_score <- psych::factor.scores(interests[usable, ], breadth_fa, method = "tenBerge")$scores[, 1]
factor_scores <- psych::factor.scores(interests[usable, ], efa, method = "tenBerge")$scores
colnames(factor_scores) <- colnames(loadings)

role_parts <- scale(roles[, c("Pain", "Begging", "Worship", "Bondage", "Humiliation", "Nonconsent", "MentalAlteration")])
role_target <- ifelse(rowSums(!is.na(role_parts)) >= 2, rowMeans(role_parts, na.rm = TRUE), NA)[usable]
role_pool <- data.frame(Identity = roles$Identity[usable], pool[, c("Dominant", "Submissive")])

targets <- c(
  lapply(colnames(factor_scores), function(f) list(name = f, y = factor_scores[, f], pool = pool)),
  list(list(name = "General", y = general_score, pool = pool)),
  list(list(name = "Role", y = role_target, pool = role_pool))
)

words_for <- function(key) if (key == "Identity") "Self-description, submissive to dominant" else items$words[items$key == key]

forward <- function(y, data, steps) {
  keep <- !is.na(y) & stats::complete.cases(data)
  y <- y[keep]
  data <- data[keep, , drop = FALSE]
  chosen <- character(0)
  steps <- min(steps, ncol(data))
  picks <- data.frame(item = character(0), r2 = numeric(0))
  for (step in seq_len(steps)) {
    left <- setdiff(names(data), chosen)
    r2 <- vapply(left, function(candidate) {
      summary(stats::lm(y ~ ., data = data[, c(chosen, candidate), drop = FALSE]))$r.squared
    }, numeric(1))
    chosen <- c(chosen, names(which.max(r2)))
    picks <- rbind(picks, data.frame(item = names(which.max(r2)), r2 = max(r2)))
  }
  list(picks = picks, y = y, data = data)
}

# For each dimension: the items picked in order, how much of it they predict
# together (R², cumulative), and each item's own correlation with it; then the
# first `BKS_SHORT_KEPT` of them summed with equal weights, turned where an
# item goes against the dimension, which is how a short form would be scored,
# and how closely that sum follows the dimension.
chosen_all <- character(0)
for (target in targets) {
  run <- forward(target$y, target$pool, BKS_SHORT_STEPS)
  cat(sprintf("  %s   (%d people)\n", target$name, length(run$y)))
  for (i in seq_len(nrow(run$picks))) {
    key <- run$picks$item[i]
    cat(sprintf(
      "      %d.  R² %.2f   r %5.2f   %-18s %s\n",
      i, run$picks$r2[i], stats::cor(run$data[[key]], run$y), key, words_for(key)
    ))
  }
  kept <- head(run$picks$item, BKS_SHORT_KEPT)
  signs <- sign(vapply(kept, function(key) stats::cor(run$data[[key]], run$y), numeric(1)))
  unit <- as.matrix(run$data[, kept, drop = FALSE]) %*% signs
  cat(sprintf(
    "      the first %d, summed with equal weights: r = %.2f with the dimension\n\n",
    length(kept), stats::cor(unit, run$y)
  ))
  if (target$name != "Role") chosen_all <- union(chosen_all, kept)
}

# The short form as a whole: every item kept for a content dimension, and how
# well that one set recovers each dimension with the weights a regression
# would give them — the most it could do, if it were scored by weights rather
# than by sums.
cat(sprintf("  the kept items together (%d): %s\n", length(chosen_all), paste(chosen_all, collapse = ", ")))
for (target in targets[vapply(targets, function(t) t$name != "Role", logical(1))]) {
  fit <- stats::lm(target$y ~ ., data = pool[, chosen_all, drop = FALSE])
  cat(sprintf("      %-8s R² %.2f\n", target$name, summary(fit)$r.squared))
}
