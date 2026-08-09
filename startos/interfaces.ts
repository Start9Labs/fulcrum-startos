import { sdk } from './sdk'
import { i18n } from './i18n'
import { electrumPort, mainHostId } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multiHost = sdk.MultiHost.of(effects, mainHostId)
  // secure: null still allocates a plaintext external port. It is reachable
  // over lxcbr0 — the address dependents resolve — and from nowhere else, so
  // off the box the TLS one is all there is.
  const electrumOrigin = await multiHost.bindPort(electrumPort, {
    protocol: null,
    addSsl: {
      preferredExternalPort: 50002,
      alpn: null,
      addXForwardedHeaders: false,
      auth: null,
    },
    preferredExternalPort: electrumPort,
    secure: null,
  })

  const electrum = sdk.createInterface(effects, {
    id: 'main',
    name: i18n('Electrum (SSL)'),
    description: i18n(
      'The main interface for accessing Fulcrum via Electrum protocol through SSL',
    ),
    type: 'api',
    masked: false,
    // protocol: null leaves the origin scheme-less, which renders every address
    // as a bare host:port with nothing marking it as TLS.
    schemeOverride: { ssl: 'ssl', noSsl: 'tcp' },
    username: null,
    path: '',
    query: {},
  })

  const electrumReceipt = await electrumOrigin.export([electrum])
  return [electrumReceipt]
})
