import { FileHelper, matches } from '@start9labs/start-sdk'
import { BITCOIND_RPC } from '../utils'

const { boolean, object, string } = matches

// converts string to number, else numbers in ini files break
const number = string.map((a) => Number(a)).orParser(matches.number)

export const confDefaults = {
  datadir: '/data',
  bitcoind: BITCOIND_RPC,
  rpcuser: '',
  rpcpassword: '',
  tcp: '0.0.0.0:50001',
  peering: false,
  announce: false,
  bitcoind_timeout: 30,
  bitcoind_clients: 3,
  worker_threads: 0,
  db_mem: 2048,
  db_max_open_files: 1000,
  banner: '/data/banner.txt',
}

const d = confDefaults

const shape = object({
  datadir: string.onMismatch(d.datadir),
  bitcoind: string.onMismatch(BITCOIND_RPC),
  rpcuser: string.onMismatch(d.rpcuser),
  rpcpassword: string.onMismatch(d.rpcpassword),
  tcp: string.onMismatch(d.tcp),
  peering: boolean.onMismatch(d.peering),
  announce: boolean.onMismatch(d.announce),
  bitcoind_timeout: number.onMismatch(d.bitcoind_timeout),
  bitcoind_clients: number.onMismatch(d.bitcoind_clients),
  worker_threads: number.onMismatch(d.worker_threads),
  db_mem: number.onMismatch(d.db_mem),
  db_max_open_files: number.onMismatch(d.db_max_open_files),
  banner: string.onMismatch(d.banner),
})

export const conf = FileHelper.ini(
  {
    volumeId: 'main',
    subpath: 'fulcrum.conf',
  },
  shape,
)
