# SeamOS App Custom UI React Template

A React boilerplate template for SeamOS frontend custom UI development.
It includes `@seamos/connect`-based REST/WebSocket communication, a `@seamos/map-preset` map example,
a `@seamos/bridge` WebView native integration example, and hash routing for static deployment.

## Getting Started

```bash
npm install
npm run dev
```

If you only run the local Vite dev server, the SeamOS runtime endpoint `get_assigned_ports` is unavailable, so Connect initialization may fail.
Test the REST/WebSocket examples against an actual SeamOS runtime or a development proxy that provides `get_assigned_ports`.

## Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Run the dev server (localhost:5173) |
| `npm run build`    | TypeScript check + production build |
| `npm run preview`  | Preview the build output            |
| `npm run lint`     | ESLint + Prettier check             |
| `npm run lint:fix` | ESLint + Prettier auto-fix          |

## Project Structure

```
src/
├── main.tsx            # App entrypoint
├── router.tsx          # Hash router configuration
├── providers.tsx       # QueryClient + RouterProvider
├── App.css             # Tailwind CSS entry point
├── routes/             # File-based routing (auto-generated)
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page route
│   ├── library.tsx     # Library guide page route
│   ├── map.tsx         # @seamos/map-preset map example route
│   └── bridge.tsx      # @seamos/bridge WebView example route
├── layouts/
│   └── RootLayout.tsx  # Shared layout (navigation)
└── pages/
    ├── HomePage.tsx    # Connect REST/WebSocket example
    ├── LibraryPage.tsx # SeamOS library guide
    ├── MapPage.tsx     # MapLibre/PMTiles map example
    └── BridgePage.tsx  # WebView/native bridge example
```

## Key Dependencies

| Library                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| **React 19**           | UI rendering library                                                      |
| **TanStack Router**    | Type-safe file-based routing. Supports static deployment via hash routing |
| **TanStack Query**     | Server state management and data fetching. Includes DevTools              |
| **Tailwind CSS v4**    | Utility-first CSS framework                                               |
| **Vite**               | Build tool. Supports HMR, code splitting, and relative-path builds        |
| **@seamos/connect**    | REST/WebSocket connection helper based on SeamOS runtime assigned ports   |
| **@seamos/map-preset** | SeamOS map preset based on MapLibre + PMTiles                             |
| **@seamos/bridge**     | Cockpit/WebView native integration bridge                                 |

## @seamos Library Selection Guide

- `@seamos/connect`: The core communication layer. It connects both REST and WebSocket based on assigned ports.
- `@seamos/map-preset`: Use this in apps that need a map UI. This template includes it along with `maplibre-gl` and `pmtiles` for the runnable sample. If you don't need map functionality, you can remove the `/map` route and its related dependencies.
- `@seamos/bridge`: Choose this when using settings, location, haptic, vibration, file download, or custom messages inside the SeamOS Cockpit or a React Native WebView. This template includes it by default for the WebView sample.
- `@seamos/websocket`: Deprecated. Do not add it to new apps; use `@seamos/connect` instead.

## Connect Setup

`@seamos/connect` initializes the ports assigned to the app through the SeamOS runtime's `get_assigned_ports` endpoint.
After initialization, REST requests and WebSocket connections use the same assigned port.

```typescript
import { initPorts } from '@seamos/connect'

await initPorts()
```

Notes:

- `initPorts()` must be called before `createWebSocketClient`, `seamosFetch`, or `getAssignedPort`.
- REST/WebSocket paths must include a leading slash, like `/api/example/status` and `/ws/example`.
- Do not specify the host and port yourself. `@seamos/connect` configures them automatically from `location.hostname` and the assigned port.
- If you only run the local Vite dev server, initialization may fail because `get_assigned_ports` is unavailable.

## REST Communication Example

```typescript
import { initPorts, seamosFetch } from '@seamos/connect'

await initPorts()

const response = await seamosFetch('/api/example/status')

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`)
}

const data = await response.json()
console.log(data)
```

POST requests pass standard `RequestInit` options through as-is.

```typescript
const response = await seamosFetch('/api/example/commands', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'ping',
    requestId: 'example-request-001',
    payload: { message: 'hello' },
  }),
})
```

The endpoints above are placeholders for the template. In a real app, replace them with the paths and payloads that match your backend/API contract.

## WebSocket Communication Example

```typescript
import { createWebSocketClient, initPorts, sendJson } from '@seamos/connect'

await initPorts()

