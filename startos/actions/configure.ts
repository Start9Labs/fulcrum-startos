import { utils } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'
import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { defaultDbMem, fulcrumConf } from '../file-models/fulcrum.conf'
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
  bitcoind_timeout: Value.number({
    name: i18n('Bitcoin RPC Timeout (seconds)'),
    description: i18n(
      'Controls how long Fulcrum waits for responses from Bitcoin RPC before failing a request.',
    ),
    required: false,
    default: null,
    integer: true,
    min: 30,
    footnote: `${i18n('Default')}: 30 seconds`,
  }),
  bitcoind_clients: Value.number({
    name: i18n('Bitcoin RPC Clients'),
    description: i18n(
      'Number of concurrent RPC client connections to Bitcoin.',
    ),
    required: false,
    default: null,
    integer: true,
    min: 1,
    footnote: `${i18n('Default')}: 3`,
  }),
  worker_threads: Value.number({
    name: i18n('Worker Threads (0 for auto)'),
    description: i18n(
      'Set the number of Fulcrum worker threads. Use 0 to allow Fulcrum to choose automatically.',
    ),
    required: false,
    default: null,
    integer: true,
    min: 0,
    footnote: `${i18n('Default')}: 0 (auto)`,
  }),
  db_mem: Value.number({
    name: i18n('Database Memory (MB)'),
    description: i18n(
      'Upper bound on memory used by the RocksDB cache. Set at install for the index build and lowered automatically once the index is complete. Raise it for faster queries at the cost of RAM.',
    ),
    required: false,
    default: null,
    integer: true,
    min: 50,
    footnote: `${i18n('Default')}: ${defaultDbMem()} MiB`,
  }),
  db_max_open_files: Value.number({
    name: i18n('Database Max Open Files'),
    description: i18n(
      'Raise this if Fulcrum logs complaints about too many open files.',
    ),
    required: false,
    default: null,
    integer: true,
    min: 20,
    footnote: `${i18n('Default')}: 1000`,
  }),
})

export const configure = sdk.Action.withInput(
  'configure',
  async () => ({
    name: i18n('Configure'),
    description: i18n('Configure Fulcrum banner and performance settings.'),
    warning: null,
    allowedStatuses: 'any',
    group: i18n('Configuration'),
    visibility: 'enabled',
  }),
  inputSpec,
  // Only the keys this spec declares. Spreading the whole config prefilled the
  // banner field with `fulcrum.conf`'s own `banner` key — the path to
  // `banner.txt` rather than its contents — which any subsequent save then
  // wrote into `banner.txt` and served to connecting clients.
  async () => {
    const conf = await fulcrumConf.read().once()
    return {
      banner: (await bannerTxt.read().once()) || undefined,
      bitcoind_timeout: conf?.bitcoind_timeout,
      bitcoind_clients: conf?.bitcoind_clients,
      worker_threads: conf?.worker_threads,
      db_mem: conf?.db_mem,
      db_max_open_files: conf?.db_max_open_files,
    }
  },
  async ({ effects, input }) => {
    const { banner, ...conf } = input
    // Fulcrum re-reads banner.txt on every `server.banner` call and falls back
    // to its built-in banner when the file is absent, so an empty field means
    // removing the file — writing it empty would serve an empty banner.
    if (banner) {
      await bannerTxt.write(effects, banner)
    } else {
      await rm(bannerTxt.path, { force: true })
    }
    await fulcrumConf.merge(effects, utils.nullToUndefined(conf))
  },
)
