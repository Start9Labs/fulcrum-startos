import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:15',
  releaseNotes: {
    en_US: `Configure gains a Max Address History setting.

Fulcrum limits how many transactions it will report for any single address. Past that limit it answers with an empty or partial history, balance and coin list — and answers as though nothing were wrong, so a wallet holding a very busy address shows the funds as missing even though they are still on the chain and still yours. Until now there was no way to raise the limit from StartOS. The limit exists to bound what one request can cost in memory and time, so raise it only if you actually use an address with a long history.`,
    es_ES: `Configurar incorpora el ajuste Historial máximo por dirección.

Fulcrum limita cuántas transacciones informará para una sola dirección. Superado ese límite, responde con un historial, un saldo y una lista de monedas vacíos o parciales, y lo hace como si no ocurriera nada, de modo que una cartera con una dirección muy activa muestra los fondos como si hubieran desaparecido, aunque siguen en la cadena y siguen siendo suyos. Hasta ahora no había forma de aumentar el límite desde StartOS. El límite existe para acotar lo que puede costar una sola solicitud en memoria y tiempo, así que auméntelo solo si realmente usa una dirección con un historial largo.`,
    de_DE: `Konfigurieren erhält die Einstellung Maximaler Adressverlauf.

Fulcrum begrenzt, wie viele Transaktionen es für eine einzelne Adresse meldet. Oberhalb dieser Grenze antwortet es mit einem leeren oder unvollständigen Verlauf, Kontostand und Münzbestand — und zwar so, als wäre alles in Ordnung, sodass eine Wallet mit einer sehr aktiven Adresse das Guthaben als fehlend anzeigt, obwohl es weiterhin in der Blockchain liegt und Ihnen gehört. Bisher ließ sich die Grenze aus StartOS heraus nicht anheben. Sie begrenzt, was eine einzelne Anfrage an Speicher und Zeit kosten kann — erhöhen Sie sie also nur, wenn Sie tatsächlich eine Adresse mit langem Verlauf verwenden.`,
    pl_PL: `Konfiguruj zyskuje ustawienie Maksymalna historia adresu.

Fulcrum ogranicza liczbę transakcji zgłaszanych dla pojedynczego adresu. Po przekroczeniu tego limitu odpowiada pustą lub niepełną historią, saldem i listą monet — i robi to tak, jakby nic się nie stało, więc portfel z bardzo aktywnym adresem pokazuje środki jako brakujące, choć nadal są w łańcuchu i nadal należą do Ciebie. Do tej pory nie było sposobu, by podnieść ten limit z poziomu StartOS. Limit ogranicza pamięć i czas, jakie może kosztować pojedyncze żądanie, więc zwiększ go tylko wtedy, gdy faktycznie używasz adresu o długiej historii.`,
    fr_FR: `Configurer reçoit le réglage Historique maximal par adresse.

Fulcrum limite le nombre de transactions qu'il rapporte pour une seule adresse. Au-delà de cette limite, il répond par un historique, un solde et une liste de pièces vides ou partiels — et il répond comme si de rien n'était, si bien qu'un portefeuille contenant une adresse très active affiche les fonds comme disparus, alors qu'ils sont toujours sur la chaîne et toujours à vous. Jusqu'ici, il n'y avait aucun moyen de relever cette limite depuis StartOS. Elle borne ce qu'une seule requête peut coûter en mémoire et en temps : ne l'augmentez donc que si vous utilisez réellement une adresse à l'historique long.`,
  },
  migrations: {},
})
