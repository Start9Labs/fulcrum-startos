import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_1_2 = VersionInfo.of({
  version: '2.1.1:2',
  releaseNotes: {
    en_US: 'Bumps start-sdk → 1.5.2.',
    es_ES: 'Actualiza start-sdk → 1.5.2.',
    de_DE: 'Aktualisiert start-sdk → 1.5.2.',
    pl_PL: 'Aktualizuje start-sdk → 1.5.2.',
    fr_FR: 'Met à niveau start-sdk → 1.5.2.',
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
