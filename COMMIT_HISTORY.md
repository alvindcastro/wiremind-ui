# Commit History — wiremind-ui

This file acts as a log of code changes and pseudo-documentation for the `wiremind-ui` project.

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
