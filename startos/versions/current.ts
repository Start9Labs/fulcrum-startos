import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '2.1.1:6',
  releaseNotes: {
    en_US:
      'Internal updates (start-sdk 2.0.x). Fulcrum now reaches Bitcoin at a stable internal bridge address and no longer restarts when Bitcoin is installed, updated, or removed.',
    es_ES:
      'Actualizaciones internas (start-sdk 2.0.x). Fulcrum ahora accede a Bitcoin en una dirección interna estable del puente y ya no se reinicia cuando Bitcoin se instala, actualiza o elimina.',
    de_DE:
      'Interne Aktualisierungen (start-sdk 2.0.x). Fulcrum erreicht Bitcoin jetzt unter einer stabilen internen Bridge-Adresse und startet nicht mehr neu, wenn Bitcoin installiert, aktualisiert oder entfernt wird.',
    pl_PL:
      'Aktualizacje wewnętrzne (start-sdk 2.0.x). Fulcrum łączy się teraz z Bitcoin pod stałym wewnętrznym adresem mostka i nie uruchamia się ponownie, gdy Bitcoin jest instalowany, aktualizowany lub usuwany.',
    fr_FR:
      'Mises à jour internes (start-sdk 2.0.x). Fulcrum atteint désormais Bitcoin à une adresse interne stable du pont réseau et ne redémarre plus lorsque Bitcoin est installé, mis à jour ou supprimé.',
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
