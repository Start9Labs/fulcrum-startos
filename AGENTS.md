# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Never prefill the Configure form by spreading the whole config.** `fulcrum.conf`'s `banner` key is the _path_ to `banner.txt`, not its contents — spreading it put that path in the textarea, and the next save wrote the path into `banner.txt` and served it to clients. Prefill only the keys the spec declares.
- **An empty banner means deleting `banner.txt`, not writing it empty.** Fulcrum re-reads the file per `server.banner` call and falls back to its built-in banner only when the file is absent.
- **`main` must `const` the config _after_ writing `bitcoind` into it**, or that write registers as a change and the daemon restarts itself on every start.
- **`peering` and `announce` stay pinned false.** This is not a public Electrum server, and both would advertise it as one.
- **The bitcoind version range is per-major, not a floor.** It pins the revision on each Core line that carries the fixes Fulcrum needs — widening it to a single `>=` would admit older revisions on the newer lines.
