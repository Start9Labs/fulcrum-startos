import { VersionGraph } from '@start9labs/start-sdk'
import { v_2_1_0_9 } from './v2.1.0_9'
import { v_2_1_0_10 } from './v2.1.0_10'

export const versionGraph = VersionGraph.of({
  current: v_2_1_0_10,
  other: [v_2_1_0_9],
})
