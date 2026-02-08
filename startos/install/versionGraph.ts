import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { fulcrumConf } from '../file-models/fulcrum.conf'
import { confDefaults } from '../utils'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await fulcrumConf.write(effects, confDefaults)
  },
})
