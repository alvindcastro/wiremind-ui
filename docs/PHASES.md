# Project Phases — wiremind-ui

This file tracks the development progress of the Wiremind UI. Detailed specifications for each phase are in [UI_PLAN.md](UI_PLAN.md).

## Phase 1 — Scaffold & Plumbing
*Goal: empty app talking to the live API with correct types.*

- [x] **U1.1** Create `wiremind-ui` repo, init Vite + React + TypeScript ✓
- [x] **U1.2** Install and configure Tailwind CSS + shadcn/ui (dark mode default) ✓
- [x] **U1.3** Install `openapi-typescript` + `openapi-fetch`; add `generate:api` npm script ✓
- [x] **U1.4** Run codegen; commit `src/api/schema.d.ts` ✓
- [x] **U1.5** Write `src/api/client.ts` — `createClient<paths>` with base URL ✓
- [x] **U1.6** Configure Vite dev proxy: `/api → http://localhost:8765` ✓
- [x] **U1.7** Add CORS middleware to Go server (Done in `internal/api/server.go`) ✓
- [x] **U1.8** Install React Router v6; create Shell layout (sidebar + header + `<Outlet />`) ✓
- [x] **U1.9** Add placeholder routes for all 10 pages; confirm navigation works ✓
- [x] **U1.10** Add TanStack Query `QueryClientProvider` to `App.tsx` ✓
- [x] **U1.11** Configure `.gitignore` and project cleanup ✓

## Phase 2 — Core Data Tables
*Goal: all six data-view pages showing live data with column filters.*

- [ ] **U2.1** Build generic `<DataTable>` component with TanStack Table
- [ ] **U2.2** Add `<ThreatBadge score={n} />` component
- [ ] **U2.3** **Flows page** — columns: flow_id, src_ip:port → dst_ip:port, protocol, etc.
- [ ] **U2.4** **Threats page** — reuse Flows table filtered to `is_malicious=true`
- [ ] **U2.5** **DNS page** — columns: timestamp, query name, qtype, rcode
- [ ] **U2.6** **TLS page** — columns: timestamp, SNI, version, cipher
- [ ] **U2.7** **HTTP page** — columns: timestamp, method, host, path, user_agent
- [ ] **U2.8** **ICMP page** — columns: timestamp, src_ip, dst_ip, type_name

## Phase 3 — Job Management & SSE
*Goal: full job lifecycle from submit → watch → view results.*

- [ ] **U3.1** **Jobs list page** — table with job_id, status badge, input_path
- [ ] **U3.2** "Submit PCAP" side drawer — form with `input_path` text field
- [ ] **U3.3** **Job detail page** — metadata card + live SSE feed
- [ ] **U3.4** `useSSE(jobId)` hook — wraps `EventSource`
- [ ] **U3.5** SSE progress UI — animated progress bar while `status === "processing"`
- [ ] **U3.6** "View Results" button on completed job — links to `/flows?job_id=<id>`

## Phase 4 — Dashboard
*Goal: at-a-glance overview of the current dataset.*

- [ ] **U4.1** Stats row — five cards from `GET /api/v1/stats`
- [ ] **U4.2** Protocol distribution doughnut (Recharts `PieChart`)
- [ ] **U4.3** Recent jobs widget — last 5 jobs with status badge
- [ ] **U4.4** Top threats list — top 5 flows by threat_score
- [ ] **U4.5** Beacon detections counter

## Phase 5 — Network Graph
*Goal: visual IP relationship explorer.*

- [ ] **U5.1** Install `cytoscape` + `react-cytoscapejs`
- [ ] **U5.2** Build `<NetworkGraph>` component
- [ ] **U5.3** Layout: `cose-bilkent` for organic force-directed layout
- [ ] **U5.4** Click a node → side panel showing all flows for that IP
- [ ] **U5.5** Filter controls: show only malicious, beaconing, etc.
- [ ] **U5.6** Performance: only render top N flows if total > 500 nodes

## Phase 6 — Config & Control
*Goal: manage IOCs and pipeline settings from the UI.*

- [ ] **U6.1** **IOC table** — list all entries from `GET /api/v1/config/ioc`
- [ ] **U6.2** "Add IOC" dialog — form for indicator, type, severity, etc.
- [ ] **U6.3** Delete IOC — confirmation popover
- [ ] **U6.4** Pipeline config editor — key/value table
- [ ] **U6.5** Live capture card — interface name input + BPF filter input
