export const electrumPort = 50001

export const defaultBanner = `


█▀▀ █▀█ █▀▀ █▀▀   █▀ ▄▀█ █▀▄▀█ █▀█ █░█ █▀█ ▄▀█ █
█▀░ █▀▄ ██▄ ██▄   ▄█ █▀█ █░▀░█ █▄█ █▄█ █▀▄ █▀█ █

Welcome to your Fulcrum Server!
Connected to $SERVER_VERSION
For information and updates: https://freesamourai.com`

export function parseCookie(cookie: string | null): [string, string] {
  const parts = cookie?.trim().split(':')
  if (!parts || parts.length !== 2) {
    throw new Error('Invalid .cookie format')
  }
  return [parts[0], parts[1]]
}
