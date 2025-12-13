export const electrumPort = 50001

export const defaultBanner = `


█▀▀ █▀█ █▀▀ █▀▀   █▀ ▄▀█ █▀▄▀█ █▀█ █░█ █▀█ ▄▀█ █
█▀░ █▀▄ ██▄ ██▄   ▄█ █▀█ █░▀░█ █▄█ █▄█ █▀▄ █▀█ █

Welcome to your Fulcrum Server!
Connected to $SERVER_VERSION
For information and updates: https://freesamourai.com`

export const BITCOIND_RPC = 'bitcoind.startos:8332'
export const BITCOIND_TESTNET_RPC = 'bitcoind-testnet.startos:48332'
export type DEPENDENCYID = 'bitcoind' | 'bitcoind-testnet' | null

export function getDependencyId(rpcAddress: string | null): DEPENDENCYID {
  if (rpcAddress === BITCOIND_RPC) {
    return 'bitcoind'
  } else if (rpcAddress === BITCOIND_TESTNET_RPC) {
    return 'bitcoind-testnet'
  } else {
    return null
  }
}

export function parseCookie(cookie: string | null): [string, string] {
  const parts = cookie?.trim().split(':')
  if (!parts || parts.length !== 2) {
    throw new Error('Invalid .cookie format')
  }
  return [parts[0], parts[1]]
}
