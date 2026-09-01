import { useEffect, useState } from 'react'

const CALLBACK_NAME = '__ksasGoogleMapsReady'
const SCRIPT_ID = 'ksas-google-maps'

/**
 * Give up on the script this long after injecting it.
 *
 * A machine whose Wi-Fi is up but whose uplink is dead swallows the request
 * instead of refusing it, so `onerror` only fires once the OS has exhausted its
 * TCP retries. Until then the map is an unexplained black rectangle, so cap the
 * wait ourselves.
 */
const LOAD_TIMEOUT_MS = 10_000

type MapsGlobals = typeof globalThis & {
  google?: { maps?: typeof google.maps }
  [CALLBACK_NAME]?: () => void
  gm_authFailure?: () => void
}

const globals = globalThis as MapsGlobals

let pending: Promise<typeof google.maps> | null = null

/**
 * Injects the Google Maps JavaScript API once per page and resolves with the
 * `google.maps` namespace. Repeat calls share the same in-flight request; a
 * failed one is discarded so the next call starts over.
 */
export function loadGoogleMaps(apiKey: string): Promise<typeof google.maps> {
  const loaded = globals.google?.maps
  if (loaded) return Promise.resolve(loaded)
  if (pending) return pending

  pending = new Promise<typeof google.maps>((resolve, reject) => {
    let settled = false

    const fail = (message: string) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      delete globals[CALLBACK_NAME]
      // Let the next attempt start from scratch rather than replay this failure.
      pending = null
      document.getElementById(SCRIPT_ID)?.remove()
      reject(new Error(message))
    }

    const timer = setTimeout(
      () => fail('Timed out reaching maps.googleapis.com.'),
      LOAD_TIMEOUT_MS,
    )

    globals[CALLBACK_NAME] = () => {
      if (settled) return
      const maps = globals.google?.maps
      if (!maps) {
        fail('Google Maps loaded without a `google.maps` namespace.')
        return
      }
      settled = true
      clearTimeout(timer)
      delete globals[CALLBACK_NAME]
      resolve(maps)
    }

    // Google reports a rejected/misconfigured key here rather than via `onerror`.
    globals.gm_authFailure = () =>
      fail(
        'Google Maps rejected the API key. Check that the key is valid, that the Maps JavaScript API is enabled, and that this origin is allowed.',
      )

    const params = new URLSearchParams({
      key: apiKey,
      v: 'weekly',
      loading: 'async',
      callback: CALLBACK_NAME,
    })

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`
    script.async = true
    script.onerror = () =>
      fail(
        'Could not reach maps.googleapis.com. The Google Maps JavaScript API needs outbound internet access.',
      )

    document.getElementById(SCRIPT_ID)?.remove()
    document.head.appendChild(script)
  })

  return pending
}

type LoadState = {
  maps: typeof google.maps | null
  error: string | null
}

export type GoogleMapsState = LoadState & {
  /** The machine reports no network, so no map data can load or refresh. */
  offline: boolean
}

/**
 * Loads the Maps API from `VITE_GOOGLE_MAPS_API_KEY`.
 *
 * The connection is watched alongside the load. A machine that boots offline
 * says so at once instead of sitting out the load timeout first, and one that
 * loses its uplink mid-session is reported too — `google.maps` keeps working
 * there, but the tiles behind it stop arriving. Coming back online retries.
 */
export function useGoogleMaps(): GoogleMapsState {
  const [offline, setOffline] = useState(() => !navigator.onLine)
  const [state, setState] = useState<LoadState>({
    maps: globals.google?.maps ?? null,
    error: null,
  })

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine)
    window.addEventListener('online', sync)
    window.addEventListener('offline', sync)
    return () => {
      window.removeEventListener('online', sync)
      window.removeEventListener('offline', sync)
    }
  }, [])

  useEffect(() => {
    // Nothing to attempt without a network; the effect re-runs once it is back.
    if (offline) return

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setState({
        maps: null,
        error:
          'VITE_GOOGLE_MAPS_API_KEY is not set. Copy `.env.example` to `.env.local` and add a Google Maps browser key.',
      })
      return
    }

    let active = true

    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (active) setState({ maps, error: null })
      })
      .catch((cause: unknown) => {
        if (!active) return
        setState({
          maps: null,
          error: cause instanceof Error ? cause.message : String(cause),
        })
      })

    return () => {
      active = false
    }
  }, [offline])

  return { ...state, offline }
}
