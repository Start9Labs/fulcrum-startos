import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.2:2',
  releaseNotes: {
    en_US:
      "**Sync Progress** reliably shows Fulcrum's current indexing progress.",
    es_ES:
      '**Progreso de sincronización** muestra de forma fiable el estado actual de la indexación de Fulcrum.',
    de_DE:
      '**Synchronisierungsfortschritt** zeigt zuverlässig den aktuellen Stand der Indizierung von Fulcrum.',
    pl_PL:
      '**Postęp synchronizacji** rzetelnie pokazuje aktualny stan indeksowania Fulcrum.',
    fr_FR:
      "**Progression de la synchronisation** indique de manière fiable l'état d'avancement actuel de l'indexation de Fulcrum.",
  },
  migrations: {},
})
