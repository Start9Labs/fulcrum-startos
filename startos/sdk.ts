import { StartSdk } from '@start9labs/start-sdk'
import { manifest } from './manifest'

/**
 * Plumbing. DO NOT EDIT UNLESS YOU KNOW WHY.
 */
export const sdk = StartSdk.of().withManifest(manifest).build(true)
