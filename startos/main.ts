import { sdk } from './sdk'
import { conf, confDefaults } from './file-models/fulcrum.conf'
import { electrumPort } from './utils'
import { getDependencyId, NETWORKS } from './networks'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info('Starting Fulcrum')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  // read settings once (no const), because we may need to write to the settings file below
  const settings = (await conf.read().once()) ?? confDefaults
  const dependencyId = getDependencyId(settings.bitcoind)

  let mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })

  // only mount bitcoind if bitcoind or bitcoind-testnet is selected
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

  // set up a watch on the config file so that if it changes, the service restarts
  await conf.read().const(effects)

  // var to keep track of sync progress
  let lastSyncLog: string | null = null

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
          return await sdk.healthCheck.checkPortListening(
            effects,
            electrumPort,
            {
              successMessage: 'The Electrum interface is ready',
              errorMessage: 'The Electrum interface is not ready',
            },
          )
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
            return fulcrumReady
          }

          if (!lastSyncLog || lastSyncLog.length === 0) {
            return {
              message: 'Unknown status',
              result: 'failure',
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
