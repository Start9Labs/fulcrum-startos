import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.4:4',
  releaseNotes: {
    en_US:
      'After a restore from backup, Fulcrum rebuilds its index with the full memory setting and sends the Sync Complete notification when the rebuild finishes.',
    es_ES:
      'Tras restaurar desde una copia de seguridad, Fulcrum reconstruye su índice con la configuración de memoria completa y envía la notificación «Sincronización completa» al terminar.',
    de_DE:
      'Nach einer Wiederherstellung aus einer Sicherung baut Fulcrum seinen Index mit der vollen Speichereinstellung neu auf und sendet nach Abschluss die Benachrichtigung „Synchronisierung abgeschlossen“.',
    pl_PL:
      'Po przywróceniu z kopii zapasowej Fulcrum odbudowuje swój indeks z pełnym ustawieniem pamięci i po zakończeniu wysyła powiadomienie „Synchronizacja zakończona”.',
    fr_FR:
      'Après une restauration depuis une sauvegarde, Fulcrum reconstruit son index avec le réglage de mémoire complet et envoie la notification « Synchronisation terminée » une fois la reconstruction achevée.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
