import { T, utils } from '@start9labs/start-sdk'
import {
  rpcHostId as btcRpcHostId,
  rpcInterfaceId as btcRpcInterfaceId,
} from 'bitcoin-core-startos/startos/utils'
import { sdk } from './sdk'

export const electrumPort = 50001

/**
 * The IPv4 LXC-bridge `host:port` for an interface on an already-resolved host.
 * Pure — call it INSIDE a `sdk.host` map fn so `.const()` narrows its reactivity
 * to just this address. `.startos` DNS / direct container IPs are deprecated;
 * containers reach each other over this bridge.
 */
const bridgeAddr = (host: utils.FilledHost | null, interfaceId: string) => {
  const iface =
    host &&
    Object.values(host.bindings)
      .flatMap((b) => Object.values(b.interfaces))
      .find((i) => i.id === interfaceId)
  return iface
    ? iface.addressInfo
        .filter({
          kind: 'bridge',
          predicate: (h) => h.metadata.kind === 'ipv4' && !h.ssl,
        })
        .hostnames[0]
    : undefined
}

/**
 * bitcoind's RPC `host:port` over the bridge (replaces `bitcoind.startos:8332`
 * in fulcrum.conf). Reads bitcoind's RPC host once; the map fn returns only the
 * resolved address so the caller re-runs only when that value changes.
 */
export const getBitcoindRpcHost = (effects: T.Effects) =>
  sdk.host
    .get(effects, { hostId: btcRpcHostId, packageId: 'bitcoind' }, (host) => {
      const rpc = bridgeAddr(host, btcRpcInterfaceId)
      return rpc && `${rpc.hostname}:${rpc.port}`
    })
    .const()
