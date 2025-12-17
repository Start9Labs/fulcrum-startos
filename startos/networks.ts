import { sdk } from './sdk'
import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { otherConfig as mainnetConfig } from 'bitcoind-startos/startos/actions/config/other'
import { otherConfig as testnetConfig } from 'bitcoind-testnet-startos/startos/actions/config/other'
import { DB_PATH_PREFIX } from "./utils"

// @todo add/enable bch
export const NETWORKS = {
  bitcoind: {
    title: 'Bitcoin',
    rpcAddress: 'bitcoind.startos:8332',
    dbPath: `${DB_PATH_PREFIX}fulc2_db.mainnet`,
    mountSubpath: null,
    dependency: {
      bitcoind: {
        kind: 'running',
        versionRange: '>=29.0.0',
        healthChecks: ['sync-progress'],
      },
    },
    manifestMetadata: {
      description: 'Provides Bitcoin network connection and blockchain data.',
      optional: true,
      metadata: {
        title: 'Bitcoin Node',
        icon: 'https://bitcoin.org/img/icons/opengraph.png',
      },
    },
    requiredConfig: async (effects: Effects) => {
      await sdk.action.createTask(
        effects,
        'bitcoind',
        mainnetConfig,
        'critical',
        {
          input: {
            kind: 'partial',
            value: {
              prune: 0,
              txindex: true,
              zmqEnabled: true,
            },
          },
          reason:
            'Pruning must be disabled, txindex and ZMQ must be enabled for Fulcrum to function properly.',
          when: { condition: 'input-not-matches', once: false },
        },
      )
    },
  },
  'bitcoind-testnet': {
    title: 'Bitcoin (testnet4)',
    rpcAddress: 'bitcoind-testnet.startos:48332',
    dbPath: `${DB_PATH_PREFIX}fulc2_db.testnet4`,
    mountSubpath: 'testnet4',
    dependency: {
      'bitcoind-testnet': {
        kind: 'running',
        versionRange: '>=29.0.0',
        healthChecks: ['sync-progress'],
      },
    },
    manifestMetadata: {
      description:
        'Testnet4 Bitcoin Node instance for development and testing.',
      optional: true,
      metadata: {
        title: 'Bitcoin Node (testnet4)',
        icon: 'https://bitcoin.org/img/icons/opengraph.png',
      },
    },
    requiredConfig: async (effects: Effects) => {
      await sdk.action.createTask(
        effects,
        'bitcoind-testnet',
        testnetConfig,
        'critical',
        {
          input: {
            kind: 'partial',
            value: {
              prune: 0,
              txindex: true,
              zmqEnabled: true,
            },
          },
          reason:
            'Pruning must be disabled, txindex and ZMQ must be enabled for Fulcrum to function properly.',
          when: { condition: 'input-not-matches', once: false },
        },
      )
    },
  },
  // 'bitcoin-cash-node': {
  //   title: 'Bitcoin Cash',
  //   rpcAddress: 'bch.startos:8332',
  //   dbPath: `${DB_PATH_PREFIX}fulc2_db.bch`,
  //   mountSubpath: null,
  //   dependency: {
  //     'bitcoin-cash-node': {
  //       kind: 'running',
  //       versionRange: '>=28.0.0',
  //       healthChecks: ['sync-progress'],
  //     },
  //   },
  //   manifestMetadata: {
  //     description:
  //       'Provides Bitcoin Cash network connection and blockchain data.',
  //     optional: true,
  //     metadata: {
  //       title: 'Bitcoin Cash Node',
  //       icon: 'https://bitcoincash.org/img/bitcoin-cash-logo-wt.svg',
  //     },
  //   },
  //   requiredConfig: null,
  // },
}

export type DEPENDENCYID = keyof typeof NETWORKS

export const manifestDependencies = Object.fromEntries(
  Object.entries(NETWORKS).map(([key, config]) => [
    key,
    config.manifestMetadata,
  ]),
)

export function getDependencyId(
  rpcAddress: string | null,
): DEPENDENCYID | null {
  const entry = Object.entries(NETWORKS).find(
    ([_, config]) => config.rpcAddress === rpcAddress,
  )
  return entry ? (entry[0] as DEPENDENCYID) : null
}