export const electrumPort = 50001

export const confDefaults = {
  datadir: '/data',
  bitcoind: 'bitcoind.startos:8332',
  rpcuser: '',
  rpcpassword: '',
  rpccookie: '/mnt/bitcoind/.cookie',
  tcp: '0.0.0.0:50001',
  peering: false,
  announce: false,
  bitcoind_timeout: 30,
  bitcoind_clients: 3,
  worker_threads: 0,
  db_mem: 2048,
  db_max_open_files: 1000,
  banner: '/data/banner.txt',
} as const
