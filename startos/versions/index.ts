import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_1_1_6 } from './v2.1.1_6'
import { v_2_1_1_13 } from './v2.1.1_13'
import { v_2_1_3_1 } from './v2.1.3_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_1_1_6, v_2_1_1_13, v_2_1_3_1],
})
