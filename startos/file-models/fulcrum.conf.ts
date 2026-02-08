import { FileHelper, matches } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { confDefaults } from '../utils'

const { boolean, object, string } = matches

// converts string to number, else numbers in ini files break
const number = string.map((a) => Number(a)).orParser(matches.number)

export const {
  datadir,
  bitcoind,
  rpcuser,
  rpcpassword,
  rpccookie,
  tcp,
  peering,
  announce,
  bitcoind_timeout,
  bitcoind_clients,
  worker_threads,
  db_mem,
  db_max_open_files,
  banner,
} = confDefaults

const shape = object({
  datadir: string.onMismatch(datadir),
  bitcoind: string.onMismatch(bitcoind),
  rpcuser: string.onMismatch(rpcuser),
  rpcpassword: string.onMismatch(rpcpassword),
  rpccookie: string.onMismatch(rpccookie),
  tcp: string.onMismatch(tcp),
  peering: boolean.onMismatch(peering),
  announce: boolean.onMismatch(announce),
  bitcoind_timeout: number.onMismatch(bitcoind_timeout),
  bitcoind_clients: number.onMismatch(bitcoind_clients),
  worker_threads: number.onMismatch(worker_threads),
  db_mem: number.onMismatch(db_mem),
  db_max_open_files: number.onMismatch(db_max_open_files),
  banner: string.onMismatch(banner),
})

export const fulcrumConf = FileHelper.ini(
  {
    base: sdk.volumes.main,
    subpath: 'fulcrum.conf',
  },
  shape,
)
