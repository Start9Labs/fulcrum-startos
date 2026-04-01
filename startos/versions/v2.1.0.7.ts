import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_0_7 = VersionInfo.of({
  version: '2.1.0:7',
  releaseNotes: {
    en_US: 'Fix migration bug where config file was not created on update',
    es_ES:
      'Corrección de error de migración donde el archivo de configuración no se creaba al actualizar',
    de_DE:
      'Migrationsfehler behoben, bei dem die Konfigurationsdatei beim Update nicht erstellt wurde',
    pl_PL:
      'Naprawiono błąd migracji, w którym plik konfiguracyjny nie był tworzony podczas aktualizacji',
    fr_FR:
      "Correction du bug de migration où le fichier de configuration n'était pas créé lors de la mise à jour",
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
