import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.2:0',
  releaseNotes: {
    en_US: `Updated Fulcrum to 2.1.2.

A maintenance release in the 2.x series, with no new features and nothing to reconfigure. It is mostly internal tidying: small fixes in mempool and block processing, typo corrections, and the replacement of the unmaintained \`robin_hood\` hash map with its successor, \`ankerl\`, from the same author. Your index is unaffected and no resynchronization is needed.

Full upstream release notes: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    es_ES: `Fulcrum actualizado a 2.1.2.

Una versión de mantenimiento de la serie 2.x, sin funciones nuevas ni nada que reconfigurar. Se trata sobre todo de limpieza interna: pequeñas correcciones en el procesamiento de la mempool y de los bloques, arreglos de erratas y la sustitución del mapa hash \`robin_hood\`, ya sin mantenimiento, por su sucesor \`ankerl\`, del mismo autor. Tu índice no se ve afectado y no hace falta volver a sincronizar.

Notas de la versión completas: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    de_DE: `Fulcrum auf 2.1.2 aktualisiert.

Eine Wartungsversion der 2.x-Reihe, ohne neue Funktionen und ohne Anpassungsbedarf. Es geht überwiegend um internes Aufräumen: kleine Korrekturen bei der Verarbeitung von Mempool und Blöcken, Tippfehlerkorrekturen und der Ersatz der nicht mehr gepflegten Hash-Map \`robin_hood\` durch ihren Nachfolger \`ankerl\` desselben Autors. Ihr Index bleibt unverändert, eine erneute Synchronisierung ist nicht nötig.

Vollständige Versionshinweise: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    pl_PL: `Zaktualizowano Fulcrum do 2.1.2.

Wydanie konserwacyjne serii 2.x, bez nowych funkcji i bez potrzeby zmiany ustawień. To głównie porządki wewnętrzne: drobne poprawki w obsłudze mempoola i przetwarzaniu bloków, poprawione literówki oraz zastąpienie nierozwijanej już mapy haszującej \`robin_hood\` jej następczynią \`ankerl\` tego samego autora. Indeks pozostaje nienaruszony i nie trzeba go synchronizować od nowa.

Pełne informacje o wydaniu: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    fr_FR: `Fulcrum mis à jour vers 2.1.2.

Une version de maintenance de la série 2.x, sans nouvelle fonctionnalité ni rien à reconfigurer. Il s'agit surtout de nettoyage interne : petites corrections dans le traitement du mempool et des blocs, corrections de fautes de frappe, et remplacement de la table de hachage \`robin_hood\`, qui n'est plus maintenue, par sa remplaçante \`ankerl\` du même auteur. Votre index n'est pas affecté et aucune resynchronisation n'est nécessaire.

Notes de version complètes : https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
  },
  migrations: {},
})
