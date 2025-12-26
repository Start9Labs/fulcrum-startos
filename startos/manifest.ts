import { setupManifest } from '@start9labs/start-sdk'
import { manifestDependencies } from './networks'

export const manifest = setupManifest({
  id: 'fulcrum',
  title: 'Fulcrum',
  license: 'MIT',
  wrapperRepo: 'https://github.com/linkinparkrulz/fulcrum-startos',
  upstreamRepo: 'https://github.com/cculianu/Fulcrum',
  supportSite: 'https://github.com/cculianu/Fulcrum/issues',
  marketingSite: 'https://github.com/cculianu/Fulcrum',
  donationUrl: 'https://github.com/cculianu/Fulcrum',
  docsUrl:
    'https://github.com/linkinparkrulz/fulcrum-startos/blob/main/instructions.md',
  description: {
    short:
      'A fast and efficient Electrum server that connects to your Bitcoin node.',
    long: 'Fulcrum is a high-performance Electrum server that indexes the Bitcoin blockchain from your own Bitcoin node. This allows you to connect hardware and software wallets to your own node, ensuring privacy and security. By acting as a bridge between your wallet and your node, Fulcrum provides a fast, reliable, and private way to manage your Bitcoin.',
  },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'cculianu/fulcrum:v2.1.0',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  hardwareRequirements: {
    arch: ['x86_64', 'aarch64'],
  },
  alerts: {
    install:
      'WARNING: Fulcrum requires significant system resources: 2GB+ RAM during sync and 180GB+ for indexes. When combined with a Bitcoin node (~800GB), total storage requirements exceed 1TB. A 2TB drive is strongly recommended. Insufficient resources may cause system instability or failure.',
    update: null,
    uninstall: null,
    restore: null,
    start:
      'WARNING: Fulcrum requires significant system resources: 2GB+ RAM during sync and 180GB+ for indexes. When combined with a Bitcoin node (~800GB), total storage requirements exceed 1TB. A 2TB drive is strongly recommended. Insufficient resources may cause system instability or failure.',
    stop: null,
  },
  dependencies: manifestDependencies,
})
