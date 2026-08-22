import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.2:0',
  releaseNotes: {
    en_US: `Updated Fulcrum to 2.1.2.

A maintenance release in the 2.x series, with no new features and nothing to reconfigure. It is mostly internal tidying: small fixes in mempool and block processing, typo corrections, and the replacement of the unmaintained \`robin_hood\` hash map with its successor, \`ankerl\`, from the same author. Your index is unaffected and no resynchronization is needed.

Also fixed: a non-numeric value hand-edited into one of the numeric settings in \`fulcrum.conf\` is now ignored in favor of that setting's default. It used to be written back into the file as \`NaN\`, which Fulcrum refuses to start on for most of those settings, and accepts for Database Memory (MB) as a cache with no effective limit.

Full upstream release notes: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    es_ES: `Fulcrum actualizado a 2.1.2.

Una versión de mantenimiento de la serie 2.x, sin funciones nuevas ni nada que reconfigurar. Se trata sobre todo de limpieza interna: pequeñas correcciones en el procesamiento de la mempool y de los bloques, arreglos de erratas y la sustitución del mapa hash \`robin_hood\`, ya sin mantenimiento, por su sucesor \`ankerl\`, del mismo autor. Tu índice no se ve afectado y no hace falta volver a sincronizar.

También corregido: un valor no numérico editado a mano en uno de los ajustes numéricos de \`fulcrum.conf\` ahora se ignora en favor del valor por defecto de ese ajuste. Antes se volvía a escribir en el archivo como \`NaN\`, con lo que Fulcrum no arranca en la mayoría de esos ajustes y, en Memoria de base de datos (MB), lo acepta como una caché sin límite efectivo.

Notas de la versión completas: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    de_DE: `Fulcrum auf 2.1.2 aktualisiert.

Eine Wartungsversion der 2.x-Reihe, ohne neue Funktionen und ohne Anpassungsbedarf. Es geht überwiegend um internes Aufräumen: kleine Korrekturen bei der Verarbeitung von Mempool und Blöcken, Tippfehlerkorrekturen und der Ersatz der nicht mehr gepflegten Hash-Map \`robin_hood\` durch ihren Nachfolger \`ankerl\` desselben Autors. Ihr Index bleibt unverändert, eine erneute Synchronisierung ist nicht nötig.

Ebenfalls behoben: Ein von Hand in eine der numerischen Einstellungen der \`fulcrum.conf\` eingetragener nicht-numerischer Wert wird jetzt zugunsten des Standardwerts dieser Einstellung ignoriert. Zuvor wurde er als \`NaN\` in die Datei zurückgeschrieben — bei den meisten dieser Einstellungen startet Fulcrum damit gar nicht, und bei Datenbankspeicher (MB) wird er als Cache ohne wirksame Obergrenze übernommen.

Vollständige Versionshinweise: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    pl_PL: `Zaktualizowano Fulcrum do 2.1.2.

Wydanie konserwacyjne serii 2.x, bez nowych funkcji i bez potrzeby zmiany ustawień. To głównie porządki wewnętrzne: drobne poprawki w obsłudze mempoola i przetwarzaniu bloków, poprawione literówki oraz zastąpienie nierozwijanej już mapy haszującej \`robin_hood\` jej następczynią \`ankerl\` tego samego autora. Indeks pozostaje nienaruszony i nie trzeba go synchronizować od nowa.

Poprawiono również: nieliczbowa wartość wpisana ręcznie w jedno z liczbowych ustawień pliku \`fulcrum.conf\` jest teraz pomijana na rzecz wartości domyślnej tego ustawienia. Wcześniej wracała do pliku jako \`NaN\`, przez co przy większości tych ustawień Fulcrum w ogóle się nie uruchamiał, a przy Pamięci bazy danych (MB) przyjmował ją jako pamięć podręczną bez faktycznego limitu.

Pełne informacje o wydaniu: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
    fr_FR: `Fulcrum mis à jour vers 2.1.2.

Une version de maintenance de la série 2.x, sans nouvelle fonctionnalité ni rien à reconfigurer. Il s'agit surtout de nettoyage interne : petites corrections dans le traitement du mempool et des blocs, corrections de fautes de frappe, et remplacement de la table de hachage \`robin_hood\`, qui n'est plus maintenue, par sa remplaçante \`ankerl\` du même auteur. Votre index n'est pas affecté et aucune resynchronisation n'est nécessaire.

Également corrigé : une valeur non numérique saisie à la main dans l'un des réglages numériques de \`fulcrum.conf\` est désormais ignorée au profit de la valeur par défaut de ce réglage. Elle était auparavant réécrite dans le fichier sous la forme \`NaN\`, ce qui empêche Fulcrum de démarrer pour la plupart de ces réglages et, pour Mémoire de la base de données (Mo), est accepté comme un cache sans limite effective.

Notes de version complètes : https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2`,
  },
  migrations: {},
})
