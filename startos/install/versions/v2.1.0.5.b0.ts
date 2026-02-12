import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { fulcrumConf } from '../../file-models/fulcrum.conf'
import { confDefaults } from '../../utils'

export const v2_1_0_5_b0 = VersionInfo.of({
  version: '2.1.0:5-beta.0',
  releaseNotes: {
    en_US: 'Updated README, workflows, and docs URL.',
    es_ES: 'Se actualizó el README, los flujos de trabajo y la URL de documentación.',
    de_DE: 'README, Workflows und Dokumentations-URL aktualisiert.',
    pl_PL: 'Zaktualizowano README, przepływy pracy i URL dokumentacji.',
    fr_FR: "Mise à jour du README, des workflows et de l'URL de documentation.",
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml:
        | {
            bitcoind?: {
              type?: 'bitcoind'
            }
            advanced?: {
              'bitcoind-timeout'?: number
              'bitcoind-clients'?: number
              'worker-threads'?: number
              'db-mem'?: number
              'db-max-open-files'?: number
            }
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        const { advanced } = configYaml

        await fulcrumConf.write(effects, {
          ...confDefaults,
          bitcoind_timeout:
            advanced?.['bitcoind-timeout'] ?? confDefaults.bitcoind_timeout,
          bitcoind_clients:
            advanced?.['bitcoind-clients'] ?? confDefaults.bitcoind_clients,
          worker_threads:
            advanced?.['worker-threads'] ?? confDefaults.worker_threads,
          db_mem: advanced?.['db-mem'] ?? confDefaults.db_mem,
          db_max_open_files:
            advanced?.['db-max-open-files'] ?? confDefaults.db_max_open_files,
        })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
