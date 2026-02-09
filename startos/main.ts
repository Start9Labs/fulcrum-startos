import { sdk } from './sdk'
import { i18n } from './i18n'
import { electrumPort } from './utils'
import { manifest as bitcoinManifest } from 'bitcoind-startos/startos/manifest'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Fulcrum'))

  // var to keep track of sync progress
  let lastSyncLog: string | null = null

  return sdk.Daemons.of(effects)
    .addDaemon('primary', {
      subcontainer: await sdk.SubContainer.of(
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
})
