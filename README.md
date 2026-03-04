<p align="center">
  <img src="icon.png" alt="Fulcrum Logo" width="21%">
</p>

# Fulcrum on StartOS

> **Upstream docs:** <https://github.com/cculianu/Fulcrum/blob/master/doc/>
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
- `banner.txt` — custom Electrum client banner (optional)
- `fulc2_db/` — RocksDB indexes (excluded from backup)
- `fulc2_db.mainnet/` — mainnet database (excluded from backup)
- `latch` — sync lock file (excluded from backup)

**Bitcoin dependency mount:**

- `/mnt/bitcoind` — Bitcoin Core volume (read-only, for cookie auth)

---

## Installation and First-Run Flow

| Step          | Upstream                     | StartOS                             |
| ------------- | ---------------------------- | ----------------------------------- |
| Installation  | Manual binary/Docker setup   | Install from marketplace            |
| Configuration | Edit `fulcrum.conf` manually | Auto-configured, tunable via action |
| Bitcoin Core  | Manual RPC configuration     | Auto-configured via dependency      |

**Install alert:** Fulcrum requires significant resources: 2GB+ RAM during sync and 180GB+ for indexes. Combined with a Bitcoin node (~800GB), total storage exceeds 1TB. A 2TB drive is strongly recommended.

**First-run steps:**

1. Ensure Bitcoin Core is installed with txindex enabled (auto-configured)
2. Install Fulcrum from the StartOS marketplace
3. Wait for initial sync to complete (can take many hours)

---

## Configuration Management

### Auto-Configured by StartOS

| Setting     | Value                   | Purpose                       |
| ----------- | ----------------------- | ----------------------------- |
| `datadir`   | `/data`                 | Data directory                |
| `bitcoind`  | `bitcoind.startos:8332` | Bitcoin RPC connection        |
| `rpccookie` | `/mnt/bitcoind/.cookie` | Bitcoin cookie auth           |
| `tcp`       | `0.0.0.0:50001`         | Electrum protocol listener    |
| `peering`   | `false`                 | Peer discovery disabled       |
| `announce`  | `false`                 | Network announcement disabled |

### Configurable via Action

| Setting                 | Default  | Purpose                            |
| ----------------------- | -------- | ---------------------------------- |
| Server Banner           | (empty)  | Custom banner for Electrum clients |
| Bitcoin RPC Timeout     | 30s      | RPC response timeout               |
| Bitcoin RPC Clients     | 3        | Concurrent RPC connections         |
| Worker Threads          | 0 (auto) | Processing threads                 |
| Database Memory         | 2048 MB  | RocksDB cache size                 |
| Database Max Open Files | 1000     | Max open file handles              |

---

## Network Access and Interfaces

| Interface      | Internal Port | Preferred External Port | Protocol | Purpose           |
| -------------- | ------------- | ----------------------- | -------- | ----------------- |
| Electrum (SSL) | 50001         | 50002                   | TCP+SSL  | Electrum protocol |

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
- **Bitcoin RPC Clients** — concurrent connections to Bitcoin Core (min 1)
- **Worker Threads** — 0 for auto-detect
- **Database Memory** — RocksDB cache in MB (min 50)
- **Database Max Open Files** — raise if Fulcrum logs file handle errors (min 20)

---

## Dependencies

| Dependency   | Required | Version | Purpose         | Auto-Config                        |
| ------------ | -------- | ------- | --------------- | ---------------------------------- |
| Bitcoin Core | Yes      | >=28.3  | Blockchain data | prune=0, txindex=true, ZMQ enabled |

StartOS creates a critical task on Bitcoin Core to enforce required settings (no pruning, transaction index, and ZMQ).

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

During initial sync, the Sync Progress health check displays real-time progress messages from Fulcrum's controller.

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

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: fulcrum
upstream_version: latest
image: cculianu/fulcrum
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  electrum: 50001 (internal), 50002 (preferred external, SSL)
dependencies:
  bitcoind:
    required: true
    min_version: '>=30.2'
    enforced_config: [prune=0, txindex=true, zmqEnabled=true]
actions:
  - configure (enabled, any)
health_checks:
  - electrum: port_listening 50001
  - sync: controller log monitoring
backup_volumes:
  - main (excludes fulc2_db/, fulc2_db.mainnet/, latch)
startos_managed_config:
  datadir: /data
  bitcoind: bitcoind.startos:8332
  rpccookie: /mnt/bitcoind/.cookie
  tcp: 0.0.0.0:50001
  peering: false
  announce: false
not_available:
  - Admin RPC interface
  - Peer discovery/announcement
```
