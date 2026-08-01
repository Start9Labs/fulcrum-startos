import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:11',
  releaseNotes: {
    en_US: `Fixes the server banner in the Configure action.

The banner field opened pre-filled with the text \`/data/banner.txt\` — the location of the banner file rather than what it contained. Saving the action then stored that path as the banner, and connecting wallets were shown it. The field now opens with the banner itself. If your banner reads \`/data/banner.txt\`, run Configure once and set it to what you want.`,
    es_ES: `Corrige el banner del servidor en la acción Configurar.

El campo del banner se abría con el texto \`/data/banner.txt\` — la ubicación del archivo del banner en lugar de su contenido. Al guardar la acción, esa ruta quedaba almacenada como banner y se mostraba a las carteras que se conectaban. Ahora el campo se abre con el banner en sí. Si su banner dice \`/data/banner.txt\`, ejecute Configurar una vez y establezca el texto que desee.`,
    de_DE: `Behebt das Server-Banner in der Aktion „Konfigurieren“.

Das Bannerfeld war mit dem Text \`/data/banner.txt\` vorbelegt — dem Speicherort der Bannerdatei statt ihrem Inhalt. Beim Speichern der Aktion wurde dieser Pfad als Banner abgelegt und verbindenden Wallets angezeigt. Das Feld öffnet sich jetzt mit dem Banner selbst. Wenn Ihr Banner \`/data/banner.txt\` lautet, führen Sie „Konfigurieren“ einmal aus und setzen Sie den gewünschten Text.`,
    pl_PL: `Naprawia baner serwera w akcji Konfiguruj.

Pole banera otwierało się wypełnione tekstem \`/data/banner.txt\` — lokalizacją pliku banera zamiast jego treści. Zapisanie akcji zapisywało tę ścieżkę jako baner i pokazywało ją łączącym się portfelom. Pole otwiera się teraz z samym banerem. Jeśli Twój baner brzmi \`/data/banner.txt\`, uruchom Konfiguruj raz i ustaw żądany tekst.`,
    fr_FR: `Corrige la bannière du serveur dans l'action Configurer.

Le champ de la bannière s'ouvrait pré-rempli avec le texte \`/data/banner.txt\` — l'emplacement du fichier de bannière plutôt que son contenu. Enregistrer l'action stockait alors ce chemin comme bannière, et il était affiché aux portefeuilles qui se connectaient. Le champ s'ouvre désormais avec la bannière elle-même. Si votre bannière indique \`/data/banner.txt\`, exécutez Configurer une fois et saisissez le texte voulu.`,
  },
  migrations: {},
})
