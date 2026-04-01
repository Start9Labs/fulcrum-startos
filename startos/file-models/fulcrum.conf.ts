import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const iniNumber = z.union([z.string().transform(Number), z.number()])

export const shape = z.object({
  datadir: z.literal('/data').catch('/data'),
  bitcoind: z.literal('bitcoind.startos:8332').catch('bitcoind.startos:8332'),
  rpcuser: z.literal('').catch(''),
  rpcpassword: z.literal('').catch(''),
  rpccookie: z
    .literal('/mnt/bitcoind/.cookie')
    .catch('/mnt/bitcoind/.cookie'),
  tcp: z.literal('0.0.0.0:50001').catch('0.0.0.0:50001'),
  peering: z.literal(false).catch(false),
  announce: z.literal(false).catch(false),
  bitcoind_timeout: iniNumber.catch(30),
  bitcoind_clients: iniNumber.catch(3),
  worker_threads: iniNumber.catch(0),
  db_mem: iniNumber.catch(2048),
  db_max_open_files: iniNumber.catch(1000),
  banner: z.literal('/data/banner.txt').catch('/data/banner.txt'),
})

export const fulcrumConf = FileHelper.ini(
  {
    base: sdk.volumes.main,
    subpath: 'fulcrum.conf',
  },
  shape,
)
