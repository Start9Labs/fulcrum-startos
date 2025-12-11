import { sdk } from './sdk'
import {
  BITCOIND_RPC,
  BITCOIND_TESTNET_RPC,
  conf,
  confDefaults,
} from './file-models/fulcrum.conf'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const settings = (await conf.read().const(effects)) ?? confDefaults
  const bitcoindOrTestnet =
    settings.bitcoind === BITCOIND_RPC
      ? 'bitcoind'
      : settings.bitcoind === BITCOIND_TESTNET_RPC
        ? 'bitcoind-testnet'
        : null

  if (!bitcoindOrTestnet) {
    return {}
  }

  return {
    [bitcoindOrTestnet]: {
      kind: 'running',
      versionRange: '>=29.0.0',
      healthChecks: ['sync-progress'],
    },
  }
})
