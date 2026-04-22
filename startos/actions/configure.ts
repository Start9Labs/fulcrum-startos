import { utils } from '@start9labs/start-sdk'
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
      'Number of concurrent RPC client connections to Bitcoin Core.',
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
      'Upper bound on memory used by the RocksDB cache. Increase for faster queries at the cost of RAM.',
    ),
    required: false,
    default: null,
    integer: true,
    min: 50,
    footnote: `${i18n('Default')}: 2048 MiB`,
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
  async ({ effects }) => ({
    banner: (await bannerTxt.read().once()) || undefined,
    ...(await fulcrumConf.read().once()),
  }),
  async ({ effects, input }) => {
    const { banner, ...conf } = input
    if (banner) await bannerTxt.write(effects, banner)
    await fulcrumConf.merge(effects, utils.nullToUndefined(conf))
  },
)
