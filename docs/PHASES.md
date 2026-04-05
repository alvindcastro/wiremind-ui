# Project Phases — wiremind-ui

This file tracks the development progress of the Wiremind UI. Detailed specifications for each phase are in [UI_PLAN.md](UI_PLAN.md).

---

## Phase 1 — Scaffold & Plumbing ✅
*Goal: empty app talking to the live API with correct types.*

- [x] **U1.1** Create `wiremind-ui` repo, init Vite + React + TypeScript
- [x] **U1.2** Install and configure Tailwind CSS + shadcn/ui (dark mode default)
- [x] **U1.3** Install `openapi-typescript` + `openapi-fetch`; add `generate:api` npm script pointing at `../wiremind/docs/openapi.yaml`
- [x] **U1.4** Run codegen; commit `src/api/schema.d.ts`
- [x] **U1.5** Write `src/api/client.ts` — `createClient<paths>` with base URL from `VITE_API_URL` env var
- [x] **U1.6** Configure Vite dev proxy: `/api → http://localhost:8765`, `/openapi.yaml → http://localhost:8765`
- [x] **U1.7** ~~Add CORS middleware to Go server~~ — already done in `internal/api/server.go`; add `http://localhost:5173` to `CORS_ALLOWED_ORIGINS` in `.env`
- [x] **U1.8** Install React Router v6; create Shell layout (sidebar + header + `<Outlet />`)
- [x] **U1.9** Add placeholder routes for all 10 pages; confirm navigation works
- [x] **U1.10** Add TanStack Query `QueryClientProvider` to `App.tsx`
- [x] **U1.11** Configure `.gitignore` and project cleanup

**Deliverable:** `npm run dev` → shell with nav. `curl /health` from browser network tab returns 200.

---

## Phase 2 — Core Data Tables ✅
*Goal: all six data-view pages showing live data with column filters.*

- [x] **U2.1** Build generic `<DataTable>` component with TanStack Table (column def props, client-side filter, sort, pagination)
- [x] **U2.2** Add `<ThreatBadge score={n} />` component (0–33 green, 34–66 amber, 67–100 red)
- [x] **U2.3** **Flows page** — columns: flow_id, src_ip:port → dst_ip:port, protocol, packets, bytes, entropy, is_beacon, threat_score. Filter bar: src_ip, dst_ip, protocol, job_id
- [x] **U2.4** **Threats page** — reuse Flows table filtered to `is_malicious=true`, add IOC match detail in expandable row
- [x] **U2.5** **DNS page** — columns: timestamp, query name, qtype, rcode, answer count. Search bar for domain. Expandable row shows full answers + threat context
- [x] **U2.6** **TLS page** — columns: timestamp, SNI, version, cipher, is_malicious. Highlight weak ciphers (RC4/export) in amber. Search bar for SNI
- [x] **U2.7** **HTTP page** — columns: timestamp, method, host, path, user_agent, status_code. Highlight CLI agents. Search bar for host
- [x] **U2.8** **ICMP page** — columns: timestamp, src_ip, dst_ip, type_name, code, size

**Deliverable:** All six tables populated with real data. Filters working.

---

## Phase 3 — Job Management & SSE
*Goal: full job lifecycle from submit → watch → view results.*

- [ ] **U3.1** **Jobs list page** — table with job_id, status badge, input_path, created_at, packet_count, flow_count
- [ ] **U3.2** "Submit PCAP" side drawer — form with `input_path` text field + optional `output_path`. React Hook Form + Zod validation. On submit POST `/api/v1/jobs`, redirect to job detail
- [ ] **U3.3** **Job detail page** — metadata card + live SSE feed
- [ ] **U3.4** `useSSE(jobId)` hook — wraps `EventSource` for `/api/v1/jobs/{id}/stream`. Returns current `Job` state and `isComplete` flag
- [ ] **U3.5** SSE progress UI — animated progress bar while `status === "processing"`, tick/cross on completion/failure, error message display
- [ ] **U3.6** "View Results" button on completed job — links to `/flows?job_id=<id>`

**Deliverable:** Submit a PCAP path, watch it process in real time, click through to results.

---

## Phase 4 — Dashboard
*Goal: at-a-glance overview of the current dataset.*

