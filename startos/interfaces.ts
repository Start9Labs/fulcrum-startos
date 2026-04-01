import { sdk } from './sdk'
import { i18n } from './i18n'
import { electrumPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multiHost = sdk.MultiHost.of(effects, 'main')
  const electrumOrigin = await multiHost.bindPort(electrumPort, {
    protocol: null,
    addSsl: { preferredExternalPort: 50002, alpn: null, addXForwardedHeaders: false },
    preferredExternalPort: electrumPort,
    secure: null,
  })

  const electrum = sdk.createInterface(effects, {
    id: 'main',
    name: i18n('Electrum (SSL)'),
    description: i18n('The main interface for accessing Fulcrum via Electrum protocol through SSL'),
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
