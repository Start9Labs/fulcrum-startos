import { fulcrumConf } from '../file-models/fulcrum.conf'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await fulcrumConf.merge(effects, {})
})
