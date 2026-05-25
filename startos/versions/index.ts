import { VersionGraph } from '@start9labs/start-sdk'
import { v_2_1_1_2 } from './v2.1.1_2'
import { v_2_1_1_3 } from './v2.1.1_3'

export const versionGraph = VersionGraph.of({
  current: v_2_1_1_3,
  other: [v_2_1_1_2],
})
