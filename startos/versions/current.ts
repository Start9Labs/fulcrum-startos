import { VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import {
  defaultDbMem,
  fulcrumConf,
  syncedDbMem,
} from '../file-models/fulcrum.conf'
import { storeJson } from '../file-models/store.json'

export const current = VersionInfo.of({
  version: '2.1.1:13',
  releaseNotes: {
    en_US: `Sizes Fulcrum's database memory to your server.

Fulcrum's own default is a flat 2048 MiB, which assumes a machine dedicated to it — on StartOS it always shares memory with the Bitcoin node it depends on. Fulcrum now takes up to a quarter of installed RAM (never more than 2048 MiB) while it builds its address index, then drops to 512 MiB once the index is complete. A value you set yourself in Configure is never overwritten.

Saving the Configure action now also restarts Fulcrum, so performance settings take effect immediately instead of waiting for the next restart.

The wallet address now says \`ssl://\`, so it is clear your wallet needs SSL switched on. The Electrum endpoint has always been SSL — StartOS terminates TLS in front of Fulcrum — but the Interfaces page showed a bare \`host:port\` with nothing to indicate that, and a wallet configured from it failed with a generic error. Copy the port from that address rather than assuming one; StartOS assigns it, and it is not the same number on every server.`,
    es_ES: `Ajusta la memoria de base de datos de Fulcrum al tamaño de tu servidor.

El valor predeterminado de Fulcrum es fijo, 2048 MiB, y da por hecho una máquina dedicada a él; en StartOS siempre comparte memoria con el nodo Bitcoin del que depende. Fulcrum ahora toma hasta una cuarta parte de la RAM instalada (nunca más de 2048 MiB) mientras construye su índice de direcciones, y baja a 512 MiB cuando el índice está completo. Un valor que hayas establecido tú en Configurar nunca se sobrescribe.

Guardar la acción Configurar ahora también reinicia Fulcrum, de modo que los ajustes de rendimiento surten efecto de inmediato en lugar de esperar al siguiente reinicio.

La dirección para la cartera ahora indica \`ssl://\`, así queda claro que tu cartera necesita SSL activado. El punto de acceso Electrum siempre ha sido SSL —StartOS termina el TLS por delante de Fulcrum— pero la página de Interfaces mostraba un simple \`host:puerto\` sin nada que lo indicara, y una cartera configurada a partir de ahí fallaba con un error genérico. Copia el puerto de esa dirección en lugar de suponer uno: lo asigna StartOS y no es el mismo número en todos los servidores.`,
    de_DE: `Passt den Datenbankspeicher von Fulcrum an deinen Server an.

Fulcrums eigener Standardwert liegt fest bei 2048 MiB und setzt einen ihm allein gewidmeten Rechner voraus — auf StartOS teilt es sich den Speicher immer mit der Bitcoin-Node, von der es abhängt. Fulcrum nimmt jetzt bis zu einem Viertel des installierten Arbeitsspeichers (nie mehr als 2048 MiB), während es seinen Adressindex aufbaut, und senkt ihn auf 512 MiB, sobald der Index vollständig ist. Ein Wert, den du selbst unter Konfigurieren gesetzt hast, wird nie überschrieben.

Das Speichern der Aktion Konfigurieren startet Fulcrum jetzt außerdem neu, sodass Leistungseinstellungen sofort wirksam werden, statt bis zum nächsten Neustart zu warten.

Die Wallet-Adresse zeigt jetzt \`ssl://\`, damit klar ist, dass in der Wallet SSL aktiviert sein muss. Der Electrum-Endpunkt war immer SSL — StartOS terminiert das TLS vor Fulcrum —, aber die Schnittstellen-Seite zeigte nur ein nacktes \`Host:Port\` ohne jeden Hinweis darauf, und eine daraus konfigurierte Wallet scheiterte mit einem generischen Fehler. Übernimm den Port aus dieser Adresse, statt einen anzunehmen: StartOS vergibt ihn, und er ist nicht auf jedem Server dieselbe Nummer.`,
    pl_PL: `Dopasowuje pamięć bazy danych Fulcrum do twojego serwera.

Własna wartość domyślna Fulcrum to stałe 2048 MiB i zakłada maszynę przeznaczoną wyłącznie dla niego — w StartOS zawsze dzieli pamięć z węzłem Bitcoin, od którego zależy. Fulcrum zajmuje teraz do jednej czwartej zainstalowanej pamięci RAM (nigdy więcej niż 2048 MiB) podczas budowy indeksu adresów, a po jego ukończeniu schodzi do 512 MiB. Wartość ustawiona przez ciebie w Konfiguruj nigdy nie jest nadpisywana.

Zapisanie akcji Konfiguruj powoduje teraz również ponowne uruchomienie Fulcrum, dzięki czemu ustawienia wydajności działają od razu, zamiast czekać na następny restart.

Adres dla portfela pokazuje teraz \`ssl://\`, więc widać, że w portfelu trzeba włączyć SSL. Punkt końcowy Electrum zawsze działał po SSL — StartOS kończy TLS przed Fulcrum — ale strona Interfejsy pokazywała goły \`host:port\` bez żadnej o tym wzmianki, a portfel skonfigurowany na tej podstawie kończył się ogólnym błędem. Skopiuj port z tego adresu, zamiast go zakładać: przydziela go StartOS i nie jest to ten sam numer na każdym serwerze.`,
    fr_FR: `Adapte la mémoire de base de données de Fulcrum à votre serveur.

La valeur par défaut de Fulcrum est fixée à 2048 Mio et suppose une machine qui lui est dédiée ; sur StartOS, il partage toujours la mémoire avec le nœud Bitcoin dont il dépend. Fulcrum prend désormais jusqu'à un quart de la RAM installée (jamais plus de 2048 Mio) pendant la construction de son index d'adresses, puis descend à 512 Mio une fois l'index terminé. Une valeur que vous avez définie vous-même dans Configurer n'est jamais écrasée.

Enregistrer l'action Configurer redémarre désormais aussi Fulcrum, de sorte que les réglages de performance prennent effet immédiatement au lieu d'attendre le prochain redémarrage.

L'adresse destinée au portefeuille indique désormais \`ssl://\`, ce qui montre que votre portefeuille doit avoir SSL activé. Le point d'accès Electrum a toujours été en SSL — StartOS termine le TLS devant Fulcrum — mais la page Interfaces affichait un simple \`hôte:port\` sans rien pour le signaler, et un portefeuille configuré à partir de là échouait avec une erreur générique. Reprenez le port de cette adresse plutôt que d'en supposer un : c'est StartOS qui l'attribue, et ce n'est pas le même numéro sur tous les serveurs.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.action.clearTask(effects, 'bitcoind:other-config')

      if ((await fulcrumConf.read().once())?.db_mem === undefined) {
        await fulcrumConf.merge(effects, {
          db_mem: (await storeJson.read().once())?.syncNotified
            ? syncedDbMem()
            : defaultDbMem(),
        })
      }
    },
  },
})
