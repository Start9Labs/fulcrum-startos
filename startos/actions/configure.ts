import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { fulcrumConf } from '../file-models/fulcrum.conf'
import { bannerTxt } from '../file-models/banner.txt'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  banner: Value.textarea({
    name: i18n('Server Banner'),
    description: i18n(
      'Custom banner text displayed to connecting Electrum clients. Leave empty to use the Fulcrum default banner.',
    ),
    required: false,
    default: null,
    placeholder: i18n(
      'ASCII art welcome! Variables like $SERVER_VERSION are supported.',
    ),
    maxLength: 2000,
  }),
  bitcoindTimeout: Value.number({
    name: i18n('Bitcoin RPC Timeout (seconds)'),
    description: i18n(
      'Controls how long Fulcrum waits for responses from Bitcoin RPC before failing a request.',
    ),
    required: true,
    integer: true,
    default: 30,
    min: 30,
  }),
  bitcoindClients: Value.number({
    name: i18n('Bitcoin RPC Clients'),
    description: i18n(
      'Number of concurrent RPC client connections to Bitcoin Core.',
    ),
    required: true,
    integer: true,
    default: 3,
    min: 1,
  }),
  workerThreads: Value.number({
    name: i18n('Worker Threads (0 for auto)'),
    description: i18n(
      'Set the number of Fulcrum worker threads. Use 0 to allow Fulcrum to choose automatically.',
    ),
    required: true,
    integer: true,
    default: 0,
    min: 0,
  }),
  dbMem: Value.number({
    name: i18n('Database Memory (MB)'),
    description: i18n(
      'Upper bound on memory used by the RocksDB cache. Increase for faster queries at the cost of RAM.',
    ),
    required: true,
    integer: true,
    default: 2048,
    min: 50,
  }),
  dbMaxOpenFiles: Value.number({
    name: i18n('Database Max Open Files'),
    description: i18n(
      'Raise this if Fulcrum logs complaints about too many open files.',
    ),
    required: true,
    integer: true,
    default: 1000,
    min: 20,
  }),
})

export const configure = sdk.Action.withInput(
  'configure',
  async () => ({
    name: i18n('Configure'),
    description: i18n(
      'Configure Fulcrum banner and performance settings.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: i18n('Configuration'),
    visibility: 'enabled',
  }),
  inputSpec,
  async ({ effects }) => {
    return {
      banner: (await bannerTxt.read().once()) || undefined,
      settings: (await fulcrumConf.read().once()) || {},
    }
  },
  async ({ effects, input }) => {
    if (input.banner) {
      await bannerTxt.write(effects, input.banner)
    }

    await fulcrumConf.merge(effects, {
      bitcoind_timeout: input.bitcoindTimeout,
      bitcoind_clients: input.bitcoindClients,
      worker_threads: input.workerThreads,
      db_mem: input.dbMem,
      db_max_open_files: input.dbMaxOpenFiles,
    })
  },
)
