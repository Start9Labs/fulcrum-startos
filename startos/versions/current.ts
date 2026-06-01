import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '2.1.1:4',
  releaseNotes: {
    en_US:
      'Reconnects automatically when Bitcoin Core restarts and rotates its RPC cookie.',
    es_ES:
      'Se reconecta automáticamente cuando Bitcoin Core se reinicia y rota su cookie de RPC.',
    de_DE:
      'Stellt die Verbindung automatisch wieder her, wenn Bitcoin Core neu startet und sein RPC-Cookie wechselt.',
    pl_PL:
      'Automatycznie ponawia połączenie, gdy Bitcoin Core uruchamia się ponownie i zmienia swój plik cookie RPC.',
    fr_FR:
      'Se reconnecte automatiquement lorsque Bitcoin Core redémarre et renouvelle son cookie RPC.',
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
