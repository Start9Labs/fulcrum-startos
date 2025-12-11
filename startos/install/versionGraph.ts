import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { conf, confDefaults } from '../file-models/fulcrum.conf'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await conf.write(effects, confDefaults)
  },
})
