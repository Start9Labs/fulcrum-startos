import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:12',
  releaseNotes: {
    en_US: `Requires an up-to-date Bitcoin.

Fulcrum needs pruning disabled on Bitcoin, and asks for that through a setting older Bitcoin releases do not have. The version Fulcrum required did not rule those out, so on an out-of-date Bitcoin the Auto-Configure task opened a form that could not be submitted, and came back no matter what you did. Fulcrum now requires the current revision of whichever Bitcoin version line you are on, so an out-of-date Bitcoin is reported as needing an update instead.`,
    es_ES: `Exige un Bitcoin actualizado.

Fulcrum necesita que la poda esté desactivada en Bitcoin, y lo solicita mediante un ajuste que las versiones antiguas de Bitcoin no tienen. La versión que Fulcrum exigía no las descartaba, así que en un Bitcoin desactualizado la tarea Auto-Configurar abría un formulario que no se podía enviar y volvía a aparecer hiciera lo que hiciera. Ahora Fulcrum exige la revisión actual de la línea de versiones de Bitcoin que uses, de modo que un Bitcoin desactualizado se señala como pendiente de actualizar.`,
    de_DE: `Setzt ein aktuelles Bitcoin voraus.

Fulcrum benötigt Bitcoin ohne Pruning und fordert das über eine Einstellung an, die ältere Bitcoin-Ausgaben nicht haben. Die von Fulcrum geforderte Version schloss diese nicht aus, sodass auf einem veralteten Bitcoin die Aufgabe „Auto-Konfiguration“ ein Formular öffnete, das sich nicht absenden ließ, und immer wieder zurückkam. Fulcrum verlangt jetzt die aktuelle Revision der von dir genutzten Bitcoin-Versionsreihe, sodass ein veraltetes Bitcoin stattdessen als aktualisierungsbedürftig gemeldet wird.`,
    pl_PL: `Wymaga aktualnego Bitcoina.

Fulcrum wymaga wyłączonego przycinania w Bitcoinie i prosi o to poprzez ustawienie, którego starsze wydania Bitcoina nie mają. Wersja wymagana przez Fulcrum ich nie wykluczała, więc na nieaktualnym Bitcoinie zadanie Auto-Konfiguracja otwierało formularz, którego nie dało się wysłać, i wracało niezależnie od podjętych działań. Fulcrum wymaga teraz bieżącej rewizji tej linii wydań Bitcoina, z której korzystasz, więc nieaktualny Bitcoin jest zgłaszany jako wymagający aktualizacji.`,
    fr_FR: `Exige un Bitcoin à jour.

Fulcrum a besoin que l'élagage soit désactivé sur Bitcoin, et le demande via un réglage que les anciennes versions de Bitcoin n'ont pas. La version exigée par Fulcrum ne les excluait pas : sur un Bitcoin obsolète, la tâche Auto-Configuration ouvrait un formulaire impossible à envoyer et revenait quoi que vous fassiez. Fulcrum exige désormais la révision actuelle de la ligne de versions de Bitcoin que vous utilisez, de sorte qu'un Bitcoin obsolète est signalé comme devant être mis à jour.`,
  },
  migrations: {},
})
