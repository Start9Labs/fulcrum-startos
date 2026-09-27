import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.2:2',
  releaseNotes: {
    en_US:
      'Sync Progress now displays complete, up-to-date progress messages during indexing, even when log lines arrive in pieces or together.',
    es_ES:
      'El progreso de sincronización ahora muestra mensajes completos y actualizados durante la indexación, incluso cuando las líneas del registro llegan fragmentadas o juntas.',
    de_DE:
      'Der Synchronisierungsfortschritt zeigt während der Indizierung nun vollständige, aktuelle Meldungen an, auch wenn Protokollzeilen stückweise oder zusammen eintreffen.',
    pl_PL:
      'Postęp synchronizacji wyświetla teraz pełne, aktualne komunikaty podczas indeksowania, nawet gdy wiersze dziennika docierają we fragmentach lub razem.',
    fr_FR:
      "La progression de la synchronisation affiche désormais des messages complets et à jour pendant l'indexation, même lorsque les lignes du journal arrivent par fragments ou ensemble.",
  },
  migrations: {},
})
