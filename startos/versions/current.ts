import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '2.1.3:1',
  releaseNotes: {
    en_US: `Updated Fulcrum to 2.1.3. Fixes an off-by-one error in the Merkle cache and updates the bundled jemalloc library. Full release notes: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- In Configure, Bitcoin RPC Timeout, Bitcoin RPC Clients and Worker Threads explain when to change them.
- The unused "electrum" host left over from StartOS 0.3.5 is removed, along with any domain attached to it. Attach domains to Electrum (SSL) instead.`,
    es_ES: `Fulcrum actualizado a 2.1.3. Corrige un error de desfase de una unidad en la caché de Merkle y actualiza la biblioteca jemalloc incluida. Notas completas de la versión: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- En Configurar, Tiempo de espera de Bitcoin RPC, Clientes Bitcoin RPC e Hilos de trabajo explican cuándo conviene cambiarlos.
- Se elimina el host "electrum" sin uso que quedó de StartOS 0.3.5, junto con cualquier dominio asociado a él. Asocie los dominios a Electrum (SSL).`,
    de_DE: `Fulcrum auf 2.1.3 aktualisiert. Behebt einen Fehler durch eine Verschiebung um eins im Merkle-Cache und aktualisiert die mitgelieferte jemalloc-Bibliothek. Vollständige Versionshinweise: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Unter Konfigurieren erklären Bitcoin-RPC-Zeitlimit, Bitcoin-RPC-Clients und Worker-Threads, wann eine Änderung sinnvoll ist.
- Der ungenutzte, von StartOS 0.3.5 übrig gebliebene Host "electrum" wird entfernt, zusammen mit allen ihm zugewiesenen Domains. Weisen Sie Domains stattdessen Electrum (SSL) zu.`,
    pl_PL: `Zaktualizowano Fulcrum do 2.1.3. Naprawiono błąd przesunięcia o jeden w pamięci podręcznej Merkle i zaktualizowano dołączoną bibliotekę jemalloc. Pełne informacje o wydaniu: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- W Konfiguruj pola Limit czasu Bitcoin RPC, Klienci Bitcoin RPC i Wątki robocze wyjaśniają, kiedy warto je zmienić.
- Usunięto nieużywany host "electrum" pozostały po StartOS 0.3.5 wraz z przypisanymi do niego domenami. Przypisz domeny do Electrum (SSL).`,
    fr_FR: `Fulcrum mis à jour vers la version 2.1.3. Corrige une erreur de décalage d'une unité dans le cache Merkle et met à jour la bibliothèque jemalloc intégrée. Notes de version complètes : https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Dans Configurer, Délai d'attente Bitcoin RPC, Clients Bitcoin RPC et Threads de travail expliquent quand les modifier.
- L'hôte "electrum" inutilisé, hérité de StartOS 0.3.5, est supprimé avec tout domaine qui lui était associé. Associez plutôt les domaines à Electrum (SSL).`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'electrum').retire()
    },
    down: IMPOSSIBLE,
  },
})
