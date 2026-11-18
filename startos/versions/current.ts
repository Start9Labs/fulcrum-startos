import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.4:4',
  releaseNotes: {
    en_US: `- After a restore from backup, Fulcrum rebuilds its index with the full memory setting and sends the Sync Complete notification when the rebuild finishes.
- Wallets connecting over Tor and other services on this server are not limited to 12 connections between them.`,
    es_ES: `- Tras restaurar desde una copia de seguridad, Fulcrum reconstruye su índice con la configuración de memoria completa y envía la notificación «Sincronización completa» al terminar.
- Las billeteras que se conectan por Tor y los demás servicios de este servidor no están limitados a 12 conexiones entre todos.`,
    de_DE: `- Nach einer Wiederherstellung aus einer Sicherung baut Fulcrum seinen Index mit der vollen Speichereinstellung neu auf und sendet nach Abschluss die Benachrichtigung „Synchronisierung abgeschlossen“.
- Wallets, die sich über Tor verbinden, und andere Dienste auf diesem Server sind nicht auf insgesamt 12 Verbindungen begrenzt.`,
    pl_PL: `- Po przywróceniu z kopii zapasowej Fulcrum odbudowuje swój indeks z pełnym ustawieniem pamięci i po zakończeniu wysyła powiadomienie „Synchronizacja zakończona”.
- Portfele łączące się przez Tor oraz inne usługi na tym serwerze nie są ograniczone do łącznie 12 połączeń.`,
    fr_FR: `- Après une restauration depuis une sauvegarde, Fulcrum reconstruit son index avec le réglage de mémoire complet et envoie la notification « Synchronisation terminée » une fois la reconstruction achevée.
- Les portefeuilles qui se connectent via Tor et les autres services de ce serveur ne sont pas limités à 12 connexions au total.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
