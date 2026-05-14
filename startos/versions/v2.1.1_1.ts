import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_1_1 = VersionInfo.of({
  version: '2.1.1:1',
  releaseNotes: {
    en_US: `**Bumps**

- Fulcrum → 2.1.1
- start-sdk → 1.5.0`,
    es_ES: `**Cambios de versión**

- Fulcrum → 2.1.1
- start-sdk → 1.5.0`,
    de_DE: `**Versionssprünge**

- Fulcrum → 2.1.1
- start-sdk → 1.5.0`,
    pl_PL: `**Aktualizacje wersji**

- Fulcrum → 2.1.1
- start-sdk → 1.5.0`,
    fr_FR: `**Mises à niveau**

- Fulcrum → 2.1.1
- start-sdk → 1.5.0`,
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
