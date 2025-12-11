import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

const BUILD = process.env.BUILD || ''
const architectures =
  BUILD === 'x86_64' || BUILD === 'aarch64' ? [BUILD] : ['x86_64', 'aarch64']

export const manifest = setupManifest({
  id: 'fulcrum',
  title: 'Fulcrum',
  license: 'MIT',
  wrapperRepo: 'https://github.com/linkinparkrulz/fulcrum-startos',
  upstreamRepo: 'https://github.com/cculianu/Fulcrum',
  supportSite: 'https://github.com/cculianu/Fulcrum/issues',
  marketingSite: 'https://github.com/cculianu/Fulcrum',
  docsUrl: 'https://github.com/linkinparkrulz/fulcrum-startos/blob/main/instructions.md',
  description: {
    short:
      'A fast and efficient Electrum server that connects to your Bitcoin node.',
    long: 'Fulcrum is a high-performance Electrum server that indexes the Bitcoin blockchain from your own Bitcoin node. This allows you to connect hardware and software wallets to your own node, ensuring privacy and security. By acting as a bridge between your wallet and your node, Fulcrum provides a fast, reliable, and private way to manage your Bitcoin.',
  },
  donationUrl: null,
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'cculianu/fulcrum:v2.1.0',
      },
      arch: architectures,
    } as SDKImageInputSpec,
  },
  hardwareRequirements: {
    arch: architectures,
  },
  alerts: {
    install:
      'WARNING: Fulcrum requires significant system resources: 1GB+ RAM during sync and 160GB+ for indexes. When combined with a Bitcoin node (~800GB), total storage requirements exceed 1TB. A 2TB drive is strongly recommended. Insufficient resources may cause system instability or failure.',
    update: null,
    uninstall: null,
    restore: null,
    start:
      'WARNING: Fulcrum requires significant system resources: 1GB+ RAM during sync and 160GB+ for indexes. When combined with a Bitcoin node (~800GB), total storage requirements exceed 1TB. A 2TB drive is strongly recommended. Insufficient resources may cause system instability or failure.',
    stop: null,
  },
  dependencies: {
    bitcoind: {
      description:
        'Provides the core Bitcoin network connection and blockchain data.',
      optional: true,
      metadata: {
        title: 'Bitcoin Core',
        icon: 'https://bitcoin.org/img/icons/opengraph.png',
      },
    },
    'bitcoind-testnet': {
      description:
        'Testnet Bitcoin Core instance for development and testing.',
      optional: true,
      metadata: {
        title: 'Bitcoin Core (testnet4)',
        icon: 'https://bitcoin.org/img/icons/opengraph.png',
      },
    },
  },
})
