import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:14',
  releaseNotes: {
    en_US: `Clearing the Server Banner now works. Emptying the field in Configure left the previous banner in place, so a custom banner could be replaced but never removed. Clearing it now removes it and Fulcrum goes back to its own default banner. Unlike the other Configure settings, this takes effect without a restart, because Fulcrum re-reads the banner each time a wallet asks for it.`,
    es_ES: `Vaciar el Banner del servidor ahora funciona. Al vaciar el campo en Configurar, el banner anterior se mantenía, de modo que un banner personalizado se podía sustituir pero nunca eliminar. Ahora, al vaciarlo se elimina y Fulcrum vuelve a su banner predeterminado. A diferencia del resto de ajustes de Configurar, esto surte efecto sin reiniciar, porque Fulcrum vuelve a leer el banner cada vez que una cartera lo solicita.`,
    de_DE: `Das Leeren des Server-Banners funktioniert jetzt. Wurde das Feld unter Konfigurieren geleert, blieb das vorherige Banner bestehen — ein eigenes Banner ließ sich also ersetzen, aber nie entfernen. Jetzt wird es beim Leeren entfernt und Fulcrum kehrt zu seinem eigenen Standard-Banner zurück. Anders als die übrigen Konfigurieren-Einstellungen wirkt das ohne Neustart, weil Fulcrum das Banner bei jeder Anfrage einer Wallet neu liest.`,
    pl_PL: `Czyszczenie Banera serwera teraz działa. Opróżnienie pola w Konfiguruj pozostawiało poprzedni baner, więc własny baner można było zastąpić, ale nigdy usunąć. Teraz opróżnienie pola usuwa baner, a Fulcrum wraca do swojego domyślnego banera. W odróżnieniu od pozostałych ustawień Konfiguruj działa to bez restartu, ponieważ Fulcrum odczytuje baner ponownie przy każdym zapytaniu portfela.`,
    fr_FR: `Effacer la Bannière du serveur fonctionne désormais. Vider le champ dans Configurer laissait la bannière précédente en place : une bannière personnalisée pouvait être remplacée, mais jamais supprimée. La vider la supprime désormais et Fulcrum revient à sa propre bannière par défaut. Contrairement aux autres réglages de Configurer, cela prend effet sans redémarrage, car Fulcrum relit la bannière à chaque demande d'un portefeuille.`,
  },
  migrations: {},
})
