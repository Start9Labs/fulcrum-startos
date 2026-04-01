import { autoconfig } from 'bitcoind-startos/startos/actions/config/autoconfig'
import { i18n } from './i18n'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  await sdk.action.createTask(effects, 'bitcoind', autoconfig, 'critical', {
    input: {
      kind: 'partial',
      value: {
        prune: null,
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
      versionRange: '>=28.3:5',
      healthChecks: ['bitcoind'],
    },
  }
})
