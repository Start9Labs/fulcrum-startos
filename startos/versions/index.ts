import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_1_1_6 } from './v2.1.1_6'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_1_1_6],
})
