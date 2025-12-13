import { sdk } from './sdk'
import { conf, confDefaults } from './file-models/fulcrum.conf'
import { getDependencyId } from './utils'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const settings = (await conf.read().const(effects)) ?? confDefaults
  const bitcoindOrTestnet = getDependencyId(settings.bitcoind)

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
