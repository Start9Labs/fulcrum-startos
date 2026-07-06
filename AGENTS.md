# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `fulcrum`.** A high-performance Electrum server exposing the **Electrum (SSL)** interface (host id `main`), with a hard dependency on Bitcoin (`bitcoind`, `optional: false`).
- **Reaching bitcoind's RPC goes through the LXC bridge**, not `bitcoind.startos` DNS. `main.ts` resolves the address via the reactive `bridgeAddress` helper (`startos/utils.ts`) chained with `.const()`, then pins it into `fulcrum.conf`'s `bitcoind` field before starting the daemon. The helper maps to `host.bindings[rpcPort].net.assignedPort`, so the `.const()` restarts Fulcrum only on bitcoind install/uninstall/port-change, never on bitcoind updates. While bitcoind is absent the address is `null` and `main.ts` omits the `bitcoind` line; the `.const()` heals (one restart), writing the real address, when bitcoind appears. bitcoind's host id and internal RPC port are imported from `bitcoin-core-startos/startos/utils`, never hardcoded.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach fulcrum -n primary -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `primary-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