const client = createWebSocketClient('/ws/example', {
  autoReconnect: true,
  reconnectInterval: 3000,
  events: {
    open: () => {
      sendJson(client.socket, {
        type: 'example.subscribe',
        requestId: 'example-ws-001',
        payload: { channel: 'example.status' },
      })
    },
    message: (event) => console.log('message', event.data),
    close: () => console.log('socket closed'),
    error: () => console.log('socket error'),
  },
})

sendJson(client.socket, {
  type: 'example.ping',
  requestId: 'example-ws-002',
  payload: { message: 'hello' },
})

client.close(1000, 'done')
```

When using `autoReconnect`, call `client.close()` on component unmount or manual termination to also clear the reconnect timer.

## Map Preset Example

`@seamos/map-preset` uses S3 PMTiles in the dev environment and the device's local `/maps` path in the prod environment.
The map page is available at `/#/map`.

```typescript
import { useEffect, useRef } from 'react'
import { createSeamOSMap } from '@seamos/map-preset'
import 'maplibre-gl/dist/maplibre-gl.css'

export function MapView() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const map = createSeamOSMap({
      container: ref.current,
      preset: 'basic',
      env: 'dev',
    })

    map.on('load', () => console.log('map loaded'))

    return () => map.remove()
  }, [])

  return <div ref={ref} className="h-[420px]" />
}
```

Notes:

- You must import `maplibre-gl/dist/maplibre-gl.css`.
- Before prod deployment, verify the device's `/maps` resources and Range Request support.
- The map may not load on browsers that do not support WebGL.

## WebView Bridge Example

The `@seamos/bridge` example page is available at `/#/bridge`.
In a regular browser, `ReactNativeWebView` is unavailable, so native requests are not actually processed.
Verify it in the SeamOS Cockpit WebView or a test harness.

```typescript
import { bridge, BridgeEvent } from '@seamos/bridge/webview'

const unsubscribe = bridge.addListener(
  BridgeEvent.SETTINGS_UPDATE,
  (settings) => console.log(settings),
)

bridge.triggerHaptic('success')
bridge.sendCustom('example:ping', { message: 'hello' })

unsubscribe()
```

## Build and Deployment

```bash
npm run build
```

A `dist/` folder is generated. With hash routing (`/#/`) and relative-path (`base: './'`) configuration, you can deploy it directly to static hosting without any extra server setup.

## KSAS Screens

Seven screens from the Figma design, all rendered at the 1697 x 1080 `MainContent`
size the cockpit gives the app. The 223 px launcher rail on the right of the Figma
frame belongs to the SeamOS shell, not to this UI.

| Route                   | Screen                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `/#/ksas`               | Field Map — live Google Maps satellite view, field info card, tool rail, sidebar drawer |
| `/#/ksas/search`        | Field search — district list, live-filtered                                             |
| `/#/ksas/planting-plan` | Planting Plan — status/year filters, crop chips, plan list                              |
| `/#/ksas/work-progress` | Work Progress — work summary, progress pie, breakdown legend, map panel                 |
| `/#/ksas/logs`          | Logs — sort/photo controls, Diary and Instructions tabs, log list                       |
| `/#/ksas/field-ledger`  | Field Ledger — field filters, block chips, field list, map panel                        |
| `/#/ksas/instruction`   | Instruction & Log — the form behind `+Tasks & Logs`                                     |

```
src/
├── pages/ksas/
│   ├── FieldMapPage.tsx          # Field Map screen
│   ├── FieldSearchPage.tsx       # Field search screen
│   ├── PlantingPlanPage.tsx      # Planting Plan screen
│   ├── WorkProgressPage.tsx      # Work Progress screen
│   ├── LogsPage.tsx              # Logs screen
│   ├── FieldLedgerPage.tsx       # Field Ledger screen
│   └── InstructionPage.tsx       # Instruction & Log form
├── routes/
│   ├── ksas.index.tsx            # /ksas  (?field=<id> selects a field)
│   ├── ksas.search.tsx
│   ├── ksas.planting-plan.tsx
│   ├── ksas.work-progress.tsx
│   ├── ksas.logs.tsx
│   ├── ksas.field-ledger.tsx
│   └── ksas.instruction.tsx
├── components/ksas/
│   ├── KsasHeader.tsx            # Menu button, KSAS logo, status pill
│   ├── SidebarDrawer.tsx         # Full-height nav drawer + scrim
│   ├── FarmInfoCard.tsx          # Selected field's details and cropping plan
│   ├── MapToolbar.tsx            # Right-hand tool rail
│   ├── FarmMap.tsx               # Google Maps satellite view + field outlines
│   ├── PieChart.tsx              # Work-breakdown pie, drawn from the data
│   ├── controls.tsx              # ScreenHeader, dropdowns, chips, toggles, buttons
│   └── icons.tsx                 # Inlined Material Symbols glyphs
├── data/
│   ├── farms.ts                  # Field outlines, projected onto real ground
│   ├── districts.ts              # Districts offered by the search screen
│   ├── plantingPlans.ts          # Planting plan rows
│   ├── workProgress.ts           # Work summary and status breakdown
│   ├── logs.ts                   # Diary and instruction log rows
│   ├── fieldLedger.ts            # Field ledger rows and blocks
│   └── instructionForm.ts        # Instruction & Log form rows
└── lib/
    ├── geo.ts                    # Metre offsets and polygon centroids
    └── googleMaps.ts             # Maps JavaScript API loader + hook
```

