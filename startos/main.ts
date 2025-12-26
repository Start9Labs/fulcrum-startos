import { sdk } from './sdk'
import { conf, confDefaults } from './file-models/fulcrum.conf'
import { electrumPort } from './utils'
import { getDependencyId, NETWORKS } from './networks'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info('Starting Fulcrum')

  const settings = (await conf.read().const(effects)) ?? confDefaults
  const dependencyId = getDependencyId(settings.bitcoind)

  let mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })

  // only mount if a dependency is set
  if (dependencyId) {
    mounts = mounts.mountDependency({
      dependencyId,
      volumeId: 'main',
      subpath: NETWORKS[dependencyId].mountSubpath,
      mountpoint: '/mnt/bitcoind',
      readonly: true,
    })
  }

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    mounts,
    'main',
  )

  // var to keep track of sync progress
  let lastSyncLog: string | null = null
  let isSyncing = false

  return sdk.Daemons.of(effects)
    .addDaemon('primary', {
      subcontainer: subcontainer,
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
        display: 'Electrum (SSL)',
        fn: async () => {
          const result = await sdk.healthCheck.checkPortListening(
            effects,
            electrumPort,
            {
              successMessage: 'The Electrum interface is ready',
              errorMessage: 'The Electrum interface is not ready',
            },
          )

          if (result.result === 'success') return result

          if (isSyncing) {
            return {
              result: 'loading',
              message: 'Electrum interface not ready while syncing...',
            }
          }

          return result
        },
      },
      requires: [],
    })
    .addHealthCheck('sync-progress', {
      ready: {
        display: 'Sync Progress',
        fn: async () => {
          const fulcrumReady = await sdk.healthCheck.checkPortListening(
            effects,
            electrumPort,
            {
              successMessage: 'Fulcrum is synced',
              errorMessage: '',
            },
          )

          if (fulcrumReady.result === 'success') {
            isSyncing = false
            return fulcrumReady
          }

          if (!lastSyncLog) {
            isSyncing = false
            return {
              message: 'Unknown status',
              result: 'loading',
            }
          }

          isSyncing = true
          return {
            message: lastSyncLog,
            result: 'loading',
          }
        },
      },
      requires: [],
    })
})
