import { sdk } from './sdk'
import { electrumPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multiHost = sdk.MultiHost.of(effects, 'main')
  const electrumOrigin = await multiHost.bindPort(electrumPort, {
    protocol: null,
    addSsl: { preferredExternalPort: 50002, alpn: null },
    preferredExternalPort: electrumPort,
    secure: null,
  })

  const electrum = sdk.createInterface(effects, {
    id: 'main',
    name: 'Electrum (SSL)',
    description: 'The main interface for accessing Fulcrum via Electrum protocol through SSL',
    type: 'api',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const electrumReceipt = await electrumOrigin.export([electrum])
  return [electrumReceipt]
})
