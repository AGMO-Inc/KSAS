import { useEffect, useState } from 'react'
import { bridge } from '@seamos/bridge/webview'

/**
 * Reads the native host's verdict on whether the internet is actually
 * reachable.
 *
 * The host answers by probing outward, so it separates a radio that is merely
 * associated from an uplink that carries traffic. `navigator.onLine` cannot: it
 * reports the interface, and calls a machine online right up to the point every
 * request times out. That is the whole reason this reading exists, so it is the
 * only one consulted here.
 *
 * Before the first settings frame arrives there is no verdict yet. That window
 * counts as reachable — starting the load and letting it fail is recoverable,
 * whereas opening on a "no internet" card that the very next frame contradicts
 * is not.
 */
function readReachable(): boolean {
  return bridge.settings?.network?.reachable !== false
}

/** Whether the machine can reach the internet, as reported by the host. */
export function useInternetReachable(): boolean {
  const [reachable, setReachable] = useState(readReachable)

  useEffect(() => {
    const stopWatchingHost = bridge.addListener('settingsUpdate', () =>
      setReachable(readReachable()),
    )

    // The host may have reported in between the first render and this effect.
    setReachable(readReachable())

    return stopWatchingHost
  }, [])

  return reachable
}
