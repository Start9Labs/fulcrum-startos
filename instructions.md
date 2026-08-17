# Fulcrum

## Documentation

- [Fulcrum documentation](https://github.com/cculianu/Fulcrum/tree/master/doc) — the upstream documentation covering configuration, operation, and tuning.

## Requirements

- **Fulcrum is resource-intensive.** It reserves up to a quarter of the memory StartOS shares out among your services (never more than 2 GB) while building its address index, drops to 512 MB once the index is complete, and needs more on top of that for its own working memory — all while sharing the machine with the Bitcoin node it depends on. The indexes need 180 GB+; combined with a full Bitcoin node (~800 GB), total storage requirements exceed 1 TB, so a 2 TB drive is strongly recommended. Insufficient resources may cause system instability or failure.

## What you get on StartOS

- A high-performance **Electrum server** indexing your own Bitcoin node, exposed as the **Electrum (SSL)** interface for wallets to connect to.
- Automatic wiring to Bitcoin: the RPC endpoint and cookie authentication are configured for you, so no manual node setup is required.

## Getting set up

Fulcrum requires Bitcoin with `prune=0`, `txindex=true`, and ZMQ enabled. StartOS posts a critical task on Bitcoin to apply these settings if they are not already in place.

1. Install Bitcoin if you have not already.
2. Install Fulcrum. Resolve any critical task that appears on Bitcoin to enforce the required settings.
3. Start Fulcrum. The initial index build takes many hours and pulls roughly 180 GB of data on top of the Bitcoin volume — plan for at least 1 TB of disk, ideally 2 TB.
4. Watch the **Sync Progress** health check on the service dashboard. It reports live progress from Fulcrum's controller and switches to **Synced** once the Electrum interface is ready to serve clients.

## Using Fulcrum

### Connecting a wallet

Open the **Electrum (SSL)** interface and copy an address into your wallet. It is shown as an `ssl://` URL, and the host and port in it are what your wallet needs — **take the port from that address rather than assuming one**, since StartOS assigns it and it is not always the same number on every server.

Make sure your wallet's SSL option is on: in Sparrow that is _Private Electrum → Use SSL_, and in Electrum it is the `s` suffix on the server entry. Connecting with SSL off fails with a generic error such as "Retries exhausted" rather than anything naming TLS.

StartOS terminates TLS with a certificate issued by your device's root CA, and exposes the interface over LAN, `.local`, Tor, and any custom domain you have attached. A wallet that lets you accept or pin an unrecognised certificate — Sparrow does — connects with nothing further to do.

### Setting up the Electrum desktop wallet

Electrum is the exception. It checks a server against its own bundled list of public certificate authorities, and your device's certificate authority is not on that list, so it refuses the connection. It has no setting for trusting your device either, so you place the certificate in its data directory yourself. This is once per address, not once per session.

1. Download `http://<your-server>/static/local-root-ca.crt` — the same root CA StartOS offers you for your browser.
2. Delete any file already sitting at `<data-dir>/certs/<host>`. One left over from an earlier attempt stops the rest of this working, without reporting anything.
3. Save the certificate as `<data-dir>/certs/<host>`, with no file extension. `<host>` has to match exactly what you type into Electrum, so reaching the same server at `192.168.1.5` and at `my-server.local` needs one file for each.
4. Enter the server as `<host>:<port>:s`, taking the port from the interface address.

`<data-dir>` is `~/.electrum` on Linux, `~/Library/Application Support/Electrum` on macOS, and `%APPDATA%\Electrum` on Windows.

This trusts the authority rather than one certificate, so it keeps working when your server renews.

### Configure

Run the **Configure** action to set:

- **Server Banner** — custom text shown to connecting Electrum clients.
- **Bitcoin RPC Timeout**, **Bitcoin RPC Clients** — how Fulcrum talks to Bitcoin.
- **Worker Threads** — leave at `0` to let Fulcrum auto-detect, or pin a specific number.
- **Database Memory** — the RocksDB cache size in MiB. StartOS sets this for you at install and lowers it to 512 once the index is built, so you should not need to touch it; raise it to trade RAM for faster queries. Once you set it yourself, StartOS stops adjusting it.
- **Database Max Open Files** — raise this if the logs complain about too many open files.
- **Max Address History** — the most transactions Fulcrum will report for one address. An address busier than the limit comes back with an empty or partial history, balance and coin list instead of an error, so a wallet holding that address shows the funds as missing even though they are still on chain. Raise this if you use an address with a very long history; the limit is there to cap what a single request can cost in memory and time.

Saving Configure restarts Fulcrum, because it only reads its configuration at startup. Changing only the banner is the exception — it applies right away, with no restart. Leave the banner field empty to go back to Fulcrum's own default banner.

## Limitations

- Peer discovery and network announcement are disabled; this server does not advertise itself to the Electrum peer-to-peer network.
- The administrative RPC interface is not exposed.
