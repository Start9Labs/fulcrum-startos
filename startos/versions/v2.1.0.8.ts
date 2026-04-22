import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_0_8 = VersionInfo.of({
  version: '2.1.0:8',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 1.2.0)',
    es_ES: 'Actualizaciones internas (start-sdk 1.2.0)',
    de_DE: 'Interne Aktualisierungen (start-sdk 1.2.0)',
    pl_PL: 'Aktualizacje wewnętrzne (start-sdk 1.2.0)',
    fr_FR: 'Mises à jour internes (start-sdk 1.2.0)',
  },
  migrations: {
    up: async ({ effects }) => {
      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(console.error)
    },
    down: IMPOSSIBLE,
  },
})
