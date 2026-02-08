import { setupManifest } from '@start9labs/start-sdk'
import { short, long, alertInstall, alertStart } from './i18n'

export const manifest = setupManifest({
  id: 'fulcrum',
  title: 'Fulcrum',
  license: 'MIT',
  wrapperRepo: 'https://github.com/linkinparkrulz/fulcrum-startos',
  upstreamRepo: 'https://github.com/cculianu/Fulcrum',
  supportSite: 'https://github.com/cculianu/Fulcrum/issues',
  marketingSite: 'https://github.com/cculianu/Fulcrum',
  donationUrl: 'https://github.com/cculianu/Fulcrum',
  docsUrl: 'https://github.com/cculianu/Fulcrum',
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
      description: 'Provides Bitcoin network connection and blockchain data.',
      optional: false,
      metadata: {
        title: 'Bitcoin',
        icon: 'https://bitcoin.org/img/icons/opengraph.png',
      },
    },
  },
})
