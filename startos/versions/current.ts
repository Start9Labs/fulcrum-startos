import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '2.1.1:5',
  releaseNotes: {
    en_US: 'Internal maintenance.',
    es_ES: 'Mantenimiento interno.',
    de_DE: 'Interne Wartung.',
    pl_PL: 'Konserwacja wewnętrzna.',
    fr_FR: 'Maintenance interne.',
  },
  migrations: {
    up: async ({ effects }) => {
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(console.error)
    },
    down: IMPOSSIBLE,
  },
})
