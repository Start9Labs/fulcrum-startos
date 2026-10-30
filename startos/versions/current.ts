import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.4:0',
  releaseNotes: {
    en_US:
      'Updated Fulcrum to 2.1.4. Speeds up uncached transaction-history lookups used by subscriptions and history requests by up to 5–10×. Full release notes: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4',
    es_ES:
      'Fulcrum actualizado a 2.1.4. Acelera hasta 5–10 veces las consultas del historial de transacciones sin caché usadas por las suscripciones y las solicitudes de historial. Notas completas de la versión: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4',
    de_DE:
      'Fulcrum auf 2.1.4 aktualisiert. Beschleunigt nicht zwischengespeicherte Transaktionsverlaufsabfragen für Abonnements und Verlaufsanfragen um bis zu 5–10×. Vollständige Versionshinweise: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4',
    pl_PL:
      'Zaktualizowano Fulcrum do 2.1.4. Przyspiesza nawet 5–10 razy zapytania o historię transakcji spoza pamięci podręcznej, używane przez subskrypcje i żądania historii. Pełne informacje o wydaniu: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4',
    fr_FR:
      'Fulcrum mis à jour vers la version 2.1.4. Accélère les recherches non mises en cache dans l’historique des transactions utilisées par les abonnements et les requêtes d’historique, jusqu’à un facteur de 5 à 10. Notes de version complètes : https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
