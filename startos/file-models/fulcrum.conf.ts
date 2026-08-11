import { FileHelper, z } from '@start9labs/start-sdk'
import { totalmem } from 'os'
import { sdk } from '../sdk'

export const defaultDbMem = () =>
  Math.min(Math.floor((totalmem() * 0.25) / (1024 * 1024)), 2048)

export const syncedDbMem = () => Math.min(512, defaultDbMem())

const iniNumber = z
  .union([z.string().transform(Number), z.number()])
  .optional()
  .catch(undefined)

export const shape = z.object({
  datadir: z.literal('/data').catch('/data'),
  bitcoind: z.string().optional().catch(undefined),
  rpcuser: z.literal('').catch(''),
  rpcpassword: z.literal('').catch(''),
  rpccookie: z.literal('/mnt/bitcoind/.cookie').catch('/mnt/bitcoind/.cookie'),
  tcp: z.literal('0.0.0.0:50001').catch('0.0.0.0:50001'),
  peering: z.literal(false).catch(false),
  announce: z.literal(false).catch(false),
  bitcoind_timeout: iniNumber,
  bitcoind_clients: iniNumber,
  worker_threads: iniNumber,
  db_mem: iniNumber,
  db_max_open_files: iniNumber,
  max_history: iniNumber,
  banner: z.literal('/data/banner.txt').catch('/data/banner.txt'),
})

export const fulcrumConf = FileHelper.ini(
  {
    base: sdk.volumes.main,
    subpath: 'fulcrum.conf',
  },
  shape,
)
