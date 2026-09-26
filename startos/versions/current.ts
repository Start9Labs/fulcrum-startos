import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.2:1',
  releaseNotes: {
    en_US:
      'A new **Reindex** action rebuilds a corrupted address index without uninstalling Fulcrum.',
    es_ES:
      'Una nueva acción **Reindexar** reconstruye un índice de direcciones dañado sin desinstalar Fulcrum.',
    de_DE:
      'Eine neue Aktion **Neu indizieren** baut einen beschädigten Adressindex neu auf, ohne Fulcrum zu deinstallieren.',
    pl_PL:
      'Nowa akcja **Reindeksuj** odbudowuje uszkodzony indeks adresów bez odinstalowywania Fulcrum.',
    fr_FR:
      "Une nouvelle action **Réindexer** reconstruit un index d'adresses corrompu sans désinstaller Fulcrum.",
  },
  migrations: {},
})
