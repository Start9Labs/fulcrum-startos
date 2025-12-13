import { bannerFile } from '../file-models/banner.txt'
import { conf, confDefaults } from '../file-models/fulcrum.conf'
import { sdk } from '../sdk'
import { defaultBanner } from '../utils'

export const setDefaults = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    const current = await conf.read().once()
    if (!current) {
      await conf.write(effects, confDefaults)
    }

    const currentBanner = await bannerFile.read().once()
    if (!currentBanner) {
      await bannerFile.write(effects, defaultBanner)
    }
  }
})
