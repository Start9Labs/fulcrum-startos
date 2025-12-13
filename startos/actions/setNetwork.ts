import { sdk } from '../sdk'
import { conf } from '../file-models/fulcrum.conf'
import { existsSync, renameSync } from 'fs'
import { BITCOIND_RPC, BITCOIND_TESTNET_RPC, getDependencyId } from '../utils'

export const setNetwork = sdk.Action.withoutInput(
  // id
  'set-network',

  // metadata
  async ({ effects }) => {
    const rpc_address = await conf.read((e) => e.bitcoind).const(effects)
    const network = getNetworkFromRpcAddress(rpc_address)

    const other = network === 'mainnet' ? 'testnet4' : 'mainnet'

    return {
      name: `Switch to ${other}`,
      description: `Currently connected to ${network}. Run action to connect to ${other} instead`,
      warning: `Are you sure you want to switch to ${other}?`,
      allowedStatuses: 'only-stopped',
      group: 'Other',
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const rpc_address = await conf.read((e) => e.bitcoind).const(effects)
    const network = getNetworkFromRpcAddress(rpc_address)
    const other = network === 'mainnet' ? 'testnet4' : 'mainnet'

    await conf.merge(effects, {
      bitcoind: other === 'mainnet' ? BITCOIND_RPC : BITCOIND_TESTNET_RPC,
    })

    // move fulc2_db if network changed
    const prefix = '/media/startos/volumes/main/'
    const dbPath = `${prefix}fulc2_db`
    const mainnetPath = `${prefix}fulc2_db.mainnet`
    const testnetPath = `${prefix}fulc2_db.testnet4`

    if (other === 'mainnet') {
      if (existsSync(dbPath)) {
        renameSync(dbPath, testnetPath)
      }

      if (existsSync(mainnetPath)) {
        renameSync(mainnetPath, dbPath)
      }
    } else if (other === 'testnet4') {
      if (existsSync(dbPath)) {
        renameSync(dbPath, mainnetPath)
      }

      if (existsSync(testnetPath)) {
        renameSync(testnetPath, dbPath)
      }
    }

    return {
      version: '1',
      title: 'Success',
      message: `Successfully switched to ${other}`,
      result: null,
    }
  },
)

function getNetworkFromRpcAddress(
  rpc_address: string | null,
): 'mainnet' | 'testnet4' | 'unknown' {
  const dependencyId = getDependencyId(rpc_address)
  if (dependencyId === 'bitcoind') {
    return 'mainnet'
  } else if (dependencyId === 'bitcoind-testnet') {
    return 'testnet4'
  } else {
    return 'unknown'
  }
}
