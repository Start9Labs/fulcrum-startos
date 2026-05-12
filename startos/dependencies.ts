import { autoconfig as autoconfigOrig } from 'bitcoin-core-startos/startos/actions/config/autoconfig'
import type { Action } from '@start9labs/start-sdk/base/lib/actions/setupActions'
import { i18n } from './i18n'
import { sdk } from './sdk'

// Cast until bitcoin-core-startos bumps to start-sdk 1.5.x; the 1.3.3 Action
// it exports no longer structurally extends 1.5.0's Action because T.Effects
// gained a `notification` member, so cross-SDK action inference fails.
const autoconfig = autoconfigOrig as unknown as Action<
  'autoconfig',
  (typeof autoconfigOrig)['_INPUT']
>

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  await sdk.action.createTask(effects, 'bitcoind', autoconfig, 'critical', {
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
      versionRange: '>=28.3:8',
      healthChecks: ['bitcoind'],
    },
  }
})
