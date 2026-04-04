# Commit History — wiremind-ui

This file acts as a log of code changes and pseudo-documentation for the `wiremind-ui` project.

## [2026-04-04] - TLS Page Implementation

### Changes
- Implemented `src/pages/tls/TLSPage.tsx` using `DataTable`.
- Created `src/hooks/useTLS.ts` hook for fetching enriched TLS events from `/api/v1/tls`.
- Configured routing in `App.tsx` to mount `TLSPage` at `/tls`.
- Added columns: Timestamp, SNI, Version, and Cipher.
- Marked Task **U2.6** as completed in `PHASES.md`.

### Documentation
- **Task U2.6**: Developed the TLS traffic view. It utilizes the `useTLS` hook to fetch data and displays it in a responsive table, showing SNI (Server Name Indication), TLS version, and cipher suites.
- **Usage**: Navigate to `/tls` in the sidebar to view historical TLS handshakes.

## [2026-04-04] - DNS Page Implementation

### Changes
- Implemented `src/pages/dns/DNSPage.tsx` using `DataTable`.
- Created `src/hooks/useDNS.ts` hook for fetching enriched DNS events from `/api/v1/dns`.
- Configured routing in `App.tsx` to mount `DNSPage` at `/dns`.
- Added columns: Timestamp, Query Name, QType, and Responses.
- Marked Task **U2.5** as completed in `PHASES.md`.

### Documentation
- **Task U2.5**: Developed the DNS traffic view. It utilizes the `useDNS` hook to fetch data and displays it in a responsive table, showing domain queries and their associated results.
- **Usage**: Navigate to `/dns` in the sidebar to view historical DNS traffic.

## [2026-04-04] - Threats Page Implementation

### Changes
- Implemented `src/pages/threats/ThreatsPage.tsx` by reusing the `DataTable` structure from `FlowsPage`.
- Created `src/hooks/useThreats.ts` to fetch malicious findings from `/api/v1/threats`.
- Configured routing in `App.tsx` to mount `ThreatsPage` at `/threats`.
- Marked Task **U2.4** as completed in `PHASES.md`.

### Documentation
- **Task U2.4**: Developed the Threats view, which provides an aggregated view of malicious flows and high-threat score findings. It leverages the generic `DataTable` and the newly created `useThreats` hook.
- **Usage**: Navigate to `/threats` in the sidebar to view all detected malicious traffic.

## [2026-04-04] - Flows Page Implementation

### Changes
- Implemented `src/pages/flows/FlowsPage.tsx` using `DataTable`.
- Created `src/hooks/useFlows.ts` hook for fetching enriched flows from `/api/v1/flows`.
- Configured routing in `App.tsx` to mount `FlowsPage` at `/flows`.
- Added columns: Timestamp, Source, Destination, Protocol, Threat Score, Packets, and Bytes (with auto-formatting).
- Marked Task **U2.3** as completed in `PHASES.md`.

### Documentation
- **Task U2.3**: Developed the primary network traffic view. It utilizes the `useFlows` hook to fetch data and displays it in a responsive table with threat score color-coding via `ThreatBadge`.
- **Usage**: Navigate to `/flows` in the application to view the table.

## [2026-04-04] - ThreatBadge Component Implementation

### Changes
- Implemented `src/components/ui/ThreatBadge.tsx` component to visualize threat scores.
- Configured Vitest and `@testing-library/react` for component testing.
- Added unit tests in `src/components/ui/ThreatBadge.test.tsx` (TDD).
- Updated `vite.config.ts` with test configurations and path aliases.
- Integrated `ThreatBadge` into the Dashboard's demo table.
- Marked Task **U2.2** as completed in `PHASES.md`.

### Documentation
- **Task U2.2**: Created a `<ThreatBadge />` component that accepts a `score` prop (0-10). It automatically applies color coding: emerald for low (0-3), amber for medium (4-6), and red for high (7-10).
- **Usage**:
  ```tsx
  import { ThreatBadge } from '@/components/ui/ThreatBadge';

  <ThreatBadge score={7} />
  ```

## [2026-04-04] - Generic DataTable Implementation

### Changes
- Installed `@tanstack/react-table` for headless table logic.
- Implemented generic `src/components/ui/DataTable.tsx` component.
- Added low-level table primitives in `src/components/ui/Table.tsx` (following shadcn/ui patterns).
- Configured `tsconfig.json` and `tsconfig.node.json` for React, Vite, and path aliases.
- Fixed Tailwind CSS v4 / PostCSS configuration issues.
- Updated `package.json` to `"type": "module"`.
- Added `src/vite-env.d.ts` for environment variable type safety.
- Integrated a `DataTable` demo into the Dashboard for verification.
- Marked Task **U2.1** as completed in `PHASES.md`.

