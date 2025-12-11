import { FileHelper } from '@start9labs/start-sdk'

export const bannerFile = FileHelper.string({
  volumeId: 'main',
  subpath: 'banner.txt',
})
