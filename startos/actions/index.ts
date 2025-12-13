import { sdk } from '../sdk'
import { configure } from './configure'
import { setNetwork } from './setNetwork'

export const actions = sdk.Actions.of()
  .addAction(configure)
  .addAction(setNetwork)
