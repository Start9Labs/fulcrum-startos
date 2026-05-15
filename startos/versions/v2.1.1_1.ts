import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_1_1 = VersionInfo.of({
  version: '2.1.1:1',
  releaseNotes: {
    en_US: `**Bumps**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1

**Internal**

- Adopt the new \`addSsl.auth\` field on the Electrum SSL bind`,
    es_ES: `**Actualizaciones**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1

**Interno**

- Adopción del nuevo campo \`addSsl.auth\` en el enlace SSL de Electrum`,
    de_DE: `**Aktualisierungen**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1

**Intern**

- Übernahme des neuen Feldes \`addSsl.auth\` an der Electrum-SSL-Bindung`,
    pl_PL: `**Aktualizacje**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1

**Wewnętrzne**

- Dodanie nowego pola \`addSsl.auth\` w powiązaniu Electrum SSL`,
    fr_FR: `**Mises à jour**

- Fulcrum → 2.1.1
- start-sdk → 1.5.1

**Interne**

- Adoption du nouveau champ \`addSsl.auth\` sur la liaison SSL d'Electrum`,
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
