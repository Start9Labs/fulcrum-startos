import { sdk } from './sdk'
import { conf, confDefaults } from './file-models/fulcrum.conf'
import { getDependencyId, NETWORKS } from './networks'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const settings = (await conf.read().const(effects)) ?? confDefaults
  const dependencyId = getDependencyId(settings.bitcoind)
  if (!dependencyId) {
    return {}
  }

  const dependency = NETWORKS[dependencyId].dependency

  const requiredConfig = NETWORKS[dependencyId].requiredConfig
  if (requiredConfig) {
    await requiredConfig(effects)
  }

  return { ...dependency }
})
