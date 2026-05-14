import { fulcrumConf } from '../file-models/fulcrum.conf'
import { storeJson } from '../file-models/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await fulcrumConf.merge(effects, {})
  await storeJson.merge(effects, {})
})
