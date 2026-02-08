import { i18n } from './i18n'
import { sdk } from './sdk'
import { otherConfig as bitcoinConfig } from 'bitcoind-startos/startos/actions/config/other'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  await sdk.action.createTask(effects, 'bitcoind', bitcoinConfig, 'critical', {
    input: {
      kind: 'partial',
      value: {
        prune: 0,
        txindex: true,
        zmqEnabled: true,
      },
    },
    reason: i18n(
      'Pruning must be disabled, txindex and ZMQ must be enabled for Fulcrum to function properly.',
    ),
    when: { condition: 'input-not-matches', once: false },
  })

  return {
    bitcoind: {
      kind: 'running',
      versionRange: '>=29.0.0',
      healthChecks: ['sync-progress'],
    },
  }
})
