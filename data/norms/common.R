# What every `norms_*.R` in this folder prints with, so that each set of norms
# comes out in the one shape `content/` wants it. Each of them sources this
# file; nothing here reads data or works anything out.

# The indentation `mean:` and `sd:` sit at inside a `norms` block, so that what
# is printed can be pasted in without being reformatted afterwards.
PASTE_INDENT <- strrep(" ", 16)

# One dimension's two lines, under a heading saying which dimension they are
# and where the number came from — and a third, where `distribution` is given,
# holding the shape the mean and SD summarise (see `distribution_of`).
paste_lines <- function(dimension, mean, sd, from = NULL, distribution = NULL) {
  cat("  ", dimension, if (is.null(from)) "" else paste0("   (", from, ")"), "\n", sep = "")
  cat(sprintf("%smean: %.2f,\n", PASTE_INDENT, mean))
  cat(sprintf("%ssd: %.2f,\n", PASTE_INDENT, sd))
  if (!is.null(distribution)) cat(PASTE_INDENT, distribution, ",\n", sep = "")
  cat("\n")
}

# The share of people in each bin of `step` from `lowest` to `highest`, as the
# `distribution` a norm in `content/` carries: what the app reads a standing
# off where it has one, rather than off a normal curve through the mean and SD,
# and what a figure can draw the crowd with. Each bin holds its lower edge and
# not its upper, but for the last, which holds the top of the scale. The shares
# are percentages to a decimal, so a thin tail is still there rather than 0.
distribution_of <- function(value, lowest, highest, step) {
  edges <- seq(lowest, highest, by = step)
  bins <- cut(value, breaks = edges, right = FALSE, include.lowest = TRUE)
  shares <- round(100 * as.numeric(table(bins)) / length(value), 1)
  sprintf(
    "distribution: { from: %s, step: %s, shares: [%s] }",
    format(lowest), format(step), paste(format(shares, trim = TRUE), collapse = ", ")
  )
}

rule <- function(title) {
  cat("\n", strrep("=", 74), "\n", title, "\n", strrep("=", 74), "\n\n", sep = "")
}
