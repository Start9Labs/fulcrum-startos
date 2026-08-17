# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Never prefill the Configure form by spreading the whole config.** `fulcrum.conf`'s `banner` key is the _path_ to `banner.txt`, not its contents — spreading it put that path in the textarea, and the next save wrote the path into `banner.txt` and served it to clients. Prefill only the keys the spec declares.
- **An empty banner means deleting `banner.txt`, not writing it empty.** Fulcrum re-reads the file per `server.banner` call and falls back to its built-in banner only when the file is absent.
- **`main` must `const` the config _after_ writing `bitcoind` into it**, or that write registers as a change and the daemon restarts itself on every start.
- **`peering` and `announce` stay pinned false.** This is not a public Electrum server, and both would advertise it as one.
- **The bitcoind version range is per-major, not a floor.** It pins the revision on each Core line that carries the fixes Fulcrum needs — widening it to a single `>=` would admit older revisions on the newer lines.
