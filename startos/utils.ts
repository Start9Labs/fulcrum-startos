import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import {
  defaultDbMem,
  fulcrumConf,
  syncedDbMem,
} from './fileModels/fulcrum.conf'
import { storeJson } from './fileModels/store.json'

export const electrumPort = 50001
export const mainHostId = 'main'
export const reindexRequest = sdk.volumes.main.subpath('reindex.request')

export const resetSyncState = async (effects: T.Effects) => {
  if (
    (await fulcrumConf.read((c) => c.db_mem).once()) === syncedDbMem() &&
    syncedDbMem() < defaultDbMem()
  ) {
    await fulcrumConf.merge(effects, { db_mem: defaultDbMem() })
  }
  await storeJson.merge(effects, { syncNotified: false })
}
