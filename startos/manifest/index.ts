import { setupManifest } from '@start9labs/start-sdk'
import {
  bitcoindDescription,
  short,
  long,
  alertInstall,
  alertStart,
} from './i18n'

export const manifest = setupManifest({
  id: 'fulcrum',
  title: 'Fulcrum',
  license: 'MIT',
  packageRepo:
    'https://github.com/Start9Labs/fulcrum-startos/tree/update/040',
  upstreamRepo: 'https://github.com/cculianu/Fulcrum',
  marketingUrl: 'https://github.com/cculianu/Fulcrum',
  docsUrls: ['https://github.com/cculianu/Fulcrum/blob/master/doc/'],
  donationUrl: 'https://github.com/cculianu/Fulcrum',
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'cculianu/fulcrum:v2.1.0',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: alertInstall,
    update: null,
    uninstall: null,
    restore: null,
    start: alertStart,
    stop: null,
  },
  dependencies: {
    bitcoind: {
      description: bitcoindDescription,
      optional: false,
      metadata: {
        title: 'Bitcoin Core',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/refs/heads/040/30.2/dep-icon.svg',
      },
    },
  },
})
