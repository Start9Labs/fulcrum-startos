import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'fulcrum',
  title: 'Fulcrum',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/fulcrum-startos',
  upstreamRepo: 'https://github.com/cculianu/Fulcrum',
  marketingUrl: 'https://github.com/cculianu/Fulcrum',
  donationUrl: 'https://github.com/cculianu/Fulcrum',
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'cculianu/fulcrum:v2.1.3',
      },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: false,
    },
  },
})
