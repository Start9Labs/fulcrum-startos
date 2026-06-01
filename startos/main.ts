import { sdk } from './sdk'
import { FileHelper } from '@start9labs/start-sdk'
import { i18n } from './i18n'
import { electrumPort } from './utils'
import { manifest as bitcoinManifest } from 'bitcoin-core-startos/startos/manifest'
import { storeJson } from './file-models/store.json'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Fulcrum'))

  const store = await storeJson.read().once()
  if (!store) throw new Error('No store')

  // var to keep track of sync progress
  let lastSyncLog: string | null = null

  const primarySub = await sdk.SubContainer.of(
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
  )

  // Restart if Bitcoin .cookie changes (bitcoind regenerates it on every start,
  // so a cached RPC cookie would otherwise go stale after a bitcoind restart).
  await FileHelper.string(`${primarySub.rootfs}/mnt/bitcoind/.cookie`)
    .read()
    .const(effects)

  return sdk.Daemons.of(effects)
    .addDaemon('primary', {
      subcontainer: primarySub,
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
