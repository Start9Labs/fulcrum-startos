import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.3:0',
  releaseNotes: {
    en_US:
      'Updated Fulcrum to 2.1.3. Fixes an off-by-one error in the Merkle cache and updates the bundled jemalloc library. Full release notes: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3',
    es_ES:
      'Fulcrum actualizado a 2.1.3. Corrige un error de desfase de una unidad en la caché de Merkle y actualiza la biblioteca jemalloc incluida. Notas completas de la versión: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3',
    de_DE:
      'Fulcrum auf 2.1.3 aktualisiert. Behebt einen Fehler durch eine Verschiebung um eins im Merkle-Cache und aktualisiert die mitgelieferte jemalloc-Bibliothek. Vollständige Versionshinweise: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3',
    pl_PL:
      'Zaktualizowano Fulcrum do 2.1.3. Naprawiono błąd przesunięcia o jeden w pamięci podręcznej Merkle i zaktualizowano dołączoną bibliotekę jemalloc. Pełne informacje o wydaniu: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3',
    fr_FR:
      "Fulcrum mis à jour vers la version 2.1.3. Corrige une erreur de décalage d'une unité dans le cache Merkle et met à jour la bibliothèque jemalloc intégrée. Notes de version complètes : https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3",
  },
  migrations: {},
})
