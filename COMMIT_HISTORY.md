# Commit History — wiremind-ui

This file acts as a log of code changes and pseudo-documentation for the `wiremind-ui` project.

## [2026-04-04] - Project Initialization & API Setup

### Changes
- Initialized Node.js project with `package.json`.
- Installed `openapi-typescript` as a dev dependency.
- Installed `openapi-fetch` as a production dependency.
- Added `generate:api` script to `package.json` to generate TypeScript types from the OpenAPI specification located in the `wiremind` core repository.

### Documentation
- **Task U1.3**: Configuring the API client infrastructure. By using `openapi-typescript`, we ensure that our frontend data structures are always in sync with the Go backend's OpenAPI spec.
- **Usage**: Run `npm run generate:api` to refresh `src/api/schema.d.ts` whenever the backend API changes.
