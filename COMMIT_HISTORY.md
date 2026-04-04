# Commit History — wiremind-ui

This file acts as a log of code changes and pseudo-documentation for the `wiremind-ui` project.

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
