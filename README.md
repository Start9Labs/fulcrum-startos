<p align="center">
  <img src="icon.png" alt="Fulcrum Logo" width="21%">
</p>

# Fulcrum on StartOS

> **Upstream docs:** <https://github.com/cculianu/Fulcrum/tree/master/doc>
>
> Everything not listed in this document should behave the same as upstream
> Fulcrum. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Fulcrum](https://github.com/cculianu/Fulcrum) is a high-performance Electrum server that indexes the Bitcoin blockchain from your own Bitcoin node. It allows you to connect hardware and software wallets to your own node, ensuring privacy and security.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                         |
| ------------- | --------------------------------------------- |
| Image         | `cculianu/fulcrum` (upstream unmodified)      |
| Architectures | x86_64, aarch64                               |
| Command       | `Fulcrum --ts-format none /data/fulcrum.conf` |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose          |
| ------ | ----------- | ---------------- |
| `main` | `/data`     | All Fulcrum data |

**Key paths on the `main` volume:**

- `fulcrum.conf` — main configuration file (INI format)
- `banner.txt` — custom Electrum client banner (optional; absent unless Configure sets one)
- `fulc2_db/` — RocksDB indexes (excluded from backup)
- `fulc2_db.mainnet/` — mainnet database (excluded from backup)
- `latch` — sync lock file (excluded from backup)

**Bitcoin dependency mount:**

- `/mnt/bitcoind` — Bitcoin volume (read-only, for cookie auth)

---

## Installation and First-Run Flow

| Step          | Upstream                     | StartOS                             |
| ------------- | ---------------------------- | ----------------------------------- |
| Installation  | Manual binary/Docker setup   | Install from marketplace            |
| Configuration | Edit `fulcrum.conf` manually | Auto-configured, tunable via action |
| Bitcoin       | Manual RPC configuration     | Auto-configured via dependency      |

**Resource requirements** (stated in `instructions.md`; the package declares no install alert): the seeded `db_mem` below plus Fulcrum's own working memory, on a box already running Bitcoin, and 180GB+ for the indexes. Combined with a Bitcoin node (~800GB), total storage exceeds 1TB. A 2TB drive is strongly recommended.

**First-run steps:**

1. Ensure Bitcoin is installed with txindex enabled (auto-configured)
2. Install Fulcrum from the StartOS marketplace
3. Wait for initial sync to complete (can take many hours)

---

## Configuration Management

### Auto-Configured by StartOS

| Setting     | Value                   | Purpose                                                                |
| ----------- | ----------------------- | ---------------------------------------------------------------------- |
| `datadir`   | `/data`                 | Data directory                                                         |
| `bitcoind`  | (LXC bridge address)    | Bitcoin RPC connection (resolved dynamically over the internal bridge) |
| `rpccookie` | `/mnt/bitcoind/.cookie` | Bitcoin cookie auth                                                    |
| `tcp`       | `0.0.0.0:50001`         | Electrum protocol listener                                             |
| `peering`   | `false`                 | Peer discovery disabled                                                |
| `announce`  | `false`                 | Network announcement disabled                                          |

### Configurable via Action

| Setting                 | Default            | Purpose                            |
| ----------------------- | ------------------ | ---------------------------------- |
| Server Banner           | (empty)            | Custom banner for Electrum clients |
| Bitcoin RPC Timeout     | 30s                | RPC response timeout               |
| Bitcoin RPC Clients     | 3                  | Concurrent RPC connections         |
| Worker Threads          | 0 (auto)           | Processing threads                 |
| Database Memory         | seeded — see below | RocksDB cache size                 |
| Database Max Open Files | 1000               | Max open file handles              |

Every value above is Fulcrum's own default, left unset in `fulcrum.conf`, **except Database Memory** (`db_mem`). Fulcrum's default is a flat 2048 MiB regardless of box size — sized for a dedicated Electrum server, whereas on StartOS it always shares RAM with the Bitcoin node it depends on. The package therefore writes `db_mem` explicitly:

- **At install** (`init/seedFiles.ts`) — `defaultDbMem()`: a quarter of installed RAM, capped at Fulcrum's own 2048 MiB. The index build is the memory-hungry phase, so this only ever lowers the value, never raises it.
- **When the index completes** (`main.ts`, the `synced-true` oneshot) — `syncedDbMem()`: 512 MiB, or `defaultDbMem()` if that is already lower. Upstream notes that even 256 MiB performs well on an SSD.
- **On update to `2.1.1:13`** — installs predating this backfill get `db_mem` written to whichever of the two matches their sync state.

The reduction only applies when the value on disk is still exactly what `defaultDbMem()` seeded, so anything set through Configure is left alone.

---

## Network Access and Interfaces

| Interface      | Internal Port | Preferred External Port | Protocol | Purpose           |
| -------------- | ------------- | ----------------------- | -------- | ----------------- |
| Electrum (SSL) | 50001         | 50002 (TLS)             | TCP+SSL  | Electrum protocol |

Fulcrum listens unencrypted on 50001 inside the container and StartOS terminates TLS in front of it (`addSsl` on the bind, `secure: null`). **TLS is the only way in from off the box** — LAN, `.local`, domains and Tor alike — which is what makes **Electrum (SSL)** an accurate name. A plaintext external port is allocated too. It is reachable at the bridge IP by the host and by other services over `lxcbr0` — source-filtered to that subnet — and from nowhere else; no LAN or WAN gateway gets a forward for it. That is the address `getBridgeAddress(…, { ssl: false })` hands to dependents, and it is what replaced the retired `fulcrum.startos` DNS name. `schemeOverride: { ssl: 'ssl', noSsl: 'tcp' }` is what renders an address as `ssl://host:port`; without it a `protocol: null` bind prints a bare `host:port` with nothing marking it as TLS.

**The external port is per-server.** `preferredExternalPort` is a preference, and whatever StartOS assigns is permanent — an existing binding never changes its external port; only uninstall and reinstall reassigns. Never name a literal external port in user-facing docs; read the live values with `start-cli package host binding list fulcrum main`.

**Access methods (StartOS 0.4.0):**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

Connect wallets using the Electrum protocol (e.g., Sparrow, Electrum, BlueWallet).

---

## Actions (StartOS UI)

### Configure

| Property     | Value                                |
| ------------ | ------------------------------------ |
| ID           | `configure`                          |
| Visibility   | Enabled                              |
| Availability | Any status                           |
| Group        | Configuration                        |
| Purpose      | Tune performance settings and banner |

**Inputs:**

- **Server Banner** — custom ASCII art banner for Electrum clients (max 2000 chars)
- **Bitcoin RPC Timeout** — seconds to wait for RPC responses (min 30)
- **Bitcoin RPC Clients** — concurrent connections to Bitcoin (min 1)
- **Worker Threads** — 0 for auto-detect
- **Database Memory** — RocksDB cache in MB (min 50); seeded and auto-lowered as described above
- **Database Max Open Files** — raise if Fulcrum logs file handle errors (min 20)

Saving Configure writes `fulcrum.conf`, which `main.ts` holds as a `.const()`, so the service restarts to pick the change up — Fulcrum reads its config only at startup. The `.const()` is registered _after_ `main.ts` writes the `bitcoind` bridge address so that write is part of the captured value; moving it earlier would make the service restart itself once on every start.

The banner is the exception. It lives in its own file, so a banner-only save leaves `fulcrum.conf` byte-identical and nothing restarts — and nothing needs to. Fulcrum reads `banner.txt` inside its `server.banner` RPC handler, once per client request, falling back to a built-in banner when the file cannot be read. Setting a banner writes the file; clearing the field removes it.

---

## Dependencies

### Bitcoin (required)

| Property           | Value                                             |
| ------------------ | ------------------------------------------------- |
| Version constraint | Declared in `startos/dependencies.ts`             |
| Health checks      | `bitcoind` must pass before Fulcrum starts        |
| Mounted volumes    | `main` → `/mnt/bitcoind` (read-only)              |
| Purpose            | Blockchain data via RPC and cookie authentication |

StartOS creates a critical task on Bitcoin to enforce required settings: `prune=0`, `txindex=true`, `zmqEnabled=true`.

---

## Backups and Restore

**Included in backup:**

- `main` volume (configuration and banner only)

**Excluded from backup:**

- `fulc2_db/` — RocksDB indexes
- `fulc2_db.mainnet/` — mainnet database
- `latch` — sync lock file

The database is excluded because it can be rebuilt from the Bitcoin node. After restoring, Fulcrum will re-sync from scratch (which can take many hours).

---

## Health Checks

| Check    | Display Name   | Method                    | Messages                         |
| -------- | -------------- | ------------------------- | -------------------------------- |
| Electrum | Electrum (SSL) | Port 50001 listening      | Ready / Not ready                |
| Sync     | Sync Progress  | Controller log monitoring | Synced / [sync progress message] |

During initial sync, the Sync Progress health check displays real-time progress messages from Fulcrum's controller. When sync first reaches `success` after install, a **Sync Complete** notification is posted to the StartOS notifications panel (fires once per install) and the `db_mem` reduction above is written. That write is guarded by `store.json`'s `syncNotified`, which is persisted first, so the restart it triggers re-enters the oneshot with nothing left to do rather than looping.

---

## Limitations and Differences

1. **No admin RPC** — Fulcrum's admin RPC interface is not exposed
2. **No peering** — peer discovery and announcement are disabled
3. **SSL certificate configuration** — SSL is handled automatically by StartOS

---

## What Is Unchanged from Upstream

- Full Electrum protocol support
- All wallet functionality (balance, history, UTXO queries)
- Transaction broadcasting
- Address subscription and notifications
- Header subscription
- RocksDB storage engine
- Multi-threaded request processing
- Custom server banners
- All client compatibility (Sparrow, Electrum, BlueWallet, etc.)

---

## Contributing

Build and development workflow follow the StartOS packaging guide: <https://docs.start9.com/packaging>. Keep `README.md`, `instructions.md`, and `AGENTS.md` in sync with any change to user-visible behavior or package structure.

---

## Quick Reference for AI Consumers

```yaml
package_id: fulcrum
image: cculianu/fulcrum
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  electrum: 50001
dependencies:
  - bitcoind
startos_managed_env_vars: none
actions:
  - configure
```
