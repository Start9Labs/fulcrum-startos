# Fulcrum

## Documentation

- [Fulcrum documentation](https://github.com/cculianu/Fulcrum/tree/master/doc) — the upstream documentation covering configuration, operation, and tuning.

## What you get on StartOS

- A high-performance **Electrum server** indexing your own Bitcoin Core node, exposed as the **Electrum (SSL)** interface for wallets to connect to.
- Automatic wiring to Bitcoin Core: the RPC endpoint and cookie authentication are configured for you, so no manual node setup is required.

## Getting set up

Fulcrum requires Bitcoin Core with `prune=0`, `txindex=true`, and ZMQ enabled. StartOS posts a critical task on Bitcoin Core to apply these settings if they are not already in place.

1. Install Bitcoin Core if you have not already.
2. Install Fulcrum. Resolve any critical task that appears on Bitcoin Core to enforce the required settings.
3. Start Fulcrum. The initial index build takes many hours and pulls roughly 180 GB of data on top of the Bitcoin Core volume — plan for at least 1 TB of disk, ideally 2 TB.
4. Watch the **Sync Progress** health check on the service dashboard. It reports live progress from Fulcrum's controller and switches to **Synced** once the Electrum interface is ready to serve clients.

## Using Fulcrum

### Connecting a wallet

Open the **Electrum (SSL)** interface and copy the address to your wallet (Sparrow, Electrum, BlueWallet, etc.). The interface speaks the Electrum protocol over SSL; StartOS handles the certificate and exposes the interface over LAN, Tor, and any custom domain you have attached.

### Configure

Run the **Configure** action to set:

- **Server Banner** — custom text shown to connecting Electrum clients.
- **Bitcoin RPC Timeout**, **Bitcoin RPC Clients** — how Fulcrum talks to Bitcoin Core.
- **Worker Threads** — leave at `0` to let Fulcrum auto-detect, or pin a specific number.
- **Database Memory** — the RocksDB cache size in MiB. Raise it to trade RAM for faster queries.
- **Database Max Open Files** — raise this if the logs complain about too many open files.

## Limitations

- Peer discovery and network announcement are disabled; this server does not advertise itself to the Electrum peer-to-peer network.
- The administrative RPC interface is not exposed.
