import { fulcrumConf } from '../file-models/fulcrum.conf'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await fulcrumConf.merge(effects, {})
})
