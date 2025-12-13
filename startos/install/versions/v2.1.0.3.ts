import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { load } from 'js-yaml'
import { readFile, rm } from 'fs/promises'
import { conf, confDefaults } from '../../file-models/fulcrum.conf'
import { BITCOIND_RPC, BITCOIND_TESTNET_RPC } from '../../utils'

type LegacyConfig = {
  bitcoind?: {
    type?: 'bitcoind' | 'bitcoind-testnet'
  }
  advanced?: {
    'bitcoind-timeout'?: number
    'bitcoind-clients'?: number
    'worker-threads'?: number
    'db-mem'?: number
    'db-max-open-files'?: number
  }
}

export const v2_1_0_3 = VersionInfo.of({
  version: '2.1.0:3-beta.0',
  releaseNotes: 'Migrated to the StartOS 0.4 SDK.',
  migrations: {
    up: async ({ effects }) => {
      let next = confDefaults

      try {
        const legacy = load(
          await readFile(
            '/media/startos/volumes/main/start9/config.yaml',
            'utf-8',
          ),
        ) as LegacyConfig

        next = {
          datadir: confDefaults.datadir,
          bitcoind:
            legacy.bitcoind?.type === 'bitcoind'
              ? BITCOIND_RPC
              : BITCOIND_TESTNET_RPC,
          rpcuser: confDefaults.rpcuser,
          rpcpassword: confDefaults.rpcpassword,
          tcp: confDefaults.tcp,
          peering: confDefaults.peering,
          announce: confDefaults.announce,
          bitcoind_timeout:
            legacy.advanced?.['bitcoind-timeout'] ??
            confDefaults.bitcoind_timeout,
          bitcoind_clients:
            legacy.advanced?.['bitcoind-clients'] ??
            confDefaults.bitcoind_clients,
          worker_threads:
            legacy.advanced?.['worker-threads'] ?? confDefaults.worker_threads,
          db_mem: legacy.advanced?.['db-mem'] ?? confDefaults.db_mem,
          db_max_open_files:
            legacy.advanced?.['db-max-open-files'] ??
            confDefaults.db_max_open_files,
          banner: confDefaults.banner,
        }
      } catch (error) {
        console.warn('No legacy config found, using defaults', error)
      }

      await conf.write(effects, next)
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        () => undefined,
      )
    },
    down: IMPOSSIBLE,
  },
})
