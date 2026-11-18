import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.4:5',
  releaseNotes: {
    en_US:
      "Update Bitcoin first: Fulcrum can now read only Bitcoin's RPC credential, not its data directory or wallets.",
    es_ES:
      'Actualiza Bitcoin primero: Fulcrum ahora solo puede leer la credencial RPC de Bitcoin, no su directorio de datos ni sus billeteras.',
    de_DE:
      'Aktualisiere zuerst Bitcoin: Fulcrum kann jetzt nur noch die RPC-Zugangsdaten von Bitcoin lesen, nicht sein Datenverzeichnis oder seine Wallets.',
    pl_PL:
      'Najpierw zaktualizuj Bitcoin: Fulcrum może teraz odczytać tylko poświadczenie RPC Bitcoina, a nie jego katalog danych ani portfele.',
    fr_FR:
      "Mettez d'abord Bitcoin à jour : Fulcrum ne peut désormais lire que l'identifiant RPC de Bitcoin, et non son répertoire de données ni ses portefeuilles.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
