import { sdk } from './sdk'
import { i18n } from './i18n'
import { electrumPort, bridgeAddress } from './utils'
import { manifest as bitcoinManifest } from 'bitcoin-core-startos/startos/manifest'
import { rpcHostId, rpcPort } from 'bitcoin-core-startos/startos/utils'
import { storeJson } from './file-models/store.json'
import { fulcrumConf } from './file-models/fulcrum.conf'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Fulcrum'))

  const store = await storeJson.read().once()
  if (!store) throw new Error('No store')

  // bitcoind's RPC is reached over the LXC bridge, not the deprecated
  // `bitcoind.startos` DNS name. The mapped bridge address only changes when
  // the address itself does, so this .const() restarts Fulcrum exactly on
  // bitcoind install/uninstall/port-change and never on bitcoind updates.
  // While bitcoind is absent the address resolves null; we pin a loopback
  // placeholder and the .const() heals (one restart) when bitcoind appears.
  const bitcoindRpc = await bridgeAddress(effects, {
    packageId: 'bitcoind',
    hostId: rpcHostId,
    internalPort: rpcPort,
  }).const()
  await fulcrumConf.merge(effects, {
    bitcoind: bitcoindRpc ?? `127.0.0.1:${rpcPort}`,
  })

  // var to keep track of sync progress
  let lastSyncLog: string | null = null

  return sdk.Daemons.of(effects)
    .addDaemon('primary', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'main' },
        sdk.Mounts.of()
          .mountVolume({
            volumeId: 'main',
            subpath: null,
            mountpoint: '/data',
            readonly: false,
          })
          .mountDependency<typeof bitcoinManifest>({
            dependencyId: 'bitcoind',
            volumeId: 'main',
            subpath: null,
            mountpoint: '/mnt/bitcoind',
            readonly: true,
          }),
        'primary-sub',
      ),
      exec: {
        command: ['Fulcrum', '--ts-format', 'none', '/data/fulcrum.conf'],
        // capture stdout and keep track of sync progress logs
        onStdout: (chunk) => {
          const text = Buffer.isBuffer(chunk)
            ? chunk.toString('utf8')
            : String(chunk)

          console.log(text)

          const prefix = '<Controller>'
          if (text.startsWith(prefix)) {
            lastSyncLog = text.slice(prefix.length).trim()
          }
        },
      },
      ready: {
        display: i18n('Electrum (SSL)'),
        fn: async () => {
          const result = await sdk.healthCheck.checkPortListening(
            effects,
            electrumPort,
            {
              successMessage: i18n('The Electrum interface is ready'),
              errorMessage: i18n('The Electrum interface is not ready'),
            },
          )

          if (result.result === 'success') return result

          if (lastSyncLog) {
            return {
              result: 'loading',
              message: i18n('Electrum interface not ready while syncing...'),
            }
          }

          return result
        },
      },
      requires: [],
    })
    .addHealthCheck('sync-progress', {
      ready: {
        display: i18n('Sync Progress'),
        fn: async () => {
          const fulcrumReady = await sdk.healthCheck.checkPortListening(
            effects,
            electrumPort,
            {
              successMessage: i18n('Fulcrum is synced'),
              errorMessage: '',
            },
          )

          if (fulcrumReady.result === 'success') return fulcrumReady

          if (!lastSyncLog) {
            return {
              message: i18n('Unknown status'),
              result: 'loading',
            }
          }

          return {
            message: lastSyncLog,
            result: 'loading',
          }
        },
      },
      requires: [],
    })
    .addOneshot('synced-true', {
      subcontainer: null,
      exec: {
        fn: async () => {
          if (!store.syncNotified) {
            await sdk.notification.create(effects, {
              level: 'success',
              title: i18n('Sync Complete'),
              message: i18n(
                'Fulcrum has finished building its address index. The Electrum server is ready.',
              ),
            })
            await storeJson.merge(effects, { syncNotified: true })
            // Keep the in-memory guard in sync so a sync-progress dip and
            // recovery within this run doesn't re-fire the notification.
            store.syncNotified = true
          }
          return null
        },
      },
      requires: ['sync-progress'],
    })
})
