import { defaultDbMem, fulcrumConf } from '../file-models/fulcrum.conf'
import { storeJson } from '../file-models/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  await fulcrumConf.merge(
    effects,
    kind === 'install' ? { db_mem: defaultDbMem() } : {},
  )
  await storeJson.merge(effects, {})
})
