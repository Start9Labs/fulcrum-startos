import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { fulcrumConf } from '../../file-models/fulcrum.conf'
import { confDefaults } from '../../utils'

export const v2_1_0_4_b0 = VersionInfo.of({
  version: '2.1.0:4-beta.0',
  releaseNotes: {
    en_US: 'Added i18n support and updated to SDK beta.48.',
    es_ES: 'Se añadió soporte de i18n y se actualizó al SDK beta.48.',
    de_DE: 'I18n-Unterstützung hinzugefügt und auf SDK beta.48 aktualisiert.',
    pl_PL: 'Dodano obsługę i18n i zaktualizowano do SDK beta.48.',
    fr_FR: 'Ajout du support i18n et mise à jour vers le SDK beta.48.',
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