- [ ] **U4.1** Stats row — five cards (Flows, DNS, TLS, HTTP, ICMP counts) from `GET /api/v1/stats`. Auto-refresh every 30s via TanStack Query
- [ ] **U4.2** Protocol distribution doughnut (Recharts `PieChart`) — shows relative share of each protocol event type
- [ ] **U4.3** Recent jobs widget — last 5 jobs with status badge and relative timestamp
- [ ] **U4.4** Top threats list — top 5 flows by threat_score from `GET /api/v1/threats?limit=5`, each row shows src→dst and score badge
- [ ] **U4.5** Beacon detections counter — count of flows where `is_beacon=true`

**Deliverable:** `/` shows a meaningful summary without navigating anywhere.

---

## Phase 5 — Network Graph
*Goal: visual IP relationship explorer.*

- [ ] **U5.1** Install `cytoscape` + `react-cytoscapejs`
- [ ] **U5.2** Build `<NetworkGraph>` component — transform `EnrichedFlow[]` into Cytoscape node/edge format. Node = IP; edge = flow (directed). Node colour: red=malicious, amber=suspicious (score>33), grey=clean. Edge width proportional to byte_count
- [ ] **U5.3** Layout: `cose-bilkent` for organic force-directed layout (install `cytoscape-cose-bilkent`)
- [ ] **U5.4** Click a node → side panel showing all flows for that IP, GeoIP info, IOC matches
- [ ] **U5.5** Filter controls: show only malicious, show only beaconing, filter by job_id
- [ ] **U5.6** Performance: only render top N flows by byte_count if total > 500 nodes (add "show all" toggle)

**Deliverable:** `/graph` renders the IP topology. Malicious nodes are red. Click reveals details.

---

## Phase 6 — Config & Control
*Goal: manage IOCs and pipeline settings from the UI.*

- [ ] **U6.1** **IOC table** — list all entries from `GET /api/v1/config/ioc`. Columns: indicator, type, severity badge, source, tags, created_at, delete button
- [ ] **U6.2** "Add IOC" dialog — form for indicator, type (ip/domain/hash), severity, source, tags (comma-separated). POST `/api/v1/config/ioc`
- [ ] **U6.3** Delete IOC — confirmation popover before `DELETE /api/v1/config/ioc/{id}`
- [ ] **U6.4** Pipeline config editor — key/value table. Inline edit → `PATCH /api/v1/config/pipeline`. Known keys shown with descriptions
- [ ] **U6.5** Live capture card — interface name input + BPF filter input. "Start" → POST `/api/v1/capture/start`. "Stop" → POST `/api/v1/capture/stop`

**Deliverable:** Full IOC CRUD. Can start/stop a live capture from the browser.

---

## Phase 7 — Docker Integration
*Goal: `docker compose up` boots the full stack including the React UI served via nginx.*

- [x] **U7.1** Create `Dockerfile` — multi-stage: `node:20-alpine` builder → `nginx:1.27-alpine` runtime
- [ ] **U7.2** Create `nginx.conf` — SPA fallback, `/api/` proxy to `forensics:8765`, gzip
- [ ] **U7.3** Create `.dockerignore` — exclude `node_modules/`, `dist/`, `.env*`, `.git/`
- [ ] **U7.4** Verify `src/api/client.ts` uses relative `/api` base URL (works for both Vite proxy and nginx proxy)
- [ ] **U7.5** Add `wiremind-ui` service to `wiremind/docker-compose.yaml`
- [ ] **U7.6** Add `docker-compose.override.yaml` in `wiremind/` for local dev (expose backend port `8765` to host)
- [ ] **U7.7** Smoke test: build succeeds, image < 50 MB, UI loads at `localhost:3001`, no CORS errors, deep links work

**Deliverable:** `docker compose up` → full stack at `localhost:3001`. No manual steps.

---

## Progress Summary

```
Phase 1  Scaffold + CORS fix        ✅ done
Phase 2  Core tables                ✅ done
Phase 3  Job management + SSE       ⬜ next
Phase 4  Dashboard                  ⬜
Phase 5  Network graph              ⬜
Phase 6  Config & control           ⬜
Phase 7  Docker integration         ⬜
```

> Phases 5 and 6 can be parallelised once Phase 3 is done.
> Phase 7 can be done any time after Phase 2 — it's infrastructure, not features.