### Documentation
- **Task U2.1**: Developed a reusable `<DataTable />` component that takes `columns` and `data` props. This component will be the foundation for all data-view pages in Phase 2.
- **Usage**:
  ```tsx
  import { DataTable } from '@/components/ui/DataTable';
  import { ColumnDef } from '@tanstack/react-table';

  const columns: ColumnDef<MyData>[] = [...];
  <DataTable columns={columns} data={myData} />
  ```

## [2026-04-04] - Project Cleanup & Git Configuration

### Changes
- Updated `.gitignore` with project-specific exclusions (JetBrains, OS, Node.js, Vite, and docs).
- Removed redundant `-Force` directory created during initialization.
- Marked Task **U1.11** as completed in `PHASES.md`.

### Documentation
- **Task U1.11**: Finalized Phase 1 by ensuring the repository is clean and correctly configured for Git. Standardized the `.gitignore` to prevent environment-specific files from being tracked.

## [2026-04-04] - TanStack Query Setup

### Changes
- Installed `@tanstack/react-query`.
- Configured `QueryClient` and wrapped the application with `QueryClientProvider` in `App.tsx`.
- Marked Task **U1.10** as completed in `PHASES.md`.

### Documentation
- **Task U1.10**: Integrated TanStack Query for server-state management. This will be used to fetch and cache data from the backend API.
- **Usage**: Use `useQuery` or `useMutation` hooks from `@tanstack/react-query` within components.

## [2026-04-04] - React Router & Shell Layout

### Changes
- Installed `react-router-dom` and `lucide-react`.
- Created `src/components/layout/Shell.tsx` featuring a responsive sidebar with navigation links and a top header.
- Configured `src/App.tsx` with a standard layout using React Router and `<Outlet />`.
- Added placeholder routes for Dashboard, Flows, Threats, DNS, TLS, HTTP, ICMP, Jobs, Network Graph, and IOC Config.
- Created `index.html`, `src/main.tsx`, and `src/index.css` to boot the application.
- Marked Tasks **U1.8** and **U1.9** as completed in `PHASES.md`.

### Documentation
- **Task U1.8**: Implemented the core UI shell. The sidebar is collapsible and provides navigation to all primary application modules.
- **Task U1.9**: Established the routing structure for the entire application, enabling easy feature development in subsequent phases.
- **Usage**: Use `NavLink` within the sidebar for automatic active link highlighting.

## [2026-04-04] - Vite Proxy Configuration & Project Plumbing

### Changes
- Configured Vite dev proxy in `vite.config.ts` to redirect `/api` requests to `http://localhost:8765`.
- Installed and configured core dependencies: `vite`, `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `postcss`, and `autoprefixer`.
- Initialized Tailwind CSS and PostCSS configuration files.
- Updated `package.json` with standard Vite scripts (`dev`, `build`, `preview`).
- Marked Task **U1.6** as completed in `PHASES.md`.

### Documentation
- **Task U1.6**: Vite Proxy. This allows the frontend to communicate with the local Go backend during development without CORS issues.
- **Task U1.1 & U1.2**: Ensured all necessary UI plumbing (React, Tailwind) is correctly installed and configured.
- **Usage**: Run `npm run dev` to start the development server with the API proxy active.

## [2026-04-04] - API Codegen & Client Scaffold

### Changes
- Created feature branch `feat/api-scaffold`.
- Scaffolded the `src` directory structure including `api`, `components`, `pages`, `hooks`, and `lib`.
- Ran `npm run generate:api` to generate `src/api/schema.d.ts` from `docs/openapi.yaml`.
- Created `src/api/client.ts` to initialize the type-safe `openapi-fetch` client.

### Documentation
- **Task U1.4**: Automatic TypeScript type generation. This allows for end-to-end type safety when consuming the backend API.
- **Task U1.5**: Configured a shared `openapi-fetch` client with environment-aware base URL support (`VITE_API_URL`).
- **Usage**: Import the `client` singleton from `@/api/client` to make typed API requests.

## [2026-04-04] - Project Initialization & API Setup

### Changes
- Initialized Node.js project with `package.json`.
- Installed `openapi-typescript` as a dev dependency.
- Installed `openapi-fetch` as a production dependency.
- Added `generate:api` script to `package.json` to generate TypeScript types from the OpenAPI specification located in the `wiremind` core repository.

### Documentation
- **Task U1.3**: Configuring the API client infrastructure. By using `openapi-typescript`, we ensure that our frontend data structures are always in sync with the Go backend's OpenAPI spec.
- **Usage**: Run `npm run generate:api` to refresh `src/api/schema.d.ts` whenever the backend API changes.