Icons that switch colour (sidebar active state, the rotating `arrow_forward_ios`
chevron) are inlined in `icons.tsx` and paint with `currentColor`. Icons that never
change colour stay as files in `public/assets/icons`.

Every KSAS screen root carries `leading-[normal]`. Figma sets `leading-[normal]` on
each text node, while Tailwind's preflight puts `1.5` on the root — without the
override every row came out ~20 % taller than the design.

### Navigation

- Hamburger on the Field Map opens the sidebar drawer; the scrim, the `<` button and
  `Escape` close it. All five primary drawer entries lead to a screen.
- The tool rail's search button opens the search screen; the refresh button re-frames
  the field block. Picking a district in the search screen returns to the field map
  with the first field in that district selected, via `/#/ksas?field=<id>`.
- `+Tasks & Logs` on the Logs screen opens Instruction & Log; its back arrow returns
  to Logs.
- Controls the design gives no target for render but do nothing: KSAS Market Place,
  the account entry and Log Out in the drawer; the settings/pin/route/report tool
  buttons; every status, year, sort and field dropdown; `Filter`; `+Add`;
  `+Add Field`; `Register`; the Photo toggle; and the list-row chevrons.

### Working filters

The controls that do have obvious behaviour are wired up: the search input, the crop
chips on Planting Plan, the block chips on Field Ledger, and the Diary/Instructions
tabs on Logs. Item counts and totals are computed from whatever is visible rather
than hardcoded.

### Google Maps API key

The Field Map, Work Progress and Field Ledger screens need a browser key for the
Maps JavaScript API. Without one they show a "Satellite map unavailable" panel.

```bash
cp .env.example .env.local   # then fill in VITE_GOOGLE_MAPS_API_KEY
```

Create the key in the [Google Cloud console](https://console.cloud.google.com/google/maps-apis),
enable **Maps JavaScript API**, and restrict it to the origins you serve the UI from.
The key is compiled into the bundle, so an HTTP-referrer restriction is the only thing
keeping it from being reused elsewhere.

Note that the Maps JavaScript API is fetched from `maps.googleapis.com` at runtime —
the device running the app needs outbound internet access. For a fully offline map,
use `@seamos/map-preset` with device-local PMTiles instead (see the `/map` route).

`FarmMap` takes a `fitPadding` prop so the same component can frame the block behind
the Field Map's overlays or inside the smaller panels on Work Progress and Field
Ledger. Pass a module-level constant — an inline object literal would re-create the
map on every render.

### Where the fields are

`src/data/farms.ts` keeps the exact field outlines from the Figma vector group and
projects them onto rice paddies in Banwol-dong, Deokjin-gu, Jeonju
(전주시 덕진구 반월동), around `FARM_BLOCK_ORIGIN`. Move that one constant to put the
same block of fields somewhere else. The scale is set so Farm 1 measures the 36.46 a
the design prints on the card; every other field's area is measured off its own
outline.

Tapping a field on the Field Map selects it — the outline thickens and the info card
switches to that field. The map panels on Work Progress and Field Ledger are
display-only (`FarmMap` without `onSelectFarm`).

### Mock data

The `data/` files hold the design's mock content, extended where a control would
otherwise have nothing to act on: `plantingPlans.ts` adds Wheat/Barley/Vegetable/Other
rows beyond the design's five Rice rows, `logs.ts` adds instruction rows for that tab,
and `fieldLedger.ts` adds rows in the non-Mishima blocks.

Two places where the design's own numbers do not add up are computed instead:
the Planting Plan toolbar reads "4 items · Total 1329.39 a" over five rows, and the
Work Progress pie is a flattened SVG whose wedges do not match its legend. Both are
derived from the data here, so the pie's wedges are Incomplete-dominated rather than
matching the Figma render.
