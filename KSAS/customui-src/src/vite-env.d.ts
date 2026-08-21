/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Browser key for the Google Maps JavaScript API. Required by the KSAS map
   * screen — see `.env.example`.
   */
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
