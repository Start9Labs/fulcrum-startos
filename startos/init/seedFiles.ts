import { defaultDbMem, fulcrumConf } from '../fileModels/fulcrum.conf'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { resetSyncState } from '../utils'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  await fulcrumConf.merge(
    effects,
    kind === 'install' ? { db_mem: defaultDbMem() } : {},
  )
  await storeJson.merge(effects, {})
  if (kind === 'restore') await resetSyncState(effects)
})
