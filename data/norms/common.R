# What every `norms_*.R` in this folder prints with, so that each set of norms
# comes out in the one shape `content/` wants it. Each of them sources this
# file; nothing here reads data or works anything out.

# The indentation `mean:` and `sd:` sit at inside a `norms` block, so that what
# is printed can be pasted in without being reformatted afterwards.
PASTE_INDENT <- strrep(" ", 16)

# One dimension's two lines, under a heading saying which dimension they are
# and where the number came from.
paste_lines <- function(dimension, mean, sd, from = NULL) {
  cat("  ", dimension, if (is.null(from)) "" else paste0("   (", from, ")"), "\n", sep = "")
  cat(sprintf("%smean: %.2f,\n", PASTE_INDENT, mean))
  cat(sprintf("%ssd: %.2f,\n\n", PASTE_INDENT, sd))
}

rule <- function(title) {
  cat("\n", strrep("=", 74), "\n", title, "\n", strrep("=", 74), "\n\n", sep = "")
}
