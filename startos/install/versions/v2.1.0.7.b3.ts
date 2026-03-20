import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { fulcrumConf } from '../../file-models/fulcrum.conf'

export const v_2_1_0_7_b3 = VersionInfo.of({
  version: '2.1.0:7-beta.3',
  releaseNotes: {
    en_US: 'Update to StartOS SDK beta.60',
    es_ES: 'Actualización a StartOS SDK beta.60',
    de_DE: 'Update auf StartOS SDK beta.60',
    pl_PL: 'Aktualizacja do StartOS SDK beta.60',
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
          datadir: '/data',
          bitcoind: 'bitcoind.startos:8332',
          rpcuser: '',
          rpcpassword: '',
          rpccookie: '/mnt/bitcoind/.cookie',
          tcp: '0.0.0.0:50001',
          peering: false,
          announce: false,
          banner: '/data/banner.txt',
          bitcoind_timeout: advanced?.['bitcoind-timeout'] ?? 30,
          bitcoind_clients: advanced?.['bitcoind-clients'] ?? 3,
          worker_threads: advanced?.['worker-threads'] ?? 0,
          db_mem: advanced?.['db-mem'] ?? 2048,
          db_max_open_files: advanced?.['db-max-open-files'] ?? 1000,
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
