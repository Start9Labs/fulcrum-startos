import { sdk } from '../sdk'
import { conf, confDefaults } from '../file-models/fulcrum.conf'
import { defaultBanner, DB_PATH_ACTIVE } from '../utils'
import { getDependencyId, NETWORKS, DEPENDENCYID } from '../networks'
import { bannerFile } from '../file-models/banner.txt'
import { existsSync, renameSync } from 'fs'

const { InputSpec, Value } = sdk

const availableNetworks = Object.fromEntries(
  Object.entries(NETWORKS).map(([key, config]) => [key, config.title]),
) as Record<DEPENDENCYID, string>

const inputSpec = InputSpec.of({
  network: Value.select({
    name: 'Network',
    description: 'Select the Bitcoin network Fulcrum will operate on.',
    default: 'bitcoind',
    values: availableNetworks,
  }),
  banner: Value.textarea({
    name: 'Server Banner',
    description:
      'Custom banner text displayed to connecting Electrum clients. Leave empty to use the Fulcrum default banner.',
    required: false,
    default: defaultBanner,
    placeholder:
      'ASCII art welcome! Variables like $SERVER_VERSION are supported.',
    maxLength: 2000,
  }),
  advanced: Value.object(
    {
      name: 'Advanced Settings',
      description: 'Performance and resource usage settings for Fulcrum.',
    },
    InputSpec.of({
      bitcoindTimeout: Value.number({
        name: 'Bitcoin RPC Timeout (seconds)',
        description:
          'Controls how long Fulcrum waits for responses from Bitcoin RPC before failing a request.',
        required: true,
        integer: true,
        default: confDefaults.bitcoind_timeout,
        min: 30,
      }),
      bitcoindClients: Value.number({
        name: 'Bitcoin RPC Clients',
        description:
          'Number of concurrent RPC client connections to Bitcoin Core.',
        required: true,
        integer: true,
        default: confDefaults.bitcoind_clients,
        min: 1,
      }),
      workerThreads: Value.number({
        name: 'Worker Threads (0 for auto)',
        description:
          'Set the number of Fulcrum worker threads. Use 0 to allow Fulcrum to choose automatically.',
        required: true,
        integer: true,
        default: confDefaults.worker_threads,
        min: 0,
      }),
      dbMem: Value.number({
        name: 'Database Memory (MB)',
        description:
          'Upper bound on memory used by the RocksDB cache. Increase for faster queries at the cost of RAM.',
        required: true,
        integer: true,
        default: confDefaults.db_mem,
        min: 50,
      }),
      dbMaxOpenFiles: Value.number({
        name: 'Database Max Open Files',
        description:
          'Raise this if Fulcrum logs complaints about too many open files.',
        required: true,
        integer: true,
        default: confDefaults.db_max_open_files,
        min: 20,
      }),
    }),
  ),
})

export const configure = sdk.Action.withInput(
  'configure',
  async () => ({
    name: 'Configure',
    description: 'Configure Fulcrum network, banner and performance settings.',
    warning: null,
    allowedStatuses: 'any',
    group: 'Configuration',
    visibility: 'enabled',
  }),
  inputSpec,
  async ({ effects }) => {
    const settings = (await conf.read().once()) ?? confDefaults
    console.log('Current settings:', settings)
    const banner = (await bannerFile.read().once()) ?? defaultBanner

    return {
      network: getDependencyId(settings.bitcoind) || 'bitcoind',
      banner: banner,
      advanced: {
        bitcoindTimeout: settings.bitcoind_timeout,
        bitcoindClients: settings.bitcoind_clients,
        workerThreads: settings.worker_threads,
        dbMem: settings.db_mem,
        dbMaxOpenFiles: settings.db_max_open_files,
      },
    }
  },
  async ({ effects, input }) => {
    await bannerFile.write(effects, input.banner || defaultBanner)
    var currentNetwork = await conf.read((e) => e.bitcoind).once()
    var selectedNetwork = NETWORKS[input.network].rpcAddress

    if (currentNetwork !== selectedNetwork) {
      console.log(`Network changed: ${currentNetwork} -> ${selectedNetwork}`)

      const currentDependencyId = getDependencyId(currentNetwork)
      const selectedDependencyId = input.network

      // Move database directories when network changes
      // Save current database to its network-specific directory
      if (currentDependencyId && existsSync(DB_PATH_ACTIVE)) {
        renameSync(DB_PATH_ACTIVE, NETWORKS[currentDependencyId].dbPath)
      }

      // Load the selected network's database (if it exists)
      const selectedDbPath = NETWORKS[selectedDependencyId].dbPath
      if (existsSync(selectedDbPath)) {
        renameSync(selectedDbPath, DB_PATH_ACTIVE)
      }
    }
    await conf.merge(effects, {
      bitcoind: NETWORKS[input.network].rpcAddress,
      bitcoind_timeout: input.advanced.bitcoindTimeout,
      bitcoind_clients: input.advanced.bitcoindClients,
      worker_threads: input.advanced.workerThreads,
      db_mem: input.advanced.dbMem,
      db_max_open_files: input.advanced.dbMaxOpenFiles,
    })
  },
)
