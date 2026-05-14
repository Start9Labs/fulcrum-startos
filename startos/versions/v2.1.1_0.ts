import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_1_0 = VersionInfo.of({
  version: '2.1.1:0',
  releaseNotes: {
    en_US: `**Bumps**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1`,
    es_ES: `**Actualizaciones**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1`,
    de_DE: `**Aktualisierungen**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1`,
    pl_PL: `**Aktualizacje**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1`,
    fr_FR: `**Mises à jour**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1`,
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
